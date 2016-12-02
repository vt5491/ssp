/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsKbdHandler } from './asteroids-kbd-handler';
import { Ship } from './ship'
import { BaseService } from '../../services/base.service';

describe('Class: AsteroidsKbdHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsKbdHandler, Ship, BaseService]
    });
  });

  it('should ...', inject([AsteroidsKbdHandler, Ship], (service: AsteroidsKbdHandler) => {
    expect(service).toBeTruthy();
    expect(service.keyEventHandler).toBeTruthy();
    // expect(service.ship).toBeTruthy();
  }));

  it('keyHandler A and D should work', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    // let ship :  Ship = new Ship();
    let ship = service.ship;

    ship.vx = 0.5;
    Object.defineProperty(event, 'keyCode', {'value': 68});

    let startPos = ship.mesh.position.x;
    let startVx = ship.vx;
    // service.keyHandler(event, <THREE.Object3D>ship.mesh);
    // service.keyEventHandler(event, ship);
    service.keyEventHandler(event);

    // expect(ship.mesh.position.x).toEqual(startPos + ship.vx);
    expect(ship.vx).toEqual(startVx + ship.deltaVx);
  }));

  it('keyHandler W and S should move up and down', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let ship = service.ship;

    ship.vy = 0.5;
    Object.defineProperty(event, 'keyCode', {'value': 'W'.charCodeAt(0)});

    // let startPos = ship.mesh.position.x;
    let startVy = ship.vy;
    service.keyEventHandler(event);

    expect(ship.vy).toEqual(startVy + ship.deltaVy);
  }));

  it('keyHandler Q and E should rotate the ship', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let ship = service.ship;

    ship.theta = 0.0;
    Object.defineProperty(event, 'keyCode', {'value': 'Q'.charCodeAt(0)});

    let startTheta = ship.theta;
    service.keyEventHandler(event);

    expect(ship.theta).toEqual(startTheta + ship.deltaTheta);
  }));
});
