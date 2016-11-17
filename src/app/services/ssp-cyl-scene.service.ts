import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspScene} from '../ssp-scene';

@Injectable()
export class SspCylSceneService implements SspScene {
  cylMesh : THREE.Mesh;

  constructor(width, height, private _vrSceneService: VRSceneService) { 
    console.log(`SspCylSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let cylGeom   = new THREE.CylinderBufferGeometry(25, 25, 50);
    let cylMaterial = new THREE.MeshBasicMaterial();

    this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    this.cylMesh.name = "abc";
    // this.cylMesh.rotateX(Base.ONE_DEG * 90.0);
    this._vrSceneService.scene.add(this.cylMesh);

  };

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


