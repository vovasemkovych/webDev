window.onscroll = function() {myFunction()};

const header = document.getElementById("myHeader");
const sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


# Variables
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
imgSrc = canvas.dataset.image;
img = new Image();
useGrid = true
imgInfo = {};
imgs = [];
grids = [];
magnet = 2000;
mouse = {
	x:1
	y:0
}

init = ()->
	addListeners();
	
	img.onload = (e)->
		# Check for firefox. 
		imgInfo.width = if e.path then e.path[0].width else e.target.width
		imgInfo.height = if e.path then e.path[0].height else e.target.height 
			
		numberToShow = (Math.ceil(window.innerWidth / imgInfo.width)) * (Math.ceil(window.innerHeight / imgInfo.height))
		
		createGrid() if useGrid;
		populateCanvas(numberToShow * 4);
		
		# Image is ready and we're ready to go
		canvas.classList.add('ready');
		render();
		
	img.src = imgSrc;
	
addListeners = ()->
	window.addEventListener('resize',resizeCanvas);
	window.addEventListener('mousemove', updateMouse);
	window.addEventListener('touchmove', updateMouse);
	
updateMouse = (e)->

	mouse.x = e.clientX
	mouse.y = e.clientY
	
resizeCanvas = ()->
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	
# Magic
populateCanvas = (nb)->
	i = 0;
	while i <= nb
		p = new Photo();
		imgs.push p
		i++;
	
createGrid = ()->
	imgScale = 0.5
	grid = {
		row: Math.ceil(window.innerWidth / (imgInfo.width * imgScale))
		cols: Math.ceil(window.innerHeight / (imgInfo.height * imgScale))
		rowWidth: imgInfo.width * imgScale
		colHeight: imgInfo.height * imgScale
	}
	
	for r in [0...grid.row]
		x = r * grid.rowWidth
		for c in [0...grid.cols]
			y = c * grid.colHeight
			
			item = new gridItem(x,y,grid.rowWidth,grid.colHeight)
			grids.push item;
			
	for i in [0...grids.length]
		grids[i].draw();
	
gridItem = (x = 0, y = 0, w, h)->
	this.draw = ()->
		ctx.drawImage(img, x, y, w, h);
		return
	return

Photo = ()->
	seed = Math.random() * (2.5 - 0.7) + 0.7;
	w = imgInfo.width / seed
	h = imgInfo.height / seed
	x = window.innerWidth * Math.random()
	finalX = x
	y = window.innerHeight * Math.random()
	finalY = y	
	console.log("INIT Y :: #{finalY} || INIT X :: #{finalX}")
	r = Math.random() * (180 - (-180)) + (-180)
	
	forceX = 0
	forceY = 0
	
	TO_RADIANS = Math.PI/180
	
	this.update = ()->
		x0 = x
		y0 = y
		x1 = mouse.x
		y1 = mouse.y
		
		dx = x1 - x0
		dy = y1 - y0
		
		distance = Math.sqrt((dx * dx) + (dy * dy))
		powerX = x0 - (dx / distance) * magnet / distance;
		powerY = y0 - (dy / distance) * magnet / distance
		
		forceX = (forceX + (finalX - x0) / 2) / 2.1
		forceY = (forceY + (finalY - y0) / 2) / 2.2

		

		x = powerX + forceX
		y = powerY + forceY
	
		return
	this.draw = ()->
		rotateAndPaintImage(ctx, img, r * TO_RADIANS, x, y, w / 2, h / 2, w, h)
	return

rotateAndPaintImage = ( context, image, angle , positionX, positionY, axisX, axisY, widthX, widthY)->
	context.translate( positionX, positionY );
	context.rotate( angle );
	context.drawImage( image, -axisX, -axisY, widthX, widthY );
	context.rotate( -angle );
	context.translate( -positionX, -positionY );

render = ()->
	x = 0
	y = 0
	ctx.clearRect(0,0,width,height)
	while y < grids.length
		grids[y].draw()
		y++
	while x < imgs.length
		imgs[x].update()
		imgs[x].draw()
		x++
		
	requestAnimationFrame render
	
	
		
# Variables
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
imgSrc = canvas.dataset.image;
img = new Image();
useGrid = true
imgInfo = {};
imgs = [];
grids = [];
magnet = 2000;
mouse = {
	x:1
	y:0
}

init = ()->
	addListeners();
	
	img.onload = (e)->
		# Check for firefox. 
		imgInfo.width = if e.path then e.path[0].width else e.target.width
		imgInfo.height = if e.path then e.path[0].height else e.target.height 
			
		numberToShow = (Math.ceil(window.innerWidth / imgInfo.width)) * (Math.ceil(window.innerHeight / imgInfo.height))
		
		createGrid() if useGrid;
		populateCanvas(numberToShow * 4);
		
		# Image is ready and we're ready to go
		canvas.classList.add('ready');
		render();
		
	img.src = imgSrc;
	
addListeners = ()->
	window.addEventListener('resize',resizeCanvas);
	window.addEventListener('mousemove', updateMouse);
	window.addEventListener('touchmove', updateMouse);
	
updateMouse = (e)->

	mouse.x = e.clientX
	mouse.y = e.clientY
	
resizeCanvas = ()->
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	
# Magic
populateCanvas = (nb)->
	i = 0;
	while i <= nb
		p = new Photo();
		imgs.push p
		i++;
	
createGrid = ()->
	imgScale = 0.5
	grid = {
		row: Math.ceil(window.innerWidth / (imgInfo.width * imgScale))
		cols: Math.ceil(window.innerHeight / (imgInfo.height * imgScale))
		rowWidth: imgInfo.width * imgScale
		colHeight: imgInfo.height * imgScale
	}
	
	for r in [0...grid.row]
		x = r * grid.rowWidth
		for c in [0...grid.cols]
			y = c * grid.colHeight
			
			item = new gridItem(x,y,grid.rowWidth,grid.colHeight)
			grids.push item;
			
	for i in [0...grids.length]
		grids[i].draw();
	
gridItem = (x = 0, y = 0, w, h)->
	this.draw = ()->
		ctx.drawImage(img, x, y, w, h);
		return
	return

Photo = ()->
	seed = Math.random() * (2.5 - 0.7) + 0.7;
	w = imgInfo.width / seed
	h = imgInfo.height / seed
	x = window.innerWidth * Math.random()
	finalX = x
	y = window.innerHeight * Math.random()
	finalY = y	
	console.log("INIT Y :: #{finalY} || INIT X :: #{finalX}")
	r = Math.random() * (180 - (-180)) + (-180)
	
	forceX = 0
	forceY = 0
	
	TO_RADIANS = Math.PI/180
	
	this.update = ()->
		x0 = x
		y0 = y
		x1 = mouse.x
		y1 = mouse.y
		
		dx = x1 - x0
		dy = y1 - y0
		
		distance = Math.sqrt((dx * dx) + (dy * dy))
		powerX = x0 - (dx / distance) * magnet / distance;
		powerY = y0 - (dy / distance) * magnet / distance
		
		forceX = (forceX + (finalX - x0) / 2) / 2.1
		forceY = (forceY + (finalY - y0) / 2) / 2.2

		

		x = powerX + forceX
		y = powerY + forceY
	
		return
	this.draw = ()->
		rotateAndPaintImage(ctx, img, r * TO_RADIANS, x, y, w / 2, h / 2, w, h)
	return

rotateAndPaintImage = ( context, image, angle , positionX, positionY, axisX, axisY, widthX, widthY)->
	context.translate( positionX, positionY );
	context.rotate( angle );
	context.drawImage( image, -axisX, -axisY, widthX, widthY );
	context.rotate( -angle );
	context.translate( -positionX, -positionY );

render = ()->
	x = 0
	y = 0
	ctx.clearRect(0,0,width,height)
	while y < grids.length
		grids[y].draw()
		y++
	while x < imgs.length
		imgs[x].update()
		imgs[x].draw()
		x++
		
	requestAnimationFrame render
	
	
		
init();