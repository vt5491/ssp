import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  static ONE_DEG = Math.PI / 180.0;
  projectionBoundary : number;

  constructor() { 
    this.init();
  }

  init() {
    //TODO: magic number dependency.  It's actualy proportional to physical screen size?
    this.projectionBoundary = 3.79;
  };

  //getters and setters
  get ONE_DEG(): number {
    return BaseService.ONE_DEG;
  } 
}
