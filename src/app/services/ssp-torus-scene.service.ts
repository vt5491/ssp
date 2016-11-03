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
  constructor(width, height, public vrSceneService: VRSceneService) { 
    console.log(`SspTorusSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let torusGeom   = new THREE.TorusGeometry(25, 8, 50, 50);
    let torusMaterial = new THREE.MeshBasicMaterial();

    this.torusMesh = new THREE.Mesh(torusGeom, torusMaterial);
    // this.torusMesh.rotateX(Base.ONE_DEG * 90.0);

  }
}

// let SspTorusSceneFactory = (webGLRenderer: THREE.WebGLRenderer) => {
// let SspTorusSceneFactory = () => {
let SspTorusSceneFactory = (vrSceneService: VRSceneService) => {
  console.log(`SspTorusSceneFactor.ctor: entered`);
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


