///<reference path="../../../typings/index.d.ts" />
import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

// @Component({
//   // providers: [VRSceneServiceProvider]
//   providers: [VRSceneService]
// })

@Injectable()
export class SspTorusSceneService {

  torusMesh : THREE.Mesh;
  // constructor(width, height, webGLRenderer: THREE.WebGLRenderer) { 
  constructor(width, height, private _vrSceneService: VRSceneService) { 
    console.log(`SspTorusSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let torusGeom   = new THREE.TorusGeometry(25, 8, 50, 50);
    let torusMaterial = new THREE.MeshBasicMaterial();

    this.torusMesh = new THREE.Mesh(torusGeom, torusMaterial);
    this.torusMesh.name = "abc";
    // this.torusMesh.rotateX(Base.ONE_DEG * 90.0);
    this._vrSceneService.scene.add(this.torusMesh);

  }

  // Getters and Setters
  get vrSceneService(): VRSceneService {
    return this._vrSceneService;
  };
  set vrSceneService(theVrSceneService: VRSceneService) {
    this._vrSceneService = theVrSceneService;
  }

  // this returns the webGLRenderer from the injected VRSceneService
  // Just a shortcut so the user doesn't have to chain two object to get
  // a simple value.
  get webGLRenderer(): THREE.WebGLRenderer {
    return this._vrSceneService.webGLRenderer;
  };
  set webGLRenderer(webGLRenderer: THREE.WebGLRenderer) {
    this._vrSceneService.webGLRenderer = webGLRenderer;
  }
}

// let SspTorusSceneFactory = (webGLRenderer: THREE.WebGLRenderer) => {
// let SspTorusSceneFactory = () => {
let SspTorusSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspTorusSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspTorusSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  return new SspTorusSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspTorusSceneProvider = {
  provide: SspTorusSceneService,
  useFactory: SspTorusSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
}


