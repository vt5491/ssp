/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCylSceneService, SspCylSceneProvider } from './ssp-cyl-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { BaseService } from './base.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

describe('Service: SspCylScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCylSceneProvider, VRSceneServiceProvider, BaseService, CameraKbdHandlerService]
    });
  });

  it('should ...', inject([SspCylSceneService], (service: SspCylSceneService) => {
    expect(service).toBeTruthy();
    expect(service.radius).toBeTruthy();
    expect(service.radius).toEqual(service.DEFAULT_RADIUS);
  }));

  // it('should allow overrides of the radius', inject([VRSceneServiceProvider, THREE.WebGLRenderer], 
  // (vrScene: VRSceneService),   => {
  //   let service = new SspCylSceneService(100, 100, vrScene, 10);
  //   expect(service).toBeTruthy();
  //   expect(service.radius).toBeTruthy();
  //   expect(service.radius).toEqual(10);
  // }));

  it('should ...', inject([VRSceneService], 
    (vrScene: VRSceneService ) => {
      let service = new SspCylSceneService(100, 100, vrScene, 10);
    expect(service).toBeTruthy();
    expect(service.radius).toBeTruthy();
    expect(service.radius).toEqual(10);
  }));

  it('getNormalizedTrackingCoords works properly', 
    inject([SspCylSceneService, BaseService], (service: SspCylSceneService, base :BaseService) => {
    // inner values at the 'home' position
    let innerX = 0.0, innerY = 0.0, innerZ = 0.0;
    let boundVal = 4.0;
    // let result : Object;
    let result : any;

    result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);

    expect(result).toBeDefined;
    // console.log(`ut: result.x=${result['x']}`);
    // debugger;
    // expect(result['x']).toBeUndefined;
    // expect(result['x']).toBeDefined;
    expect(result.x).toBeDefined;

    expect(result.x).toBeCloseTo(0.0);
    expect(result.y).toBeCloseTo(0.0);
    expect(result.z).toBeCloseTo(-1.0);
    expect(result.rotQuat.length()).toBeCloseTo(1.0);

    // we're 1/4 of the way around the cyl
    innerX = 2.0;

    result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);
    console.log("ut: result=%o", result);

    expect(result.x).toBeCloseTo(-1.0);
    expect(result.y).toBeCloseTo(0.0);
    expect(result.z).toBeCloseTo(0.0);

    // we're 1/8 of the way around the cyl
    innerX = 1.0;

    result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);
    console.log("ut: result=%o", result);

    expect(result.x).toBeCloseTo(Math.cos(base.ONE_DEG * 45.0) * -1);
    expect(result.y).toBeCloseTo(0.0);
    expect(result.z).toBeCloseTo(Math.sin(base.ONE_DEG * 45.0) * -1);
  }));

  it('outerCameraTrack works properly',
    inject([SspCylSceneService, BaseService, VRSceneService, CameraKbdHandlerService], 
      (service: SspCylSceneService, base: BaseService,
       vrSceneService : VRSceneService, cameraKbdHandler : CameraKbdHandlerService 
      ) => {

      let avatarInfo = <any>{};
      avatarInfo.pos = {};

      avatarInfo.pos.x = 0;
      avatarInfo.pos.y = 0;
      avatarInfo.pos.z = 0;

      service.outerCameraTrack(<IMainCharacterInfo>avatarInfo, vrSceneService, cameraKbdHandler);

      expect(vrSceneService.dolly.position.z).toEqual(-service.radius * 3);

  }));
});
