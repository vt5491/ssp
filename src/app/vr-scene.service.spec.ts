/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

fdescribe('Service: VrScene', () => {
  
  beforeEach(() => {
    // TestBed.configureTestingModule({
      // providers: [VRSceneService]
      // providers: [VRSceneServiceProvider];
    // });
    this.service = new VRSceneService(100, 100, new THREE.WebGLRenderer());
  });

  // it('should ...', inject([VRSceneService], (service: VRSceneService) => {
  //   expect(service).toBeTruthy();
  // }));

  // fit('init works', inject([VRSceneService], (service: VRSceneService) => {
  fit('init works', () => { 
    console.log(`ut. torroids.component.spec: ${this.service}`);
    expect(this.service.dolly).toBeTruthy();
    expect(this.service.webGLRenderer).toBeTruthy();
  });

});
