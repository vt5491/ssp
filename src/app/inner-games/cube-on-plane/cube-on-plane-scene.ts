/*
import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {VRScene} from '../../vrscene';
import {VRSceneProvider} from '../../vrscene';
import {VRRenderer} from '../../vrrenderer'
import {Base} from '../../base'
import {CameraKeypressEvents} from '../../camera-keypress-events'
import Mesh = THREE.Mesh;
import {MultiPlane} from '../../multi-plane'
import {VRRuntime} from '../../vrruntime'

@Component ({
  selector: 'cube-on-plane-scene',
  providers: [VRSceneProvider]
})

@Injectable()
export class CubeOnPlaneScene implements VRRuntime{
  cube2: Mesh
  private cubeQuat = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0,1,0), Base.ONE_DEG * 0.2 );
  childDummy: THREE.Vector3 = new THREE.Vector3();

  constructor(public vrScene: VRScene, public vrRenderer: VRRenderer) {
  }

  init () {
    console.log('CubeOnPlaneScene.init: entered')

    var geometry = new THREE.PlaneGeometry( 65, 40, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Base.ONE_DEG * 90.0)
    this.vrScene.scene.add( plane );

    var geometry2 = new THREE.BoxGeometry(35, 25, 25);
    var meshParms2 = new Object();

    meshParms2['color'] = 0x8080ff;

    var material2 = new THREE.MeshBasicMaterial(meshParms2);
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.vrScene.scene.add(this.cube2);

    console.log("CubeOnPlaneScene.init: about to get a MultiPlane")
    var multiPlane = new MultiPlane()
    console.log("CubeOnPlaneScene.init: this.multiPlane=" + multiPlane)
    for (var i=0; i < multiPlane.planeMeshes.length; i++) {
      this.vrScene.scene.add(multiPlane.planeMeshes[i])
    }
    this.vrRenderer.renderer.render(this.vrScene.scene, this.vrScene.camera);
  }

  mainLoop () {
    window.requestAnimationFrame(CubeOnPlaneScene.prototype.mainLoop.bind(this));

    this.cube2.quaternion.multiply(this.cubeQuat);

    this.vrScene.vrControls.update();

    this.vrScene.webVrManager.render(this.vrScene.scene, this.vrScene.camera);
  }

}
*/