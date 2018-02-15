$(document).ready(function() {
	"use strict";
	$("#sports").on({
		mouseenter: function() {
			$("#sport-image").css("visibility", "visible");
		},
		mouseleave: function() {
			$("#sport-image").css("visibility", "hidden");
		}
	});
	$("#sports").children().mouseenter(function() {
		var text = $(this).text().toLowerCase();
		text = text.replace(/\s+/g, "");
		$("#sport-image").attr("src", "img/" + text + ".png");
		$(this).parent().find("span").hide();
	});
	(function() {
		var videosOpened = false;
		$("#show-videos").click(function() {
			var $btn = $(this);
			$("#videos").slideToggle(500, function() {
				videosOpened = !videosOpened;
				var newTxt = videosOpened ? "Ocultar" : "Mostrar";
				newTxt = newTxt + " videos";
				$btn.text(newTxt);
			});
		});
		var audiosOpened = false;
		$("#show-audios").click(function() {
			var $btn = $(this);
			$("#audios").fadeToggle(500, function() {
				audiosOpened = !audiosOpened;
				var newTxt = audiosOpened ? "Ocultar" : "Mostrar";
				newTxt = newTxt + " audios";
				$btn.text(newTxt);
				if (audiosOpened) {
					var delay = 0;
					$(this).find(".card")
					.each(function() {
						$(this).delay(delay)
						.slideDown();
						delay += 350;
					});
				} else {
					$(this).find(".card").hide();
				}
			});
		})
	})();
	(function() {
		var entered = false;
		$("#pi-goal").mouseenter(function() {
			if (entered) return;
			entered = true;
			$("#message-pi").show();
			$(this).animate({
				left: "0",
				fontSize: "100%"
			}, 500, function() {
				$(this).parent().css("text-align", "left");
				$(this).addClass("bg-warning")
				.css({
					"color": "white",
					"position":"static"
				});
				var $newPar = $("<p>");
				$newPar.text("3.")
				.css({
					margin: "10px 0",
					fontSize: "large"
				});
				var $container = $("<div>");
				$container.css("word-wrap", "break-word")
				.append($newPar);
				$(this).after($container);
				var pi = "1415926535897932384626433832795028841971693993751" +
				"058209749445923078164062862089986280348253421170679";
				var i = 0;
				var $piGoal = $(this);
				var remaining = parseInt($piGoal.text());
				var interval = setInterval(function() {
					$newPar.text(function(index, prevText) {
						return prevText + pi[i++];
					});
					if (i !== pi.length) {
						$piGoal.text(function(index, prevText) {
							return "¡" + --remaining + " dígitos restantes!";
						});
					} else {
						$newPar.text(function(index, prevText) {
							return prevText + "...";
						});
						clearInterval(interval);
						$piGoal.removeClass("bg-warning")
						.addClass("bg-info");
					}
				}, 70);
			});

		});
	})();
});