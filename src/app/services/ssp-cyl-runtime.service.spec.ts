/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCylRuntimeService } from './ssp-cyl-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';

describe('Service: SspCylRuntime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCylRuntimeService, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspCylRuntimeService, VRSceneService], 
    (vrSceneService: VRSceneService, service = new SspCylRuntimeService(vrSceneService)) => {
    expect(service).toBeTruthy();
  }));
});
