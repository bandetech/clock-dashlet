(function(){
   
   Alfresco.dashlet.ClockBoard = function Clock_constructor(htmlId){
      Alfresco.dashlet.ClockBoard.superclass.constructor.call(this, "Alfresco.dashlet.ClockBoard", htmlId, ["animation"]);
      YAHOO.Bubbling.on("dashletResizeEnd", this.onResize, this);
      //this.clocks = [];
      return this;
   };

   var intervalId;

   YAHOO.extend(Alfresco.dashlet.ClockBoard, Alfresco.component.Base,{
      onReady: function clock_onReady(){

        var t = this;
        this.initialSet();
        intervalId = setInterval(function(){t.drawClock();},1000);
      },
      onResize: function clock_onResize(layer, args){

	clearInterval(intervalId);
	var t = this;
        this.initialSet();
        intervalId = setInterval(function(){t.drawClock();},1000);
      },
      initialSet: function initial_set(){
	  var canvas = YAHOO.util.Dom.get(this.id+"-clockCanvas");
	  var width = YAHOO.util.Dom.get(this.id+"-clock").offsetWidth;
	  var height = YAHOO.util.Dom.get(this.id+"-clock").offsetHeight;
          if(width > height){
	    radian = height / 2 * 0.9;
          } else {
	    radian = width / 2 * 0.9;
          }
          if(radian < 100){
            font = "14px 'sans-serif'";
          } else {
            font = "24px 'sans-serif'";
          }
          var center = {x: width/2.0, y: height/2.0}
          var textRadian = radian * 0.8;
          this.clockSetting = {
             width: width,
             height: height,
             center: center,
             canvas: canvas,
             font: font,
             radian: radian,
             textRadian: textRadian,
             hourHandLength: textRadian * 0.8,
             minuteHandLength: radian * 0.9,
             secondHandLength: radian*0.95,
             center: {x: width/2.0, y: height/2.0}
          };
      },
      drawClock: function d_clock(){
	var now = new Date();
	
	var canvas = this.clockSetting.canvas;

	canvas.width = this.clockSetting.width;
	canvas.height = this.clockSetting.height;

        radian = this.clockSetting.radian;

        var center = this.clockSetting.center;
	var ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, this.clockSetting.width, this.clockSetting.height);
	ctx.save();
	ctx.strokeStyle = "rgb(200, 200, 200)";

	ctx.beginPath();
	ctx.arc(center.x, center.y, radian, 0.0, 2.0 * Math.PI, false);
	ctx.stroke();
	ctx.save();

	// Numeric Text

	ctx.font        = this.clockSetting.font;
	ctx.textAlign   ="center";
	ctx.textBaseline ="middle";
	ctx.fillStyle   = "rgb(100, 100, 100)";
	ctx.shadowBlur = 5;
	ctx.shadowColor = "#FFF";
	var text_radian = radian - 30;
	for (var i = 0; i < 12; i++) {
    	   var rad = i * Math.PI / 6;
    	   var x = center.x + this.clockSetting.textRadian * Math.sin(rad);
    	   var y = center.y - this.clockSetting.textRadian * Math.cos(rad);
    	   var text = "" + (i == 0 ? "12" : i);
    	   ctx.fillText(text, x, y);
  	}
	ctx.restore();

	// Draw tick for minute
	ctx.translate(center.x, center.y);
	ctx.lineWidth = 2;
	for(var i=0; i < 60; i++){
		ctx.rotate(2.0 * Math.PI / 60.0);
		ctx.moveTo(radian-3, 0);
		ctx.lineTo(radian - 10,0);
	
	}
	ctx.stroke();

	// Draw ticks for hour
	ctx.restore();
	ctx.beginPath();
	ctx.translate(center.x, center.y);
	ctx.lineWidth = 2;
	for(var i=0; i < 12; i++){
		ctx.rotate(2.0 * Math.PI / 12.0);
		ctx.moveTo(radian, 0);
		ctx.lineTo(radian - 10,0);
		
	}
	ctx.stroke();

	ctx.restore();
	ctx.save();

	// hour hand
	
	var hour = now.getHours() % 12;
	var minute = now.getMinutes();
	ctx.width = 3;
	ctx.strokeStyle  = "rgb(0,0,0)";
	ctx.rotate((2.0 * Math.PI/12)* hour + (2.0 * Math.PI/12)*(minute/60));
	ctx.beginPath();
	ctx.moveTo(-this.clockSetting.radian * 0.05, 30);
	ctx.lineTo(0, -this.clockSetting.hourHandLength);
	ctx.lineTo(this.clockSetting.radian * 0.05, 30);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.restore();
	ctx.save();

	// minute hand

	ctx.width = 1;
	ctx.rotate((2.0 * Math.PI / 60.0)* minute);
	ctx.beginPath();
	ctx.moveTo(-this.clockSetting.radian * 0.025, 30);
	ctx.lineTo(0, -this.clockSetting.minuteHandLength);
	ctx.lineTo(this.clockSetting.radian * 0.025, 30);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	// second hand
	var sec = now.getSeconds();
	ctx.width = 1;
	ctx.strokeStyle = "rgb(240,90,20)";
	ctx.rotate((2.0 * Math.PI/60.0) * sec);
	ctx.beginPath();
	ctx.moveTo(0, 50);
	ctx.lineTo(0, -this.clockSetting.secondHandLength);
	ctx.stroke();

	ctx.restore();
      }
   });
})();

