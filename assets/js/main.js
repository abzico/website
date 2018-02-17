var abzico = {

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
}());

function delayGotoProductURL(url) {
  setTimeout(function() {
    window.location = url;
  }, 500);
}

// don't want to use jQuery, so grabbed solution from https://stackoverflow.com/a/10063405/571227. With thanks.
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}


function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
  } return y;
}


function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID) - document.getElementById("nav").offsetHeight;
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
      scrollTo(0, stopY); return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
      for ( var i=startY; i<stopY; i+=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
  }
  for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}

window.abzico = abzico;