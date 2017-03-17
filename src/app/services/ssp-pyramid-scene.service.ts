import { Injectable } from '@angular/core';
import { VRSceneService, VRSceneServiceProvider } from './vr-scene.service';
import { ISspScene} from '../interfaces/ssp-scene';
// import { SspSceneService} from './ssp-scene.service';
import { IMainCharacterInfo } from '../interfaces/main-character-info';
import { CameraKbdHandlerService } from './camera-kbd-handler.service';
import {BaseService} from './base.service';
import {UtilsService} from './utils.service';
// declare var THREE.OBJLoader: any;

// Note: Use a cube projection on the UV map in blender for best results. 

@Injectable()
export class SspPyramidScene implements ISspScene {
  pyramidMesh: THREE.Mesh;
  public sspSurface : THREE.Mesh;
  public sspMaterial : THREE.MeshBasicMaterial;
  sspMesh : THREE.Mesh;
  tag : string;
  // base: BaseService;
  // utils: UtilsService;
  animations : [any];
  kfAnimations : [any];
  lastTimestamp = 0;
  animationProgress = 0;
  animationDuration = 1;

  constructor(width, height, public vrScene : VRSceneService, 
    public base: BaseService, public utils: UtilsService) {
    console.log(`SspPyramidSceneService.constructor: entered`);
    //this.init();
    // this.base = new BaseService();
    // this.initScene();
    this.sspSurface = new THREE.Mesh();
    this.sspMaterial = new THREE.MeshBasicMaterial();

    // let light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // this.vrScene.scene.add( light );

    let pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-50, 0, 0);
    this.vrScene.scene.add(pointLight);

    this.animations = [] as any;
    this.kfAnimations = [] as any;

    // this.initScene2();
    // this.initScene3();
    // this.initScene();
  }

//   init() {
// //     var geometry = new THREE.CylinderGeometry( 1, TILE_SIZE*3, TILE_SIZE*3, 4 );
// // var material = new THREE.MeshBasicMaterial( {color: 0xffff00 , wireframe:true} );
//     let pyramidGeom   = new THREE.CylinderGeometry(1, 50, 50, 4);
//     let pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0080  });


//     this.pyramidMesh = new THREE.Mesh(pyramidGeom, pyramidMaterial);
//     // this.planeMesh.rotateX(Base.ONE_DEG * 90.0);
//     this.vrScene.scene.add(this.pyramidMesh);

//     // assign to the api level var 'sspSurface', so other components using this
//     // component know what to draw on.
//     this.sspSurface = this.pyramidMesh;
//     this.sspMaterial = pyramidMaterial;

//     this.tag = 'pyramid';
//   };

  // initScene() {
  init() {
    // return this.initJsonLoad();
    // return this.initObjLoad();
    let promise = this.initColladaLoad();
    // this.initLuxorScene();
    // return this.initColladaLoad();
    return promise;
  }

  initJsonLoad() {
    let sspSurfaceUpdateFn = this.utils.sspSurfaceUpdateFn.bind(this);
    let sspMaterialUpdateFn = this.utils.sspMaterialUpdateFn.bind(this);

    let initDonePromise = new Promise((initDoneResolve, initDoneReject) => {
      let loadPromise = this.utils.loadJsonModel('../../assets/models/luxorPyramidScene.json',
      // let loadPromise = this.utils.loadJsonModel('../../assets/models/luxor_pyramid_decorated.dae',
        this.vrScene.scene, 'Pyramid', sspSurfaceUpdateFn, sspMaterialUpdateFn);

      loadPromise.then( () => {
        console.log(`SspPyramidScene.init: now rotating objects in scene`);
        
        // this.vrScene.scene.rotateY(Math.PI / 2.0); 
        // compensate for blender 
        for (var i= 0; i < this.vrScene.scene.children.length; i++) {
          var object = this.vrScene.scene.children[i];
          if (object instanceof THREE.Mesh) {
            object.rotateX(-Math.PI / 2.0);

            if(object.name === 'WCircle') {
              // object.rotateY(-this.base.ONE_DEG * 10);
              // object.rotateZ(-this.base.ONE_DEG * 20);
              object.rotateX(-this.base.ONE_DEG * 90);
            }
            // if(object.name === 'Ground') {
            if(object.name !== 'Pyramid') {
              object.material = new THREE.MeshBasicMaterial({
                side : THREE.DoubleSide, color: Math.random() * 500000 + 500000});
            }
            // else if(object.name === 'BillBoard') {
            //   object.material = new THREE.MeshBasicMaterial({
            //     side : THREE.DoubleSide, color : 0xd6c1b6 });
            // }
            // object.rotateY(Math.PI / 4.0);
            // object.rotateZ(Math.PI / 8.0);
          }
        }
        // for (var i=0; i < this.vrScene.scene.children.length; i)

        initDoneResolve();
      })
    })
    // return this.utils.loadJsonModel( '../../assets/models/luxorPyramidScene.json', 
    // this.vrScene.scene, 'Pyramid', sspSurfaceUpdateFn, sspMaterialUpdateFn);

    return initDonePromise;
  }

  initObjLoad() {
    let sspSurfaceUpdateFn = this.utils.sspSurfaceUpdateFn.bind(this);
    let sspMaterialUpdateFn = this.utils.sspMaterialUpdateFn.bind(this);

    let initDonePromise = new Promise((resolve, reject) => {
      let loadPromise = this.utils.loadObjModel(
        '../../assets/models/luxorPyramidScene.mtl',
        '../../assets/models/luxorPyramidScene.obj',
        this.vrScene.scene, 'Pyramid', sspSurfaceUpdateFn, sspMaterialUpdateFn);

      loadPromise.then( () => {
        console.log(`SspPyramidScene.initObjLoad: now in loadPromise`);
        resolve("init done");
      })
    })

    return initDonePromise;
  }

  initColladaLoad() {
    let sspSurfaceUpdateFn = this.utils.sspSurfaceUpdateFn.bind(this);
    let sspMaterialUpdateFn = this.utils.sspMaterialUpdateFn.bind(this);
    let setAnimationsClosure = (newAnimations) => {
      console.log('SspCylScene.init: now in animationsUpdateClosure');
      this.animations = newAnimations;
    };

    let initDonePromise = new Promise((resolve, reject) => {
      let loadPromise = this.utils.loadColladaModel(
        // '../../assets/models/welcome-to-las-vegas-2.dae',
        '../../assets/models/luxor_pyramid_decorated.dae',
        // '../../assets/models/sand_dune_hills.dae',
        this.vrScene.scene, 'Pyramid', 
        sspSurfaceUpdateFn, sspMaterialUpdateFn,
        setAnimationsClosure, this.kfAnimations 
        );

      loadPromise.then( () => {
        console.log(`SspPyramidScene.initColladaLoad: now in loadPromise`);
        // this.sspSurface = this.vrScene.scene.getObjectByName('ground').children[0] as THREE.Mesh; 
        // this.sspMaterial = this.sspSurface.material;
        this.initLuxorScene();
        resolve("init done");
      })
    })

    return initDonePromise;
  }

  initLuxorScene() {
    this.sspSurface = this.vrScene.scene.getObjectByName('luxorTower').children[0] as THREE.Mesh;

    // apply sand_dune texture to the ground
    // let sandDuneTexture = new THREE.TextureLoader().load( "../../assets/img/sand_dune_simple.jpg" );
//     sandDuneTexture = THREE.ImageUtils.loadTexture("../../assets/img/sand_dune_simple.jpg", {}, function() {
//     renderer.render(scene);
// }),
    let loader = new THREE.TextureLoader();

    // loader.load("../../assets/img/sand_dune_simple.jpg", (texture) => {
    loader.load("../../assets/img/sand_dune_ripples.jpg", (texture) => {
      console.log(`now setting ground texture`);
      // texture.repeat.set( 2, 2 );
      let ground = this.vrScene.scene.getObjectByName('ground').children[0] as THREE.Mesh;
      // ground.material = new THREE.MeshPhongMaterial({ map: texture });
      ground.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      ground.material.needsUpdate = true;
    })
    loader.load("../../assets/img/CGSkies_0038_free.jpg", (texture) => {
      // add a sky
      // let skyGeo = new THREE.SphereGeometry(100000, 25, 25);
      // let skyGeo = new THREE.SphereGeometry(100, 25, 25);
      let skyGeo = new THREE.SphereGeometry(500, 500, 500);
      console.log(`now setting sky texture`);
      // let material = new THREE.MeshPhongMaterial({
      //   map: texture,
      // });
      let material = new THREE.MeshBasicMaterial({
        // color: 0x806040
        map: texture
      });
      let sky = new THREE.Mesh(skyGeo, material);
      sky.material.side = THREE.BackSide;
      sky.material.needsUpdate = true;
      this.vrScene.scene.add(sky);
    })
    // let texture = THREE.ImageUtils.loadTexture( "../../assets/img/CGSkies_0038_free.jpg" );
  }

  initScene1() {
      // var loader = new THREE.JSONLoader();
      var loader = new THREE.ObjectLoader();

      loader.load(
        '../../assets/models/luxorPyramidScene.json',
        // ( objs, materials ) => {
        ( objs ) => {
          console.log("SspPyramidScene.initScene: now loading pyramidObj");
          let pyramidObj = (objs as any).getObjectByName("Pyramid");
          // let pyramidObj = objs.getObjectByName("Pyramid");
          let pyramidMaterial = new THREE.MeshBasicMaterial(
            {color: 0x008080,
             wireframe: false,
           })
          // this.pyramidMesh = new THREE.Mesh( pyramidObj.geometry, pyramidMaterial );
          this.pyramidMesh = pyramidObj;
          // Note: calling any rotate method *translates* the mesh to below the ground Plane
          // this.pyramidMesh.rotateZ(this.base.ONE_DEG * -1.0);
          // this.pyramidMesh.rotateZ(Math.PI / 180.0 * 0.0);
          // this.pyramidMesh.position.x = 0;
          // Have to raise the pyramid by 4x the scale factor, for unknown reasons.  This was
          // determined empirically.
          this.pyramidMesh.position.y += 100;
          // this.pyramidMesh.position.z = 0;
          // this.pyramidMesh = new THREE.Mesh( pyramidObj, pyramidMaterial );
          // this.pyramidMesh = pyramidObj;
          this.pyramidMesh.scale.set(25, 25, 25);

          this.vrScene.scene.add(this.pyramidMesh);
          // this.vrScene.scene.add(pyramidObj);

          // assign to the api level var 'sspSurface', so other components using this
          // component know what to draw on.
          this.sspSurface = this.pyramidMesh;
          this.sspMaterial = pyramidMaterial;

          // add any other meshes.
          let groundObj = (objs as any).getObjectByName("GroundPlane");
          groundObj.scale.set(50,50,50);
          this.vrScene.scene.add(groundObj);
        })
  }

  initScene2() {
    var loader = new THREE.ObjectLoader();

    var promise = new Promise( (resolve, reject) => {
      loader.load(
        '../../assets/models/luxorPyramidSceneFull.json',
        ( blenderScene ) => {
          console.log("SspPyramidScene.initScene: now loading pyramidSceneFull: blenderScene.children.length=" + blenderScene.children.length);
          let pyramidMaterial = new THREE.MeshBasicMaterial(
            {color: 0x008080,
              wireframe: false,
              side: THREE.DoubleSide
          });
          for (var i = 0; i < blenderScene.children.length; i++) {
            console.log("SspPyramidScene.initScene: blenderScene.children.length=" + blenderScene.children.length);
            // Note: bug in three.js if you directly refer to the loaded mesh.  When you add to the
            // scene it will delete *some other* element from the blenderScene.children array.
            // So we have to manually create our mesh and copy in the blenderScene's child geometry
            // and material
            // var mesh = blenderScene.children[i] as THREE.Mesh;
            // var mesh = JSON.parse(JSON.stringify(blenderScene.children[i])) as THREE.Mesh;
            var blenderMesh = blenderScene.children[i] as THREE.Mesh;
            // var mesh = new THREE.Mesh(blenderMesh.geometry as THREE.Geometry, pyramidMaterial);
            var mesh = new THREE.Mesh(blenderMesh.geometry as THREE.Geometry, blenderMesh.material || pyramidMaterial);
            // mesh.material = pyramidMaterial;
            mesh.name = blenderMesh.name;
            console.log(`SspPyramidScene.initScene: mesh.name=${mesh.name}`);

            mesh.scale.set(1,1,1);
            if (mesh.name === 'Pyramid') {
              this.pyramidMesh = mesh as any;
              this.sspSurface = this.pyramidMesh;
              this.sspMaterial = pyramidMaterial;
              this.pyramidMesh.material = pyramidMaterial;
              mesh.scale.set(25,25,25);
            }

            this.vrScene.scene.add(mesh);
          }
          var light = new THREE.AmbientLight( 0x404040 ); // soft white light
          this.vrScene.scene.add( light );
          resolve("loaded");
        })
      });

      return promise
    }

    initScene3() {
      console.log('now in initScene3');
      var promise = new Promise(function(resolve, reject) {
        // var mtlLoader = new THREE.MTLLoader() as any;
        var mtlLoader = new (THREE as any).MTLLoader( );
        mtlLoader.setPath( '../../assets/models' );
        mtlLoader.load( 'welcome-to-las-vegas-2.mtl', function( materials ) {
          console.log(`loadObjModel: materials=${materials}`);
          materials.preload();
          // var loader = new THREE.OBJLoader();
          var loader = new (THREE as any).OBJLoader();
          loader.setMaterials(materials);
          loader.load( '../../assets/models/welcome-to-las-vegas-2.obj', function(object) {

            console.log(`loadObjModel: object.children.length=${object.children.length}`);
            for (var i = 0; i < object.children.length; i++) {
              // let defaultMat = new THREE.MeshBasicMaterial(
              //   {
              //     color: Math.random() * 500000 + 500000,
              //     wireframe: false,
              //     side: THREE.DoubleSide
              //   }
              // );
              let obj = object.children[i];
              console.log(`SspPyramidScene.initScene3: obj.name=${obj.name}`);

              if( obj instanceof THREE.Mesh) {
              // if( obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
                // let mesh= new THREE.Mesh(obj.geometry, defaultMat);
                // mesh.scale.set(25,25,25);
                obj.scale.set(25,25,25);
                // if (obj.name === 'Pyramid_Plane.001') {
                if (obj.name.match(/Pyramid2/)) {
                  this.pyramidMesh = obj as any;
                  this.sspSurface = this.pyramidMesh;
                  this.sspMaterial = obj.material;
                  this.pyramidMesh.material = obj.material;
                  // mesh.scale.set(25,25,25);
                }
                this.vrScene.scene.add(obj);
              }
            }
            resolve("loadedObj");
          }.bind(this), () => {}, () => {} );
        }.bind(this));
      }.bind(this))
      return promise;

    }

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

// let SspPyramidSceneFactory = (vrSceneService: VRSceneService) => {
let SspPyramidSceneFactory = (vrSceneService: VRSceneService, 
  base: BaseService, utils: UtilsService) => {
  // console.log(`SspCylSceneFactor.ctor: entered`);
  var width = window.innerWidth
  var height = window.innerHeight

  // return new SspPyramidScene(window.innerWidth, window.innerHeight, vrSceneService);
  return new SspPyramidScene(window.innerWidth, window.innerHeight, 
    vrSceneService, base, utils);
};

export let SspPyramidSceneProvider = {
  provide: SspPyramidScene,
  useFactory: SspPyramidSceneFactory,
  // deps: [VRSceneService]
  deps: [VRSceneService, BaseService, UtilsService]
}
