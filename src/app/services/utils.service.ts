///<reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

}

// here's where we define the providers for things that don't have their own native
// class with the app.
export let WebGLRenderTargetProvider = {
  provide: THREE.WebGLRenderTarget,
  useFactory: () => {
    return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter })
  },
};

export let ThreeJsSceneProvider = {
  provide: THREE.Scene,
  useFactory: () => {
    return new THREE.Scene();
  },
};
