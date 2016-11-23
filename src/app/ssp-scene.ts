/// <reference path="../../typings/index.d.ts" />
import { VRSceneService } from './services/vr-scene.service'

export interface SspScene {
  // webGlRenderer : THREE.WebGLRenderer;
  vrSceneService : VRSceneService;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
}
