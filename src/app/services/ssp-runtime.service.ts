import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';

@Injectable()
export class SspRuntimeService {

  // constructor() { }
  constructor(public vrSceneService: VRSceneService) { 
  }

  mainLoop() {
    // console.log(`SspTorusRuntimeService.mainLoop: entered`);
    window.requestAnimationFrame(SspRuntimeService
      .prototype.mainLoop.bind(this));

    this.vrSceneService.vrControls.update();

    this.vrSceneService.webVrManager.render(this.vrSceneService.scene, this.vrSceneService.camera);
  }

}
