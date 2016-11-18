/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspTorusRuntimeService } from './ssp-torus-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspTorusRuntime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspTorusRuntimeService, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspTorusRuntimeService], 
    (service: SspTorusRuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
