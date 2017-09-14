var abzico = {

	// manage variables of website
	gameSlideIndex: 1,
	techSlideIndex: 1,

	plusGameSlides: function(n) {
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex += n, 3, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	},

	showGameSlidesAt: function(i) {
		this.gameSlideIndex = i;
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex, 3, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	},

	showTechSlidesAt: function(i) {
		this.techSlideIndex = i;
		this.techSlideIndex = this.showDivs(this.techSlideIndex, 2, this.techSlideIndex, "ref-tech-slides", "ref-tech-slides-nav");
	},

	// common functions
	// return item number (not index)
	showDivs: function(n, length, currentSlideIndex, className, buttonClassName) {
		var i;
		var x = document.getElementsByClassName(className);
		if (n > x.length) { currentSlideIndex = 1; }
		if (n < 1) { currentSlideIndex = x.length; }
		for (var i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		x[currentSlideIndex-1].style.display = "block";

		// reflect css
		var buttons = document.getElementsByClassName(buttonClassName);
		if (buttons.length > 0) {
			var buttonType = buttons[0].className.search("white") != -1 ? "white" : "black";

			for (var i = 0; i < buttons.length; i++) {
				if (n == i+1)
					buttons[i].className = `${buttonClassName} circular-button ${buttonType}-active`;
				else
					buttons[i].className = `${buttonClassName} circular-button ${buttonType}-inactive`;
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
	}
};

(function() {
	abzico.showDivs(abzico.gameSlideIndex, 3, abzico.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	abzico.showDivs(abzico.techSlideIndex, 2, abzico.techSlideIndex, "ref-tech-slides", "ref-tech-slides-nav");
}());

window.abzico = abzico;