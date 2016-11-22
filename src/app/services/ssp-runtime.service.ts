import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { SspSceneService } from '../services/ssp-scene.service';
import { InnerGame } from '../inner-game';

@Injectable()
export class SspRuntimeService {

  // outerSspScene : SspSceneService;
  outerVrScene : VRSceneService;
  webGLRenderer : THREE.WebGLRenderer;
  gl_webGLRenderer: any;
  offscreenImageBuf : THREE.DataTexture;
  // constructor() { }
  constructor(
    // public outerVrScene: VRSceneService, 
    public outerSspScene: SspSceneService, 
    private _offscreenBuffer : THREE.WebGLRenderTarget,
    public innerGame?: InnerGame
    ) { 
      this.outerVrScene = this.outerSspScene.vrSceneService;

      this.webGLRenderer = this.outerVrScene.webGLRenderer;
      this.gl_webGLRenderer = this.webGLRenderer.getContext();

      //TODO: I have to wrap in an if block only because I can't figure out
      // how to mock an HTMLELEMENT attached to the document.
      if (document.getElementById('webGLRenderer')) {
        let webglEl = document.getElementById('webGLRenderer');
        this.offscreenImageBuf = this.generateDataTexture(webglEl.offsetWidth, webglEl.offsetHeight, new THREE.Color(0x000000));
      }

  }

  generateDataTexture(width, height, color) {
    var size = width * height;
    var data = new Uint8Array(4 * size);

    var texture = new (<any> THREE.DataTexture)(data, width, height, THREE.RGBAFormat)
    texture.needsUpdate = true;

    return texture;
  };

  mainLoop() {
    // console.log(`SspTorusRuntimeService.mainLoop: entered`);
    window.requestAnimationFrame(SspRuntimeService
      .prototype.mainLoop.bind(this));

    // update the innerGame
    if (this.innerGame) {
      (<any>this.innerGame).updateScene();

      // console.log(`SspRuntimeService.mainLoop: asteroid.x=${(<any>this.innerGame).asteroids[0].mesh.position.x}`)
      // render the inner game into to offscreen buffer.
      this.webGLRenderer.render(
        this.innerGame.scene,
        this.outerVrScene.camera,
        this.offscreenBuffer
       );

      try {
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

    }

    this.offscreenImageBuf.needsUpdate = true; //need this
    // this.torusMaterial.map = this.offscreenImageBuf //need this
    let tmp = this.outerSspScene.sspSurface.material as THREE.MeshBasicMaterial;
    tmp.map = this.offscreenImageBuf;
    // this.cylMaterial.map = this.buf1;

    // render to the visible monitor canvas
    this.webGLRenderer.render(
      this.innerGame.scene,
      this.outerVrScene.camera
    );

    // var gl = this.bufferGamePlaneTexture.getContext();
    // outer scene
    // this.vrScene.webVrManager.render(
    //   this.vrScene.scene,
    //   this.vrScene.camera
    // );

    this.outerVrScene.vrControls.update();

    this.outerVrScene.webVrManager.render(this.outerVrScene.scene, this.outerVrScene.camera);
  }

  // Getters and Setters
  get offscreenBuffer(): THREE.WebGLRenderTarget {
    return this._offscreenBuffer;
  };
}
