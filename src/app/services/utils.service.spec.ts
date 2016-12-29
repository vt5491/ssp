/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseService  } from './base.service';
import { UtilsService  } from './utils.service';
import { Asteroid } from '../inner-games/asteroids/asteroid';

describe('Service: Utils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService, BaseService, Asteroid]
    });
  });

  it('should ctor works', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
    expect(service.addControls).toBeTruthy();
    expect(service.datGUI).toBeTruthy();
    expect(service.parms).toBeTruthy();
    expect(service.updatePos).toBeTruthy();
  }));

  it('should updatePos works', inject([UtilsService, Asteroid], (service: UtilsService, asteroid : Asteroid) => {
    // we test with an asteroid, but it should work with any mesh object using
    // vx and vy.
    asteroid.vx = 1.0;
    asteroid.vy = 0.0;

    let initPosX = asteroid.mesh.position.x;
    let initPosY = asteroid.mesh.position.y;

    let boundVal = 4.0;
    service.updatePos(asteroid, boundVal);

    let newPosX = asteroid.mesh.position.x;
    let newPosY = asteroid.mesh.position.y;

    expect(newPosX).toEqual(initPosX + 1.0);
    expect(newPosY).toEqual(initPosY + 0.0);
  }));
});
