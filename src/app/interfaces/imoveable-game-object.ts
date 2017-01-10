export interface IMoveableGameObject {
  vx : number;
  vy : number;
  mesh : THREE.Mesh;
  tag : string;

  //collisionHandler() : IMoveableGameObject[] | boolean | null;
  collisionHandler() : any[] | boolean | null;
}
