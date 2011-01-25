$(document).ready(function() {
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
     $(this).remove();
     return false;
 });
 $("#clearchart").bind("click", function() {
     $(".point").remove();
 });
 $("#save").bind("click", function(){
     var points = $("#chart").html();
     alert(points);
 });
});
