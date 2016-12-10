import { Injectable, Component } from '@angular/core';
// import { AsteroidsGame, AsteroidsGameProvider } from './asteroids-game';
import { AsteroidsGame } from './asteroids-game';

@Injectable()
// @Component({
//   providers : [AsteroidsGameProvider]
// })
export class AsteroidsMainService {

  // asteroidsGame : AsteroidsGame;

  constructor(private _asteroidsGame : AsteroidsGame ) { 

  }

  //getters and setters
  get asteroidsGame() : AsteroidsGame {
    return this._asteroidsGame;
  }

}
