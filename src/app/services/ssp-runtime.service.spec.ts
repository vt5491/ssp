/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspRuntimeService } from './ssp-runtime.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { InnerGame } from '../inner-game';

describe('Service: SspRuntime', () => {
  let dummyInnerGame : InnerGame = {}; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspRuntimeService, VRSceneServiceProvider]
    });
    // this.innerGame = new InnerGame();
    this.innerGame = {};
  });

// get error:
// Error: Can't resolve all parameters for SspRuntimeService: (VRSceneService, ?).
  // it('should ...', inject([SspRuntimeService], (service: SspRuntimeService) => {
  // it('should ...', inject([SspRuntimeService, VRSceneService], 
  //   (vrSceneService : VRSceneService, 
  //    service = new SspRuntimeService(vrSceneService, this.innerGame)) => {
  //     expect(service).toBeTruthy();
  // }));
});
