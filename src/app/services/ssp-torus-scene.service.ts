///<reference path="../../../typings/index.d.ts" />
import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { UtilsService } from './utils.service';

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
  sspMesh : THREE.Mesh;
  tag : string;
  torusRadius : number;
  tubeRadius : number
  cameraRadius : number
  lastTorusAngle : number;
  lastTubeAngle : number;
  DEFAULT_TORUS_RADIUS = 100;
  DEFAULT_TUBE_RADIUS = 25;
  DEFAULT_CAMERA_RADIUS_MULTIPLIER = 6.0;
  hotSpot : THREE.Mesh;
  torusArm : THREE.Object3D;
  tubeArm : THREE.Object3D;
  // constructor(width, height, webGLRenderer: THREE.WebGLRenderer) {
  // constructor(width, height, private _vrSceneService: VRSceneService) {
  constructor(
    width,
    height,
    public vrScene: VRSceneService,
    private _utils : UtilsService,
    torusRadius?,
    tubeRadius?) {
    // super();
    console.log(`SspTorusSceneService.ctor: entered`);

    this.torusRadius = torusRadius || this.DEFAULT_TORUS_RADIUS;
    this.tubeRadius = tubeRadius || this.DEFAULT_TUBE_RADIUS;
    this.cameraRadius = this.tubeRadius * this.DEFAULT_CAMERA_RADIUS_MULTIPLIER;
    this.init();
  }

  init() {
    // let torusGeom   = new THREE.TorusGeometry( 25, 8, 50, 50);
    // let torusGeom   = new THREE.TorusBufferGeometry(100, 18, 50, 50);
    let torusGeom   = new THREE.TorusBufferGeometry(this.torusRadius, this.tubeRadius, 50, 50);
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

    //tmp add a hotspot circle
    // let circGeom = new THREE.CircleBufferGeometry(0.03, 8);
    let geom = new THREE.CubeGeometry(1, 10, 120);
    let circMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide});

    this.hotSpot = new THREE.Mesh(geom, circMaterial);

    // this.vrScene.scene.add(this.hotSpot);
    //setup the "2-arm" parent-child cluster for the camera tracking.
    // see plunker https://plnkr.co/edit/BsxsDnvJFJhOamLidf1b?p=info
    this.torusArm = new THREE.Object3D();
    this.tubeArm = new THREE.Object3D();
    this.tubeArm.position.x = this.torusRadius;

    this.torusArm.add(this.tubeArm);
    this.vrScene.scene.add(this.torusArm);

    // if camera tracking is enabled then we need to add the camera dolly onto the
    // two-arm "complex".
    if (this.utils.parms.enableCameraTracking) {
      this.tubeArm.add(this.vrScene.dolly);
      // this.torusArm.add(this.vrScene.dolly);
      this.vrScene.dolly.position.x = this.cameraRadius;
      this.vrScene.dolly.position.y = 0;
      this.vrScene.dolly.position.z = 0;

      this.tubeArm.add(this.hotSpot);
    }
    this.lastTorusAngle = 0.0 * Math.PI / 1.0;
    this.lastTubeAngle = 0.0 * Math.PI / 1.0;
  }

  outerCameraTrack(avatarInfo: IMainCharacterInfo,
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService
    )
  {
    // var torusAngle = 7.0 * Math.PI / 4.0;
    //TODO: parameterize this
    let boundVal = 4.0;
    let innerX = avatarInfo.pos['x'];
    let innerY = avatarInfo.pos['y'];

    let torusAngle = (Math.PI / boundVal) * innerX;
    // torusAngle += Math.PI / 1.0; //adjust so ship is in view
    torusAngle += Math.PI / 1.0; //adjust so ship is in view
    let torusAxis = new THREE.Vector3(0,0,1);
    this.torusArm.rotateOnAxis(torusAxis, torusAngle - this.lastTorusAngle);
    // this.torusArm.setRotationFromAxisAngle(torusAxis, torusAngle);

    let tubeAngle = (Math.PI / boundVal) * innerY;
    tubeAngle += Math.PI;
    // let tubeAngle2 = tubeAngle + Math.PI / 2.0;
    // let perpVector
    // let tubeAxis = new THREE.Vector3(Math.cos(tubeAngle), Math.sin(tubeAngle), 0);
    // works
    let tubeAxis = new THREE.Vector3(Math.cos(torusAngle + Math.PI / 2.0), Math.sin(torusAngle + Math.PI / 2.0), 0);
    // works too
    // let tubeAxis = new THREE.Vector3(Math.sin(torusAngle ), Math.cos(torusAngle), 0);
    // tubeAxis.applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI / 2.0);
    this.tubeArm.rotateOnAxis(tubeAxis, tubeAngle - this.lastTubeAngle);
    // this.tubeArm.setRotationFromAxisAngle(tubeAxis, tubeAngle);

    // outerVrScene.dolly.lookAt(this.torusArm.position);

    this.lastTorusAngle = torusAngle;
    this.lastTubeAngle = tubeAngle;
  };

  outerCameraTrack_old(avatarInfo: IMainCharacterInfo,
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService
    ) {
      let trackingInfo: any = this.getNormalizedTrackingCoords(avatarInfo.pos['x'], avatarInfo.pos['y'], avatarInfo.pos['z'], 4.0);

    // let cameraRadius = this.tubeRadius * 5.0;

    // outerVrScene.dolly.position.x = trackingInfo.x * cameraRadius - this.torusRadius * Math.cos(trackingInfo.torusTheta) + cameraKbdHandler.deltaX;
    // outerVrScene.dolly.position.y = trackingInfo.y * 1.0 - this.torusRadius * Math.sin(trackingInfo.torusTheta) + cameraKbdHandler.deltaY;
    // outerVrScene.dolly.position.z = trackingInfo.z * cameraRadius + cameraKbdHandler.deltaZ;

    // // console.log(`SspTorusSceneService.outerCameraTrack: dolly.position.x=${outerVrScene.dolly.position.x}`);
    // outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotTubeQuat);

    // Object3D.rotateOnAxis( axis, angle );
    // let axis = new THREE.Vector3(Math.cos(trackingInfo.torusTheta), Math.sin(trackingInfo.torusTheta), 0);
    // let axis = new THREE.Vector3(Math.sin(trackingInfo.torusTheta), Math.cos(trackingInfo.torusTheta), 0);
    // outerVrScene.dolly.rotateOnAxis(axis, trackingInfo.tubeTheta);
    // torus level
    let torusCameraRadius = this.torusRadius * 2.0;
    /*
    outerVrScene.dolly.position.x = trackingInfo.xTorus * torusCameraRadius cameraKbdHandler.deltaX;
    outerVrScene.dolly.position.y = trackingInfo.yTorus * torusCameraRadius + cameraKbdHandler.deltaY;
    outerVrScene.dolly.position.z = trackingInfo.zTorus * 1.0 + cameraKbdHandler.deltaZ;

    // outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotTubeQuat);

    // console.log(`SspTorusSceneService.outerCameraTrack: dolly.position.x=${outerVrScene.dolly.position.x}
    //   ,y=${outerVrScene.dolly.position.y}
    //   ,z=${outerVrScene.dolly.position.z}`
    // );

    // add in tube level deltas
    let tubeCameraRadius = this.tubeRadius * 5.0;

    // outerVrScene.dolly.position.x += trackingInfo.x * tubeCameraRadius;
    outerVrScene.dolly.position.x += trackingInfo.xTube;
    // outerVrScene.dolly.position.x += trackingInfo.x * tubeCameraRadius * Math.sin(trackingInfo.torusTheta);
    // outerVrScene.dolly.position.y = trackingInfo.y * 1.0 - this.torusRadius * Math.sin(trackingInfo.torusTheta) + cameraKbdHandler.deltaY;
    // outerVrScene.dolly.position.z += trackingInfo.z * tubeCameraRadius;
    outerVrScene.dolly.position.y += trackingInfo.yTube;
    outerVrScene.dolly.position.z += trackingInfo.zTube;
    // outerVrScene.dolly.position.z += trackingInfo.z * tubeCameraRadius * Math.cos(trackingInfo.torusTheta);
    // Object3D.rotateOnAxis( axis, angle );
    let axis = new THREE.Vector3(Math.cos(trackingInfo.torusTheta), Math.sin(trackingInfo.torusTheta),0);
    // outerVrScene.dolly.rotateOnAxis( axis, trackingInfo.tubeTheta );

    outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotTubeQuat);
    // outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotTorusQuat);
    // outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotTorusQuat.multiply(trackingInfo.rotTubeQuat));
    */
    let ti = trackingInfo;

    // this method only works when you're in the xz-plane
    this.hotSpot.position.x = trackingInfo.hotSpot.x;
    this.hotSpot.position.y = trackingInfo.hotSpot.y;
    this.hotSpot.position.z = trackingInfo.hotSpot.z;
    // this.hotSpot.setRotationFromQuaternion(trackingInfo.rotTubeQuat);
    // quaternion = new THREE.Quaternion().setFromAxisAngle( axisOfRotation, angleOfRotation );
    // object.rotation.setEulerFromQuaternion( quaternion );
    // object.rotation = new THREE.Euler().setFromQuaternion( quaternion )
    // outerVrScene.dolly.rotation = new THREE.Euler().setFromQuaternion(trackingInfo.tmpQuat);
    let cameraScale = 7.0;
    outerVrScene.dolly.position.x = ti.torusHotSpot.x + ti.tubeHotSpot.x * cameraScale;
    outerVrScene.dolly.position.y = ti.torusHotSpot.y + ti.tubeHotSpot.y * cameraScale;
    outerVrScene.dolly.position.z = ti.torusHotSpot.z + ti.tubeHotSpot.z * cameraScale;

    outerVrScene.dolly.position.x += cameraKbdHandler.deltaX;
    outerVrScene.dolly.position.y += cameraKbdHandler.deltaY;
    outerVrScene.dolly.position.z += cameraKbdHandler.deltaZ;

    outerVrScene.dolly.lookAt(ti.torusHotSpot);
    // Object3D.rotateOnAxis( axis, angle );
    // outerVrScene.dolly.rotateOnAxis(ti.torusHotSpot, ti.torusTheta);

    // console.log(`SsspTorusScene.calcOuter: hs.x=${this.hotSpot.position.x},y=${this.hotSpot.position.y},z=${this.hotSpot.position.z}`);
    };

  getNormalizedTrackingCoords(innerX: number, innerY: number, innerZ: number, boundVal: number): Object {
    let result = <any>{};

    let torusTheta = (Math.PI / boundVal) * innerX;
    let tubeTheta = (Math.PI / boundVal) * innerY;
    tubeTheta += Math.PI / 2.0;
    torusTheta += Math.PI / 1.0;
    result.torusTheta = torusTheta;
    result.tubeTheta = tubeTheta;

    result.x = Math.sin(tubeTheta);
    result.y = innerY;
    result.z = Math.cos(tubeTheta);

    result.xTorus = Math.cos(torusTheta);
    result.yTorus = Math.sin(torusTheta);
    result.zTorus = innerZ;

    result.rotTubeQuat = new THREE.Quaternion();
    // result.rotTubeQuat.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), tubeTheta );
    // let axis = new THREE.Vector3(Math.sin(torusTheta), Math.cos(torusTheta), 0);
    let axis = new THREE.Vector3(result.xTorus, result.yTorus, 0)
      .applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI / 2.0)
      .normalize();
    result.rotTubeQuat.setFromAxisAngle( axis, tubeTheta );
    console.log(`SspTorusSceneService.getNormalizedTrackingCoords: rotTubeQuat=%o`,result.rotTubeQuat);

    result.rotTorusQuat = new THREE.Quaternion();
    result.rotTubeQuat.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), torusTheta );

    // calculate the hot-spot
    // torus level
    let torusHotSpot = new THREE.Vector3();

    torusHotSpot.x = this.torusRadius * Math.cos(torusTheta);
    torusHotSpot.y = this.torusRadius * Math.sin(torusTheta);
    // torusHotSpot.z = innerZ;
    torusHotSpot.z = 0;

    result.torusHotSpot = torusHotSpot;

    // rotate 90 deg about the z axis
    let perpVector = torusHotSpot.clone();
    // perpVector.applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI / 2.0);
    perpVector.applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI / 2.0);
    perpVector.normalize();

    // add in tube level
    let tubeHotSpot = new THREE.Vector3();

    tubeHotSpot.x = this.tubeRadius;
    tubeHotSpot.y = 0;
    tubeHotSpot.z = 0;

    // tubeHotSpot.applyAxisAngle(perpVector, tubeTheta);
    let tmpQuat = new THREE.Quaternion().setFromAxisAngle(perpVector, -tubeTheta + Math.PI / 2.0);
    result.tmpQuat = tmpQuat;
    tubeHotSpot.applyQuaternion(tmpQuat);

    result.tubeHotSpot = tubeHotSpot;
    // console.log(`SspTorusSceneService.getNormalizedTrackingCoords: torusHotSpot.x=${torusHotSpot.x},y=${torusHotSpot.y},z=${torusHotSpot.z}`);
    // console.log(`SspTorusSceneService.getNormalizedTrackingCoords: tubeHotSpot.x=${tubeHotSpot.x},y=${tubeHotSpot.y},z=${tubeHotSpot.z}`);
    result.xTube = tubeHotSpot.x;
    result.yTube = tubeHotSpot.y;
    result.zTube = tubeHotSpot.z;

    result.hotSpot = torusHotSpot.add(tubeHotSpot);

    return result;
  }
  // Getters and Setters
  get utils(): UtilsService {
    return this._utils;
  };
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
let SspTorusSceneFactory = (vrScene: VRSceneService, utils: UtilsService) => {
  // console.log(`SspTorusSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // glRenderer.init(width, height)
  // var webGLRenderer = new THREE.WebGLRenderer({antialias: true});

  // return new SspTorusSceneService(window.innerWidth, window.innerHeight, webGLRenderer);
  // return new SspTorusSceneService(window.innerWidth, window.innerHeight, vrSceneService);
  return new SspTorusSceneService(window.innerWidth, window.innerHeight, vrScene, utils);
};

export let SspTorusSceneProvider = {
  provide: SspTorusSceneService,
  useFactory: SspTorusSceneFactory,
  // deps: [THREE.WebGLRenderer]
  // deps: [VRSceneServiceProvider]
  deps: [VRSceneService, UtilsService]
}
