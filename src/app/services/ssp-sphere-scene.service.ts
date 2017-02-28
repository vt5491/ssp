import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class SspSphereScene implements ISspScene {
  sphereMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  sspMesh : THREE.Mesh;
  tag : string;


  constructor(width, height, public vrScene : VRSceneService) {
    console.log(`SspSphereSceneService.ctor: entered`);
    this.init();
  }

  init() {
    this.getSphereMesh();
    /*
    // Note: scaling up has no effect as everyting is basically "scale invariant"
    // let sphereGeom   = new THREE.SphereGeometry(50, 50, 50);
    let sphereGeom   = new THREE.SphereBufferGeometry(50, 50, 50);

    // let sphereGeom   = new THREE.SphereGeometry(100, 100, 100);
    let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });

    this.sphereMesh = new THREE.Mesh(sphereGeom, sphereMaterial);
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.sphereMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.sphereMesh;
    this.sspMaterial = sphereMaterial;

    this.tag = 'sphere';
    */
  };

  getSphereMesh() {
    var loader = new THREE.JSONLoader();

    loader.load(
      '../../assets/models/pool_ball.json',
      ( geometry, materials ) => {
        let poolBallMaterial = new THREE.MeshBasicMaterial(
          {color: 0x008080,
           wireframe: false,
         })
        this.sphereMesh = new THREE.Mesh( geometry, poolBallMaterial );
        this.sphereMesh.scale.set(50,50,50);

        this.vrScene.scene.add(this.sphereMesh);

        // assign to the api level var 'sspSurface', so other components using this
        // component know what to draw on.
        this.sspSurface = this.sphereMesh;
        this.sspMaterial = poolBallMaterial;
      })
  }

  outerCameraTrack(avatarInfo: IMainCharacterInfo,
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService
    ) {};
    // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}

let SspSphereSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspSphereScene(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspSphereSceneProvider = {
  provide: SspSphereScene,
  useFactory: SspSphereSceneFactory,
  deps: [VRSceneService]
}
