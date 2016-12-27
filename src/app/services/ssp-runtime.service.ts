import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
// import { SspSceneService } from '../services/ssp-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { SspCylSceneService } from './ssp-cyl-scene.service';
import { InnerGame } from '../inner-game';
import { WebGLRenderTargetProvider } from './utils.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { UtilsService } from './utils.service';

@Injectable()
@Component({
  providers: [WebGLRenderTargetProvider]
})
export class SspRuntimeService {

  // outerSspScene : SspSceneService;
  outerVrScene : VRSceneService;
  webGLRenderer : THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  offscreenImageBuf : THREE.DataTexture;
  innerSceneCamera: THREE.PerspectiveCamera;
  // constructor() { }
  constructor(
    // public outerVrScene: VRSceneService, 
    // public outerSspScene: SspSceneService, 
    public outerSspScene: ISspScene, 
    private _offscreenBuffer : THREE.WebGLRenderTarget,
    public innerGame: InnerGame,
    public cameraKbdHandler : CameraKbdHandlerService,
    private _utils : UtilsService
    ) { 
      this.outerVrScene = this.outerSspScene.vrScene;

      this.webGLRenderer = this.outerVrScene.webGLRenderer;
      // this.webGLRenderer.setClearColor(0xf31313, 1.0);
      this.webGLRenderer.setClearColor(0x1313f3, 1.0);
      // this.webGLRenderer.domElement.id = 'webGLRenderer_outerScene';
      this.webGLRenderer.domElement.id = 'webGLRenderer';
      document.body.appendChild( this.webGLRenderer.domElement );

      this.gl_webGLRenderer = this.webGLRenderer.getContext();
      console.log(`gl_webGLRenderer=${this.webGLRenderer}`);

      //TODO: I have to wrap in an if block only because I can't figure out
      // how to mock an HTMLELEMENT attached to the document.
      // if (document.getElementById('webGLRenderer_outerScene')) {
        // let webglEl = document.getElementById('webGLRenderer_outerScene');
        let webglEl = document.getElementById('webGLRenderer');
        console.log(`SspRuntimeService.ctor: offsetWidth= ${webglEl.offsetWidth}, offsetHeight=${webglEl.offsetHeight}`);
        // this.offscreenImageBuf = this.generateDataTexture(webglEl.offsetWidth, webglEl.offsetHeight, new THREE.Color(0x000000));
        let innerGameWidth = webglEl.offsetWidth * 1.0;
        let innerGameHeight = webglEl.offsetHeight * 1.0;
        // let innerGameWidth = 1024;
        // let innerGameHeight = 1024;
        console.log(`SspRuntime.ctor. innerGameWidth=${innerGameWidth}, innerGameHeight=${innerGameHeight}`);
        
        // this.offscreenImageBuf = this.generateDataTexture(webglEl.offsetWidth * 0.5, webglEl.offsetHeight * 0.5, new THREE.Color(0x000000));
        this.offscreenImageBuf = this.generateDataTexture(innerGameWidth, innerGameHeight, new THREE.Color(0x000000));
      // }

      // this.offscreenImageBuf = this.generateDataTexture(tmp.offsetWidth, tmp.offsetHeight, new THREE.Color(0x000000));
      // this.offscreenImageBuf.needsUpdate = true;
      // this.innerSceneCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
      this.innerSceneCamera = new THREE.PerspectiveCamera(75, innerGameWidth / innerGameHeight);
      this.innerSceneCamera.position.z = -5.0;

  }

  generateDataTexture(width, height, color) {
    var size = width * height;
    var data = new Uint8Array(4 * size);

    var texture = new (<any> THREE.DataTexture)(data, width, height, THREE.RGBAFormat)
    texture.needsUpdate = true;

    return texture;
  };

  mainLoop() {
    window.requestAnimationFrame(SspRuntimeService
      .prototype.mainLoop.bind(this));

    // update the innerGame
    (<any>this.innerGame).updateScene();

    // let info = <IMainCharacterInfo> this.innerGame.getMainCharacterInfo();
    let avatarInfo : IMainCharacterInfo = this.innerGame.getMainCharacterInfo();
    // let tmp = <any> info;
    // console.log(`info.x=${tmp.pos.x},info.y=${tmp.pos.y},info.z=${tmp.pos.z}`);
    // console.log(`SspRuntime.mainLoop: ship.x=${(<any>info.pos).x}, ship.y=${(<any>info.pos).y}`);
    // map the outer camera coordinates to that of the main inner game avatar
    // so we "track" the inner game's main game object
    if (this.utils.parms.enableCameraTracking) {
      this.outerSspScene.outerCameraTrack(avatarInfo, this.outerVrScene, this.cameraKbdHandler);
    };
    // if (this.outerSspScene.tag === 'plane') {
    //   // (<SspPlaneSceneService>this.outerSspScene).outerCameraTrack(avatarInfo, this.outerVrScene, this.cameraKbdHandler);
    //   this.outerSspScene.outerCameraTrack(avatarInfo, this.outerVrScene, this.cameraKbdHandler);
    //   // this.outerVrScene.dolly.position.x = (<any>avatarInfo.pos).x * 6.0 + this.cameraKbdHandler.deltaX;
    //   // this.outerVrScene.dolly.position.y = (<any>avatarInfo.pos).y * 6.0 + this.cameraKbdHandler.deltaY;
    // }
    // else if (this.outerSspScene.tag === 'cyl') {
    //   (<SspCylSceneService>this.outerSspScene).outerCameraTrack(avatarInfo, this.outerVrScene, this.cameraKbdHandler);
    //   // let innerX = info.pos['x'];
    //   // let trackingInfo : any = (<SspCylSceneService>this.outerSspScene)
    //   //   .getNormalizedTrackingCoords(info.pos['x'],info.pos['y'], info.pos['z'], 4.0 );

    //   // console.log(`trackingInfo.x=${trackingInfo.x},trackingInfo.y=${trackingInfo.y},
    //   // trackingInfo.z=${trackingInfo.z},trackingInfo.rotQuat=${trackingInfo.rotQuat}`);  

    //   // let cameraRadius = (<SspCylSceneService>this.outerSspScene).radius * 3.0;

    //   // this.outerVrScene.dolly.position.x = trackingInfo.x * cameraRadius + this.cameraKbdHandler.deltaX;
    //   // // this.outerVrScene.dolly.position.y = trackingInfo.y * 40.0 + this.cameraKbdHandler.deltaY;
    //   // this.outerVrScene.dolly.position.y = trackingInfo.y * 15.0 + this.cameraKbdHandler.deltaY;
    //   // // this.outerVrScene.dolly.position.z = trackingInfo.z * cameraRadius + this.cameraKbdHandler.deltaZ + 50.0;
    //   // this.outerVrScene.dolly.position.z = trackingInfo.z * cameraRadius + this.cameraKbdHandler.deltaZ;

    //   // // this.outerVrScene.dolly.quaternion = trackingInfo.rotQuat;
    //   // this.outerVrScene.dolly.setRotationFromQuaternion(trackingInfo.rotQuat);
    // }

    // render the inner game into to offscreen buffer.
    this.webGLRenderer.render(
      this.innerGame.scene,
      // this.outerVrScene.camera,
      this.innerSceneCamera,
      this.offscreenBuffer
    );

    try {
      // note: readPixels puts the result into the fourth function arg
      // e.g this.offscreenImageBuf.image.data
      this.gl_webGLRenderer.readPixels(0, 0,
        window.innerWidth, window.innerHeight,
        // webGLRendererCanvas.offsetWidth, webGLRendererCanvas.offsetHeight,
        this.gl_webGLRenderer.RGBA,
        this.gl_webGLRenderer.UNSIGNED_BYTE,
        this.offscreenImageBuf.image.data
      );
    }
    catch (e) {
      console.log(`torus.proj.mainLoop: caught error ${e}`)
    }

    // }

    this.offscreenImageBuf.needsUpdate = true; //need this
    this.outerSspScene.sspMaterial.map = this.offscreenImageBuf;

    this.outerVrScene.vrControls.update();

    this.outerVrScene.webVrManager.render(this.outerVrScene.scene, this.outerVrScene.camera);
  }

  // Getters and Setters
  get offscreenBuffer(): THREE.WebGLRenderTarget {
    return this._offscreenBuffer;
  };

  get utils(): UtilsService {
    return this._utils;
  };
}
