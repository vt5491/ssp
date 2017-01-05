///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { UtilsService } from '../../services/utils.service';
import { IMoveableGameObject } from "../../interfaces/imoveable-game-object";

@Injectable()
// @Component({
//   providers: [BaseService],
// })
export class Ship implements IMoveableGameObject {

  // _vx : number;
  // _vy : number;
  tag : string;
  vx : number;
  vy : number;
  deltaVx : number;
  deltaVy : number;
  deltaVel : number;
  deltaTheta : number;
  geom: THREE.Geometry;
  // geom: THREE.BufferGeometry; //kind of a pain to work with
  // mat : THREE.LineBasicMaterial;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  // mesh: THREE.Line;
  lineMesh: THREE.Line;
  theta : number;
  // vTheta : number;
  thetaLast : number;
  vel : number;  //TODO defunct
  vScalar : number; // use this
  accelScalar : number;
  nose : THREE.Mesh;

  constructor(
    private _base : BaseService,
    private _utils : UtilsService
  ) {

    this.init();
  }

  init() {
    this.tag = 'ship';
    this.vx = 0.0;
    this.vy = 0.0;
    // this.vel = 0.01;
    // this.vScalar = 0.01;
    //  this controls how fast the ship goes
    this.vScalar = 0.002;
    this.accelScalar = 0.0004;

    this.deltaVx = 0.001;
    this.deltaVy = 0.001;
    // this.deltaVel = 0.0005;
    this.deltaVel = 0.0001;
    this.deltaTheta = 5.0 * this.base.ONE_DEG;

    // this makes it go in the y-dir
    // this.vTheta = this.base.ONE_DEG * 90.0;
    this.theta = this.base.ONE_DEG * 90.0;
    // this makes it go in the x-dir
    // this.vTheta = this.base.ONE_DEG * 0.0;
    this.thetaLast = this.theta;

    // create the ship
    this.geom = new THREE.Geometry()
    // this.geom = new THREE.BufferGeometry()

    let scaleX = 0.1;
    let scaleY = 0.1;
    this.geom.vertices.push(new THREE.Vector3(0 * scaleX, 1 * scaleY))
    this.geom.vertices.push(new THREE.Vector3(.5 * scaleX, -1 * scaleY))
    this.geom.vertices.push(new THREE.Vector3(-.5 * scaleX, -1 * scaleY))

    // use a triangle intead of a line group
    this.geom.faces.push(new THREE.Face3(0, 2, 1));
    this.geom.computeFaceNormals();
    this.mat = new THREE.MeshBasicMaterial();
    this.mat.color = new THREE.Color(255, 80, 20);
    // this.mesh = new THREE.Mesh(this.geom, new THREE.MeshBasicMaterial({color: 0xffffff}));
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    // this.mesh.position.x = -3;
    // this.mesh.position.y = 12;
    // this.mesh.position.y = 2;
    this.mesh.position.y = 0;
    // this.mesh.position.z = -10;
    this.mesh.position.z = 0;
    // console.log(`Ship: mesh=${this.mesh}`);
    // let noseGeom = new THREE.CircleGeometry(0.05, 8);
    let noseGeom = new THREE.PlaneGeometry(0.15,0.04);
    let noseMat= new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide});

    this.nose = new THREE.Mesh(noseGeom, noseMat);

    this.mesh.add(this.nose);
  }

  // rotate(rotTheta : number) {
  rotate() {
    // this.mesh.rotateZ(this.theta);
    // this.mesh.rotateZ(rotTheta);
    // this.mesh.rotateZ(this.vTheta - this.thetaLast);
    this.mesh.rotateZ(this.theta - this.thetaLast);

    this.thetaLast = this.theta;
  };

  thrust() {
    this.vx += this.accelScalar * Math.cos(this.theta);
    this.vy += this.accelScalar * Math.sin(this.theta);
  };

  updatePos() {
    // console.log(`---> in new updatPos`);
    this.utils.updatePos(this, this.base.projectionBoundary);
    // let shipX = this.mesh.position.x;
    // let shipY = this.mesh.position.y;
    //
    // let boundVal = this.base.projectionBoundary;
    //
    // shipX += this.vx;
    // shipY += this.vy;
    //
    // if (shipX > boundVal) {
    //   shipX = -boundVal;
    // }
    //
    // if (shipX < -boundVal) {
    //   shipX = boundVal;
    // }
    //
    // if (shipY > boundVal) {
    //   shipY = -boundVal;
    // }
    //
    // if (shipY < -boundVal) {
    //   shipY = boundVal;
    // }
    //
    // this.mesh.position.x = shipX;
    // this.mesh.position.y = shipY;
  }

  collisionHandler() {
    // this.vx = 0;
    return true;
  }

  //getters and setters
  get base(): BaseService {
    return this._base;
  };
  get utils(): UtilsService {
    return this._utils;
  };

  // get vx(): number {
  //   return this.vScalar * Math.cos(this.vTheta);
  // }
  // set vx( newVx: number) {
  //   this.vTheta = Math.atan( this.vy / newVx);
  //   this.vScalar = Math.sqrt(newVx * newVx + this.vy * this.vy);
  // }
  //
  // get vy(): number {
  //   return this.vScalar * Math.sin(this.vTheta);
  // }
  // set vy( newVy: number) {
  //   this.vTheta = Math.atan( newVy / this.vx);
  //   this.vScalar = Math.sqrt(this.vx * this.vx + newVy * newVy);
  // }

}
