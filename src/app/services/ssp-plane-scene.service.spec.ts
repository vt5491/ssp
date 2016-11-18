/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspPlaneSceneService, SspPlaneSceneProvider } from './ssp-plane-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspPlaneScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspPlaneSceneProvider, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspPlaneSceneService], (service: SspPlaneSceneService) => {
    expect(service).toBeTruthy();
  }));
});
