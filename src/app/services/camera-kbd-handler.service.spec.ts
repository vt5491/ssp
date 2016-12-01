/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { BaseService } from './base.service';

describe('Service: CameraKbdHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CameraKbdHandlerService, BaseService]
    });
  });

  it('should ...', inject([CameraKbdHandlerService, BaseService], 
    (service: CameraKbdHandlerService) => {
    // (service: new CameraKbdHandlerService()) => {
      //we have to set dolly manually
      service.dolly = new THREE.Object3D();
      expect(service).toBeTruthy();
      expect(service.dolly).toBeTruthy();
  }));
});
