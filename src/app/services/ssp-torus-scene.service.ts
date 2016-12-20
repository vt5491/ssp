///<reference path="../../../typings/index.d.ts" />
import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

// @Component({
//   // providers: [VRSceneServiceProvider]
//   providers: [VRSceneService]
// })

@Injectable()
export class SspTorusSceneService implements ISspScene {
// export class SspTorusSceneService extends SspSceneService {

  torusMesh : THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  tag : string;
  torusRadius : number;
  tubeRadius : number
  DEFAULT_TORUS_RADIUS = 100;
  DEFAULT_TUBE_RADIUS = 20;
  // constructor(width, height, webGLRenderer: THREE.WebGLRenderer) {
  // constructor(width, height, private _vrSceneService: VRSceneService) {
  constructor(width, height, public vrScene: VRSceneService, torusRadius?, tubeRadius?) {
    // super();
    console.log(`SspTorusSceneService.ctor: entered`);

    this.torusRadius = torusRadius || this.DEFAULT_TORUS_RADIUS; 
    this.tubeRadius = torusRadius || this.DEFAULT_TUBE_RADIUS; 
    this.init();
  }

  init() {
    // let torusGeom   = new THREE.TorusGeometry( 25, 8, 50, 50);
    let torusGeom   = new THREE.TorusBufferGeometry(100, 18, 50, 50);
    let torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, wireframe: false  });

    this.torusMesh = new THREE.Mesh(torusGeom, torusMaterial);
    this.torusMesh.name = "abc";
    // this.torusMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.torusMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.torusMesh;
    this.sspMaterial = torusMaterial;

    this.tag = "torus";

  }

  outerCameraTrack(avatarInfo: IMainCharacterInfo, 
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService 
    ) {};

  getNormalizedTrackingCoords(innerX: number, innerY: number, innerZ: number, boundVal: number): Object {
    let result = <any>{};

    let torusTheta = (Math.PI / boundVal) * innerX; 
    let tubeTheta = (Math.PI / boundVal) * innerY; 

    return result;
  }
  // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }

  // this returns the webGLRenderer from the injected VRSceneService
  // Just a shortcut so the user doesn't have to chain two object to get
  // a simple value.
  // get webGLRenderer(): THREE.WebGLRenderer {
  //   return this._vrSceneService.webGLRenderer;
  // };
  // set webGLRenderer(webGLRenderer: THREE.WebGLRenderer) {
  //   this._vrSceneService.webGLRenderer = webGLRenderer;
  // }
}


// let SspTorusSceneFactory = (webGLRenderer: THREE.WebGLRenderer) => {
// let SspTorusSceneFactory = () => {
let SspTorusSceneFactory = (vrScene: VRSceneService) => {
  // console.log(`SspTorusSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspTorusSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  // return new SspTorusSceneService(window.innerWidth, window.innerHeight, vrSceneService);
  return new SspTorusSceneService(window.innerWidth, window.innerHeight, vrScene);
};

export let SspTorusSceneProvider = {
  provide: SspTorusSceneService,
  useFactory: SspTorusSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
}
