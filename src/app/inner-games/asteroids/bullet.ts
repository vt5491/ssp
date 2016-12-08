import { Injectable } from '@angular/core';

@Injectable()
export class Bullet {

  vx : number;
  vy : number;

  constructor() { 
    this.init();
  }

  init() {
    this.vx = 0.05;
  }

}
