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
    let asteroid = this.asteroids[0];
    asteroid.mesh.position.x += asteroid.vx;

    if (asteroid.mesh.position.x > 20) {
      asteroid.mesh.position.x = -20.0;
    }

    this.ship.lineMesh.position.x += this.ship.vx / 4.0;

    if (this.ship.lineMesh.position.x > 4) {
      this.ship.lineMesh.position.x = -4.0;
    }
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
