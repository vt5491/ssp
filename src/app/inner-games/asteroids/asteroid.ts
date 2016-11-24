///<reference path="../../../../typings/index.d.ts" />
export class Asteroid {

  x  : number;
  vx : number;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;

  constructor () {
    this.x = 0.0;
    this.vx = 0.03;

    this.init();
  };

  init() {
    this.geom = new THREE.PlaneBufferGeometry(2, 2);
    this.mat = new THREE.MeshBasicMaterial({ color: 0x70FF74, side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.z = 1.0;
  };

  //getters and setters
  // get vx() : number {
  //   return this._vx;
  // }

}
