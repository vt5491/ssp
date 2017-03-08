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
  sspMesh : THREE.Mesh;
  can : THREE.Mesh;
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
  //vt add
  // instantiate a loader
  var loader = new THREE.JSONLoader();

  // return
  // load a resource
  loader.load(
  	// resource URL
  	'../../assets/models/vt_can_5.json',
  	// Function when resource is loaded
  	// function ( geometry, materials ) {
  	( geometry, materials ) => {
      console.log("SspCylSceneService.load: now loading can")
  		// var material = new THREE.MultiMaterial( materials );
      // let brickTexture = new THREE.TextureLoader().load( "assets/bricks.jpg" );
      // let cokeTexture = new THREE.TextureLoader().load( "assets/coke-label.jpg" );
    let cokeTexture = new THREE.TextureLoader().load( "../../assets/coke-label.jpg" );
      let brickTexture = new THREE.TextureLoader().load( "../../assets/bricks.jpg" );
      // let brickTexture = new THREE.TextureLoader().load( "/assets/bricks.jpg" );
      // let canMaterial =  new THREE.MultiMaterial( materials );//no good
      let canMaterial = new THREE.MeshBasicMaterial(
        {color: 0x008080,
         wireframe: false,
        //  map: brickTexture
         map: cokeTexture
       })
      // canMaterial.map = brickTexture;
      // let cangeometry   = new THREE.CylinderBufferGeometry(this.radius, this.radius, 80, 50);// works
      let cangeometry   = geometry;
  		this.can = new THREE.Mesh( cangeometry, canMaterial );//work
  		// this.can = new THREE.Mesh( geometry, canMaterial );//no work
      // this.can.scale.set(15, 25, 15);
      // this.can.scale.set(10, 10, 10);
      this.can.name = "can";
      this.can.position.x = 60.0;
  		// scene.add( object );
      this.vrScene.scene.add(this.can);
  //vt end
    // let cokeTexture = new THREE.TextureLoader().load( "assets/coke-label.jpg" );
    // let cokeTexture = new THREE.TextureLoader().load( "../../assets/coke-label.jpg" );
    console.log(`SspCylSceneService.init: texture=${cokeTexture}`);
      // canMaterial.map = cokeTexture;

    let cylMaterial = new THREE.MeshBasicMaterial(
      { color: 0xff0080, wireframe: false, side: THREE.DoubleSide,
        // map: texture
      });

    this.cylMesh = new THREE.Mesh(cylGeom, cylMaterial);
    this.cylMesh.name = "abe";
    this.vrScene.scene.add(this.cylMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    this.sspSurface = this.cylMesh;
    this.sspMaterial = cylMaterial;
    this.sspMesh = this.cylMesh;

    this.tag = 'cyl';
    //vt add
  }); // end the load func
    //vt end
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
