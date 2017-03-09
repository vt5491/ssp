/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspPyramidScene, SspPyramidSceneProvider } from './ssp-pyramid-scene.service';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import {BaseService} from './base.service';
import {UtilsService} from './utils.service';

describe('Service: SspPyramidScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspPyramidSceneProvider, VRSceneServiceProvider, BaseService, UtilsService]
    });
  });

  it('should ...', inject([SspPyramidScene], (service: SspPyramidScene) => {
    expect(service).toBeTruthy();
  }));
});
