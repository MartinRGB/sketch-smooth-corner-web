
// ################################## Squircles Round Corner Functions ##################################

const drawSquirclesSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  if(size.width>=size.height){
    drawWidthSmoothCorners(ctx, size, n, posX, posY,tl,tr,bl,br)
  }
  else{
    drawHeightSmoothCorners(ctx, size, n, posX, posY,tl,tr,bl,br)
  }
}

const drawWidthSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let m = n
  if (n > radiusThereShold) m = radiusThereShold
  if (n < 0.00000000001) m = 0.00000000001
  
  var mCenterX = posX;
  var mCenterY = posY;

  const rx = size.width / 2 
  const ry = size.height / 2  
  var ratioY = ry/rx

  ctx.beginPath();
  const startX = (-rx)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m))*(ratioY) + mCenterY
  ctx.moveTo(startX, startY)

  //bl
  for (let i = 0; i < ry; i+=0.025) {
    
      var x = (i-rx) + mCenterX 
      var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i*(1/ratioY)-rx),m)),1/m))*(ratioY)+ mCenterY
  
      if(!bl){
        ctx.lineTo(mCenterX-rx, mCenterY+ry);
      }
      else{
        ctx.lineTo(x, y);
      }
    
  }

  //br
  for (let i = ry; i > 0; i-=0.025) {
    var x = (rx-i)  + mCenterX 
    var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i*(1/ratioY)),m)),1/m))*(ratioY)+ mCenterY

    if(!br){
      ctx.lineTo(mCenterX+rx, mCenterY+ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = 0; i < rx; i+=0.025) {
    const x = (rx-i)*(ratioY)  + mCenterX + (rx -ry)
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m))*(ratioY)  + mCenterY

    if(!tr){
      ctx.lineTo(mCenterX + rx,mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = rx; i > 0; i-=0.025) {
    const x = (i - rx)*(ratioY)  + mCenterX - (rx -ry)
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i - rx),m)),1/m))*(ratioY)  + mCenterY

    if(!tl){
      ctx.lineTo(mCenterX-rx, mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath()
}

const drawHeightSmoothCorners = (ctx, size, n, posX, posY,tl,tr,bl,br) => {
  let m = n
  if (n > radiusThereShold) m = radiusThereShold
  if (n < 0.00000000001) m = 0.00000000001
  
  var mCenterX = posX;
  var mCenterY = posY;

  const rx = size.width / 2 
  const ry = size.height / 2  

  ctx.beginPath();
  const startX = (-rx)  + mCenterX
  const startY = (Math.pow(Math.abs(Math.pow(ry,m)-Math.pow(Math.abs(-ry),m)),1/m)) + mCenterY
  ctx.moveTo(startX, startY)

  //bl
  for (let i = 0; i < rx; i+=0.005) {
    
      var x = (i-rx) + mCenterX 
      var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i-rx),m)),1/m))+ mCenterY + (ry-rx)
  
      if(!bl){
        ctx.lineTo(mCenterX-rx, mCenterY+ry);
      }
      else{
        ctx.lineTo(x, y);
      }
    
  }

  //br
  for (let i = rx; i > 0; i-=0.005) {
    var x = (rx-i)  + mCenterX 
    var y = (Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m))+ mCenterY + (ry-rx)

    if(!br){
      ctx.lineTo(mCenterX+rx, mCenterY+ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = 0; i < rx; i+=0.005) {
    const x = (rx-i)  + mCenterX 
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(rx-i),m)),1/m)) + mCenterY - (ry-rx)

    if(!tr){
      ctx.lineTo(mCenterX + rx,mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y);
    }
  }

  //tr
  for (let i = rx; i > 0; i-=0.005) {
    const x = (i - rx)  + mCenterX
    const y = (-Math.pow(Math.abs(Math.pow(rx,m)-Math.pow(Math.abs(i - rx),m)),1/m))  + mCenterY - (ry-rx)

    if(!tl){
      ctx.lineTo(mCenterX-rx, mCenterY-ry);
    }
    else{
      ctx.lineTo(x, y );
    }
  }

  ctx.closePath()
}

// ################################## Sketch Round Corner Functions ##################################

const drawSketchRoundCorners = (ctx, size, r, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2
  // r = Math.min(r,Math.min(size.width,size.height)/2)
    
  ctx.beginPath();
  ctx.moveTo(posX + r, posY);
  if(!tr){
    ctx.lineTo(posX + size.width, posY);
  }
  else{
    ctx.lineTo(posX + size.width - r, posY);
    ctx.bezierCurveTo(posX + size.width - r + getSKRoundRadius(r) , posY,posX + size.width,posY + r - getSKRoundRadius(r), posX + size.width, posY + r);
  }



  if(!br){
    ctx.lineTo(posX + size.width, posY + size.height);
  }
  else{
    ctx.lineTo(posX + size.width, posY + size.height - r);
    ctx.bezierCurveTo(posX+ size.width, posY + size.height - r + getSKRoundRadius(r), posX + size.width - r + getSKRoundRadius(r),posY + size.height,posX+ size.width - r, posY + size.height);
  }

  if(!bl){
    ctx.lineTo(posX, posY + size.height);
  }
  else{
    ctx.lineTo(posX + r, posY + size.height);
    ctx.bezierCurveTo(posX + r - getSKRoundRadius(r), posY + size.height,posX, posY + size.height - r + getSKRoundRadius(r), posX, posY + size.height - r);
  }

  if(!tl){
    ctx.lineTo(posX, posY);
  }
  else{
    ctx.lineTo(posX, posY + r);
    ctx.bezierCurveTo(posX, posY + r - getSKRoundRadius(r),posX + r - getSKRoundRadius(r),posY, posX+ r, posY);
  }
  
  ctx.closePath();      
}


// ################################## Sketch Smooth Corner Functions ##################################

const drawSketchSmoothCorners = (ctx, size, r, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2


  //两端终点
  var ratio;
  if(r/Math.min(size.width/2,size.height/2) > 0.5){
    var percentage = ((r/Math.min(size.width/2,size.height/2)) - 0.5)/0.4
    var clampedPer = Math.min(1,percentage)
    ratio = 1 - (1 - 1.104/1.2819)*clampedPer
  }
  else{
    ratio = 1;
  }
  //两端终点的操控点
  var controlratio;
  if(r/Math.min(size.width/2,size.height/2) > 0.6){
    var percentage = ((r/Math.min(size.width/2,size.height/2)) - 0.6)/0.3
    var clampedPer = Math.min(1,percentage)
    controlratio = 1 + (0.8717/0.8362 - 1)*clampedPer
  }
  else{
    controlratio = 1;
  }

  ctx.beginPath();

  ctx.moveTo(posX + size.width/2 , posY);
  if(!tr){
    ctx.lineTo(posX + size.width, posY);
  }
  else{
    ctx.lineTo(posX + Math.max(size.width/2,size.width - r/100*128.19*ratio), posY);
    ctx.bezierCurveTo(posX + size.width - r/100*83.62*controlratio, posY,posX + size.width - r/100*67.45,posY + r/100*4.64, posX + size.width - r/100*51.16, posY + r/100*13.36);
    ctx.bezierCurveTo(posX + size.width - r/100*34.86, posY + r/100*22.07,posX + size.width - r/100*22.07,posY + r/100*34.86, posX + size.width - r/100*13.36, posY + r/100*51.16);
    ctx.bezierCurveTo(posX + size.width - r/100*4.64, posY + r/100*67.45,posX + size.width,posY + r/100*83.62*controlratio, posX + size.width, posY + Math.min(size.height/2,r/100*128.19*ratio));
  }

  if(!br){
    ctx.lineTo(posX + size.width, posY + size.height);
  }
  else{
    ctx.lineTo(posX + size.width, posY + Math.max(size.height/2,size.height - r/100*128.19*ratio));
    ctx.bezierCurveTo(posX + size.width, posY + size.height - r/100*83.62*controlratio,posX + size.width - r/100*4.64,posY + size.height - r/100*67.45, posX + size.width - r/100*13.36, posY + size.height -  r/100*51.16);
    ctx.bezierCurveTo(posX + size.width - r/100*22.07, posY + size.height - r/100*34.86,posX + size.width - r/100*34.86,posY + size.height - r/100*22.07, posX + size.width - r/100*51.16, posY + size.height - r/100*13.36);
    ctx.bezierCurveTo(posX + size.width - r/100*67.45, posY + size.height - r/100*4.64,posX + size.width - r/100*83.62*controlratio,posY + size.height, posX + Math.max(size.width/2,size.width - r/100*128.19*ratio), posY + size.height);

  }

  if(!bl){
    ctx.lineTo(posX, posY + size.height);
  }
  else{
    ctx.lineTo(posX + Math.min(size.width/2,r/100*128.19*ratio), posY + size.height);
    ctx.bezierCurveTo(posX +  r/100*83.62*controlratio, posY + size.height,posX + r/100*67.45,posY + size.height - r/100*4.64, posX + r/100*51.16, posY + size.height -  r/100*13.36);
    ctx.bezierCurveTo(posX +  r/100*34.86, posY + size.height - r/100*22.07,posX + r/100*22.07,posY + size.height - r/100*34.86, posX + r/100*13.36, posY + size.height - r/100*51.16);
    ctx.bezierCurveTo(posX  + r/100*4.64, posY + size.height - r/100*67.45,posX ,posY + size.height - r/100*83.62*controlratio, posX , posY + Math.max(size.height/2,size.height - r/100*128.19*ratio));
  }

  if(!tl){
    ctx.lineTo(posX, posY);
  }
  else{
    ctx.lineTo(posX, posY + Math.min(size.height/2,r/100*128.19*ratio));
    ctx.bezierCurveTo(posX, posY + r/100*83.62*controlratio,posX + r/100*4.64,posY + r/100*67.45, posX + r/100*13.36, posY + r/100*51.16);
    ctx.bezierCurveTo(posX +  r/100*22.07, posY + r/100*34.86,posX + r/100*34.86,posY +  r/100*22.07, posX + r/100*51.16, posY + r/100*13.36);
    ctx.bezierCurveTo(posX  + r/100*67.45, posY +  r/100*4.64,posX + r/100*83.62*controlratio ,posY, posX + Math.min(size.width/2,r/100*128.19*ratio), posY);  
  }
  
  ctx.closePath();      
}

const getSKRoundRadius = (radius) =>{
  return radius/2+radius/60*Math.PI;
}

// ################################## Superellipse Round Corner Functions ##################################

const drawSuperellipseSmoothCorners = (ctx, size, rx,ry, posX, posY,tl,tr,bl,br) => {
  posX -= size.width / 2
  posY -= size.height / 2

  if (rx < 0) rx = 0;
  if (ry < 0) ry = 0;
  const width = size.width;
  const height = size.height;
  if(width > height)
      rx *= height/width;
  else
      ry *= width/height;

  ctx.beginPath();
  for(let i = 0;i<360;i += 0.01){
    var angle = (i * 2 * Math.PI / 360.0);
    var cosX =  Math.cos(angle);
    var x = Math.pow(Math.abs(cosX),rx/100)*50*Math.abs(cosX + 0.0000000001)/(cosX + 0.0000000001) + 50;
    var sinY = Math.sin(angle);
    var y = Math.pow(Math.abs(sinY),ry/100)*50*Math.abs(sinY + 0.0000000001)/(sinY + 0.0000000001) + 50;
    var percentX = x/100;
    var percentY = y/100;

    if (i == 0)
      ctx.moveTo(percentX*width+posX, percentY*height+posY);
    else if(!br && i<45){
      ctx.lineTo(width+posX, height+posY);
    }
    else if(!br && i>=45 && i<90){
      ctx.lineTo(posX+width/2, height+posY);
    }
    else if(!bl && i>=90 && i<135){
      ctx.lineTo(posX, height+posY);
    }
    else if(!bl && i>=135 && i<180){
      ctx.lineTo(posX, height/2+posY);
    }
    else if(!tl && i>=180 && i<225){
      ctx.lineTo(posX, posY);
    }
    else if(!tl && i>=225 && i<270){
      ctx.lineTo(posX+width/2, posY);
    }
    else if(!tr && i>=270 && i<315){
      ctx.lineTo(posX+width, posY);
    }
    else if(!tr && i>=315 && i<360){
      ctx.lineTo(posX+width, posY+height/2);
    }
    else
      ctx.lineTo(percentX*width+posX, percentY*height+posY);

  }
  ctx.closePath();      
}