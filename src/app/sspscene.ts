/// <reference path="../../typings/index.d.ts" />
import {Injectable} from '@angular/core';
import {Injector} from '@angular/core';
import {Provider} from '@angular/core';
import Object3D = THREE.Object3D;
import Vector3 = THREE.Vector3;
import Scene = THREE.Scene;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import VRControls = THREE.VRControls;
import VREffect = THREE.VREffect;

export class SSPScene {
  scene: THREE.Scene;
  camera: PerspectiveCamera;
  dolly: Object3D;
  vrControls: VRControls;
  vrEffect: VREffect;
  webVrManager;

  constructor(vrRenderer?) {
    this.scene = new THREE.Scene;

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    this.camera.name = 'ssp-scene-camera'
    this.camera.position.set(0, 1.5, 100);

    this.dolly = new THREE.Object3D();
    this.dolly.position.z = 50;
    this.scene.add(this.dolly);
  }
}
