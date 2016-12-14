import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Injectable()
export class Bullet {

  static TTL_MAX : number = 100;

  _vx : number;
  _vy : number;
  vScalar : number;
  vTheta : number;
  geom : THREE.CircleBufferGeometry;
  material : THREE.MeshBasicMaterial;
  mesh : THREE.Mesh;
  // this is the ratio of the (longest) screen dimension a bullet can cover before dieing 
  gamePlaneLifeRatio : number;
  ttl : number;

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

    // a bullet can cover half the longest canvas dimension before terminating
    this.gamePlaneLifeRatio = 0.5;

    this.ttl = Bullet.TTL_MAX;
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

    // lifecycle management
    --this.ttl;
    // if (--this.ttl === 0) {

    // }
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
