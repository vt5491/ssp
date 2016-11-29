///<reference path="../../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';

@Injectable()
export class Ship {

  vx : number;
  vy : number;
  deltaVx : number;
  deltaVy : number;
  geom: THREE.Geometry;
  mat : THREE.LineBasicMaterial;
  // mesh: THREE.Mesh;
  mesh: THREE.Line;
  lineMesh: THREE.Line;

  constructor() { 

    this.init();
  }

  init() {
    this.vx = 0.04;
    this.vy = 0.0;

    this.deltaVx = 0.002;
    this.deltaVy = 0.002;

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

}
