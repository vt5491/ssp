import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable()
export class Bullet {

  _vx : number;
  _vy : number;
  vScalar : number;
  vTheta : number;
  geom : THREE.CircleBufferGeometry;
  material : THREE.MeshBasicMaterial;
  mesh : THREE.Mesh;

  constructor( private base : BaseService) { 
    this.init();
  }

  init() {
    // this.vx = 0.05;
    this.vScalar = 0.03;
    this.vTheta = 0.0;

    this.geom = new THREE.CircleBufferGeometry(0.03, 8);
    this.material = new THREE.MeshBasicMaterial({ color: 0x90ff6b, side: THREE.DoubleSide});

    this.mesh = new THREE.Mesh(this.geom, this.material);
    this.mesh.position.x = -3.0;
    this.mesh.position.z = -11.0;
  }

  // update the bullet's position, and keep track of life cycle events
  update() {
    // add the vx and vy to the mesh's position
    this.mesh.position.x += this.vScalar * Math.cos(this.vTheta);
    this.mesh.position.y += this.vScalar * Math.sin(this.vTheta);

    let boundVal = this.base.projectionBoundary;
    
    if (this.mesh.position.x > boundVal) {
      this.mesh.position.x = -boundVal;
    }

    if (this.mesh.position.x < -boundVal) {
      this.mesh.position.x = boundVal;
    }

    if (this.mesh.position.y > boundVal) {
      this.mesh.position.y = -boundVal;
    }

    if (this.mesh.position.y < -boundVal) {
      this.mesh.position.y = boundVal;
    }
  }
  //getters and setters
  get vx(): number {
    return this.vScalar * Math.cos(this.vTheta);
  }
  // set vx(newVx: number) {
  //   this.vTh
  //   return this.vScalar * Math.cos(this.vTheta);
  // }
  get vy(): number {
    return this.vScalar * Math.sin(this.vTheta);
  }

}
