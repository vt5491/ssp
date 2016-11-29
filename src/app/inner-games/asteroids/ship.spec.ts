/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Ship } from './ship';

describe('Service: Ship', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ship]
    });
  });

  it('ctor works', inject([Ship], (ship: Ship) => {
    expect(ship).toBeTruthy();
    expect(ship.vx).toBeDefined();
    expect(ship.geom).toBeDefined();
    expect(ship.mat).toBeDefined();
  }));
});
