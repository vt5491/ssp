/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Asteroid } from './asteroid';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

describe('Class: Asteroids', () => {
  beforeEach(() => {
      console.log(`ut: hello a`);
    TestBed.configureTestingModule({
      providers: [Asteroid, BaseService, UtilsService]
    });
  });

  // it('should ...', inject([SspTorusRuntimeService], 
  //   (service: SspTorusRuntimeService) => {
  //   expect(service).toBeTruthy();
  // }));
  // xit('ctor should be initialized properly', inject([
  //   BaseService, UtilsService], 
  //   (base : BaseService, utils : UtilsService ) => {
  it('ctor should work properly', inject([Asteroid], (asteroid: Asteroid) => {
    console.log(`ut: hello b`);

    // let asteroid = new Asteroid(base, utils);
    expect(asteroid).toBeTruthy();
    expect(asteroid.vx).toBeTruthy();
    expect(asteroid.geom).toBeTruthy();
    expect(asteroid.updatePos).toBeTruthy();
    expect(asteroid.base).toBeTruthy();
    expect(asteroid.utils).toBeTruthy();
  }));

  it('updatePos should work properly', inject([Asteroid], (asteroid: Asteroid) => {
    asteroid.vx = 1.0;
    asteroid.vy = 0.0;
    asteroid.mesh.position.x = 0;
    asteroid.mesh.position.y = 0;

    let initPosX = asteroid.mesh.position.x;
    let initPosY = asteroid.mesh.position.y;

    asteroid.updatePos();

    let newPosX = asteroid.mesh.position.x;
    let newPosY = asteroid.mesh.position.y;

    expect(newPosX).toEqual(initPosX + 1.0);
    expect(newPosY).toEqual(initPosY);

  }));
});