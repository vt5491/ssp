import { Component } from '@angular/core'; 
import { Asteroid } from './asteroid';
import { InnerGame } from '../../inner-game';

@Component({
  providers: [THREE.Scene]
})
export class AsteroidsGame implements InnerGame {

  _asteroids : Asteroid [] = [];

  constructor(
    private _scene : THREE.Scene
  ) {
    // this.asteroids.push( new Asteroid());
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
