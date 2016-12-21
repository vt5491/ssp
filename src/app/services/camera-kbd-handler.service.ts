///<reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { KbdHandler } from '../interfaces/kbd-handler';
import { UtilsService } from './utils.service';

@Injectable()
export class CameraKbdHandlerService implements KbdHandler {
  // static CAMERA_MOVE_DELTA = 1.2;
  // static CAMERA_ROT_DELTA = 5;
  CAMERA_MOVE_DELTA : number = 1.2;
  CAMERA_ROT_DELTA : number = 5;

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

  // keyEventHandler (event: KeyboardEvent, dolly: THREE.Object3D) {
  keyEventHandler (event: KeyboardEvent) {
    // console.log(`CameraKbdHandlerService.keyHandler: entered`);
    // console.log(`CameraKbdHandlerService.keyHandler: event=${event}, dolly=${this.dolly}`);
    event.preventDefault();

    let moveFactor = 1.0;
    switch( event.keyCode) {
      case 'W'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.z -= this.CAMERA_MOVE_DELTA;
        this.dolly.translateZ(moveFactor * -this.CAMERA_MOVE_DELTA);
        //console.log('this.do-ly.postion.x=' + this.this.dolly.position.x);
        this.deltaZ -= moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'S'.charCodeAt(0):
        // console.log('you pressed s');
        //dolly.position.z += CAMERA_MOVE_DELTA;
        this.dolly.translateZ(moveFactor * this.CAMERA_MOVE_DELTA);
        // console.log('dolly.postion.x=' + dolly.position.x);
        this.deltaZ += moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'D'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.x += this.CAMERA_MOVE_DELTA;
        this.dolly.translateX(moveFactor * this.CAMERA_MOVE_DELTA);
        //console.log('this.dolly.postion.x=' + this.dolly.position.x);
        this.deltaX += moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'A'.charCodeAt(0):
        //this.dolly.position.x -= this.CAMERA_MOVE_DELTA;
        this.dolly.translateX(moveFactor * -this.CAMERA_MOVE_DELTA);
        this.deltaX -= moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'P'.charCodeAt(0):
        //console.log('you pressed s');
        //this.dolly.position.y += this.CAMERA_MOVE_DELTA;
        //console.log('this.dolly.postion.x=' + this.dolly.position.x);
        this.dolly.translateY(moveFactor * this.CAMERA_MOVE_DELTA);
        this.deltaY += moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'N'.charCodeAt(0):
        //this.dolly.position.y -= this.CAMERA_MOVE_DELTA;
        this.dolly.translateY(moveFactor * -this.CAMERA_MOVE_DELTA);
        this.deltaY -= moveFactor * this.CAMERA_MOVE_DELTA;
      break;

      case 'Q'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * this.CAMERA_ROT_DELTA);
        this.dolly.quaternion.multiply(tmpQuat);
      break;

      case 'E'.charCodeAt(0):
        var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle( new THREE.Vector3(0,1,0), this.base.ONE_DEG * -this.CAMERA_ROT_DELTA);
        this.dolly.quaternion.multiply(tmpQuat);
      break;

      // // ctrl-t : toggle camera tracking
      // case 'T'.charCodeAt(0):
      //   if (event.ctrlKey) {
      //     this.utils.parms.enableCameraTracking = !this.utils.parms.enableCameraTracking;
      //   }
      // break;
      case 'Z'.charCodeAt(0):
        this.utils.parms.enableCameraTracking = !this.utils.parms.enableCameraTracking;
      break;
    }
  }

  // // Getters and Setters
  // get sspTorusSceneService(): SspTorusSceneService {
  //   return this._sspTorusSceneService;
  // };
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
