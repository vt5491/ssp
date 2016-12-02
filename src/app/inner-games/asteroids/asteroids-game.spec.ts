/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game';
import { Ship } from './ship';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
// import { SspTorusRuntimeService } from './ssp-torus-runtime.service';
// import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Class: AsteroidsGame', () => {
  // let AsteroidsGameProvider = {
  //   provide: AsteroidsGame,
  //   // useFactory: () => { 
  //   //   return new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter } )
  //   // },
  //   useFactory: () => {
  //     return new AsteroidsGame(new THREE.Scene(), new Ship());
  //   }
  //   // useFactory: (THREE.scene),
  //   // deps: [THREE.Scene]
  // }
  // let AsteroidsGameProvider = {
  //   provide: AsteroidsGame,
  //   useFactory: (scene : THREE.Scene, ship : Ship) => {
  //   // useFactory: (ship : Ship) => {
  //   // useFactory: (scene : THREE.Scene) => {
  //   // useFactory: () => {
  //     // return new AsteroidsGame(new THREE.Scene(), new Ship());
  //     // let scene = new THREE.Scene();
  //     // let ship = new Ship();
  //     return new AsteroidsGame(scene, ship);
  //   },
  //   deps: [THREE.Scene, Ship]
  //   // deps: [Ship]
  //   // deps: [THREE.Scene]
  //   // deps: [ThreeJsSceneProvider, Ship]
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [SspTorusRuntimeService, VRSceneServiceProvider]
      providers: [AsteroidsGameProvider, ThreeJsSceneProvider, Ship, BaseService]
    });
  });

  // it('should ...', inject([SspTorusRuntimeService], 
  //   (service: SspTorusRuntimeService) => {
  //   expect(service).toBeTruthy();
  // }));
  it('should AsteroidsGame is initialized properly', inject([AsteroidsGame], 
    (asteroidsGame: AsteroidsGame) => {
      console.log(`ut:asteroids-game: asteroidGame=${asteroidsGame}`);
    expect(asteroidsGame).toBeTruthy();
    expect(asteroidsGame.scene).toBeTruthy();
  }));

  // it('initScene workds', inject([AsteroidsGame], (asteroidsGameProvider))
  it('initScene works properly', inject([AsteroidsGame], 
    (asteroidsGame: AsteroidsGame) => {
      // console.log(`ut:asteroids-game: asteroidGame=${asteroidsGame}`);
      asteroidsGame.initScene();
      expect(asteroidsGame.asteroids.length).toBeGreaterThan(0);
      expect(asteroidsGame.scene.children.length).toBeGreaterThan(0);
    // expect(asteroidsGame).toBeTruthy();
    // expect(asteroidsGame.scene).toBeTruthy();
  }));
});