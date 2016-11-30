import { Injectable } from '@angular/core';
import { Ship } from './ship';
import { KbdHandler } from '../../interfaces/kbd-handler';

@Injectable()
export class AsteroidsKbdHandler implements KbdHandler {

  _name : string = 'asteroidsKbdHandler';
  _ship : Ship;

  constructor() {
    this.name = 'asteroidsKbdHandler';
   }

  // keyEventHandler (event: KeyboardEvent, ship: Ship) {
  keyEventHandler (event: KeyboardEvent) {

    switch( event.keyCode) {
      case 'D'.charCodeAt(0):
      console.log('you pressed d');
      //this.dolly.position.x += this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(ship.vx);
      this.ship.vx += this.ship.deltaVx;
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${this.ship.vx}`);
      //console.log('this.dolly.postion.x=' + this.dolly.position.x);
      break;

      case 'A'.charCodeAt(0):
      console.log('you pressed a');
      //this.dolly.position.x -= this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * -this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(-ship.vx);
      this.ship.vx -= this.ship.deltaVx;
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${this.ship.vx}`);

      break;

    }
  }

  get name() {
    return this._name;
  }
  set name(newName : string) {
    this._name = newName;
  }
  get ship() {
    return this._ship;
  }
}
