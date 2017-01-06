import { Injectable } from '@angular/core';

@Injectable()
export class ParmsService {

  private _parms: Object;

  // constructor(private _parms : Object) {
  constructor(obj? : Object) {
    this.parms = obj || new Object();
  }
  // constructor() {
  //   this.parms = new Object();
  // }

  public get parms(): Object {
    return this._parms;
  }
  
  public set parms(p : Object) {
    this._parms = p;
  }
  
}
