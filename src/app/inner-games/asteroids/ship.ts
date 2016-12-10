///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable()
// @Component({
//   providers: [BaseService],
// })
export class Ship {

  _vx : number;
  _vy : number;
  deltaVx : number;
  deltaVy : number;
  deltaVel : number;
  deltaTheta : number;
  geom: THREE.Geometry;
  mat : THREE.LineBasicMaterial;
  // mesh: THREE.Mesh;
  mesh: THREE.Line;
  lineMesh: THREE.Line;
  theta : number;
  vTheta : number;
  thetaLast : number;
  vel : number;  //TODO defunct
  vScalar : number;

  constructor(
    private base : BaseService
  ) { 

    this.init();
  }

  init() {
    // this.vx = 0.04;
    // this.vy = 0.0;
    // this.vel = 0.01;
    this.vScalar = 0.01;

    this.deltaVx = 0.001;
    this.deltaVy = 0.001;
    this.deltaVel = 0.0005;
    this.deltaTheta = 5.0 * this.base.ONE_DEG;

    this.vTheta = this.base.ONE_DEG * 90.0; 
    this.thetaLast = this.vTheta; 

    // create the ship
    this.geom = new THREE.Geometry()

    let scaleX = 0.1;
    let scaleY = 0.1;
    this.geom.vertices.push(new THREE.Vector3(0 * scaleX, 1 * scaleY))
    this.geom.vertices.push(new THREE.Vector3(.5 * scaleX, -1 * scaleY))
    this.geom.vertices.push(new THREE.Vector3(-.5 * scaleX, -1 * scaleY))
    this.geom.vertices.push(new THREE.Vector3(0 * scaleX, 1 * scaleY))

    this.mat = new THREE.LineBasicMaterial({ linewidth: 3 })
    this.mat.color = new THREE.Color(80, 255, 20);

    this.lineMesh = new THREE.Line(this.geom, this.mat);
    // this.ship.position.x = 2.0
    this.lineMesh.position.x = -3
    this.lineMesh.position.z = -10

    this.mesh = this.lineMesh;
  }

  // rotate(rotTheta : number) {
  rotate() {
    // this.mesh.rotateZ(this.theta);
    // this.mesh.rotateZ(rotTheta);
    this.mesh.rotateZ(this.vTheta - this.thetaLast);

    this.thetaLast = this.vTheta;
  }

  //getters and setters
  get vx(): number {
    return this.vScalar * Math.cos(this.vTheta);
  }
  set vx( newVx: number) {
    this.vTheta = Math.atan( this.vy / newVx);
    this.vScalar = Math.sqrt(newVx * newVx + this.vy * this.vy);
  }

  get vy(): number {
    return this.vScalar * Math.sin(this.vTheta);
  }
  set vy( newVy: number) {
    this.vTheta = Math.atan( newVy / this.vx);
    this.vScalar = Math.sqrt(this.vx * this.vx + newVy * newVy);
  }

}
