import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { isCharacterMesh } from "./types";
import disposeObject3D from "./disposeUtils";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  // Decrypting and parsing the model takes seconds. If the mount that started
  // the load is gone by the time it lands, everything below - compiling
  // against a disposed renderer, and above all building a second set of
  // scroll timelines - must not happen.
  isCancelled: () => boolean = () => false
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    const encryptedBlob = await decryptFile(
      "/models/character.enc?v=2",
      "MyCharacter12"
    );
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    try {
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        loader.load(blobUrl, resolve, undefined, reject);
      });

      if (isCancelled()) {
        disposeObject3D(gltf.scene);
        return null;
      }

      const character = gltf.scene;
      await renderer.compileAsync(character, camera, scene);

      if (isCancelled()) {
        disposeObject3D(character);
        return null;
      }

      character.traverse((child) => {
        if (!isCharacterMesh(child)) return;

        // Change clothing colors to match site theme
        if (child.name === "BODY.SHIRT") {
          const newMat = child.material.clone();
          newMat.color = new THREE.Color("#8B4513");
          child.material = newMat;
        } else if (child.name === "Pant") {
          const newMat = child.material.clone();
          newMat.color = new THREE.Color("#000000");
          child.material = newMat;
        }

        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;
      });

      setCharTimeline(character, camera);
      setAllTimeline();

      const footR = character.getObjectByName("footR");
      const footL = character.getObjectByName("footL");
      if (footR) footR.position.y = 3.36;
      if (footL) footL.position.y = 3.36;

      // Monitor scale is handled by GsapScroll.ts animations

      return gltf;
    } finally {
      // Neither of these used to be released: the object URL held the decoded
      // model in memory for the lifetime of the page, and the draco decoder
      // was only disposed on the success path.
      URL.revokeObjectURL(blobUrl);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;
