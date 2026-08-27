import * as THREE from "three";

/**
 * Release the GPU resources held by a subtree that will never be rendered.
 * Needed when a character finishes loading after its mount has already been
 * torn down - dropping the reference alone leaves the geometry, materials and
 * textures resident on the GPU.
 */
export default function disposeObject3D(root: THREE.Object3D) {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.geometry.dispose();

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((material) => {
      if (!material) return;
      Object.values(material as unknown as Record<string, unknown>).forEach(
        (value) => {
          const texture = value as THREE.Texture | null;
          if (texture && texture.isTexture) texture.dispose();
        }
      );
      material.dispose();
    });
  });
}
