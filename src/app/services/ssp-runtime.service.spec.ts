/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspRuntimeService } from './ssp-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspRuntime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspRuntimeService, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspRuntimeService], (service: SspRuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
