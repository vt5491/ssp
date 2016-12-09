/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Bullet} from './bullet';

describe('Service: Asteroid Bullet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Bullet]
    });
  });

  it('ctor works', inject([Bullet], (bullet: Bullet) => {
    expect(bullet).toBeTruthy();
    expect(bullet.vx).toBeTruthy();
    expect(bullet.geom).toBeTruthy();
    expect(bullet.material).toBeTruthy();
    expect(bullet.mesh).toBeTruthy();
  }));
});
