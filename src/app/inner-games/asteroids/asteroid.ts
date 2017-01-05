///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { IMoveableGameObject } from "../../interfaces/imoveable-game-object";
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';

@Injectable()
export class Asteroid implements IMoveableGameObject {

  tag : string;
  x  : number;
  vx : number;
  vy : number;
  width: number;
  height: number;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  vScalar: number = 0.004;
  bBox : THREE.Box3;

  constructor (
    private _base : BaseService,
    private _utils : UtilsService
  ) {
    this.x = 0.0;
    this.vx = 0.003;

    this.width = 0.2;
    this.height = 0.4;

    this.init();
  };

  init() {
    this.tag = 'asteroid';
    // this.geom = new THREE.PlaneBufferGeometry(0.2, 0.4);
    this.geom = new THREE.PlaneBufferGeometry(this.width, this.height);
    this.geom.computeBoundingBox();
    this.mat = new THREE.MeshBasicMaterial({ color: 0x70FF20, side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.mesh.position.z = 1.0;
    // this.mesh.position.x = -3.0;
    this.mesh.position.x = 0.0;
    // this.mesh.position.z = -10.0;
    this.mesh.position.z = 0.0;

    // it's important that all the x,y,z positions be set to zero for bBox to work properly
    // redundant to geom.boundingBox?
    this.bBox = new THREE.Box3().setFromObject(this.mesh);
    // console.log(`containsPoint=${this.bBox.containsPoint(new THREE.Vector3(-3.3, 0, 0))}`);
  };

  updatePos() {
    // this.mesh.position.x +=
    this.utils.updatePos(this, this.base.projectionBoundary);
  };

  // returns true or false depending if the point is inside the asteroid's bounding box.
  collisionTest(point : THREE.Vector3) : boolean {
    let beenHit : boolean = false;

    // since manipulate the point during testing, make a clone so we don't affect
    // the parent object of point.
    let pointClone = point.clone();
    // beenHit = this.bBox.containsPoint(pointClone.sub(this.mesh.position));
    beenHit = this.mesh.geometry.boundingBox.containsPoint(pointClone.sub(this.mesh.position));

    // if (this.mesh.geometry.boundingBox.max.x == 1.0
    // if (this.mesh.scale.x == 2.0
    //   // && Math.abs(pointClone.x - this.mesh.position.x) < 2.0
    //   // && Math.abs(pointClone.y - this.mesh.position.y) < 2.0
    // ){
    //   // parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
    //   console.log(`Asteroid.collisionTest:
    //     b.x=${Number(point.x).toFixed(3)},p.x=${Number(pointClone.x).toFixed(3)}, ast.x=${Number(this.mesh.position.x).toFixed(3)}, delta=${Number(point.x - this.mesh.position.x).toFixed(3)}:
    //     b.y=${Number(point.y).toFixed(3)},p.y=${Number(pointClone.y).toFixed(3)}, ast.y=${Number(this.mesh.position.y).toFixed(3)}, delta=${Number(point.y - this.mesh.position.y).toFixed(3)}
    //     `);
    //   console.log(`beenHit=${beenHit}`);
    // }

    return beenHit;
  }

  collisionHandler() {
    this.vx = -this.vx;

    return true;
  }

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
