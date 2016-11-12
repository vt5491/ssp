import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspScene} from '../ssp-scene';

@Injectable()
export class SspCylSceneService implements SspScene {

  constructor(width, height, private _vrSceneService: VRSceneService) { 
  }

  // Getters and Setters
  get vrSceneService(): VRSceneService {
    return this._vrSceneService;
  };
  set vrSceneService(theVrSceneService: VRSceneService) {
    this._vrSceneService = theVrSceneService;
  }
}

let SspCylSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspCylSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  return new SspCylSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspCylSceneProvider = {
  provide: SspCylSceneService,
  useFactory: SspCylSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
}


