///<reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { KbdHandler } from '../interfaces/kbd-handler';

@Injectable()
export class CameraKbdHandlerService implements KbdHandler {
  // static CAMERA_MOVE_DELTA = 1.2;
  // static CAMERA_ROT_DELTA = 5;
  CAMERA_MOVE_DELTA : number = 1.2;
  CAMERA_ROT_DELTA : number = 5;

  _name : string = 'cameraKbdHandler';

  constructor(public base : BaseService ) {}

  keyHandler (event: KeyboardEvent, dolly: THREE.Object3D) {
    console.log(`CameraKbdHandlerService.keyHandler: entered`);
    console.log(`CameraKbdHandlerService.keyHandler: event=${event}, dolly=${dolly}`);

    let moveFactor = 1.0;
    switch( event.keyCode) {
      case 'W'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.z -= this.CAMERA_MOVE_DELTA;
        dolly.translateZ(moveFactor * -this.CAMERA_MOVE_DELTA);
        //console.log('this.do-ly.postion.x=' + this.dolly.position.x);
      break;

      case 'S'.charCodeAt(0):
        // console.log('you pressed s');
        //dolly.position.z += CAMERA_MOVE_DELTA;
        dolly.translateZ(moveFactor * this.CAMERA_MOVE_DELTA);
        // console.log('dolly.postion.x=' + dolly.position.x);
      break;

      case 'D'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.x += this.CAMERA_MOVE_DELTA;
        dolly.translateX(moveFactor * this.CAMERA_MOVE_DELTA);
        //console.log('this.dolly.postion.x=' + this.dolly.position.x);
      break;

      case 'A'.charCodeAt(0):
        //this.dolly.position.x -= this.CAMERA_MOVE_DELTA;
        dolly.translateX(moveFactor * -this.CAMERA_MOVE_DELTA);
      break;

      case 'P'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.y += this.CAMERA_MOVE_DELTA;
        //console.log('this.dolly.postion.x=' + this.dolly.position.x);
        dolly.translateY(moveFactor * this.CAMERA_MOVE_DELTA);
      break;

      case 'N'.charCodeAt(0):
        //this.dolly.position.y -= this.CAMERA_MOVE_DELTA;
        dolly.translateY(moveFactor * -this.CAMERA_MOVE_DELTA);
      break;

      case 'Q'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * this.CAMERA_ROT_DELTA);
        dolly.quaternion.multiply(tmpQuat);
      break;

      case 'E'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * -this.CAMERA_ROT_DELTA);
        dolly.quaternion.multiply(tmpQuat);
      break;
    }
  }

  // // Getters and Setters
  // get sspTorusSceneService(): SspTorusSceneService {
  //   return this._sspTorusSceneService;
  // };
}
