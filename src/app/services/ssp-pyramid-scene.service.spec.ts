/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspPyramidScene, SspPyramidSceneProvider } from './ssp-pyramid-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspPlaneScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspPyramidSceneProvider, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspPyramidScene], (service: SspPyramidScene) => {
    expect(service).toBeTruthy();
  }));
});
