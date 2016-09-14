// JavaScript Document

$(document).ready(function(){
	
	/* get screensize and display it for reference */
	
	var $screensize = $('<div id="screensize"></div>');
	$('body').append( $screensize );
	
	function getWidth() {
		var w = $(window).width();
		console.log('viewport width = ' + w);
		if (w >= 768 && w < 1024) {
			$screensize.text('medium size (768 to 1024)');
		} else if (w >= 600 && w < 768) {
			$screensize.text('small size (600 to 768)');
		} else if (w < 600) {
			$screensize.text('extra small size (< 600)');
		} else {
			$screensize.text('desktop size (1024 or larger)');
		}
	}
	getWidth();
	$(window).resize(getWidth);
	
	
	
	
	/* TOGGLE COMPACT VIEW */
	
	$('#toggleGridLines').on('click', function() {
		$('html').toggleClass('gridlines');
	});
	$('#toggleCompactView').on('click', function() {
		$('html').toggleClass('compact');
	})
	
	
	
	
	/* SET PANEL CONTENT TO EQUAL HEIGHT IN GRID COLUMNS */
	
	var $panelContentColumns = $('.grid').find('.module, .panel-body');
	
	equalheight = function(container){
	
	var currentTallest = 0,
		 currentRowStart = 0,
		 rowDivs = new Array(),
		 $el,
		 topPosition = 0;
		 
	 $(container).each(function() {
	
	   $el = $(this);
	   $($el).height('auto')
	   topPostion = $el.position().top;
	
	   if (currentRowStart != topPostion) {
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	   } else {
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	}
	
	$(window).load(function() {
	  equalheight($panelContentColumns);
	});
	
	$(window).resize(function(){
	  equalheight($panelContentColumns);
	});

});
