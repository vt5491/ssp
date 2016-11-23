import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspScene} from '../ssp-scene';
// import { SspSceneService} from './ssp-scene.service';

@Injectable()
export class SspCylSceneService implements SspScene {
// export class SspCylSceneService extends SspSceneService {
  cylMesh : THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;

  // constructor(width, height, private _vrSceneService: VRSceneService) {
  constructor(width, height, public vrSceneService: VRSceneService) {
    // super();
    console.log(`SspCylSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let cylGeom   = new THREE.CylinderBufferGeometry(25, 25, 50);
    let cylMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080 });

    this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    this.cylMesh.name = "abc";
    // this.cylMesh.rotateX(Base.ONE_DEG * 90.0);
    // this._vrSceneService.scene.add(this.cylMesh);
    this.vrSceneService.scene.add(this.cylMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.cylMesh;
    this.sspMaterial = cylMaterial;
  };

  // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}

let SspCylSceneFactory = (vrSceneService: VRSceneService) => {
// let SspCylSceneFactory = (sspSceneService: SspSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspCylSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  return new SspCylSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspCylSceneProvider = {
  provide: SspCylSceneService,
  useFactory: SspCylSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
  // deps: [SspSceneService]
}
