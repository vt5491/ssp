/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsteroidsKbdHandler } from './asteroids-kbd-handler';
import { Ship } from './ship'

fdescribe('Class: AsteroidsKbdHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsteroidsKbdHandler]
    });
  });

  it('should ...', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    expect(service).toBeTruthy();
  }));

  it('keyHandler should work', inject([AsteroidsKbdHandler], (service: AsteroidsKbdHandler) => {
    console.log(`ut:asteroids-kbd-handler: hello`);
    let event : KeyboardEvent =  <KeyboardEvent>{};
    let ship :  Ship = new Ship();

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
    service.keyHandler(event, ship);

    // expect(ship.mesh.position.x).toEqual(startPos + ship.vx);
    expect(ship.vx).toEqual(startVx - ship.deltaVx);
  }));
});
