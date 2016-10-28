/* tslint:disable:no-unused-variable */

// import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { SSPScene} from './sspscene';

describe('SSPScene', () => {
  let sspScene: SSPScene;
  let dummyCanvas = document.createElement('canvas');
  let webGLRenderer: THREE.WebGLRenderer;
  // let webVRManager: (<any>document)WebVRManager;
  let webVRManager: any; 

  let mockWebVRManager: any;

  mockWebVRManager = function() {
    return {};
  };

  // ovverride the root WebVRManager
  (<any>window).WebVRManager = mockWebVRManager;

  beforeEach(() => {
    var glParms = new Object();

    glParms['antialias'] = true;
    glParms['canvas'] = dummyCanvas;

    webGLRenderer = new THREE.WebGLRenderer(glParms);
    console.log(`beforeEach: webGLRenderer.getSize=${webGLRenderer.getSize()}`);
    sspScene = new SSPScene(webGLRenderer);
  });

  it('should create an instance', () => {
    // expect(new SSPScene()).toBeTruthy();
    expect(sspScene).toBeTruthy();
  });

  it('should have a camera', () => {
    // debugger;
    expect(sspScene.camera).toBeTruthy();
  });

  it('should have all the necessary objects', () => {
    //debugger;
    expect(sspScene.dolly).toBeTruthy();
    expect(sspScene.vrControls).toBeTruthy();
    expect(sspScene.vrEffect).toBeTruthy();
    expect(sspScene.webVRManager).toBeTruthy();
  });
});
