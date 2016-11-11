/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspCylSceneService } from './ssp-cyl-scene.service';

describe('Service: SspCylScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspCylSceneService]
    });
  });

  it('should ...', inject([SspCylSceneService], (service: SspCylSceneService) => {
    expect(service).toBeTruthy();
  }));
});
