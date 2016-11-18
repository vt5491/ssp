import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspScene} from '../ssp-scene';

@Injectable()
export class SspPlaneSceneService implements SspScene {
  planeMesh: THREE.Mesh;

  constructor(width, height, private _vrSceneService: VRSceneService) { 
    console.log(`SspplaneSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let planeGeom   = new THREE.PlaneGeometry(50, 50);
    let planeMaterial = new THREE.MeshBasicMaterial();

    this.planeMesh = new THREE.Mesh(planeGeom, planeMaterial);
    this.planeMesh.name = "abc";
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this._vrSceneService.scene.add(this.planeMesh);

  };

    // Getters and Setters
  get vrSceneService(): VRSceneService {
    return this._vrSceneService;
  };
  set vrSceneService(theVrSceneService: VRSceneService) {
    this._vrSceneService = theVrSceneService;
  }
}

let SspPlaneSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspCylSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  return new SspPlaneSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspPlaneSceneProvider = {
  provide: SspPlaneSceneService,
  useFactory: SspPlaneSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
}


