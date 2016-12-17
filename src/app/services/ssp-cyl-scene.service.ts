import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';

@Injectable()
export class SspCylSceneService implements ISspScene {
// export class SspCylSceneService extends SspSceneService {
  cylMesh : THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  //TODO: add this to ISspScene
  tag : string;

  // constructor(width, height, private _vrSceneService: VRSceneService) {
  constructor(width, height, public vrScene: VRSceneService) {
    // super();
    console.log(`SspCylSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let cylGeom   = new THREE.CylinderBufferGeometry(25, 25, 80, 50);
    let cylMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, wireframe: false });

    this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    this.cylMesh.name = "abe";
    // this.cylMesh.rotateX(Base.ONE_DEG * 90.0);
    // this._vrSceneService.scene.add(this.cylMesh);
    this.vrScene.scene.add(this.cylMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.cylMesh;
    this.sspMaterial = cylMaterial;

    this.tag = 'cyl';
    // // add a GridHelper
    // let gridHelper = new THREE.GridHelper(10, 10);
    // // gridHelper.rotateX(Math.PI / 180.0 * 90.0);
    // this.vrSceneService.scene.add(gridHelper);
  };

  // return camera tracking coordinates given a position from the 
  // inner game.  The coords are normalized to a unit circle (or distance)
  // and then scaled up by the client.
  getNormalizedTrackingCoords(innerX: number, innerY: number, innerZ: number, boundVal: number): Object {
    // let result = new Object();
    let result = <any>{};

    // result.x = 1.0;
    let theta = (Math.PI / boundVal) * innerX; 

    result.x = Math.sin(theta);
    result.z = Math.cos(theta);

    result.y = innerY;

    result.rotQuat = new THREE.Quaternion();
    result.rotQuat.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), theta );

    return result;
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
