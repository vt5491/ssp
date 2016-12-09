import { Injectable } from '@angular/core';

@Injectable()
export class Bullet {

  vx : number;
  vy : number;
  geom : THREE.CircleBufferGeometry;
  material : THREE.MeshBasicMaterial;
  mesh : THREE.Mesh;

  constructor() { 
    this.init();
  }

  init() {
    this.vx = 0.05;

    this.geom = new THREE.CircleBufferGeometry(0.03, 8);
    this.material = new THREE.MeshBasicMaterial({ color: 0x90ff6b, side: THREE.DoubleSide});

    this.mesh = new THREE.Mesh(this.geom, this.material);
    this.mesh.position.x = -3.0;
    this.mesh.position.z = -11.0;
  }

}
