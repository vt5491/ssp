import { Injectable } from '@angular/core';
import { AsteroidsGame } from './asteroids-game';

@Injectable()
export class AsteroidsMainService {

  // asteroidsGame : AsteroidsGame;

  constructor(private _asteroidsGame : AsteroidsGame ) { 

  }

  //getters and setters
  get asteroidsGame() : AsteroidsGame {
    return this._asteroidsGame;
  }

}
