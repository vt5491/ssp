/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCubeScene, SspCubeSceneProvider } from './ssp-cube-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspPlaneScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCubeSceneProvider, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspCubeScene], (service: SspCubeScene) => {
    expect(service).toBeTruthy();
  }));
});
