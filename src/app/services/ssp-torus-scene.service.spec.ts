/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspTorusSceneService, SspTorusSceneProvider } from './ssp-torus-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspTorusScene', () => {
//  console.log(`ssp-torus-scene.service.spec.ts: now in describe`);

  beforeEach(() => {
    // console.log(`ssp-torus-scene.service.spec.ts: beforeEach.pre`);
    TestBed.configureTestingModule({
      // providers: [SspTorusSceneService]
      providers: [SspTorusSceneProvider, 
        // note: this is needed even though it's not directly used
        VRSceneServiceProvider 
        ]
    });
    // console.log(`ssp-torus-scene.service.spec.ts: beforeEach.post`);
  });

  it('should ...', inject([SspTorusSceneService], (service: SspTorusSceneService) => {
  // it('should ...', inject([SspTorusSceneProvider], (service: SspTorusSceneService) => {
    // console.log(`ssp-torus-scene.service.spec.ts: service=${service}`);
    expect(service).toBeTruthy();
    expect(service.sspSurface).toBeTruthy();
  }));

  it('should have the proper instance variables', inject([SspTorusSceneService], (service: SspTorusSceneService) => {
  // it('should ...', inject([SspTorusSceneProvider], (service: SspTorusSceneService) => {
    // console.log(`ssp-torus-scene.service.spec.ts: service=${service}`);
    expect(service.torusMesh).toBeTruthy();
    expect(service.vrScene).toBeTruthy();
  }));
});
