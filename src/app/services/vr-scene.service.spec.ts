/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: VrScene', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [VRSceneService]
      providers: [VRSceneServiceProvider]
    });
    // this.service = new VRSceneService(100, 100, new THREE.WebGLRenderer());
  });

  it('should ...', inject([VRSceneService], (service: VRSceneService) => {
    expect(service).toBeTruthy();
  }));

  it('init works', inject([VRSceneService], (service: VRSceneService) => {
  // it('init works', () => { 
    // console.log(`ut. torroids.component.spec: ${this.service}`);
    expect(service.dolly).toBeTruthy();
    expect(service.webGLRenderer).toBeTruthy();
  }));

});
