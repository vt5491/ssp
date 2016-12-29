import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  static ONE_DEG = Math.PI / 180.0;
  //TODO: projectionBoundary and _boundVal are the same idea.  Decide which
  // one to go with and get rid of the other (probably keep projectionBoundary)
  projectionBoundary : number;
  private _boundVal : number;

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

  public get boundVal() : number {
    return this._boundVal;
  }
  public set boundVal(v : number) {
    this._boundVal = v;
  }
  
}
