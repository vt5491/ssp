///<reference path="../../../../typings/index.d.ts" />
import { Component, Injectable, Injector } from '@angular/core';
import { Asteroid } from './asteroid';
import { Bullet } from './bullet';
import { Ship } from './ship';
import { InnerGame } from '../../inner-game';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
import { IMainCharacterInfo } from '../../interfaces/main-character-info';

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

  constructor(
    // private _scene : THREE.Scene,
    // inject(_scene): ThreeJsSceneProvider,
    // private _scene = @inject.get(ThreeJsSceneProvider),
    // @Inject(CourseService) courseService: CourseService
    // @Inject(ThreeJsSceneProvider) _scene: THREE.Scene,
    // @Inject(THREE.Scene) _scene: THREE.Scene,
    private _ship : Ship,
    private _base : BaseService,
    private injector : Injector
  ) {
    // I seem to have to manually inject THREE.Scene because it's a third-party Component
    // and I can't wrap it in @Ijnectable?
    this._scene = this.injector.get(THREE.Scene);
    // this.asteroids.push( new Asteroid());
    // this._scene = new THREE.Scene();
    this.initScene();
  }

  initScene() {
    this.asteroids.push( new Asteroid());
    this.scene.add(this.asteroids[0].mesh);

    this.asteroids.push( new Asteroid());
    this.asteroids[1].vx = 0.004;
    this.asteroids[1].x = 1;
    this.scene.add(this.asteroids[1].mesh);

    // this.scene.add(this.ship.lineMesh);
    this.scene.add(this.ship.mesh);

    // // add a GridHelper
    // let gridHelper = new THREE.GridHelper(90, 9);
    // gridHelper.rotateX(this.base.ONE_DEG * 45.0);
    // this.scene.add(gridHelper);
    // let gridGeom : THREE.Geometry = new THREE.Geometry();
    let gridXGeom = new THREE.PlaneBufferGeometry(12.0, 0.02);
    let gridYGeom = new THREE.PlaneBufferGeometry( 0.02, 12.0);
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
    gridXMesh.position.z = -10.0;

    let gridYMesh = new THREE.Mesh(gridYGeom, gridMat);
    gridYMesh.position.y = -3.0;
    gridYMesh.position.z = -10.0;

    this.scene.add(gridXMesh);
    this.scene.add(gridYMesh);
  };

  updateScene() {
    // 3.7 is a little short. 3.8 is a little long
    let boundVal = this.BOUND_VAL;
    // update asteroids
    for (let i = 0; i < this.asteroids.length; i++) {
      let asteroid = this.asteroids[i];

      let now = Date.now();
      let delta_t = now - this.startTime; 
      let ratio = delta_t / this.asteroidsDuration;
      let posX = 2 * boundVal * ratio;

      asteroid.mesh.position.x = 
        ((this.asteroids[i].x + posX + boundVal) % 2.0 * boundVal) - boundVal; 
    }
    // update bullets
    // console.log(`AsteroidsGame.updateScene: bullets.length=${this.bullets.length}, asteroidsGame.id=${this.id}`);
    // for (let i = 0; i < this.bullets.length; i++) {
    this.updateBullets();
    // update ship


    // translate ship
    // this.ship.lineMesh.position.x += this.ship.vx / 4.0;
    this.ship.mesh.position.x += this.ship.vScalar * Math.cos(this.ship.vTheta);

    if (this.ship.mesh.position.x > boundVal) {
      this.ship.mesh.position.x = -boundVal;
    }

    if (this.ship.mesh.position.x < -boundVal) {
      this.ship.mesh.position.x = boundVal;
    }

    // this.ship.mesh.position.y += this.ship.vy / 4.0;
    this.ship.mesh.position.y += this.ship.vScalar * Math.sin(this.ship.vTheta);

    if (this.ship.mesh.position.y > boundVal) {
      this.ship.mesh.position.y = -boundVal;
    }

    if (this.ship.mesh.position.y < -boundVal) {
      this.ship.mesh.position.y = boundVal;
    }

    // console.log(`AsteroidsGame.updateScene: ship.x=${this.ship.mesh.position.x}, ship.y=${this.ship.mesh.position.y}`);

    // rotate ship
    // this.ship.rotate(this.ship.deltaTheta);
    this.ship.rotate();
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
    bullet.vTheta = Math.atan2(this.ship.vy , this.ship.vx);
    // console.log(`AsteroidsGame.shipFiredBullet: ship.vy=${this.ship.vy},ship.vx=${this.ship.vx}`);
    // console.log(`AsteroidsGame.shipFiredBullet: bullet.vTheta=${bullet.vTheta}`);

    // initial pos is the same as the ship
    bullet.mesh.position.x = this.ship.mesh.position.x;
    bullet.mesh.position.y = this.ship.mesh.position.y;
    // this.ship.geom.vertices[0].x
    // bullet.mesh.position.x = this.ship.geom.vertices[0].x + this.ship.mesh.position.x;
    // bullet.mesh.position.y = this.ship.geom.vertices[0].y + this.ship.mesh.position.y;

    // add the mesh to the scene
    this.scene.add(bullet.mesh);

    // and add to the bullets array
    this.bullets.push(bullet);
  };

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
  }

  //getters and setters
  get asteroids(): Asteroid [] {
    return this._asteroids;
  }
  get scene(): THREE.Scene {
    return this._scene;
  }
  get ship(): Ship {
    return this._ship;
  }
  get bullets(): Bullet [] {
    return this._bullets;
  }
  get base(): BaseService {
    return this._base;
  }
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
