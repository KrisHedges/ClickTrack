$(document).ready(function() {

    function clearChart() {
        $(".point").fadeOut('slow',
        function() {
            $(this).remove();
        });
	$("#chart-date").html("Create a new chart now or browse the chart history");
	return false;
    };
    function clearAll() {
	$('#charts-list-container .current').removeClass('current');
	clearChart();	
    };

    function flashNotice(notice) {
        $(".noticemsg").replaceWith("<span class='noticemsg'>" + notice + "</span>");
        $("#notice").fadeIn('fast').delay(3000).fadeOut('slow');
	return false;
    };
    
    function updateList() {
	$.ajax({
	    type: "GET",
	    url: "/charts",
	    datatype: "html",
	    success: function(l) {
		$('#chart-history').html(l);
	    }
	}),
	clearChart();
	return false;
    };
    
    function showList() {
	$.ajax({
	    type: "GET",
	    url: "/charts",
	    datatype: "html",
	    success: function(list) {
		$('#chart-history').html(list);
	    }
	})
    };
                                                 
//Init
    showList();

    $("#chart").live("click",
    function(mouse) {
        var x = mouse.pageX - this.offsetLeft;
        var y = mouse.pageY - this.offsetTop;
        $("#chart").append('<div class="point" style="top:' + y + 'px;left:' + x + 'px;"></div>');
    });

    $("div.point").live('mouseover mouseout',
    function(ShowPoint) {
        if (ShowPoint.type == 'mouseover') {
            $(this).addClass("highlight");
        } else {
            $(this).removeClass("highlight");
        }
    });

    $(".point").live("click",
    function() {
        $(this).fadeOut('fast',
        function() {
            $(this).remove();
        });
        return false;
    });

    $("#clear-all").bind("click",
    function() {
        clearAll();
    });

    $("#save").bind("click", function() {
    var displayedpoints = $("#chart").html();
	$.ajax({
	    type: "POST",
	    processData: "false",
	    url: "/chart/new",
	    datatype: "html",
	    data: {points: displayedpoints},
	    success: function() {
		updateList();
		flashNotice("Your chart has been saved");
	    },
	    error: function() {
		flashNotice("There was a problem saving your chart.");
	    }
	});
    });
    
    $(".chart").live("click", function(e) {
	var chartid = $(this).attr("id");
	var chartdate = $(this).attr("title");
	e.preventDefault();
	$('.current').removeClass('current');
	$(this).addClass('current');
	$.ajax({
	    type: "GET",
	    url: "chart/"+chartid,
	    datatype: "html",
	    success: function(response){
		clearChart();
		$('#chart').append(response).fadeIn('slow');
		$("#chart-date").html(chartdate);
	    },
	    error: function(){
		flashNotice("Problem retrieving that chart");
	    }
	});
    });
    
    $(".destroy").live("click", function(e) {
	var chartid = $(this).attr("id");
	var chartdate = $(this).attr("title");
	e.preventDefault();
	$.ajax({
	    type: "POST",
	    url: "chart/destroy/"+chartid,
	    datatype: "html",
	    success: function(response){
		clearChart();
		updateList();
		flashNotice("Chart from " + chartdate + " has been Deleted.");
	    },
	    error: function(){
		flashNotice("There's been a problem deleting that chart.");
	    }
	});
    });

});
