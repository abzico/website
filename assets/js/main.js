var abzico = {

	// manage variables of website
	gameSlideIndex: 1,

	plusGameSlides: function(n) {
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex += n, 3, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
	},

	showGameSlidesAt: function(i) {
		this.gameSlideIndex = i;
		this.gameSlideIndex = this.showDivs(this.gameSlideIndex, 3, this.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
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
					buttons[i].className = `ref-game-slides-nav circular-button ${buttonType}-active`;
				else
					buttons[i].className = `ref-game-slides-nav circular-button ${buttonType}-inactive`;
			}
		}

		// this is item's number not index
		return currentSlideIndex;
	},
};

(function() {
	abzico.showDivs(abzico.gameSlideIndex, 3, abzico.gameSlideIndex, "ref-game-slides", "ref-game-slides-nav");
}());

window.abzico = abzico;