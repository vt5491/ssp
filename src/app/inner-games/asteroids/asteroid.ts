///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { IMoveableGameObject } from "../../interfaces/imoveable-game-object";
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

@Injectable()
export class Asteroid implements IMoveableGameObject {

  x  : number;
  vx : number;
  vy : number;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  vScalar: number = 0.004;

  constructor (
    private _base : BaseService,
    private _utils : UtilsService
  ) {
    this.x = 0.0;
    this.vx = 0.003;

    this.init();
  };

  init() {
    this.geom = new THREE.PlaneBufferGeometry(0.2, 0.4);
    this.mat = new THREE.MeshBasicMaterial({ color: 0x70FF20, side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.mesh.position.z = 1.0;
    this.mesh.position.x = -3.0;
    this.mesh.position.z = -10.0;
  };

  updatePos() {
    // this.mesh.position.x +=
    this.utils.updatePos(this, this.base.projectionBoundary);
  };

  //getters and setters
  get base(): BaseService {
    return this._base;
  };
  get utils(): UtilsService {
    return this._utils;
  };

  // get vx() : number {
  //   return this._vx;
  // }

}
