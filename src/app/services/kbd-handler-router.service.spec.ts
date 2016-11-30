/// <reference path="../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KbdHandlerRouterService } from './kbd-handler-router.service';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { AsteroidsKbdHandler } from '../inner-games/asteroids/asteroids-kbd-handler';
import { BaseService } from './base.service';

fdescribe('Service: KbdHandlerRouter', () => {
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
    expect(service.keyEventHandler).toBeTruthy();
    expect(service.toggleKey).toEqual('T'.charCodeAt(0));
  }));

  fit('should toggle properly', inject(
    [KbdHandlerRouterService, CameraKbdHandlerService, BaseService], 
      (service: KbdHandlerRouterService ) => {

         let origKbdHandler = service.activeKbdHandler._name;
         console.log(`origKbdHandler=${origKbdHandler}`);

         // now send a 'T' key event to toggle
        //  service.keyEventHandler(Object.defineProperty(event, 'keyCode', {'value': 'T'.charCodeAt(0)}));
         let evt = <any>{};
         evt.keyCode = {};
        //  evt.keyCode = {'value' : 'T'.charCodeAt(0)};
        evt.keyCode = 'T'.charCodeAt(0);
        //  service.keyEventHandler({'keyCode', {'value': 'T'.charCodeAt(0)} });
         service.keyEventHandler(evt);

         let newKbdHandler = service.activeKbdHandler.name;
         console.log(`newKbdHandler=${newKbdHandler}`);

         expect(newKbdHandler).not.toEqual(origKbdHandler);
  }));
});
