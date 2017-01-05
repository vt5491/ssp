/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Ship } from './ship';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

describe('Service: Ship', () => {
  let base = new BaseService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ship, BaseService, UtilsService]
    });
  });

  it('ctor works', inject([Ship], (ship: Ship) => {
    expect(ship).toBeTruthy();
    // expect(ship.vx).toBeDefined();
    expect(ship.geom).toBeDefined();
    expect(ship.mat).toBeDefined();
    expect(ship.accelScalar).toBeDefined();
    // expect(ship.theta).toBeDefined();
    expect(ship.thrust).toBeTruthy();
    expect(ship.updatePos).toBeTruthy();
    expect(ship.mesh.position.z).toEqual(0);
    expect(ship.tag).toEqual('ship');
  }));

  it('thrust works', inject([Ship], (ship: Ship) => {
    // 0 deg
    initShip_0(ship);

    ship.thrust();

    expect(ship.vx).toBeCloseTo(1.0);
    expect(ship.vy).toBeCloseTo(0.0);
    
    // 45 deg
    initShip_45(ship);

    ship.thrust();

    expect(ship.vx).toBeCloseTo(Math.cos(Math.PI / 4.0));
    expect(ship.vy).toBeCloseTo(Math.sin(Math.PI / 4.0));

    // 90 deg
    initShip_90(ship);

    ship.thrust();

    expect(ship.vx).toBeCloseTo(0.0);
    expect(ship.vy).toBeCloseTo(1.0);

    // 180 deg
    initShip_180(ship);

    ship.thrust();

    expect(ship.vx).toBeCloseTo(-1.0);
    expect(ship.vy).toBeCloseTo(0.0);

    // 0 deg w/ previous value
    initShip_0(ship);
    ship.vx = 10.0;
    ship.vy = 10.0;;

    ship.thrust();

    expect(ship.vx).toBeCloseTo(11.0);
    expect(ship.vy).toBeCloseTo(10.0);
  }));

  it('updatePos works', inject([Ship], (ship: Ship) => {
    initShip_0(ship);
    console.log(`ut: initPos.x (a)=${ship.mesh.position.x}`);
    ship.vx = 1.0;
    console.log(`ut: initPos.x (b)=${ship.mesh.position.x}`);

    let initPosX = ship.mesh.position.x;
    let initPosY = ship.mesh.position.y;

    ship.updatePos();

    let newPos = ship.mesh.position;

    console.log(`ut: mesh.position.x=${ship.mesh.position.x}`);
    // console.log(`ut: initPos.x=${initPos.x}`);
    console.log(`ut: newPos.x=${newPos.x}`);

    expect(newPos.x).toEqual(initPosX + 1.0);
    expect(newPos.y).toEqual(initPosY);
  }));

  // helper methods
  let initShip_0 = (ship) => {
    // init ship with "0" test values
    ship.theta = 0.0; 
    ship.accelScalar = 1.0;
    ship.vx = 0.0;
    ship.vy = 0.0;
    ship.mesh.position.x = 0.0;
    ship.mesh.position.y = 0.0;
  }

  let initShip_45 = (ship) => {
    // init ship with "45 deg" test values
    ship.theta = base.ONE_DEG * 45.0; 
    ship.accelScalar = 1.0;
    ship.vx = 0.0;
    ship.vy = 0.0;
    ship.mesh.position.x = 0.0;
    ship.mesh.position.y = 0.0;
  }

  let initShip_90 = (ship) => {
    // init ship with "90 deg" test values
    ship.theta = base.ONE_DEG * 90.0; 
    ship.accelScalar = 1.0;
    ship.vx = 0.0;
    ship.vy = 0.0;
  }

  let initShip_180 = (ship) => {
    // init ship with "180 deg" test values
    ship.theta = base.ONE_DEG * 180.0; 
    ship.accelScalar = 1.0;
    ship.vx = 0.0;
    ship.vy = 0.0;
  }
});
