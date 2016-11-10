import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  static ONE_DEG = Math.PI / 180.0;

  constructor() { }

  //getters and setters
  get ONE_DEG(): number {
    return BaseService.ONE_DEG;
  } 
}
