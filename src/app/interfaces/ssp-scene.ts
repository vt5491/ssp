/// <reference path="../../../typings/index.d.ts" />
import { VRSceneService } from '../services/vr-scene.service'
import { IMainCharacterInfo} from './main-character-info';
import { CameraKbdHandlerService } from '../services/camera-kbd-handler.service';

export interface ISspScene {
  // webGlRenderer : THREE.WebGLRenderer;
  vrScene: VRSceneService;
  sspSurface : THREE.Mesh;
  //TODO: its not necessary to expose this.  It's just a temporary variable
  // used to create the mesh
  // actually, no its used by ssp-runtime.service to do image projection
  sspMaterial : THREE.MeshBasicMaterial;
  tag : string;

  // keyEventHandler(event : KeyboardEvent);
  outerCameraTrack(
    avatarInfo: IMainCharacterInfo, 
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService 
    );
}
