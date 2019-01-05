const canvas = document.querySelector('#playground')
const ctx    = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true;
// canvas.width  = window.innerWidth
// canvas.height = window.innerHeight

const halfWidth  = canvas.width / 2
const halfHeight = canvas.height / 2


// ################################## Upload Image ##################################

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var imgOnLoad = false;
var drawing = new Image();
var scaleRatio = 1;


window.addEventListener("load", drawDefault, true);

function drawDefault(){                     
    imgOnLoad = false;
    drawing.src = "images/default_icns.png"; // can also be a remote URL e.g. http://           
    drawing.onload = function(){
      imgOnLoad = true;
    };            

}                 

function handleImage(e){
  var reader = new FileReader();
  imgOnLoad = false;
  reader.onload = function(event){
      drawing = new Image();
      drawing.onload = function(){
          imgOnLoad = true;
          rendering()
      }
      drawing.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);     
}


// ################################## Dat GUI ##################################

var isControl = false;

var params = {
  loadFile : function() { 
    document.getElementById('imageLoader').click();
  }
};

const options = {
  n: 4,
  r: 60,
  percentage: 40,
  radius:53,
  // r_percentage:97.4,
  width: 300,
  height: 300,
  round_position_x:0,
  round_position_y:0,
  img_position_x:0,
  img_position_y:0,
  tl:true,
  tr:true,
  bl:true,
  br:true,
  open_sketch_smooth:true,
  open_sketch_round:false,
  open_squircles:false,
  open_superellipse:false,
  is_fill:false,
  is_img:false,
}

var radiusThereShold = 100;

var gui0,gui1,gui2,gui3,gui4,gui5,gui6,gui7,gui8,gui9,gui10,gui11,gui12,gui13,gui14,gui15,gui16,gui17,gui18,gui19,gui20;


const gui = new dat.GUI( { autoPlace: true, width: 300 } );
gui.close();

gui0 = gui.add(options, 'open_sketch_smooth').name("Sketch Smooth");
gui1 = gui.add(options, 'radius', 0, 100).step(.2).name("Percentage");
gui2 = gui.add(options, 'open_sketch_round').name("Sketch Round");
gui3 = gui.add(options, 'r', 0, 100).step(.5).name("Percentage")
gui4 = gui.add(options, 'open_squircles').name("Squircles");
gui5 = gui.add(options, 'n', 2, 40).step(.2).name("Factor");
gui6 = gui.add(options, 'open_superellipse').name("Superellipse");
gui7 = gui.add(options, 'percentage', 0, 100).step(.5).name("Percentage")

gui8 = gui.add(options, 'tl').name("Top-Left");
gui9 = gui.add(options, 'tr').name("Top-Reft");
gui10 =gui.add(options, 'bl').name("Bottom-Left");
gui11 = gui.add(options, 'br').name("Bottom-Right");

gui12 = gui.add(options, 'is_fill').name("Fill");

gui13 =gui.add(options, 'width', 0, 1080).step(5).name("Width(px)")
gui14 = gui.add(options, 'height', 0, 1080).step(5).name("Height(px)")
gui15 = gui.add(options, 'round_position_x', -1200, 1200).step(2).name("PosX(px)")
gui16 = gui.add(options, 'round_position_y', -1200, 1200).step(2).name("PosY(px)")
gui17 = gui.add(options, 'img_position_x', -1200, 1200).step(2).name("ImagePosX(px)")
gui18 = gui.add(options, 'img_position_y', -1200, 1200).step(2).name("ImagePosY(px)")

gui19 = gui.add(options, 'is_img').name("Show Image");
gui20 = gui.add(params, 'loadFile').name('Upload Image');

var guiN = [gui0,gui1,gui2,gui3,gui4,gui5,gui6,gui7,gui8,gui9,gui10,gui11,gui12,gui13,gui14,gui15,gui16,gui17,gui18,gui19,gui20]

for (let i = 0; i < guiN.length; i++) {
    
  guiN[i].onChange(function(value){
    // loop()
    isControl = true;
    rendering();
  });

  guiN[i].onFinishChange(function(value) {
    // Fires when a controller loses focus.
    isControl = false;
  });
}



// ################################## Rendering ##################################

const rendering = () => {
  if(!imgOnLoad){
    window.requestAnimationFrame(rendering)
  }
  else{

  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if(options.is_img){
    ctx.drawImage(drawing,halfWidth - drawing.width/2/scaleRatio + options.img_position_x/2,halfHeight - drawing.height/2/scaleRatio + options.img_position_y/scaleRatio,drawing.width/scaleRatio,drawing.height/scaleRatio);
  }

  if(options.open_sketch_smooth){


    if(options.radius == 100){
      drawSketchRoundCorners(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)
    }
    else{
      drawSketchSmoothCorners(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)

    }

    var realRadius = options.radius/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("Round Radis - " + Math.round(realRadius).toString() , 200, 200);
    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(10, 10, 10, 0.7)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.strokeStyle = 'rgba(10, 10, 10, 0.7)'
      ctx.fillStyle = 'rgba(10, 10, 10, 0.7)'
      ctx.fill()
    }
  }


  if(options.open_sketch_round){

    drawSketchRoundCorners(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.r/100*Math.min(options.width/2,options.height/2)/scaleRatio,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)

    var realRadius = options.r/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("Round Radis - " + Math.round(realRadius).toString() , 200, 200);

    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(238, 82, 23, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.strokeStyle = 'rgba(238, 82, 23, 0.8)'
      ctx.fillStyle = 'rgba(238, 82, 23, 0.8)'
      ctx.fill()
    }
  }


  if(options.open_squircles){

    drawSquirclesSmoothCorners(ctx, {width: options.width/scaleRatio, height: options.height/scaleRatio}, options.n, halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)
    //Black

    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(144, 19, 254, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.strokeStyle = 'rgba(144, 19, 254, 0.8)'
      ctx.fillStyle = 'rgba(144, 19, 254, 0.8)'
      ctx.fill()
    }

  }


  if(options.open_superellipse){
    
    drawSuperellipseSmoothCorners(ctx, {width:options.width/scaleRatio, height: options.height/scaleRatio}, options.percentage,options.percentage,halfWidth+options.round_position_x/scaleRatio, halfHeight+options.round_position_y/scaleRatio,options.tl,options.tr,options.bl,options.br)

    var realRadius = options.percentage/100*Math.min(options.width/2,options.height/2)/scaleRatio;
    ctx.font = "48px PingFang serif";
    ctx.strokeText("Round Radis - " + Math.round(realRadius).toString() , 200, 200);

    //Orange
    if(!options.is_fill){
      ctx.strokeStyle = 'rgba(27, 156, 252, 0.8)'
      ctx.lineWidth=4;
      ctx.stroke()
    }
    else{
      ctx.strokeStyle = 'rgba(27, 156, 252, 0.8)'
      ctx.fillStyle = 'rgba(27, 156, 252, 0.8)'
      ctx.fill()
    }
  }

}

rendering()