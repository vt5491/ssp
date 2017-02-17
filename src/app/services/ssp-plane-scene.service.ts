import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class SspPlaneSceneService implements ISspScene {
  planeMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  sspMesh : THREE.Mesh;
  tag : string;

  constructor(width, height, public vrScene : VRSceneService) {
    this.init();
  }

  init() {
    let planeGeom   = new THREE.PlaneGeometry(50, 50);
    // let planeGeom   = new THREE.PlaneGeometry(100, 100);
    let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });
    // 8000ff makes the plane blue..the same color as the outer scene sky, but the
    // foreground objects are black.
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0x8000ff, side: THREE.DoubleSide });
    // this is a black plane, but with green ship and asteroids
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0x80ff20, side: THREE.DoubleSide });
    // this is blue bg with green fg
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff80, side: THREE.DoubleSide });
    //aabbcc : aa-> the ship..how red it is, bb-> asteroids..how green ,cc-> the plane.. how blue
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff8080, side: THREE.DoubleSide });
    // dark blue plan, green asteroids, yellow ship
    // let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff80, side: THREE.DoubleSide });


    this.planeMesh = new THREE.Mesh(planeGeom, planeMaterial);
    this.planeMesh.name = "abc";
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
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspPlaneSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspPlaneSceneProvider = {
  provide: SspPlaneSceneService,
  useFactory: SspPlaneSceneFactory,
  deps: [VRSceneService]
}
