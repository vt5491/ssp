///<reference path="../../../../typings/index.d.ts" />
import { Component, Injectable, Injector } from '@angular/core';
import { Asteroid } from './asteroid';
import { Bullet } from './bullet';
import { Ship } from './ship';
import { InnerGame } from '../../interfaces/inner-game';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';
import { IMainCharacterInfo } from '../../interfaces/main-character-info';
import { IMoveableGameObject } from '../../interfaces/imoveable-game-object';

@Component({
  // providers: [ThreeJsSceneProvider, Ship]
})
@Injectable()
export class AsteroidsGame implements InnerGame {

  private _asteroids : Asteroid [] = [];
  private _bullets : Bullet [] = [];
  // private ship : THREE.Line;
  // private _ship : Ship;
  private _scene: THREE.Scene;
  private asteroidsDuration : number = 60000;
  private startTime : number = Date.now();
  id : number = Date.now();
  BOUND_VAL = 3.79;
  seedAsteroidCount : number = 4;

  constructor(
    // private _scene : THREE.Scene,
    // inject(_scene): ThreeJsSceneProvider,
    // private _scene = @inject.get(ThreeJsSceneProvider),
    // @Inject(CourseService) courseService: CourseService
    // @Inject(ThreeJsSceneProvider) _scene: THREE.Scene,
    // @Inject(THREE.Scene) _scene: THREE.Scene,
    private _ship : Ship,
    private _base : BaseService,
    private injector : Injector,
    private _utils : UtilsService
  ) {
    // I seem to have to manually inject THREE.Scene because it's a third-party Component
    // and I can't wrap it in @Ijnectable?
    this._scene = this.injector.get(THREE.Scene);
    // this.asteroids.push( new Asteroid());
    // this._scene = new THREE.Scene();
    this.base.projectionBoundary = this.BOUND_VAL;

    this.initScene();
  }

  initScene() {
    // this.asteroids.push( new Asteroid());
    // this.scene.add(this.asteroids[0].mesh);
    //
    // this.asteroids.push( new Asteroid());
    // this.asteroids[1].vx = 0.004;
    // this.asteroids[1].x = 1;
    // this.scene.add(this.asteroids[1].mesh);
    this.initAsteroids();
    // development hack to make asteroid 0 bigger so we can identify it visually
    // this.asteroids[0].mesh.geometry.
    this.asteroids[0].mesh.scale.x = 2.0;
    this.asteroids[0].mesh.geometry.computeBoundingBox();

    // this.scene.add(this.ship.lineMesh);
    this.scene.add(this.ship.mesh);

    // // add a GridHelper
    // let gridHelper = new THREE.GridHelper(90, 9);
    // gridHelper.rotateX(this.base.ONE_DEG * 45.0);
    // this.scene.add(gridHelper);
    // let gridGeom : THREE.Geometry = new THREE.Geometry();
    // Note: if you go beyond 16.0 it just gets truncated
    let gridXGeom = new THREE.PlaneBufferGeometry(16.0, 0.02);
    let gridYGeom = new THREE.PlaneBufferGeometry( 0.02, 16.0);
    // gridGeom.vertices.push(new THREE.Vector3(-this.BOUND_VAL, 0, 0));
    // gridGeom.vertices.push(new THREE.Vector3(this.BOUND_VAL, 0, 0));
    // gridGeom.vertices.push(new THREE.Vector3(-3, 0, 0));
    // gridGeom.vertices.push(new THREE.Vector3(3, 0, 0));
    // gridGeom.vertices.push(new THREE.Vector3(0, 3, 0));

    // let gridMat = new THREE.LineBasicMaterial({ linewidth: 2, side: THREE.DoubleSide});
    let gridMat = new THREE.MeshBasicMaterial({  side: THREE.DoubleSide});
    gridMat.color = new THREE.Color(200, 200, 200);

    let gridXMesh = new THREE.Mesh(gridXGeom, gridMat);
    gridXMesh.position.x = -3.0;
    gridXMesh.position.z = 0.0;

    let gridYMesh = new THREE.Mesh(gridYGeom, gridMat);
    gridYMesh.position.y = -3.0;
    gridYMesh.position.z = 0.0;

    this.scene.add(gridXMesh);
    this.scene.add(gridYMesh);
  };

  initAsteroids() {
    for (let i = 0; i < this.seedAsteroidCount; i++) {
      let asteroid = new Asteroid(this.base, this.utils);

      // set position between projection bounds
      let boundVal = this.base.projectionBoundary;

      asteroid.mesh.position.x = (boundVal * Math.random() * 2.0) - boundVal;
      asteroid.mesh.position.y = (boundVal * Math.random() * 2.0) - boundVal;

      // set velocity
      let asteroidTheta = 2.0 * Math.PI * Math.random();
      //TODO: parameterize the magic numbers
      asteroid.vx = Math.cos(asteroidTheta) * 0.004;
      asteroid.vy = Math.sin(asteroidTheta) * 0.004;

      this.asteroids[i] = asteroid;

      this.scene.add(asteroid.mesh);
    }
  }

  updateScene() {
    // 3.7 is a little short. 3.8 is a little long
    let boundVal = this.BOUND_VAL;
    // update asteroids
    for (let i = 0; i < this.asteroids.length; i++) {
      let asteroid = this.asteroids[i];

      asteroid.updatePos();
    }
    // update bullets
    // console.log(`AsteroidsGame.updateScene: bullets.length=${this.bullets.length}, asteroidsGame.id=${this.id}`);
    // for (let i = 0; i < this.bullets.length; i++) {
    this.updateBullets();
    // update ship

    // translate ship
    this.ship.updatePos();

    // rotate ship
    this.ship.rotate();

    // check for bullet collisions
    let hitObjects = this.bulletCollisionCheck();
    //
    // do beenHit action on each hitObject
    for (let i = 0; i < hitObjects.length; i++) {
        // hitObjects[i].vx = 0;
        // hitObjects[i].vy = 0;
        let hitObj = hitObjects[0];

        hitObj.collisionHandler();

        switch(hitObj.tag) {
          case 'asteroid':
            let splitAst = new Asteroid(this.base, this.utils);

            splitAst.mesh.position.x = hitObj.mesh.position.x;
            splitAst.mesh.position.y = hitObj.mesh.position.y;
            splitAst.mesh.position.z = hitObj.mesh.position.z;

            splitAst.vy = -hitObj.vy;

            this.asteroids.push(splitAst);

            this.scene.add(splitAst.mesh);

          break;
        }
    }
  };

  updateBullets() {
    // we have to work our way through the bullets array in reverse order because
    // the splicing can affect 'downstream' array maniuplation
    for (let i = this.bullets.length -1 ; i >=0; i--) {
      let bullet = this.bullets[i];

      bullet.update();

      // console.log(`AsteroidsGame.updateScene: i=${i}, bullet.ttl=${bullet.ttl}`)
      if (bullet.ttl <= 0) {
        // console.log(`AsteroidsGame.updateScene: now splicing bullet ${i}`);
        this.bullets.splice(i, 1);

        this.scene.remove(bullet.mesh);
      }
    };
  }

  // this is the main application level bullet handler.  We are called from asteroids-kbd-handler'
  shipFiredBullet() {
    // create a bullet with same direction as the ship is pointing to
    // note: we do not use injected Bullets because we don't want singletons
    let bullet = new Bullet(this.base);
    // bullet.vTheta = Math.atan(this.ship.vy / this.ship.vx);
    // bullet.vTheta = Math.atan2(this.ship.vy , this.ship.vx);
    bullet.vTheta = this.ship.theta;
    // console.log(`AsteroidsGame.shipFiredBullet: ship.vy=${this.ship.vy},ship.vx=${this.ship.vx}`);
    // console.log(`AsteroidsGame.shipFiredBullet: bullet.vTheta=${bullet.vTheta}`);

    let tmpVec = new THREE.Vector3();
    // initial pos is the same as the ship
    bullet.mesh.position.x = this.ship.mesh.position.x;
    // bullet.mesh.position.x = this.ship.mesh.geometry.vertices[0].x;
    // this.ship.mesh.getWorldPosition(tmpVec);
    // bullet.mesh.position.x = tmpVec.x;
    bullet.mesh.position.y = this.ship.mesh.position.y;
    // bullet.mesh.position.x = this.ship.mesh.geometry.vertices[0].y;
    // bullet.mesh.position.y = tmpVec.y;
    // this.ship.geom.vertices[0].x
    // bullet.mesh.position.x = this.ship.geom.vertices[0].x + this.ship.mesh.position.x;
    // bullet.mesh.position.y = this.ship.geom.vertices[0].y + this.ship.mesh.position.y;

    // add the mesh to the scene
    this.scene.add(bullet.mesh);

    // and add to the bullets array
    this.bullets.push(bullet);
  };

  shipThrust() {
    this.ship.thrust();
  }

  // getMainCharacterInfo() : <MainCharacterInfo> {} {
  // getMainCharacterInfo() : Object {
  // this returns info about the main user controlled screen avatar.  It can
  // can be used by the outer scene to change the position of the outer camera
  // to track the main inner object, for example.
  getMainCharacterInfo() : IMainCharacterInfo {
    let info = new Object();
    // let info = new MainCharacterInfo();

    info['pos'] = {};
    info['pos'].x = this.ship.mesh.position.x;
    info['pos'].y = this.ship.mesh.position.y;
    info['pos'].z = this.ship.mesh.position.z;

    return <IMainCharacterInfo>info;
    // return info;
  };

  // loop through all the bullets and see if it's hit any of the game objects
  // return an array of all objects that have been hit
  bulletCollisionCheck() : IMoveableGameObject[] {
    // let collisionObjects = IMoveableGameObject[];
    // let collisionObjects = IMoveableGameObject[];
    let collisionObjects = [];

    //loop through all bullets
    for (let i = 0; i < this.bullets.length; i++) {
      let b = this.bullets[i];
      //loop through all asteroids
      for (let i = 0; i < this.asteroids.length; i++) {
        let a = this.asteroids [i];

        if (a.collisionTest(b.mesh.position)) {
          // collisionObjects.push({ obj: a, tag: "asteroid"});
          collisionObjects.push(a);
        }
      }
    }

    return collisionObjects;
  }

  //getters and setters
  get asteroids(): Asteroid [] {
    return this._asteroids;
  };
  get scene(): THREE.Scene {
    return this._scene;
  };
  get ship(): Ship {
    return this._ship;
  };
  get bullets(): Bullet [] {
    return this._bullets;
  };
  get base(): BaseService {
    return this._base;
  };
  get utils(): UtilsService {
    return this._utils;
  };
}

// let AsteroidsGameFactory = (scene : THREE.Scene, ship : Ship) => {
//   console.log(`AsteroidsGameFactory: entered`);
//   return new AsteroidsGame(scene, ship);
// };

// export let AsteroidsGameProvider = {
//   provide: AsteroidsGame,
//   deps: [THREE.Scene, Ship],
//   useFactory: AsteroidsGameFactory,
// }
