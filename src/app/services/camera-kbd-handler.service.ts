///<reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { KbdHandler } from '../interfaces/kbd-handler';
import { UtilsService } from './utils.service';

@Injectable()
export class CameraKbdHandlerService implements KbdHandler {
  // CAMERA_MOVE_DELTA : number = 1.2;
  // CAMERA_ROT_DELTA : number = 5;

  _name : string = 'cameraKbdHandler';
  // Note: we can't rely on DI to get this for us, as, in the most general
  // case, it's really only the runtime client that can say what is the best value
  _dolly : THREE.Object3D;
  deltaX : number = 0.0;
  deltaY : number = 0.0;
  deltaZ : number = 0.0;

  constructor(public base : BaseService, public utils: UtilsService ) {
    this.name = 'cameraKbdHandler';
  }

  keyEventHandler (event: KeyboardEvent) {
    // event.preventDefault();

    let moveFactor = 1.0;
    switch( event.keyCode) {
      case 'W'.charCodeAt(0):
        this.dolly.translateZ(moveFactor * -this.base.CAMERA_MOVE_DELTA);
        this.deltaZ -= moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'S'.charCodeAt(0):
        this.dolly.translateZ(moveFactor * this.base.CAMERA_MOVE_DELTA);
        this.deltaZ += moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'D'.charCodeAt(0):
        this.dolly.translateX(moveFactor * this.base.CAMERA_MOVE_DELTA);
        this.deltaX += moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'A'.charCodeAt(0):
        this.dolly.translateX(moveFactor * -this.base.CAMERA_MOVE_DELTA);
        this.deltaX -= moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'P'.charCodeAt(0):
        this.dolly.translateY(moveFactor * this.base.CAMERA_MOVE_DELTA);
        this.deltaY += moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'N'.charCodeAt(0):
        this.dolly.translateY(moveFactor * -this.base.CAMERA_MOVE_DELTA);
        this.deltaY -= moveFactor * this.base.CAMERA_MOVE_DELTA;
      break;

      case 'Q'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * this.base.CAMERA_ROT_DELTA);
        this.dolly.quaternion.multiply(tmpQuat);
      break;

      case 'E'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * -this.base.CAMERA_ROT_DELTA);
        this.dolly.quaternion.multiply(tmpQuat);
      break;

      case 'Z'.charCodeAt(0):
        this.utils.parms.enableCameraTracking = !this.utils.parms.enableCameraTracking;
      break;
    }
  }

  // // Getters and Setters
  get name() {
    return this._name;
  }
  set name(newName : string) {
    this._name = newName;
  }
  get dolly() {
    return this._dolly;
  }
  set dolly(newDolly : THREE.Object3D) {
    this._dolly = newDolly;
  }
}
