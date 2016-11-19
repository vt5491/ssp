import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { InnerGame } from '../inner-game';

@Injectable()
export class SspRuntimeService {

  // constructor() { }
  constructor(public vrSceneService: VRSceneService, 
    public innerGame?: InnerGame
    ) { 
  }

  mainLoop() {
    // console.log(`SspTorusRuntimeService.mainLoop: entered`);
    window.requestAnimationFrame(SspRuntimeService
      .prototype.mainLoop.bind(this));

    // update the innerGame
    if (this.innerGame) {
      (<any>this.innerGame).updateScene();

      // console.log(`SspRuntimeService.mainLoop: asteroid.x=${(<any>this.innerGame).asteroids[0].mesh.position.x}`)
    }

    this.vrSceneService.vrControls.update();

    this.vrSceneService.webVrManager.render(this.vrSceneService.scene, this.vrSceneService.camera);
  }

}
