///<reference path="../../../typings/index.d.ts" />
// This class will presumably route keyboard events to the proper handler
// based on appication state.  The idea is this 'concern' is concentrated
// in this one place, but it's to be seen if this *can* work as a stand-alone
// service without being part of the client app itself.
import { Injectable } from '@angular/core';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { AsteroidsKbdHandler } from '../inner-games/asteroids/asteroids-kbd-handler';
import { KbdHandler } from '../interfaces/kbd-handler';

@Injectable()
export class KbdHandlerRouterService {

  // private _kbdHandler : KbdHandler;
  private _activeKbdHandler : KbdHandler;
  private _toggleKey : number;
  private _cameraKbdHandler : CameraKbdHandlerService;
  private _asteroidsKbdHandler : AsteroidsKbdHandler;

  constructor(private _cameraKbdHandlerService: CameraKbdHandlerService) {
    // default to standard camera controls
    this.activeKbdHandler = _cameraKbdHandlerService;
    console.log(`KbdHandlerRouterService.ctor: activeKbdHandler.name=${this.activeKbdHandler.name}`);
    this.toggleKey = 'T'.charCodeAt(0);
   }

  // Note: defunct
  // keyHandler(event: KeyboardEvent, clientArtifact?: any) {
  //   // this.cameraKbdHandlerService.keyHandler(event, clientArtifact);
  //   this.kbdHandler.keyHandler(event, clientArtifact);
  // }

  // keyEventHandler(event: KeyboardEvent, clientArtifact?: any) {
  keyEventHandler(event: KeyboardEvent) {
    // debugger;
    console.log(`event.keyCode=${event.keyCode}`);
    if(event.keyCode = this.toggleKey) {
      console.log(`keyEventHandler: activeKbdHandler=${this.activeKbdHandler}`);
      console.log(`keyEventHandler: activeKbdHandler.name=${this.activeKbdHandler.name}`);
      switch (this.activeKbdHandler._name) {
        case('cameraKbdHandler') :
          // this._asteroidsKbdHandler = 
          //   (typeof this._asteroidsKbdHandler !== undefined) ? this._asteroidsKbdHandler : new AsteroidsKbdHandler();
          console.log(`typeof this._asteroidsKbdHandler=${this._asteroidsKbdHandler}`);
          if (typeof this._asteroidsKbdHandler === 'undefined') {
            console.log('hi');
            this._asteroidsKbdHandler = new AsteroidsKbdHandler();
          }
          console.log(`keyEventHandler: asteroidsKbdHandler=${this._asteroidsKbdHandler}`);
          this.activeKbdHandler = this._asteroidsKbdHandler;
        break;
        case('asteroidsKbdHandler') :
          this._cameraKbdHandler ? true : new CameraKbdHandlerService();
          this.activeKbdHandler = this._cameraKbdHandler;
        break;
      }
    }

    // this.activeKbdHandler.keyEventHandler(event);
  }

  // Getters and Setters
  get cameraKbdHandlerService(): CameraKbdHandlerService {
    return this._cameraKbdHandlerService;
  };

  get activeKbdHandler() {
    return this._activeKbdHandler;
  }
  set activeKbdHandler( kbdh: KbdHandler) {
    this._activeKbdHandler = kbdh;
  }

  get toggleKey() {
    return this._toggleKey;
  }
  set toggleKey( key: number) {
    this._toggleKey = key;
  }
}
