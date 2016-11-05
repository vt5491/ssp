/// <reference path="../../typings/index.d.ts" />
// Note: this has been moved to services/base.ts
//  it should be ok to delete this file.
import {Injectable} from '@angular/core';

@Injectable()
export class Base {
  static ONE_DEG = Math.PI / 180.0;

  constructor() {}
}
