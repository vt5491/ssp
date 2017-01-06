/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Asteroid } from './asteroid';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';
import { ParmsService } from '../../services/parms.service';

describe('Class: Asteroids', () => {

  // let jsObjectProvider = {
  //   provide: Object,
  //   useFactory: () => {
  //     return new Object();
  //   },
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [Asteroid, BaseService, UtilsService, ObjectService]
      // providers: [Asteroid, BaseService, UtilsService, ParmsService]
      providers: [Asteroid, BaseService, UtilsService]
    });
  });

  it('ctor with no parms should work properly', inject([BaseService, UtilsService], 
    (base: BaseService, utils : UtilsService) => {
    // let asteroid = new Asteroid(base, utils, <any> new Object());
    // note how we do not pass the parmsService
    let asteroid = new Asteroid(base, utils); 
    // let asteroid = new Asteroid(base, utils, objectService.object);
    console.log(`ut: hello b`);

    // let asteroid = new Asteroid(base, utils);
    expect(asteroid).toBeTruthy();
    expect(asteroid.vx).toBeTruthy();
    expect(asteroid.geom).toBeTruthy();
    expect(asteroid.updatePos).toBeTruthy();
    expect(asteroid.base).toBeTruthy();
    expect(asteroid.utils).toBeTruthy();
    expect(asteroid.mesh.position.z).toEqual(0);
    expect(asteroid.bBox).toBeTruthy();
    expect(asteroid.width).toBeTruthy();
    expect(asteroid.height).toBeTruthy();
    expect(asteroid.tag).toEqual('asteroid');
    expect(asteroid.lifeCycleStage).toEqual(0);
    expect(asteroid.DEFAULT_WIDTH).toBeTruthy();
    expect(asteroid.DEFAULT_HEIGHT).toBeTruthy();
    expect(Object.keys(asteroid.parms).length).toEqual(0);
    expect(asteroid.parms.constructor).toEqual(Object);
    // expect(Object.keys(asteroid.parms).length).toEqual(0);
    expect(asteroid.LIFECYLE_SCALE_FACTOR).toBeTruthy(); 
  }));

});

// we need a separte describe to test a ctor with parms, because the beforeEach
// block has to be different
describe ('Class: Asteroids with parms', () => {

  let parmsServiceProvider = {
    provide : ParmsService,
    useFactory : () => {
      return new ParmsService({width : 1, height : 2})
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Asteroid, BaseService, UtilsService, parmsServiceProvider]
      // providers: [Asteroid, BaseService, UtilsService]
    });
  });

  it('ctor with parms should work properly', inject([Asteroid], (asteroid : Asteroid) => {
    expect(Object.keys(asteroid.parms).length).toEqual(2);
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

  it('collisionTest should work properly', inject([Asteroid], (asteroid: Asteroid) => {
    let result : boolean;

    let ast_x = asteroid.mesh.position.x;
    let ast_y = asteroid.mesh.position.y;
    let ast_z = asteroid.mesh.position.z;

    result = asteroid.collisionTest(new THREE.Vector3(ast_x, ast_y, ast_z));
    expect(result).toEqual(true);

    result = asteroid.collisionTest(new THREE.Vector3(ast_x + 2 * asteroid.width, ast_y, ast_z));
    expect(result).toEqual(false);

    // let's move the asteroid to a sample game position
    asteroid.mesh.position.x = 10.0;
    ast_x = asteroid.mesh.position.x;

    result = asteroid.collisionTest(new THREE.Vector3(ast_x, ast_y, ast_z));
    expect(result).toEqual(true);

    result = asteroid.collisionTest(new THREE.Vector3(ast_x + asteroid.width * 2, ast_y, ast_z));
    expect(result).toEqual(false);
  }));

  it('collisionHandler should work properly', inject([Asteroid], (asteroid: Asteroid) => {
    let result = asteroid.collisionHandler();

    expect(asteroid.width).toEqual(1 * asteroid.LIFECYLE_SCALE_FACTOR);

    expect(result.tag).toEqual('asteroid');
    expect(result.vy).toEqual(-asteroid.vy);

  }));
});