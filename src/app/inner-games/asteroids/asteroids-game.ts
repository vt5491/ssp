import { Asteroid } from './asteroid';
import { InnerGame } from '../../inner-game';

export class AsteroidsGame implements InnerGame {

  _asteroids : Asteroid [] = [];

  constructor() {
    this.asteroids.push( new Asteroid());
  }

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
}
