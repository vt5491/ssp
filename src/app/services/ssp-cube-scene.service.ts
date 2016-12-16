import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';

@Injectable()
export class SspCubeScene implements ISspScene {
  cubeMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;


  constructor(width, height, public vrScene : VRSceneService) {
    console.log(`SspCubeSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let cubeGeom   = new THREE.CubeGeometry(50, 50, 50);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });

    this.cubeMesh = new THREE.Mesh(cubeGeom, cubeMaterial);
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.cubeMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.cubeMesh;
    this.sspMaterial = cubeMaterial;

    // add a GridHelper
    // let gridHelper = new THREE.GridHelper(10, 10);
    // gridHelper.rotateX(Math.PI / 180.0 * 90.0);
    // this.vrSceneService.scene.add(gridHelper);
  };

    // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}

let SspCubeSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspCubeScene(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspCubeSceneProvider = {
  provide: SspCubeScene,
  useFactory: SspCubeSceneFactory,
  deps: [VRSceneService]
}
