window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {

   canvas_profile();
   canvas_rate();

}

function canvasSupport () {
     return Modernizr.canvas;
}

function calc_coor(x1, x0, y1, y0, x){
	return (y0 - y1) * x /(x0 - x1) + y1 - (y0 - y1) * x1 / (x0 - x1);
}

function canvas_profile(){

	if (!canvasSupport()) {
        return;
    }else{
      	var theCanvas = document.getElementById("canvas_profile");
      	var context = theCanvas.getContext("2d");
   	}

   	var radius = 100;
    var circle = {centerX:80, centerY:70, radius:50, angle:0}
    var ball = {x:0, y:0};

    drawScreen(0.9);

	function drawScreen(percent) {

		var before_half = 0;
		var after_half = 0;
		var end_point = 0;
		if (percent > 0.5 && percent <= 1) {
			after_half = percent - 0.25;
			before_half = 1;
		} else {
			after_half = 0;
			before_half = percent - 0.25;
		}

		var greenPart = context.createLinearGradient(0,0,0,100);
		greenPart.addColorStop(0, 'rgb(168,51,207)');
		greenPart.addColorStop(0.5, 'rgb(228,50,151)');
		greenPart.addColorStop(1, 'rgb(160,122,186)');

		var whitePart = context.createLinearGradient(0,0,0,100);
		whitePart.addColorStop(0, 'rgb(113,182,234)');
		whitePart.addColorStop(0.5, 'rgb(117,166,208)');
		whitePart.addColorStop(1, 'rgb(160,122,187)');


		var width = 6;
		context.lineWidth = width;

		// First we make a clipping region for the left half
		context.save();
		context.beginPath();
		context.rect(-width, -width, 50 + 2 * width, 120 + width*2);
		context.clip();

		// Then we draw the left half
		context.strokeStyle = greenPart;
		context.beginPath();
		context.arc(50 + width,50 + width,50, 0, Math.PI * 2 * after_half, false);
		context.stroke();

		context.restore(); // restore clipping region to default

		// Then we make a clipping region for the right half
		context.save();
		context.beginPath();
		context.rect(50 + width, -width, 50 + width, 120 + width*2);
		context.clip();

		// Then we draw the right half
		context.strokeStyle = whitePart;
		context.beginPath();
		context.arc(50 + width,50 + width,50, Math.PI * 2 * (-0.25), Math.PI * 2 * before_half, false);
		context.stroke();

		context.restore(); // restore clipping region to default

		// add the circle to start point
		ball.x = 50	 + width + Math.cos(Math.PI * 2 * (-0.25)) * circle.radius;
		ball.y = 50 + width + Math.sin(Math.PI * 2 * (-0.25)) * circle.radius;

		context.fillStyle = "rgb(113,182,234)";
		context.beginPath();
		context.arc(ball.x,ball.y,3,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.restore(); // restore clipping region to default

		// add the circle to start point
		ball.x = 50	 + width + Math.cos(Math.PI * 2 * (-0.25 + percent)) * circle.radius;
		ball.y = 50 + width + Math.sin(Math.PI * 2 * (-0.25 + percent)) * circle.radius;

		if (percent > 0.75 && percent <= 1) {
			var r_color = calc_coor(228, 227, 0.75, 1, percent);
			var g_color = calc_coor(50, 51, 0.75, 1, percent);
			var b_color = calc_coor(150, 151, 0.75, 1, percent);
			console.log(r_color);
			console.log(g_color);
			console.log(b_color);
			context.fillStyle = "rgb(r_color,g_color,b_color)";
		} else if(percent > 0.5 && percent <= 0.75){
			context.fillStyle = "rgb(113,182,234)";
		} else {

		}
		
		context.beginPath();
		context.arc(ball.x,ball.y,3,0,Math.PI*2,true);
		context.closePath();
		context.fill();

		context.restore(); // restore clipping region to default
	}
}


function canvas_rate(){

if (!canvasSupport()) {
          return;
     }else{
      var theCanvas = document.getElementById("canvas_rate");
      var context = theCanvas.getContext("2d");
   }

	var radius = 100;
    var circle = {centerX:80, centerY:70, radius:50, angle:0}
    var ball = {x:0, y:0,speed:Math.PI / 12};

    drawScreen();

	function drawScreen() {

		var greenPart = context.createLinearGradient(0,0,0,100);
		greenPart.addColorStop(1, 'rgb(229,50,151)');
		greenPart.addColorStop(0, 'rgb(174,41,206)');

		var whitePart = context.createLinearGradient(0,0,0,100);
		whitePart.addColorStop(0, 'rgb(91,192,222)');
		whitePart.addColorStop(1, 'rgb(113,182,234)');


		var width = 30;
		context.lineWidth = width;

		// First we make a clipping region for the left half
		context.save();
		context.beginPath();
		context.rect(-width, -width, 35 + 2 * width, 120 + width*2);
		context.clip();

		// Then we draw the left half
		context.strokeStyle = greenPart;
		context.beginPath();

		context.arc(35 + width,35 + width,50, Math.PI * -1, Math.PI * (0), false);
		context.stroke();

		context.restore(); // restore clipping region to default

		// Then we make a clipping region for the right half
		context.save();
		context.beginPath();
		context.rect(35 + width, -width, 50 + width, 120 + width * 2);
		context.clip();

		// Then we draw the right half
		context.strokeStyle = whitePart;
		context.beginPath();
		context.arc(35 + width, 35 + width, 50, Math.PI * (-1), Math.PI * (0), false);
		context.stroke();

		// The circles drawing

		for (var i = 0;i < 24; i ++){
			
			ball.x = 35	 + width + Math.cos(circle.angle) * circle.radius;
			ball.y = 35 + width + Math.sin(circle.angle) * circle.radius;

			circle.angle += ball.speed;

			if (i == 12 || i == 0){
				continue;
			}

			context.fillStyle = "#ffffff";
			context.beginPath();
			context.arc(ball.x,ball.y,1,0,Math.PI*2,true);
			context.closePath();
			context.fill();

			context.restore(); // restore clipping region to default
		}		
	}
}