/// <reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

//TODO: should this be simply an interface and not an abstract class?
@Injectable()
export class SspSceneService {

  // this is the surface that we will project onto i.e the one that we will
  // "gift-wrap" with the offscreen bufer texture.
  sspSurface : THREE.Mesh;
  private _vrSceneService: VRSceneService;

  constructor() { }

  // Getters and Setters
  get vrSceneService(): VRSceneService {
    return this._vrSceneService;
  };
  set vrSceneService(val) {
    this._vrSceneService = val;
  };
}
