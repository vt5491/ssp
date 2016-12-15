/// <reference path="../../../typings/index.d.ts" />
import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

//TODO: should this be simply an interface and not an abstract class?
// @Injectable()
@Component({
  providers : [ VRSceneServiceProvider],
})
export class SspSceneService {
//export interface SspSceneService {

  // this is the surface that we will project onto i.e the one that we will
  // "gift-wrap" with the offscreen bufer texture.
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  // private _vrSceneService: VRSceneService;

  constructor(private _vrScene: VRSceneService ) 
  {

  };

  // Getters and Setters
  get vrScene(): VRSceneService {
    return this._vrScene;
  };
  set vrScene(val) {
    this._vrScene= val;
  };
}

// let SspSceneFactory = () => {
//   return new SspSceneService(new VRSceneService()) 
// }

export let SspSceneServiceProvider = {
  provide: SspSceneService,
  // deps: [VRSceneServiceProvider],
  deps: [VRSceneServiceProvider],
  useFactory: (vrSceneService : VRSceneService) => { return new SspSceneService(vrSceneService)}
}
