import { IMainCharacterInfo } from './interfaces/main-character-info';

export interface InnerGame {

  scene : THREE.Scene;
  getMainCharacterInfo() : IMainCharacterInfo; 
  // getMainCharacterInfo() : Object; 
}
