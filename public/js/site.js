$(document).ready(function() {

    touchinit();

    $("#chart").live("click", function(mouse) {
	var x = mouse.pageX - this.offsetLeft;
	var y = mouse.pageY - this.offsetTop;
	$("#chart").append('<div class="point" style="top:'+ y +'px;left:'+ x +'px;"></div>');
    });

    $("div.point").live('mouseover mouseout', function(ShowPoint) {
	if (ShowPoint.type == 'mouseover') {
	    $(this).addClass("highlight");
	} else {
	    $(this).removeClass("highlight");
	}
    });

    $(".point").live("click", function() {
	$(this).fadeOut('fast');
	return false;
    });

    $("#clearchart").bind("click", function() {
	$(".point").fadeOut('slow');
    });

    $("#save").bind("click", function(){
	var points = $("#chart").html();
	alert(points);
    });

    function touchHandler(event) {
     var touches = event.changedTouches,
      first = touches[0],
      type = "";
      switch(event.type) {
       case "touchstart": type = "mousedown"; break;
       case "touchmove":  type="mousemove"; break;        
       case "touchend":   type="mouseup"; break;
       default: return;
      }

  var simulatedEvent = document.createEvent("MouseEvent");
   simulatedEvent.initMouseEvent(type, true, true, window, 1, 
    first.screenX, first.screenY, 
    first.clientX, first.clientY, false, 
    false, false, false, 0/*left*/, null);

   first.target.dispatchEvent(simulatedEvent);
   event.preventDefault();
  }

  function touchinit() {
   document.addEventListener("touchstart", touchHandler, true);
   document.addEventListener("touchmove", touchHandler, true);
   document.addEventListener("touchend", touchHandler, true);
   document.addEventListener("touchcancel", touchHandler, true);
  }
});
