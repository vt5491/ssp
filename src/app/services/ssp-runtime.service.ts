import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { SspCylSceneService } from './ssp-cyl-scene.service';
import { InnerGame } from '../interfaces/inner-game';
import { WebGLRenderTargetProvider } from './utils.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { UtilsService } from './utils.service';

@Injectable()
@Component({
  providers: [WebGLRenderTargetProvider]
})
export class SspRuntimeService {

  outerVrScene : VRSceneService;
  webGLRenderer : THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  offscreenImageBuf : THREE.DataTexture;
  innerSceneCamera: THREE.PerspectiveCamera;
  isPresenting : boolean;
  innerGameWidth : number;
  innerGameHeight : number;

  constructor(
    public outerSspScene: ISspScene, 
    private _offscreenBuffer : THREE.WebGLRenderTarget,
    public innerGame: InnerGame,
    public cameraKbdHandler : CameraKbdHandlerService,
    private _utils : UtilsService
    ) { 
      this.outerVrScene = this.outerSspScene.vrScene;

      this.webGLRenderer = this.outerVrScene.webGLRenderer;
      this.webGLRenderer.setClearColor(0x1313f3, 1.0);
      this.webGLRenderer.domElement.id = 'webGLRenderer';
      document.body.appendChild( this.webGLRenderer.domElement );

      this.gl_webGLRenderer = this.webGLRenderer.getContext();
      console.log(`gl_webGLRenderer=${this.webGLRenderer}`);

      this.initOffscreenImageBuf();

      this.initInnerSceneCamera();

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

    this.utils.stats.begin();
    // update the innerGame
    (<any>this.innerGame).updateScene();

    let avatarInfo : IMainCharacterInfo = this.innerGame.getMainCharacterInfo();

    // map the outer camera coordinates to that of the main inner game avatar
    // so we "track" the inner game's main game object
    if (this.utils.parms.enableCameraTracking) {
      this.outerSspScene.outerCameraTrack(avatarInfo, this.outerVrScene, this.cameraKbdHandler);
    };

    // render the inner game into to offscreen buffer.
    this.webGLRenderer.render(
      this.innerGame.scene,
      this.innerSceneCamera,
      this.offscreenBuffer
    );

    try {
      // note: readPixels puts the result into the fourth function arg
      // e.g this.offscreenImageBuf.image.data
      this.gl_webGLRenderer.readPixels(0, 0,
        window.innerWidth, window.innerHeight,
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
    if (!(<any>this.outerVrScene.vrEffect).isPresenting) {
    }
    else {
      if( !this.isPresenting) {
      // have to get rid of orbitControls once in full vr mode, as it seems
      // to intercept the key presses.
        this.isPresenting = true;
        console.log(`SspRuntime.mainloop: now disposing of orbitControls`);
        this.outerVrScene.orbitControls.dispose();
      }
    }

    this.outerVrScene.webVrManager.render(this.outerVrScene.scene, this.outerVrScene.camera);

    this.utils.stats.end();
  }

  initOffscreenImageBuf() {
    // let webglEl = document.getElementById('webGLRenderer');
    //TODO: you should probably just go off this.outerVrScene.webGLRenderer
    // actually webGlRenderer.size.width is unknown to typescript
    let webglEl = this.outerVrScene.webGLRenderer.domElement;
    console.log(`SspRuntimeService.ctor: offsetWidth= ${webglEl.offsetWidth}, offsetHeight=${webglEl.offsetHeight}`);
    this.innerGameWidth = webglEl.offsetWidth * 1.0;
    this.innerGameHeight = webglEl.offsetHeight * 1.0;
    this.offscreenImageBuf = this.generateDataTexture(this.innerGameWidth, this.innerGameHeight, new THREE.Color(0x000000));
  };

  initInnerSceneCamera() {
    this.innerSceneCamera = new THREE.PerspectiveCamera(75, this.innerGameWidth / this.innerGameHeight);
    // this.innerSceneCamera.position.z = -5.0;
    this.innerSceneCamera.position.z = 5.0;
  };

  onResize(event) {
    console.log(`SspRuntimeService.onResize: now handling resize event`);
    this.initOffscreenImageBuf();
    this.initInnerSceneCamera();
  }

  // Getters and Setters
  get offscreenBuffer(): THREE.WebGLRenderTarget {
    return this._offscreenBuffer;
  };

  get utils(): UtilsService {
    return this._utils;
  };
}
