///<reference path="../../../../typings/index.d.ts" />
export class Asteroid {

  vx : number;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;

  constructor () {
    this.vx = 1.0;

    this.init();
  };

  init() {
    this.geom = new THREE.PlaneBufferGeometry(2, 2);
    this.mat = new THREE.MeshBasicMaterial();

    this.mesh = new THREE.Mesh(this.geom, this.mat);
  };

  //getters and setters
  // get vx() : number {
  //   return this._vx;
  // }

}
