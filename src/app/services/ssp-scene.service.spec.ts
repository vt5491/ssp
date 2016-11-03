/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SspSceneService } from './ssp-scene.service';

describe('Service: SspScene', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SspSceneService]
    });
  });

  it('should ...', inject([SspSceneService], (service: SspSceneService) => {
    expect(service).toBeTruthy();
  }));
});
