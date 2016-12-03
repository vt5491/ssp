///<reference path="../../../../typings/index.d.ts" />
export class Asteroid {

  x  : number;
  vx : number;
  geom : THREE.PlaneBufferGeometry;
  mat : THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;

  constructor () {
    this.x = 0.0;
    this.vx = 0.003;

    this.init();
  };

  init() {
    this.geom = new THREE.PlaneBufferGeometry(0.2, 0.4);
    this.mat = new THREE.MeshBasicMaterial({ color: 0x70FF20, side: THREE.DoubleSide });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    // this.mesh.position.z = 1.0;
    this.mesh.position.x = -3.0;
    this.mesh.position.z = -10.0;
  };

  //getters and setters
  // get vx() : number {
  //   return this._vx;
  // }

}
