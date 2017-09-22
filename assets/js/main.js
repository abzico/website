var abzico = {

	// manage variables of website
	gameSlideIndex: 1,
	techSlideIndex: 1,

	plusGameSlides: function(n) {
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex += n, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	},

	showGameSlidesAt: function(i) {
		this.gameSlideIndex = i;
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	},

	showTechSlidesAt: function(i) {
		this.techSlideIndex = i;
		this.techSlideIndex = this.showDivs(this.techSlideIndex, this.techSlideIndex, "ref-tech-slides", "ref-tech-slides-nav");
	},

	// common functions
	// return item number (not index)
	showDivs: function(n, currentSlideIndex, className, buttonClassName) {
		var i;
		var x = document.querySelectorAll('.' + className);

		if (n > x.length) { currentSlideIndex = 1; }
		if (n < 1) { currentSlideIndex = x.length; }
		for (var i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		x[currentSlideIndex-1].style.display = "block";

		// reflect css
		var buttons = document.querySelectorAll('.' + buttonClassName);
		if (buttons.length > 0) {
			var buttonType = buttons[0].className.search("white") != -1 ? "white" : "black";

			for (var i = 0; i < buttons.length; i++) {
				if (n == i+1)
					buttons[i].className = buttonClassName + " circular-button " + buttonType + "-active";
				else
					buttons[i].className = buttonClassName + " circular-button " + buttonType + "-inactive";
			}
		}

		// this is item's number not index
		return currentSlideIndex;
	},

	toggleTooltip: function(elementId) {
		// get its immediate child
  	var element = document.getElementById(elementId);
  	if (element != null) {
  		var display = element.style.display;

  		// if it's hidden then show
    	if (display.search("none") != -1) {
    		element.style.display = "inline-block";
    	}
    	// otherwise hide it
    	else {
    		element.style.display = "none";
    	}
  	}
	},

	initMap: function(mapElementId) {
		//谷歌坐标
		var x = 113.896353;
		var y = 22.563782;
		var ggPoint = new BMap.Point(x,y);

		//地图初始化
		var bm = new BMap.Map(mapElementId);
		bm.centerAndZoom(ggPoint, 15);
		bm.addControl(new BMap.NavigationControl());

		//添加谷歌marker和label
		var markergg = new BMap.Marker(ggPoint);
		bm.addOverlay(markergg); //添加谷歌marker
	},

	onResize: function() {
		var w = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		if (w >= 768) {
			var statementImages = document.querySelectorAll(".statement-image-element");
			var statementTexts = document.querySelectorAll(".statement-text");

			for (var i=0; i<statementImages.length; i++) {
				statementImages[i].style.width = "180px";
			}
			for (var i=0; i<statementTexts.length; i++) {
				statementTexts[i].style = "font-size: 20px";
			}
		}
		else {
			var statementImages = document.querySelectorAll(".statement-image-element");
			var statementTexts = document.querySelectorAll(".statement-text");

			for (var i=0; i<statementImages.length; i++) {
				statementImages[i].style.width = "100px";
			}
			for (var i=0; i<statementTexts.length; i++) {
				statementTexts[i].style = "font-size: 14px";
			}
		}
	}
};

(function() {
	// adjust css onload, and onresize
	window.addEventListener("load", abzico.onResize);
	window.addEventListener("resize", abzico.onResize);

	abzico.showDivs(abzico.gameSlideIndex, abzico.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	abzico.showDivs(abzico.techSlideIndex, abzico.techSlideIndex, "ref-tech-slides", "ref-tech-slides-nav");
}());

window.abzico = abzico;