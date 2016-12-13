import { Component, Injectable, Injector } from '@angular/core';
import { Asteroid } from './asteroid';
import { Bullet } from './bullet';
import { Ship } from './ship';
import { InnerGame } from '../../inner-game';
import { ThreeJsSceneProvider } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';

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
  };

  updateScene() {
    // 3.7 is a little short. 3.8 is a little long
    let boundVal = 3.79;
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
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      // this.bullets[i].mesh.position.x += 0.01;
      // this.bullets[i].mesh.position.y += 0.001;
      // if (this.bullets[i].mesh.position.x > boundVal) {
      //   this.bullets[i].mesh.position.x = -boundVal;
      // }

      // if (this.bullets[i].mesh.position.x < -boundVal) {
      //   this.bullets[i].mesh.position.x = boundVal;
      // }

      // if (this.bullets[i].mesh.position.y > boundVal) {
      //   this.bullets[i].mesh.position.y = -boundVal;
      // }

      // if (this.bullets[i].mesh.position.y < -boundVal) {
      //   this.bullets[i].mesh.position.y = boundVal;
      // }
    };
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

    // rotate ship
    // this.ship.rotate(this.ship.deltaTheta);
    this.ship.rotate();
  };

  updateBullets() {

  }

  // this is the main application level bullet handler.  We are called from asteroids-kbd-handler'
  shipFiredBullet() {
    // create a bullet with same direction as the ship is pointing to
    // note: we do not use injected Bullets because we don't want singletons
    let bullet = new Bullet(this.base);
    // bullet.vTheta = Math.atan(this.ship.vy / this.ship.vx);
    bullet.vTheta = Math.atan2(this.ship.vy , this.ship.vx);
    console.log(`AsteroidsGame.shipFiredBullet: ship.vy=${this.ship.vy},ship.vx=${this.ship.vx}`);
    console.log(`AsteroidsGame.shipFiredBullet: bullet.vTheta=${bullet.vTheta}`);

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
