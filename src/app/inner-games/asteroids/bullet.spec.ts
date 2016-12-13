/// <reference path="../../../../typings/index.d.ts" />
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Bullet} from './bullet';
import { BaseService } from '../../services/base.service';

describe('Service: Asteroid Bullet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Bullet, BaseService]
    });
  });

  it('ctor works', inject([Bullet], (bullet: Bullet) => {
    expect(bullet).toBeTruthy();
    // expect(bullet.vx).toBeTruthy();
    expect(bullet.vScalar).toBeTruthy();
    expect(bullet.geom).toBeTruthy();
    expect(bullet.material).toBeTruthy();
    expect(bullet.mesh).toBeTruthy();
    expect(bullet.gamePlaneLifeRatio).toBeTruthy();
  }));

  it('update works', inject([Bullet], (bullet: Bullet) => {
    let origBulletMeshX = bullet.mesh.position.x;
    let origBulletMeshY = bullet.mesh.position.y;

    bullet.update();

    let updatedBulletMeshX = bullet.mesh.position.x;
    let updatedBulletMeshY = bullet.mesh.position.y;

    expect(updatedBulletMeshX).toEqual(origBulletMeshX + bullet.vx);
    expect(updatedBulletMeshY).toEqual(origBulletMeshY + bullet.vy);
  }));

  it('update works when crossing the projectionBounds', 
    inject([Bullet, BaseService], (bullet: Bullet, base : BaseService) => {

    // set the x position to be right at the edge of the projectionBoundary
    bullet.mesh.position.x = base.projectionBoundary - 0.01;
    // console.log(`ut: pre position.x=${bullet.mesh.position.x}`);
    // console.log(`ut: pre position.y=${bullet.mesh.position.y}`);

    let origBulletMeshX = bullet.mesh.position.x;
    let origBulletMeshY = bullet.mesh.position.y;

    bullet.update();

    // console.log(`ut: post position.x=${bullet.mesh.position.x}`);
    // console.log(`ut: post position.y=${bullet.mesh.position.y}`);

    let updatedBulletMeshX = bullet.mesh.position.x;
    let updatedBulletMeshY = bullet.mesh.position.y;

    expect(updatedBulletMeshX).toEqual(-base.projectionBoundary);
    expect(updatedBulletMeshY).toEqual(origBulletMeshY + bullet.vy);
  }));
});
