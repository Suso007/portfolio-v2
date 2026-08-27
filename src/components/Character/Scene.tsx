import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { CharacterMesh, isCharacterMesh } from "./utils/types";
import disposeObject3D from "./utils/disposeUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;

      // One Scene per mount. This used to live in a ref, so every mount shared
      // a single Scene - and because loadCharacter takes seconds, a load
      // started by a mount that had already been torn down still ran
      // scene.add() on the Scene the *current* mount was rendering. That put a
      // second character in the shot, frozen in its bind pose because its
      // mixer belonged to the dead mount. StrictMode makes it happen on every
      // dev page load; crossing the 1024px breakpoint does it in production.
      const scene = new THREE.Scene();
      let disposed = false;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: CharacterMesh | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      // A discarded mount must not keep driving the loading percentage.
      const progress = setProgress((value) => {
        if (!disposed) setLoading(value);
      });
      const { loadCharacter } = setCharacter(
        renderer,
        scene,
        camera,
        () => disposed
      );

      let loadedCharacter: THREE.Object3D | null = null;
      let disposeHover: (() => void) | void;
      let introTimer: ReturnType<typeof setTimeout>;

      const onWindowResize = () => {
        if (!loadedCharacter) return;
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      };
      window.addEventListener("resize", onWindowResize);

      loadCharacter().then((gltf) => {
        if (gltf && !disposed) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            disposeHover = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          loadedCharacter = character;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          const light3d = character.getObjectByName("screenlight");
          screenLight = isCharacterMesh(light3d) ? light3d : null;
          progress.loaded().then(() => {
            introTimer = setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        } else if (gltf) {
          // Landed after teardown: never joins the live scene.
          disposeObject3D(gltf.scene);
        }
      }).catch((error) => {
        if (disposed) return;
        console.error("Character failed to load:", error);
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      let touchTarget: HTMLElement | null = null;
      const onTouchMove = (e: TouchEvent) =>
        handleTouchMove(e, (x, y) => (mouse = { x, y }));

      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchTarget?.removeEventListener("touchmove", onTouchMove);
          touchTarget = element ?? null;
          touchTarget?.addEventListener("touchmove", onTouchMove);
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      const canvasHost = canvasDiv.current;
      return () => {
        // The render loop and several of these listeners used to outlive the
        // component: the rAF was never cancelled, and the resize/mousemove
        // handlers were removed with newly created closures that never matched
        // the ones registered.
        disposed = true;
        progress.stop();
        cancelAnimationFrame(frame);
        clearTimeout(debounce);
        clearTimeout(introTimer);
        window.removeEventListener("resize", onWindowResize);
        document.removeEventListener("mousemove", onMouseMove);
        touchTarget?.removeEventListener("touchmove", onTouchMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        disposeHover?.();
        mixer?.stopAllAction();
        if (loadedCharacter) disposeObject3D(loadedCharacter);
        scene.clear();
        renderer.dispose();
        if (canvasHost?.contains(renderer.domElement)) {
          canvasHost.removeChild(renderer.domElement);
        }
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
