import * as THREE from 'three';
import mapImg from './map.png'
var Sphere = function(analyser) {
  var shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
  var map = function(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  }

  var camAngle = 0,
      camRadius = 25, 
      sphereRotationSpeed = 0.001,
      points = [],
      minScale = 0.05,
      maxScale = 1.5,
      minOpacity = 0.01,
      maxOpacity = 1.0;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 1 ).normalize();
  scene.add(light);


  var geometry = new THREE.SphereGeometry( 10, 24, 24 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true, opacity: 0} );
  var sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  
  var spheresPivot = new THREE.Object3D();
  sphere.add( spheresPivot );
  var pointTexture = new THREE.TextureLoader().load(mapImg);

  geometry.vertices = shuffle(geometry.vertices);
  var geoLen = geometry.vertices.length / 5;
  for (var i=0 ; i<geoLen ; i++){
   var ran = Math.random();
   var size = Math.random() * (0.2 - 0.001) + 0.001;
   var size = 1;
   var addPos = 0;
   if(ran < 0.3){
     size = 2;
     addPos = 0.05;
   }else if(ran < 0.6){
     size = 3;
     addPos = 0.2;
   }
   var r = Math.floor(255 * (0.5 + 0.5 * Math.random()));
   var g = Math.floor(255 * (0.5 + 0.5 * Math.random()));
   var b = Math.floor(255 * (0.5 + 0.5 * Math.random()));
   var pointGeometry = new THREE.Geometry();
   var pointMaterial = new THREE.PointsMaterial({ 
     size: size, 
     color:  new THREE.Color("rgb("+r+", "+g+", "+b+")"),
     map : pointTexture,
     blending: THREE.AdditiveBlending, 
     depthTest: false, 
     transparent : true,
     opacity : Math.random()
   });
   pointMaterial.originSize = size;
   var x, y, z;
   x = geometry.vertices[i].x + geometry.vertices[i].x*addPos;  
   y = geometry.vertices[i].y + geometry.vertices[i].y*addPos;  
   z = geometry.vertices[i].z + geometry.vertices[i].z*addPos; 

   pointGeometry.vertices.push(new THREE.Vector3(x, y, z));
   points.push(new THREE.Points(pointGeometry, pointMaterial));
   spheresPivot.add(points[i]);
  }
  var pLen = points.length;
  console.log('pLen : ' + pLen);
  

  this.loop = function animate() {
    var bufferLength = analyser.frequencyBinCount;
    var soundArr = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(soundArr);
    soundArr = JSON.parse(JSON.stringify(soundArr));
    var total = 0;
    for (var i=0 ; i< pLen; i++){
      total += soundArr[i];
      points[i].material.size = points[i].material.originSize * map(soundArr[i*5], 0, 255, minScale, maxScale);
      points[i].material.opacity = map(soundArr[i*5], 0, 255, minOpacity, maxOpacity);
    }
    var avg = total / pLen;
    spheresPivot.rotation.x -= sphereRotationSpeed * map(avg, 0, 255, 1, 15);
    // spheresPivot.rotation.y -= sphereRotationSpeed * 2;
    // spheresPivot.rotation.z -= sphereRotationSpeed * 3;

    camera.position.x = camRadius * Math.cos( camAngle );  
    camera.position.z = camRadius * Math.sin( camAngle );
    camera.lookAt( sphere.position );
    camAngle += 0.01;
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
};


export default Sphere;