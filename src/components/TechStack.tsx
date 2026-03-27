import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Decal } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { techStackIcons } from "../myData/data";
import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { IconType } from "react-icons";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx } from "react/jsx-runtime";

// Map icon key strings to actual react-icon components
const iconComponentMap: Record<string, IconType> = {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  FaAws,
};

/** Render a react-icon to a THREE.CanvasTexture with a colored circle background */
function createIconTexture(
  iconKey: string,
  bgColor: string
): THREE.CanvasTexture {
  const size = 256; // Increased resolution for crisper decals
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Clear canvas to ensure corners outside the circle remain transparent
  ctx.clearRect(0, 0, size, size);

  // Background circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = bgColor;
  ctx.fill();

  // Render the react-icon to SVG markup
  const IconComponent = iconComponentMap[iconKey];
  let svgString = "";
  if (IconComponent) {
    try {
      svgString = renderToStaticMarkup(
        jsx(IconComponent as React.ComponentType<{ size?: number; color?: string }>, {
          size: 140, // Scaled up to match new canvas size
          color: "#ffffff",
        })
      );
    } catch {
      /* fallback: leave blank */
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16; // Improves texture quality at sharp angles

  if (svgString) {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, (size - 140) / 2, (size - 140) / 2, 140, 140);
      URL.revokeObjectURL(url);
      texture.needsUpdate = true;
    };
    img.src = url;
  }

  return texture;
}

const textures = techStackIcons.map((t) => ({
  texture: createIconTexture(t.icon, t.color),
  color: t.color,
}));

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const spheres = [...Array(techStackIcons.length * 2 + 6)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.CanvasTexture;
  color: string;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  color,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry}>
        {/* Base Material of the Ball (Dark grey plastic look) */}
        <meshPhysicalMaterial
          color="#fff"
          metalness={0.2}
          roughness={0.4}
          clearcoat={0.3}
        />

        {/* The Icon Badge projected perfectly onto the Z-face of the ball */}
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.4}>
          <meshPhysicalMaterial
            map={texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
            emissive={color}
            emissiveIntensity={0.4} // Adds a subtle glow to the badge
            roughness={0.2}
            metalness={0.8}
          />
        </Decal>
      </mesh>
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => {
            // Using modulo to cycle through the textures evenly
            const item = textures[i % textures.length];
            return (
              <SphereGeo
                key={i}
                {...props}
                texture={item.texture}
                color={item.color}
                isActive={isActive}
              />
            );
          })}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;