/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspSceneService, SspSceneServiceProvider } from './ssp-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspSceneServiceProvider, VRSceneServiceProvider]
    });
    // this.sspSceneService = this.injector.get(SspSceneService);
    // this.sspSceneService = inject(SspSceneService);
  });

  // it('should ...', 
  //   inject([VRSceneService], 
  //     // (service: (new SspSceneService(VRSceneService)) => {
  //     vrSceeneService: VRSceneService,
  //     service = new SspSceneService(VRSceneService) => {
  //     expect(service).toBeTruthy();
  // }));

  it('should ctor works', inject([VRSceneService], 
    (vrSceneService : VRSceneService, 
     service = new SspSceneService(vrSceneService)) => {
      expect(service).toBeTruthy();
  }));

  // it ('ctor works', () => {
  //   expect(true).toBeTruthy;
  // })

});
