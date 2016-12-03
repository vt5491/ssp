/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspSphereScene, SspSphereSceneProvider } from './ssp-sphere-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';

describe('Service: SspSphereScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspSphereSceneProvider, VRSceneServiceProvider]
    });
  });

  it('should ...', inject([SspSphereScene], (service: SspSphereScene) => {
    expect(service).toBeTruthy();
  }));
});
