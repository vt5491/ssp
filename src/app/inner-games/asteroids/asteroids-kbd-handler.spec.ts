/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsKbdHandler } from './asteroids-kbd-handler';
import { Ship } from './ship'

describe('Class: AsteroidsKbdHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsKbdHandler, Ship]
    });
  });

  it('should ...', inject([AsteroidsKbdHandler, Ship], (service: AsteroidsKbdHandler) => {
    expect(service).toBeTruthy();
    expect(service.keyEventHandler).toBeTruthy();
    // expect(service.ship).toBeTruthy();
  }));

  it('keyHandler should work', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    console.log(`ut:asteroids-kbd-handler: hello`);
    let event : KeyboardEvent =  <KeyboardEvent>{};
    // let ship :  Ship = new Ship();
    let ship = service.ship;

    ship.vx = 0.5;
    console.log(`ut:asteroids-kbd-handler: ship.mesh=${ship.mesh}`);
    // ship.mesh = {};
    // ship.mesh.position = {};
    // ship.mesh.postion.x = 0;

    // event.keyCode = 'D'.charCodeAt(0);
    // event.keyCode = 68;
    Object.defineProperty(event, 'keyCode', {'value': 68});

    let startPos = ship.mesh.position.x;
    let startVx = ship.vx;
    // service.keyHandler(event, <THREE.Object3D>ship.mesh);
    // service.keyEventHandler(event, ship);
    service.keyEventHandler(event);

    // expect(ship.mesh.position.x).toEqual(startPos + ship.vx);
    expect(ship.vx).toEqual(startVx + ship.deltaVx);
  }));
});
