import { Asteroid } from './asteroid';

export class AsteroidsGame {

  _asteroids : Asteroid [] = [];

  constructor() {
    this.asteroids.push( new Asteroid());
  }

  //getters and setters
  get asteroids(): Asteroid [] {
    return this._asteroids;
  }
}
