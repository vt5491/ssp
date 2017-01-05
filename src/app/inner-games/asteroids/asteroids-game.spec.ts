/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
// import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game';
import { AsteroidsGame } from './asteroids-game';
import { Ship } from './ship';
import { Bullet } from './bullet';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';
// import { SspTorusRuntimeService } from './ssp-torus-runtime.service';
// import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Class: AsteroidsGame', () => {
  let base = new BaseService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [SspTorusRuntimeService, VRSceneServiceProvider]
      providers: [AsteroidsGame, ThreeJsSceneProvider, 
        Ship, Bullet, BaseService, UtilsService]
      // providers: [ThreeJsSceneProvider, Ship, BaseService]
    });
  });

  it('AsteroidsGame is initialized properly', inject([AsteroidsGame], 
    (asteroidsGame: AsteroidsGame) => {
    expect(asteroidsGame).toBeTruthy();
    expect(asteroidsGame.scene).toBeTruthy();
    expect(asteroidsGame.bullets).toBeTruthy();
    expect(asteroidsGame.base).toBeTruthy();
    expect(asteroidsGame.getMainCharacterInfo).toBeTruthy();
    expect(asteroidsGame.initAsteroids).toBeTruthy();
    expect(asteroidsGame.utils).toBeTruthy();
  }));

  // it('initScene workds', inject([AsteroidsGame], (asteroidsGameProvider))
  it('initScene works properly', inject([AsteroidsGame], 
    (asteroidsGame: AsteroidsGame) => {
      // console.log(`ut:asteroids-game: asteroidGame=${asteroidsGame}`);
      asteroidsGame.initScene();
      expect(asteroidsGame.asteroids.length).toBeGreaterThan(0);
      expect(asteroidsGame.scene.children.length).toBeGreaterThan(0);
    // expect(asteroidsGame).toBeTruthy();
    // expect(asteroidsGame.scene).toBeTruthy();
  }));

  it('should repsond to bullet fired events properly', inject([AsteroidsGame, BaseService], 
    (ag: AsteroidsGame, base: BaseService) => {
      // ag.ship.vx = 1.0;
      // ag.ship.vy = 2.0;
      ag.ship.theta = base.ONE_DEG * 45.0; 
      ag.ship.vScalar = 1.0;
      ag.ship.mesh.position.x = 5.0;
      ag.ship.mesh.position.y = -4.0;

      ag.shipFiredBullet();

      expect(ag.bullets.length).toEqual(1);
      let bullet = ag.bullets[0];
      // bullet should be heading in same dir as the ship
      // expect(bullet.vx / bullet.vy).toBeCloseTo( ag.ship.vx / ag.ship.vy); 
      expect(Math.atan(bullet.vy / bullet.vx)).toBeCloseTo( ag.ship.theta); 

      // bullet pos should be the same as ship initially
      expect(bullet.mesh.position.x).toEqual(ag.ship.mesh.position.x);
      expect(bullet.mesh.position.y).toEqual(ag.ship.mesh.position.y);
  }));

  // it('should repsond to bullet fired events properly', inject([AsteroidsGame], 
  //   (ag: AsteroidsGame) => {
  //     ag.bullets.push(;
  //     ag.ship.vy = 2.0;

  //     ag.shipFiredBullet();

  //     expect(ag.bullets.length).toEqual(1);
  //     let bullet = ag.bullets[0];
  //     // bullet should be heading in same dir as the ship
  //     expect(bullet.vx / bullet.vy).toBeCloseTo( ag.ship.vx / ag.ship.vy); 
  // }));
  it('updateScene properly removes bullets that are end of life', 
    inject([AsteroidsGame, BaseService], 
    (ag: AsteroidsGame, base : BaseService) => {

      let b1 = new Bullet(base);
      b1.ttl = 1;
      ag.bullets[0] = b1;
      
      let b2 = new Bullet(base);
      b2.ttl = 10;
      ag.bullets[1] = b2;

      expect(ag.bullets.length).toEqual(2);

      ag.updateScene();

      expect(ag.bullets.length).toEqual(1);
      expect(ag.bullets[0].ttl).toEqual(9);
  }));

  it('getMainCharacterInfo works as expected', inject([AsteroidsGame], 
    (ag: AsteroidsGame) => {
      let result = ag.getMainCharacterInfo();

      expect(result.pos).toBeTruthy();
  }));

  it('shipThrust works as expected', inject([AsteroidsGame], 
    (astGame: AsteroidsGame) => {
      let result = astGame.shipThrust();

      expect(astGame.ship.vx).toBeCloseTo(0.0, 5);
      expect(astGame.ship.vy).toEqual(astGame.ship.accelScalar);
  }));

  it('initAsteroids works as expected', inject([AsteroidsGame], 
    (astGame: AsteroidsGame) => {
      let result = astGame.initAsteroids();

      expect(astGame.asteroids.length).toEqual(astGame.seedAsteroidCount);
      let ast_0 = astGame.asteroids[0];

      expect(ast_0.mesh.position.x).toBeDefined();
      expect(ast_0.mesh.position.y).toBeDefined();

      expect(ast_0.vx).toBeDefined();
      expect(ast_0.vy).toBeDefined();

      // validate position is between bounds
      let boundVal = base.projectionBoundary;
      expect(ast_0.mesh.position.x).not.toBeLessThan(-boundVal);
      // expect(ast_0.mesh.position.x).toBeGreaterThanOrEqual(-boundVal);
      expect(ast_0.mesh.position.x).not.toBeGreaterThan(boundVal);
  }));
  
  it('bulletCollisionCheck works as expected', inject([AsteroidsGame], 
    (astGame: AsteroidsGame) => {
      let result = [];

      let b1 = new Bullet( new BaseService());
      // create a bullet that has the same pos as asteroids[0]
      let ast_0 = astGame.asteroids[0]
      b1.mesh.position.x = ast_0.mesh.position.x;
      b1.mesh.position.y = ast_0.mesh.position.y;
      b1.mesh.position.z = ast_0.mesh.position.z;

      astGame.bullets.push(b1); 

      let b2 = new Bullet( new BaseService());
      // create a bullet that has a different pos from asteroids[1]
      let ast_1 = astGame.asteroids[1]
      b2.mesh.position.x = ast_1.mesh.position.x + 5;
      b2.mesh.position.y = ast_1.mesh.position.y;
      b2.mesh.position.z = ast_1.mesh.position.z;

      astGame.bullets.push(b2); 

      result = astGame.bulletCollisionCheck();

      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain(ast_0);
      expect(result).not.toContain(ast_1);
  }));

});