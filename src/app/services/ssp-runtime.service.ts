import { Injectable, Component } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from '../services/vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
import { SspCylSceneService } from './ssp-cyl-scene.service';
import { InnerGame } from '../interfaces/inner-game';
import { AsteroidsGame } from '../inner-games/asteroids/asteroids-game';
import { WebGLRenderTargetProvider } from './utils.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import { UtilsService } from './utils.service';
import { BaseService } from './base.service';

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
  gpadFirstPressHandled: boolean[];
  //vt add
  cokeTexture: THREE.Texture;
  brickTexture: THREE.Texture;
  //vt end

  constructor(
    public outerSspScene: ISspScene,
    private _offscreenBuffer : THREE.WebGLRenderTarget,
    public innerGame: InnerGame,
    public cameraKbdHandler : CameraKbdHandlerService,
    private _utils : UtilsService,
    private _base : BaseService
    ) {
      this.outerVrScene = this.outerSspScene.vrScene;

      this.webGLRenderer = this.outerVrScene.webGLRenderer;
      // this.webGLRenderer.setClearColor(0x1313f3, 1.0);
      this.webGLRenderer.setClearColor(0x000020, 1.0);
      this.webGLRenderer.domElement.id = 'webGLRenderer';
      document.body.appendChild( this.webGLRenderer.domElement );

      this.gl_webGLRenderer = this.webGLRenderer.getContext();
      console.log(`gl_webGLRenderer=${this.webGLRenderer}`);

      this.initOffscreenImageBuf();
      //vt add
      // this.outerSspScene.sspMaterial.map = this.offscreenImageBuf;
      //vt end

      this.initInnerSceneCamera();

      this.gpadFirstPressHandled = [];
      for (let i = 0; i <= 16; i++) {
        // this.gpadFirstPressHandled.push(false);
        this.gpadFirstPressHandled[i] = false;
      }
      // console.log(`SspRuntime.ctor: this.base=${this.base}`);
      // console.log(`SspRuntime.ctor: this.utils=${this.utils}`);
      //vt add
      this.cokeTexture = new THREE.TextureLoader().load( "assets/coke-label.jpg" );
      this.brickTexture = new THREE.TextureLoader().load( "assets/bricks.jpg" );
      //vt end
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
    this.gamepadHandler();
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

    // comment out these two lines if doing the coke texture
    // this.offscreenImageBuf.needsUpdate = true; //need this
    // this.outerSspScene.sspMaterial.map = this.offscreenImageBuf;//note: done in ctor now
    //vt add
    // let vertShader = document.getElementById('vertex_shh').innerHTML;
    // let fragShader = document.getElementById('fragment_shh').innerHTML;
    let vertShader = document.getElementById('simple-vertex-shader').innerHTML;
    let fragShader = document.getElementById('simple-fragment-shader').innerHTML;

    let attributes = {};
    let uniforms = {
      // tOne: { type: "t", value: THREE.ImageUtils.loadTexture( "cover.png" ) },
      t1: { type: "t", value: this.cokeTexture },
      // tOne: { type: "t", value: this.offscreenImageBuf },
      // tSec: { type: "t", value: THREE.ImageUtils.loadTexture( "grass.jpg" ) }
      // tSec: { type: "t", value: this.offscreenImageBuf.texture }
      t2: { type: "t", value: this.offscreenImageBuf }
      // tSec: { type: "t", value: this.cokeTexture }
    };

    let defines = {};
    defines[ "USE_MAP" ] = "";

    let material_shader = new THREE.ShaderMaterial({
      uniforms: uniforms,
      // attributes: attributes,
      defines     : defines,
      vertexShader: vertShader,
      fragmentShader: fragShader
    });
    // material_shh
    // material_shh.map = true;
    // material_shh.map = this.offscreenImageBuf;

    this.offscreenImageBuf.needsUpdate = true; //need this
    // this.outerSspScene.sspMaterial.map = this.offscreenImageBuf;
    // this.outerSspScene.sspMaterial = material_shh as any; //needed?
    // (this.outerSspScene as any).can.material.map = this.brickTexture.image;
    // (this.outerSspScene as any).can.material.map = this.brickTexture;
    // (this.outerSspScene as any).can.material.needsUpdate = true;
    // (this.outerSspScene as any).cylMesh.needsUpdate = true;
    // material_shh.needsUpdate = true;//dont need
    // this.outerSspScene.sspMaterial.needsUpdate = true;//dont need
    // (this.outerSspScene as any).cylMesh.material = material_shh;
    this.outerSspScene.sspSurface.material = material_shader;
    // (this.outerSspScene as any).cylMesh.needsUpdate = true;
    // this.outerSspScene.sspMaterial.map = material_shh.map as any;
    // this.outerSspScene.sspMaterial.map = material_shh as any;//gets runtime error
    // material_shh.
    // this.outerSspScene.sspMaterial.map = this.offscreenImageBuf;
    // this.outerSspScene.sspSurface = new THREE.Mesh(this.outerSspScene.sspGeometry, material_shh)
    // this.outerSspScene.sspMaterial.map.needsUpdate = true;
    //vt end

    if (this.outerVrScene.vrControls) {
      this.outerVrScene.vrControls.update();
    }

    if (this.outerVrScene.vrEffect) {
      if (!(<any>this.outerVrScene.vrEffect).isPresenting) {
      }
      else {
        if (!this.isPresenting) {
          // have to get rid of orbitControls once in full vr mode, as it seems
          // to intercept the key presses.
          this.isPresenting = true;
          console.log(`SspRuntime.mainloop: now disposing of orbitControls`);
          this.outerVrScene.orbitControls.dispose();
        }
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

  // buttonPressed(b) {
  //   if (typeof (b) == "object") {
  //     return b.pressed;
  //   }
  //   return b == 1.0;
  // }
    gamepadHandler() : void {
    // handle any gamepad events
    var gPads = navigator.getGamepads ? navigator.getGamepads() : [];

    if (gPads) {
      var gpad = gPads[0];

      if (gpad) {
        if (gpad.buttons[0].pressed && !this.gpadFirstPressHandled[0]) {
          // console.log(`SspRuntime.gamepadHandler: gPad button 0 pressed`);
          this.gpadFirstPressHandled[0] = true;

          (<AsteroidsGame>this.innerGame).shipFiredBullet();
        }
        else if (!gpad.buttons[0].pressed) {
          this.gpadFirstPressHandled[0] = false;
        }

        if (gpad.buttons[2].pressed) {
          // console.log(`SspRuntime.gamepadHandler: gPad button 2 pressed`);
          // scale down the thrust factor by 1/30 since the accel is tuned
          // for the keyboard and kbd events only fire at approx. 1/30 the rate
          // of animationFrame rates.
          (<AsteroidsGame>this.innerGame).shipThrust( 1 / 120);
        }

        // this.ship.theta = gpad.axes[0] * Math.PI;
        // this.ship.theta = this.utils.applyDeadzone(gpad.axes[0], 0.25) * Math.PI;
        let shipRotateAxisValue= this.utils.applyDeadzone(gpad.axes[0], 0.25);

        if (shipRotateAxisValue < 0) {
          (<AsteroidsGame>this.innerGame).ship.theta += (<AsteroidsGame>this.innerGame).ship.deltaTheta * (1/3);
        }
        else if (shipRotateAxisValue > 0) {
          (<AsteroidsGame>this.innerGame).ship.theta -= (<AsteroidsGame>this.innerGame).ship.deltaTheta * (1 / 3);
        }

        // camera movement
        let moveFactor = 1 / 5;
        let rotFactor = 1 / 16;
        if (gpad.buttons[12].pressed && !gpad.buttons[1].pressed) {
          this.outerVrScene.dolly.translateZ(moveFactor * -this.base.CAMERA_MOVE_DELTA);
          // this.outerVrScene.dolly.position.z += moveFactor * -this.base.CAMERA_MOVE_DELTA;
        }
        else if (gpad.buttons[13].pressed && !gpad.buttons[1].pressed) {
          this.outerVrScene.dolly.translateZ(moveFactor * this.base.CAMERA_MOVE_DELTA);
          // this.outerVrScene.dolly.position.z += moveFactor * this.base.CAMERA_MOVE_DELTA;
        }

        if (gpad.buttons[15].pressed && !gpad.buttons[1].pressed) {
          this.outerVrScene.dolly.translateX(moveFactor * this.base.CAMERA_MOVE_DELTA);
          // this.outerVrScene.dolly.position.x += moveFactor * this.base.CAMERA_MOVE_DELTA;
        }
        else if (gpad.buttons[14].pressed && !gpad.buttons[1].pressed) {
          this.outerVrScene.dolly.translateX(moveFactor * -this.base.CAMERA_MOVE_DELTA);
          // this.outerVrScene.dolly.position.x += moveFactor * -this.base.CAMERA_MOVE_DELTA;
        }

        if (gpad.buttons[1].pressed && gpad.buttons[12].pressed) {
          // console.log(`SspRuntime.gamepadHandler: combo buttons 1 and 12 pressed`);
          this.outerVrScene.dolly.translateY(moveFactor * this.base.CAMERA_MOVE_DELTA);
        }
        else if (gpad.buttons[1].pressed && gpad.buttons[13].pressed) {
          // console.log(`SspRuntime.gamepadHandler: combo buttons 1 and 13 pressed`);
          this.outerVrScene.dolly.translateY(moveFactor * -this.base.CAMERA_MOVE_DELTA);
        }

        if (gpad.buttons[1].pressed && gpad.buttons[15].pressed) {
          var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotFactor * this.base.ONE_DEG * this.base.CAMERA_ROT_DELTA);
          this.outerVrScene.dolly.quaternion.multiply(tmpQuat);
        }
        else if (gpad.buttons[1].pressed && gpad.buttons[14].pressed) {
          var tmpQuat = (new THREE.Quaternion()).setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotFactor * this.base.ONE_DEG * -this.base.CAMERA_ROT_DELTA);
          this.outerVrScene.dolly.quaternion.multiply(tmpQuat);
        }

        // camera track
        if (gpad.buttons[3].pressed && !this.gpadFirstPressHandled[3]) {
          console.log(`SspRuntime.gamepadHandler:button 3 pressed`);
          this.utils.parms.enableCameraTracking = !this.utils.parms.enableCameraTracking;
          this.gpadFirstPressHandled[3] = true;
        }
        else if (!gpad.buttons[3].pressed) {
          this.gpadFirstPressHandled[3] = false;
        }
      }
    }
  }


  // Getters and Setters
  get offscreenBuffer(): THREE.WebGLRenderTarget {
    return this._offscreenBuffer;
  };

  get utils(): UtilsService {
    return this._utils;
  };
  get base(): BaseService {
    return this._base;
  };
}
