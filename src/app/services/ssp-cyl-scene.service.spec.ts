/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCylSceneService, SspCylSceneProvider } from './ssp-cyl-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { BaseService } from './base.service';

describe('Service: SspCylScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCylSceneProvider, VRSceneServiceProvider, BaseService]
    });
  });

  it('should ...', inject([SspCylSceneService], (service: SspCylSceneService) => {
    expect(service).toBeTruthy();
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
    expect(result.z).toBeCloseTo(1.0);
    expect(result.rotQuat.length()).toBeCloseTo(1.0);

    // we're 1/4 of the way around the cyl
    innerX = 2.0;

    result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);
    console.log("ut: result=%o", result);

    expect(result.x).toBeCloseTo(1.0);
    expect(result.y).toBeCloseTo(0.0);
    expect(result.z).toBeCloseTo(0.0);

    // we're 1/8 of the way around the cyl
    innerX = 1.0;

    result = service.getNormalizedTrackingCoords(innerX, innerY, innerZ, boundVal);
    console.log("ut: result=%o", result);

    expect(result.x).toBeCloseTo(Math.cos(base.ONE_DEG * 45.0));
    expect(result.y).toBeCloseTo(0.0);
    expect(result.z).toBeCloseTo(Math.sin(base.ONE_DEG * 45.0));
  }));
});
