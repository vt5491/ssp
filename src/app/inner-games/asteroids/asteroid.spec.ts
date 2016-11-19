/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Asteroid } from './asteroid';
// import { SspTorusRuntimeService } from './ssp-torus-runtime.service';
// import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Class: Asteroids', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [SspTorusRuntimeService, VRSceneServiceProvider]
      providers: [Asteroid]
    });
  });

  // it('should ...', inject([SspTorusRuntimeService], 
  //   (service: SspTorusRuntimeService) => {
  //   expect(service).toBeTruthy();
  // }));
  it('should asteroid is initialized properly', inject([Asteroid], 
    (asteroid: Asteroid) => {
    expect(asteroid).toBeTruthy();
    expect(asteroid.vx).toBeTruthy();
    expect(asteroid.geom).toBeTruthy();
  }));
});