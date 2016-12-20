/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspTorusSceneService, SspTorusSceneProvider } from './ssp-torus-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { BaseService } from './base.service';

fdescribe('Service: SspTorusScene', () => {
//  console.log(`ssp-torus-scene.service.spec.ts: now in describe`);

  beforeEach(() => {
    // console.log(`ssp-torus-scene.service.spec.ts: beforeEach.pre`);
    TestBed.configureTestingModule({
      // providers: [SspTorusSceneService]
      providers: [SspTorusSceneProvider, VRSceneServiceProvider, 
        CameraKbdHandlerService, BaseService
        // note: this is needed even though it's not directly used
        // VRSceneServiceProvider 
        ]
    });
    // console.log(`ssp-torus-scene.service.spec.ts: beforeEach.post`);
  });

  it('should ...', inject([SspTorusSceneService], (service: SspTorusSceneService) => {
  // it('should ...', inject([SspTorusSceneProvider], (service: SspTorusSceneService) => {
    // console.log(`ssp-torus-scene.service.spec.ts: service=${service}`);
    expect(service).toBeTruthy();
    expect(service.sspSurface).toBeTruthy();
    expect(service.torusRadius).toBeTruthy();
    expect(service.torusRadius).toEqual(service.DEFAULT_TORUS_RADIUS);
    expect(service.tubeRadius).toBeTruthy();
    expect(service.tubeRadius).toEqual(service.DEFAULT_TUBE_RADIUS);
  }));

  it('should have the proper instance variables', inject([SspTorusSceneService], (service: SspTorusSceneService) => {
  // it('should ...', inject([SspTorusSceneProvider], (service: SspTorusSceneService) => {
    // console.log(`ssp-torus-scene.service.spec.ts: service=${service}`);
    expect(service.torusMesh).toBeTruthy();
    expect(service.vrScene).toBeTruthy();
  }));

  it('outerCameraTrack works properly',
    inject([SspTorusSceneService,  VRSceneService, CameraKbdHandlerService], 
      (service: SspTorusSceneService, 
       vrSceneService : VRSceneService, cameraKbdHandler : CameraKbdHandlerService 
      ) => {

      let avatarInfo = <any>{};
      avatarInfo.pos = {};

      avatarInfo.pos.x = 0;
      avatarInfo.pos.y = 0;
      avatarInfo.pos.z = 0;

      service.outerCameraTrack(<IMainCharacterInfo>avatarInfo, vrSceneService, cameraKbdHandler);

      // expect(vrSceneService.dolly.position.z).toEqual(-service.radius * 3);

  }));

  it('getNormalizedTrackingCoords works properly', 
    inject([SspTorusSceneService, BaseService], (service: SspTorusSceneService, base :BaseService) => {
      // inner values at the 'home' position
      let innerX = 0.0, innerY = 0.0, innerZ = 0.0;
      let boundVal = 4.0;
      // let result : Object;
      let result: any;

      result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);

      expect(result).toBeDefined; 
      // expect(result.x).toBeCloseTo(0.0);
      // expect(result.y).toBeCloseTo(0.0);
      // expect(result.z).toBeCloseTo(-1.0);
      // expect(result.rotQuat.length()).toBeCloseTo(1.0);

    }));
});
