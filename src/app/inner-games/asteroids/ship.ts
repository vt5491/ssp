///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable()
// @Component({
//   providers: [BaseService],
// })
export class Ship {

  vx : number;
  vy : number;
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
  thetaLast : number;
  vel : number;

  constructor(
    private base : BaseService
  ) { 

    this.init();
  }

  init() {
    this.vx = 0.04;
    this.vy = 0.0;
    this.vel = 0.01;

    this.deltaVx = 0.001;
    this.deltaVy = 0.001;
    this.deltaVel = 0.0005;
    this.deltaTheta = 5.0 * this.base.ONE_DEG;

    this.theta = this.base.ONE_DEG * 90.0; 
    this.thetaLast = this.theta; 

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
    this.mesh.rotateZ(this.theta - this.thetaLast);

    this.thetaLast = this.theta;
  }

}
