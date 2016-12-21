/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { BaseService } from './base.service';
import { UtilsService } from './utils.service';

describe('Service: CameraKbdHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraKbdHandlerService, BaseService, UtilsService]
    });
  });

  it('should ...', inject([CameraKbdHandlerService, BaseService], 
    (service: CameraKbdHandlerService) => {
    // (service: new CameraKbdHandlerService()) => {
      //we have to set dolly manually
      service.dolly = new THREE.Object3D();
      expect(service).toBeTruthy();
      expect(service.dolly).toBeTruthy();
      expect(service.deltaX).toBeDefined();
      expect(service.deltaY).toBeDefined();
      expect(service.deltaZ).toBeDefined();
      expect(service.utils).toBeDefined();
  }));
});
