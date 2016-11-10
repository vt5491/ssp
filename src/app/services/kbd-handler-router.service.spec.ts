/// <reference path="../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KbdHandlerRouterService } from './kbd-handler-router.service';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { BaseService } from './base.service';

describe('Service: KbdHandlerRouter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KbdHandlerRouterService, CameraKbdHandlerService, BaseService]
    });
  });

  it('should instantiate properly', inject(
    [KbdHandlerRouterService, CameraKbdHandlerService, BaseService], 
      (service: KbdHandlerRouterService, 
       cameraKbdHandlerService: CameraKbdHandlerService) => {
    expect(service).toBeTruthy();
    expect(service.cameraKbdHandlerService).toBeTruthy();
  }));
});
