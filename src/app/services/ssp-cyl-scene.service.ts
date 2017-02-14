import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class SspCylSceneService implements ISspScene {
  cylMesh : THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  //TODO: add this to ISspScene
  tag : string;
  radius : number;
  DEFAULT_RADIUS = 25;

  constructor(width, height, public vrScene: VRSceneService, radius? : number) {
    console.log(`SspCylSceneService.ctor: entered`);
    this.radius = radius || this.DEFAULT_RADIUS;

    this.init();
  }

  init() {
    let cylGeom   = new THREE.CylinderBufferGeometry(this.radius, this.radius, 80, 50);
    // let texture = THREE.ImageUtils.loadTexture('assets/coke-label.jpg');
      // instantiate a loader
    // let loader = new THREE.TextureLoader();

    // // load a resource
    // loader.load(
    //   // resource URL
    //   'assets/coke-label.jpg',
    //   // Function when resource is loaded
    //   (texture) => {
    //     // do something with the texture
    //     // var material = new THREE.MeshBasicMaterial({
    //     //   map: texture
    //     let cylMaterial = new THREE.MeshBasicMaterial(
    //       { color: 0xff0080, wireframe: false, side: THREE.DoubleSide, map: texture });

    //     this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    //     this.cylMesh.name = "abe";
    //     this.vrScene.scene.add(this.cylMesh);

    //     // assign to the api level var 'sspSurface', so other components using this
    //     // component know what to draw on.
    //     this.sspSurface = this.cylMesh;
    //     this.sspMaterial = cylMaterial;

    //     this.tag = 'cyl';
    //     // });
    //   }
    //   // // Function called when download progresses
    //   // function (xhr) {
    //   //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //   // },
    //   // // Function called when download errors
    //   // function (xhr) {
    //   //   console.log('An error happened');
    //   // }
    // );
    // var texture = new THREE.ImageUtils.loadTexture("images/test_COL.jpg");
    let texture = new THREE.TextureLoader().load( "assets/coke-label.jpg" );
    console.log(`SspCylSceneService.init: texture=${texture}`);
    
    let cylMaterial = new THREE.MeshBasicMaterial(
      { color: 0xff0080, wireframe: false, side: THREE.DoubleSide, map: texture });

    this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    this.cylMesh.name = "abe";
    this.vrScene.scene.add(this.cylMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.cylMesh;
    this.sspMaterial = cylMaterial;

    this.tag = 'cyl';
  };

  // move the outer camera such that it tracks the position of the mainCharacter
  // of the inner game
  outerCameraTrack(
    avatarInfo: IMainCharacterInfo, 
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService ) {

    let trackingInfo: any = this.getNormalizedTrackingCoords(avatarInfo.pos['x'], avatarInfo.pos['y'], avatarInfo.pos['z'], 4.0);

    let cameraRadius = this.radius * 3.0;

    outerVrScene.dolly.position.x = trackingInfo.x * cameraRadius + cameraKbdHandler.deltaX;
    outerVrScene.dolly.position.y = trackingInfo.y * 15.0 + cameraKbdHandler.deltaY;
    outerVrScene.dolly.position.z = trackingInfo.z * cameraRadius + cameraKbdHandler.deltaZ;

    outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotQuat);
  };
  // return camera tracking coordinates given a position from the 
  // inner game.  The coords are normalized to a unit circle (or distance)
  // and then scaled up by the client.
  getNormalizedTrackingCoords(innerX: number, innerY: number, innerZ: number, boundVal: number): Object {
    let result = <any>{};

    let theta = (Math.PI / boundVal) * innerX; 
    theta += Math.PI;

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
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspCylSceneService(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspCylSceneProvider = {
  provide: SspCylSceneService,
  useFactory: SspCylSceneFactory,
  deps: [VRSceneService]
}
