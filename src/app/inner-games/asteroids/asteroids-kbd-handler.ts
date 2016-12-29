import { Injectable } from '@angular/core';
import { Ship } from './ship';
// import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game';
import { AsteroidsGame } from './asteroids-game';
import { Bullet } from './bullet';
import { KbdHandler } from '../../interfaces/kbd-handler';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

@Injectable()
export class AsteroidsKbdHandler implements KbdHandler {

  _name : string = 'asteroidsKbdHandler';
  // _ship : Ship;

  constructor(
    // private _ship : Ship,
    private _asteroidsGame : AsteroidsGame,
    // private _bullet : Bullet,
    private base : BaseService,
    public utils : UtilsService
  ) {
    this.name = 'asteroidsKbdHandler';
   }

  // keyEventHandler (event: KeyboardEvent, ship: Ship) {
  keyEventHandler (event: KeyboardEvent) {

    switch( event.keyCode) {
      //TODO: this module should just route to asteroids-game and do no low level manipulation
      // what this means is you need to get rid of the 'this.ship.vx = blah' code
      case 'D'.charCodeAt(0):
      // console.log('you pressed d');
      //this.dolly.position.x += this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(ship.vx);
      this.ship.vx += this.ship.deltaVx;
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${this.ship.vx}`);
      this.ship.mesh.translateX(this.ship.vx);
      //console.log('this.dolly.postion.x=' + this.dolly.position.x);
      break;

      case 'A'.charCodeAt(0):
      // console.log('you pressed a');
      //this.dolly.position.x -= this.CAMERA_MOVE_DELTA;
      // dolly.translateX(moveFactor * -this.CAMERA_MOVE_DELTA);
      // ship.mesh.translateX(-ship.vx);
      this.ship.vx -= this.ship.deltaVx;
      this.ship.mesh.translateX(this.ship.vx);
      console.log(`AsteroidsKbdHandler.keyHandler: new vx=${this.ship.vx}`);

      break;

      case 'W'.charCodeAt(0):
      // console.log('you pressed w');
      // this.ship.vy += this.ship.deltaVy;
      this.ship.vel += this.ship.deltaVel;

      break;

      case 'S'.charCodeAt(0):
      // console.log('you pressed s');
      // this.ship.vy -= this.ship.deltaVy;
      this.ship.vel -= this.ship.deltaVel;

      break;

      // rotate
      case 'Q'.charCodeAt(0):
      // console.log('you pressed q');
      this.ship.theta += this.ship.deltaTheta;

      break;

      case 'E'.charCodeAt(0):
      // console.log('you pressed e');
      this.ship.theta -= this.ship.deltaTheta;

      break;

      // bullet fire
      // case ' '.charCodeAt(0):
      // case 32:
      case ' '.charCodeAt(0):
        // console.log('you pressed <space>');
        this.asteroidsGame.shipFiredBullet();
      // let bullet = new Bullet();
      // this.asteroidsGame.bullets.push(bullet);
      // // this.ship.theta -= this.ship.deltaTheta;
      // console.log(`AsteroidsKbdHandler.keyEventHandler: scene.length pre=${this.asteroidsGame.scene.children.length}`);
      // console.log(`AsteroidsKbdHandler.keyEventHandler: asteroidsGame.id=${this.asteroidsGame.id}`);
      // this.asteroidsGame.scene.add(bullet.mesh);
      // console.log(`AsteroidsKbdHandler.keyEventHandler: scene.length post=${this.asteroidsGame.scene.children.length}`);

      break;

      case 'Z'.charCodeAt(0):
        this.utils.parms.enableCameraTracking = !this.utils.parms.enableCameraTracking;
      break;

      case 'J'.charCodeAt(0):
        this.asteroidsGame.shipThrust();
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
    return this.asteroidsGame.ship;
  }
  // set ship(newShip : Ship) {
  //   this._asteroidsGame.ship = newShip;
  // }
  get asteroidsGame() {
    return this._asteroidsGame;
  }
  // set ship(newShip : Ship) {
  //   this._ship = newShip;
  // }
  // get bullet() {
  //   return this.bullet;
  // }
  // set bullet(newBullet : Bullet) {
  //   this._bullet = newBullet;
  // }
}
