///<reference path="../../../typings/index.d.ts" />
// This class will presumably route keyboard events to the proper handler
// based on appication state.  The idea is this 'concern' is concentrated
// in this one place, but it's to be seen if this *can* work as a stand-alone
// service without being part of the client app itself.
import { Injectable } from '@angular/core';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class KbdHandlerRouterService {

  constructor(private _cameraKbdHandlerService: CameraKbdHandlerService) {

   }

  keyHandler(event: KeyboardEvent, clientArtifact?: any) {
    this.cameraKbdHandlerService.keyHandler(event, clientArtifact);
  }

  // Getters and Setters
  get cameraKbdHandlerService(): CameraKbdHandlerService {
    return this._cameraKbdHandlerService;
  };
}
