import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';

@Injectable()
export class SspCubeScene implements ISspScene {
  cubeMesh: THREE.Mesh;
  sspSurface : THREE.Mesh;
  sspMaterial : THREE.MeshBasicMaterial;
  tag : string;

  constructor(width, height, public vrScene : VRSceneService) {
    console.log(`SspCubeSceneService.ctor: entered`);
    this.init();
  }

  init() {
    let cubeGeom   = new THREE.CubeGeometry(50, 50, 50);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });
    // let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080 });

    let len = 25;
    var geo = new THREE.Geometry();

    geo.vertices = [
      new THREE.Vector3(len, len, len),
      new THREE.Vector3(len, len, -len),
      new THREE.Vector3(len, -len, len),
      new THREE.Vector3(len, -len, -len),

      new THREE.Vector3(-len, len, -len),
      new THREE.Vector3(-len, len, len),
      new THREE.Vector3(-len, -len, -len),
      new THREE.Vector3(-len, -len, len)
    ];

    geo.faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4),
    ];

    // var faceuv = [
    //   new THREE.Vector2(0, 0),
    //   new THREE.Vector2(0, 0.66),
    //   new THREE.Vector2(1, 0.66),
    //   new THREE.Vector2(1, 0),
    //   new THREE.Vector2(0.25, 0.66),
    //   new THREE.Vector2(0.25, 1),
    //   new THREE.Vector2(0.75, 1),
    //   new THREE.Vector2(0.75, 0.66)
    // ];

    // geo.faceVertexUvs[0] = [];
    // geo.faceVertexUvs[0][0] = [faceuv[0], faceuv[1], faceuv[2]];
    // geo.faceVertexUvs[0][1] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][2] = [faceuv[4], faceuv[5], faceuv[6]];
    // geo.faceVertexUvs[0][3] = [faceuv[4], faceuv[6], faceuv[7]];

    // var faceuv = [
    //   new THREE.Vector2(0,0),
    //   new THREE.Vector2(0,1),
    //   new THREE.Vector2(1,0),
    //   new THREE.Vector2(1,1),
    // ];
    // var lower_bound = 0.5;
    // var upper_bound = 1.0;
    // var faceuv = [
    //   new THREE.Vector2(lower_bound, lower_bound),
    //   new THREE.Vector2(lower_bound, upper_bound),
    //   new THREE.Vector2(upper_bound, lower_bound),
    //   new THREE.Vector2(upper_bound, upper_bound),
    // ];
    // var faceuv = [
    //   new THREE.Vector2(0, 0),
    //   new THREE.Vector2(0, lower_bound),
    //   new THREE.Vector2(lower_bound, 0),
    //   new THREE.Vector2(lower_bound, lower_bound),

    //   new THREE.Vector2(lower_bound, lower_bound),
    //   new THREE.Vector2(lower_bound, upper_bound),
    //   new THREE.Vector2(upper_bound, lower_bound),
    //   new THREE.Vector2(upper_bound, upper_bound),
    // ];

    // var bound_1 = 0.33;
    // var bound_2 = 0.66;
    // var bound_3 = 1.0;

    // var faceuv = [
    //   new THREE.Vector2(0, 0),
    //   new THREE.Vector2(0, bound_1),
    //   new THREE.Vector2(bound_1, 0),
    //   new THREE.Vector2(bound_1, bound_1),

    //   new THREE.Vector2(bound_1, bound_1),
    //   new THREE.Vector2(bound_1, bound_2),
    //   new THREE.Vector2(bound_2, bound_1),
    //   new THREE.Vector2(bound_2, bound_2),

    //   new THREE.Vector2(bound_2, bound_2),
    //   new THREE.Vector2(bound_2, bound_3),
    //   new THREE.Vector2(bound_3, bound_2),
    //   new THREE.Vector2(bound_3, bound_3),
    // ];
    // geo.faceVertexUvs[0] = [];
    // geo.faceVertexUvs[0][0] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][1] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][2] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][3] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][4] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][5] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][6] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][7] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][8] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][9] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][10] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][11] = [faceuv[0], faceuv[2], faceuv[3]];

    var lower_bound = 0.5;
    var upper_bound = 1.0;

    var faceuv = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 0.66),
      new THREE.Vector2(1, 0.66),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(0.25, 0.66),
      new THREE.Vector2(0.25, 1),
      new THREE.Vector2(0.75, 1),
      new THREE.Vector2(0.75, 0.66)
    ];

    geo.faceVertexUvs[0] = [];
    geo.faceVertexUvs[0][0] = [faceuv[0], faceuv[1], faceuv[2]];
    geo.faceVertexUvs[0][1] = [faceuv[0], faceuv[2], faceuv[3]];
    geo.faceVertexUvs[0][2] = [faceuv[4], faceuv[5], faceuv[6]];
    geo.faceVertexUvs[0][3] = [faceuv[4], faceuv[6], faceuv[7]];       

    geo.faceVertexUvs[0][4] = [faceuv[0], faceuv[1], faceuv[2]];
    geo.faceVertexUvs[0][5] = [faceuv[0], faceuv[2], faceuv[3]];
    geo.faceVertexUvs[0][6] = [faceuv[4], faceuv[5], faceuv[6]];
    geo.faceVertexUvs[0][7] = [faceuv[4], faceuv[6], faceuv[7]];       

    geo.faceVertexUvs[0][8] = [faceuv[0], faceuv[1], faceuv[2]];
    geo.faceVertexUvs[0][9] = [faceuv[0], faceuv[2], faceuv[3]];
    geo.faceVertexUvs[0][10] = [faceuv[4], faceuv[5], faceuv[6]];
    geo.faceVertexUvs[0][11] = [faceuv[4], faceuv[6], faceuv[7]];       
    geo.faceVertexUvs[0][12] = [faceuv[1], faceuv[0], faceuv[3]];

    geo.faceVertexUvs[0][13] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][12] = [faceuv[5], faceuv[4], faceuv[7]];
    // geo.faceVertexUvs[0][13] = [faceuv[4], faceuv[6], faceuv[7]];
    // geo.faceVertexUvs[0][12] = [faceuv[9], faceuv[8], faceuv[11]];
    // geo.faceVertexUvs[0][13] = [faceuv[8], faceuv[10], faceuv[11]];
    // geo.faceVertexUvs[0][2] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][3] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][4] = [faceuv[5], faceuv[4], faceuv[7]];
    // geo.faceVertexUvs[0][5] = [faceuv[4], faceuv[6], faceuv[7]];
    // geo.faceVertexUvs[0][6] = [faceuv[5], faceuv[4], faceuv[7]];
    // geo.faceVertexUvs[0][7] = [faceuv[4], faceuv[6], faceuv[7]];
    // geo.faceVertexUvs[0][8] = [faceuv[9], faceuv[8], faceuv[11]];
    // geo.faceVertexUvs[0][9] = [faceuv[8], faceuv[10], faceuv[11]];
    // geo.faceVertexUvs[0][10] = [faceuv[9], faceuv[8], faceuv[11]];
    // geo.faceVertexUvs[0][11] = [faceuv[8], faceuv[10], faceuv[11]];
    // geo.faceVertexUvs[0][4] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][5] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][4] = [faceuv[5], faceuv[4], faceuv[7]];
    // geo.faceVertexUvs[0][5] = [faceuv[4], faceuv[6], faceuv[7]];
    // geo.faceVertexUvs[0][6] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][7] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][8] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][9] = [faceuv[0], faceuv[2], faceuv[3]];
    // geo.faceVertexUvs[0][10] = [faceuv[1], faceuv[0], faceuv[3]];
    // geo.faceVertexUvs[0][11] = [faceuv[0], faceuv[2], faceuv[3]];

    geo.computeFaceNormals();

    // this.cubeMesh = new THREE.Mesh(cubeGeom, cubeMaterial);
    this.cubeMesh = new THREE.Mesh(geo, cubeMaterial);
    // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
    this.vrScene.scene.add(this.cubeMesh);

    // assign to the api level var 'sspSurface', so other components using this
    // component know what to draw on.
    // this.sspSurface = this.cubeMesh;
    // this.sspMaterial = cubeMaterial;

    this.tag = 'cube';
    // add a GridHelper
    // let gridHelper = new THREE.GridHelper(10, 10);
    // gridHelper.rotateX(Math.PI / 180.0 * 90.0);
    // this.vrSceneService.scene.add(gridHelper);
    var loader = new THREE.JSONLoader();
    // loader.load('vendor/models/torus_3js.json', function(geometry) {
    console.log(`SspCubeScene.ctor: calling load on json file`);
    loader.load('two_face_cube.json', (geometry) => {
      console.log(`SspCubeScene.ctor: now loading json file`);

      // var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xbb80bb, side: THREE.DoubleSide }));
      let cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });
      var mesh = new THREE.Mesh(geometry, cubeMaterial2);
      mesh.position.x = 60;
      mesh.position.y = -10;
      mesh.position.z = 10;
      mesh.scale.set(20, 20, 20);

      mesh.rotateY(-Math.PI / 2.0);

      console.log(`SspCubeScene.ctor: mesh=${mesh}`);
      this.vrScene.scene.add(mesh);

      // assign to the api level var 'sspSurface', so other components using this
      // component know what to draw on.
      this.sspSurface = mesh;
      this.sspMaterial = cubeMaterial2;
      // let cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0080, side: THREE.DoubleSide });
    });
  };

  outerCameraTrack(avatarInfo: IMainCharacterInfo, 
    outerVrScene: VRSceneService,
    cameraKbdHandler: CameraKbdHandlerService 
    ) {};
    // Getters and Setters
  // get vrSceneService(): VRSceneService {
  //   return this._vrSceneService;
  // };
  // set vrSceneService(theVrSceneService: VRSceneService) {
  //   this._vrSceneService = theVrSceneService;
  // }
}

let SspCubeSceneFactory = (vrSceneService: VRSceneService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  return new SspCubeScene(window.innerWidth, window.innerHeight, vrSceneService);
};

export let SspCubeSceneProvider = {
  provide: SspCubeScene,
  useFactory: SspCubeSceneFactory,
  deps: [VRSceneService]
}
