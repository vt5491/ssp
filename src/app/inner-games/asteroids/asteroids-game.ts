import { Component } from '@angular/core'; 
import { Asteroid } from './asteroid';
import { InnerGame } from '../../inner-game';
import { ThreeJsSceneProvider } from '../../services/utils.service';

@Component({
  providers: [ThreeJsSceneProvider]
})
export class AsteroidsGame implements InnerGame {

  private _asteroids : Asteroid [] = [];
  // private _scene: THREE.Scene;


  constructor(
    private _scene : THREE.Scene
  ) {
    // this.asteroids.push( new Asteroid());
    // this._scene = new THREE.Scene();
    this.initScene();
  }

  initScene() {
    this.asteroids.push( new Asteroid());
    this.scene.add(this.asteroids[0].mesh);
  };

  updateScene() {
    let asteroid = this.asteroids[0];
    asteroid.mesh.position.x += asteroid.vx; 

    if (asteroid.mesh.position.x > 20) {
      asteroid.mesh.position.x = -20.0;
    }
  };

  //getters and setters
  get asteroids(): Asteroid [] {
    return this._asteroids;
  }

  get scene(): THREE.Scene {
    return this._scene;
  }
}

// let AsteroidsGameFactory = (scene : THREE.Scene) => {
let AsteroidsGameFactory = () => {
  // return new AsteroidsGame(scene);
  console.log(`AsteroidsGameFactor: entered`);
  return new AsteroidsGame(new THREE.Scene());
};

export let AsteroidsGameProvider = {
  provide: AsteroidsGame,
  // deps: [THREE.Scene],
  // deps: [ThreeJsSceneProvider],
  useFactory: AsteroidsGameFactory,
}
