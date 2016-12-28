/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsKbdHandler } from './asteroids-kbd-handler';
import { Ship } from './ship'
// import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game'
import { AsteroidsGame } from './asteroids-game'
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

describe('Class: AsteroidsKbdHandler', () => {
  
  // let base : BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsteroidsKbdHandler, 
        Ship, 
        // AsteroidsGameProvider, 
        AsteroidsGame, 
        ThreeJsSceneProvider, 
        BaseService,
        UtilsService
        ]
    });
    this.base = new BaseService();
  });

  it('should ..', inject([
    AsteroidsKbdHandler, 
    // AsteroidsGameProvider, 
    // ThreeJsSceneProvider, 
    // Ship, 
    // BaseService
    ], (service: AsteroidsKbdHandler) => {
    expect(service).toBeTruthy();
    expect(service.keyEventHandler).toBeTruthy();
    expect(service.ship).toBeTruthy();
    expect(service.asteroidsGame).toBeTruthy();
    expect(service.utils).toBeTruthy();
    // expect(service.bullet).toBeTruthy();
  }));

  it('keyHandler A and D should work', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    // let ship :  Ship = new Ship();
    let ship = service.ship;

    ship.vx = 0.5;
    // ship.vTheta = this.base.ONE_DEG * 10.0;
    // ship.vScalar = 1.0;
    Object.defineProperty(event, 'keyCode', {'value': 68});

    let startPos = ship.mesh.position.x;
    let startVx = ship.vx;
    // service.keyHandler(event, <THREE.Object3D>ship.mesh);
    // service.keyEventHandler(event, ship);
    service.keyEventHandler(event);

    // expect(ship.mesh.position.x).toEqual(startPos + ship.vx);
    // expect(ship.vx).toEqual(startVx + ship.deltaVx);
    expect(ship.vx).toBeCloseTo(startVx + ship.deltaVx);
  }));

  it('keyHandler W and S should move up and down', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let ship = service.ship;

    ship.vy = 0.5;
    Object.defineProperty(event, 'keyCode', {'value': 'W'.charCodeAt(0)});

    // let startPos = ship.mesh.position.x;
    let startVel = ship.vel;
    service.keyEventHandler(event);

    // expect(ship.vy).toEqual(startVy + ship.deltaVy);
    expect(ship.vel).toEqual(startVel + ship.deltaVel);
  }));

  it('keyHandler Q and E should rotate the ship', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let ship = service.ship;

    ship.vTheta = 0.0;
    Object.defineProperty(event, 'keyCode', {'value': 'Q'.charCodeAt(0)});

    let startTheta = ship.vTheta;
    service.keyEventHandler(event);

    expect(ship.vTheta).toEqual(startTheta + ship.deltaTheta);
  }));

  it('keyHandler space should fire a bullet', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let bulletsOrigLength = service.asteroidsGame.bullets.length;
    let sceneOrigLength = service.asteroidsGame.scene.children.length;

    // Object.defineProperty(event, 'keyCode', {'value': ' '.charCodeAt(0)});
    Object.defineProperty(event, 'keyCode', {'value': 'J'.charCodeAt(0)});

    // let startTheta = ship.theta;
    service.keyEventHandler(event);

    // let bulletsNew = service.asteroidsGame.bullets;
    expect(service.asteroidsGame.bullets.length).toEqual(bulletsOrigLength + 1);
    // it should also add it to the scene
    // console.log(`ut: bulletsOrigLength=${bulletsOrigLength}`);
    // console.log(`ut: scene=${service.asteroidsGame.scene}`);
    expect(service.asteroidsGame.scene.children.length).toEqual(sceneOrigLength + 1);
  }));
});
