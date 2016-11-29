import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { KbdHandler } from '../../interfaces/kbd-handler';

@Injectable()
export class AsteroidsKbdHandler implements KbdHandler {

  _name : string = 'asteroidsKbdHandler';

  constructor() { }

  keyHandler (event: KeyboardEvent, ship: Ship) {

    switch( event.keyCode) {
      case 'D'.charCodeAt(0):
      console.log('you pressed d');
      //this.dolly.position.x += this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(ship.vx);
      ship.vx += ship.deltaVx;
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${ship.vx}`);
      //console.log('this.dolly.postion.x=' + this.dolly.position.x);
      break;

      case 'A'.charCodeAt(0):
      console.log('you pressed a');
      //this.dolly.position.x -= this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * -this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(-ship.vx);
      ship.vx -= ship.deltaVx;
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${ship.vx}`);

      break;

    }
  }

  get name() {
    return this._name;
  }
}
