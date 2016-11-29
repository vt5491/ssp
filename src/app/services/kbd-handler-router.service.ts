///<reference path="../../../typings/index.d.ts" />
// This class will presumably route keyboard events to the proper handler
// based on appication state.  The idea is this 'concern' is concentrated
// in this one place, but it's to be seen if this *can* work as a stand-alone
// service without being part of the client app itself.
import { Injectable } from '@angular/core';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { KbdHandler } from '../interfaces/kbd-handler';

@Injectable()
export class KbdHandlerRouterService {

  private _kbdHandler : KbdHandler;

  constructor(private _cameraKbdHandlerService: CameraKbdHandlerService) {
    this.kbdHandler = _cameraKbdHandlerService;
   }

  keyHandler(event: KeyboardEvent, clientArtifact?: any) {
    // this.cameraKbdHandlerService.keyHandler(event, clientArtifact);
    this.kbdHandler.keyHandler(event, clientArtifact);
  }

  // Getters and Setters
  get cameraKbdHandlerService(): CameraKbdHandlerService {
    return this._cameraKbdHandlerService;
  };

  get kbdHandler() {
    return this._kbdHandler;
  }
  set kbdHandler( kbdh: KbdHandler) {
    this._kbdHandler = kbdh;
  }
}
