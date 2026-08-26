import * as THREE from "three";

/**
 * A mesh from the character GLTF whose single material we animate
 * (opacity / emissive). Replaces the `any` casts that used to be sprinkled
 * across the scene code.
 */
export type CharacterMesh = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshStandardMaterial
>;

export const isCharacterMesh = (
  object: THREE.Object3D | null | undefined
): object is CharacterMesh =>
  !!object &&
  (object as THREE.Mesh).isMesh === true &&
  !Array.isArray((object as THREE.Mesh).material);
