import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class SspPlaneSceneService implements ISspScene {
// export class SspPlaneSceneService extends SspSceneService {
  planeMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  tag : string;


  // constructor(width, height, private _vrSceneService: VRSceneService) {
  constructor(width, height, public vrScene : VRSceneService) {
    // super();
    console.log(`SspplaneSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let planeGeom   = new THREE.PlaneGeometry(50, 50);
    // let planeGeom   = new THREE.PlaneGeometry(100, 100);
    let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });

    this.planeMesh = new THREE.Mesh(planeGeom, planeMaterial);
    this.planeMesh.name = "abc";
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.planeMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.planeMesh;
    this.sspMaterial = planeMaterial;

    this.tag = 'plane';
    // // add a GridHelper
    // let gridHelper = new THREE.GridHelper(10, 10);
    // gridHelper.rotateX(Math.PI / 180.0 * 90.0);
    // this.vrSceneService.scene.add(gridHelper);
  };

  outerCameraTrack(avatarInfo: IMainCharacterInfo, 
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService 
    ) {
    outerVrScene.dolly.position.x = (<any>avatarInfo.pos).x * 6.0 + cameraKbdHandler.deltaX;
    outerVrScene.dolly.position.y = (<any>avatarInfo.pos).y * 6.0 + cameraKbdHandler.deltaY;
    };
    // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}


let SspPlaneSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspCylSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  // return new SspPlaneSceneService(window.innerWidth, window.innerHeight, vrSceneService);
  return new SspPlaneSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspPlaneSceneProvider = {
  provide: SspPlaneSceneService,
  useFactory: SspPlaneSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService]
}
