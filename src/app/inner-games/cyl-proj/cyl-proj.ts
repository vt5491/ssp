/// <reference path="../../../../typings/index.d.ts" />
// import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {SSPRuntime} from '../../sspruntime';

@Injectable()
export class CylProj implements SSPRuntime {
  // abc: number = 7
  webGLRenderer: THREE.WebGLRenderer;
  bufferGamePlaneTexture: THREE.WebGLRenderTarget;
  projCyl: THREE.Mesh;
  bufferGamePlaneScene: THREE.Scene;
  bufferSceneCamera: THREE.PerspectiveCamera;
  webVrManager: any;
  cylHeight = 3;
  cylWidth = 3;

  // constructor(public vrepScene: VREPScene, public vrRenderer: VRRenderer) {
  constructor() {
    this.webGLRenderer = new THREE.WebGLRenderer({ antialias: true, });
    this.webGLRenderer.setClearColor(0x1313f3, 1.0);
  }

  init() {

  }

  animationLoop() {

  }
}
