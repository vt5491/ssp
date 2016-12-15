import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { SspScene} from '../ssp-scene';
import { SspSceneService} from './ssp-scene.service';

@Injectable()
export class SspPyramidScene implements SspScene {
  pyramidMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;

  constructor(width, height, public vrScene : VRSceneService) {
    console.log(`SspPyramidSceneService.ctor: entered`);
    this.init();
  }

  init() {
//     var geometry = new THREE.CylinderGeometry( 1, TILE_SIZE*3, TILE_SIZE*3, 4 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00 , wireframe:true} );
    let pyramidGeom   = new THREE.CylinderGeometry(1, 50, 50, 4);
    let pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080  });

    this.pyramidMesh = new THREE.Mesh(pyramidGeom, pyramidMaterial);
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.pyramidMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.pyramidMesh;
    this.sspMaterial = pyramidMaterial;

  };

    // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}

let SspPyramidSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspPyramidScene(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspPyramidSceneProvider = {
  provide: SspPyramidScene,
  useFactory: SspPyramidSceneFactory,
  deps: [VRSceneService]
}
