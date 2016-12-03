import { Component } from '@angular/core';
import { Asteroid } from './asteroid';
import { Ship } from './ship';
import { InnerGame } from '../../inner-game';
import { ThreeJsSceneProvider } from '../../services/utils.service';

@Component({
  providers: [ThreeJsSceneProvider, Ship]
})
export class AsteroidsGame implements InnerGame {

  private _asteroids : Asteroid [] = [];
  // private ship : THREE.Line;
  // private _ship : Ship;
  // private _scene: THREE.Scene;
  private asteroidsDuration : number = 60000;
  private startTime : number = Date.now();


  constructor(
    private _scene : THREE.Scene,
    private _ship : Ship
  ) {
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
    // this.ship = new 
    // // create the ship
    // var shipGeometry = new THREE.Geometry()
    // var shipMaterial = new THREE.LineBasicMaterial({ linewidth: 3 })
    // shipMaterial.color = new THREE.Color(80, 255, 20);

    // this.ship = new THREE.Line(shipGeometry, shipMaterial);
    // // this.ship.position.x = 2.0
    // this.ship.position.x = -3
    // this.ship.position.z = -10

    // shipGeometry.vertices.push(new  THREE.Vector3(0, 1))
    // shipGeometry.vertices.push(new THREE.Vector3(.1, -1))
    // shipGeometry.vertices.push(new THREE.Vector3(-.1, -1))
    // shipGeometry.vertices.push(new THREE.Vector3(0, 1))

    this.scene.add(this.ship.lineMesh);
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
      // asteroid.mesh.position.x += asteroid.vx;

      // if (asteroid.mesh.position.x > boundVal) {
      //   asteroid.mesh.position.x = -boundVal;
      // }

      // // if (Number(asteroid.mesh.position.x.toFixed(2)) < -boundVal) {
      // if (asteroid.mesh.position.x < -boundVal) {
      //   asteroid.mesh.position.x = boundVal;
      // }
    }
    // update ship

    // translate ship
    // this.ship.lineMesh.position.x += this.ship.vx / 4.0;
    this.ship.lineMesh.position.x += this.ship.vel * Math.cos(this.ship.theta);

    if (this.ship.lineMesh.position.x > boundVal) {
      this.ship.lineMesh.position.x = -boundVal;
    }

    if (this.ship.lineMesh.position.x < -boundVal) {
      this.ship.lineMesh.position.x = boundVal;
    }

    // this.ship.lineMesh.position.y += this.ship.vy / 4.0;
    this.ship.lineMesh.position.y += this.ship.vel * Math.sin(this.ship.theta);

    if (this.ship.lineMesh.position.y > boundVal) {
      this.ship.lineMesh.position.y = -boundVal;
    }

    if (this.ship.lineMesh.position.y < -boundVal) {
      this.ship.lineMesh.position.y = boundVal;
    }

    // rotate ship
    // this.ship.rotate(this.ship.deltaTheta);
    this.ship.rotate();
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
}

// let AsteroidsGameFactory = (scene : THREE.Scene) => {
let AsteroidsGameFactory = (scene : THREE.Scene, ship : Ship) => {
  // return new AsteroidsGame(scene);
  console.log(`AsteroidsGameFactory: entered`);
  // return new AsteroidsGame(new THREE.Scene());
  return new AsteroidsGame(scene, ship);
};

export let AsteroidsGameProvider = {
  provide: AsteroidsGame,
  // deps: [ThreeJsSceneProvider, Ship],
  deps: [THREE.Scene, Ship],
  // deps: [ThreeJsSceneProvider],
  useFactory: AsteroidsGameFactory,
}
