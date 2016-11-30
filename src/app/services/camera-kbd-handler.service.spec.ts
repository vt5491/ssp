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
    expect(service).toBeTruthy();
    expect(service.dolly).toBeTruthy();
  }));
});
