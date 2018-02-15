$(document).ready(function() {
	"use strict";
	// la imagen del deporte desaparece cuando el usuario sale y entra de la lista de deportes
	$("#sports").on({
		mouseenter: function() {
			$("#sport-image").css("visibility", "visible");
		},
		mouseleave: function() {
			$("#sport-image").css("visibility", "hidden");
		}
	});
	// la imagen cambia cuando el usuario pasa por cada deporte
	// las imagenes se guardan en img/
	// tambien se oculta el icono de ayuda al lado del primer elemento
	$("#sports").children().mouseenter(function() {
		var text = $(this).text().toLowerCase();
		text = text.replace(/\s+/g, "");
		$("#sport-image").attr("src", "img/" + text + ".png");
		$(this).parent().find("span").hide();
	});
	// en esta función se define el comportamento dinamico de las secciones de audio y video
	(function() {
		var videosOpened = false;
		$("#show-videos").click(function() {
			var $btn = $(this);
			// el texto del botón cambia con la visibilidad de la sección
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
				// el texto del botón cambia con la visibilidad de la sección
				audiosOpened = !audiosOpened;
				var newTxt = audiosOpened ? "Ocultar" : "Mostrar";
				newTxt = newTxt + " audios";
				$btn.text(newTxt);
				if (audiosOpened) {
					// se realiza una animación a cada uno de los audios,
					// con un delay entre ellas para que se animen una despues de la otra
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
	// en esta funcion se define el comportamiento dinámico del texto de pi (3.1415...)
	(function() {
		var entered = false;
		$("#pi-goal").mouseenter(function() {
			if (entered) return;
			entered = true;
			$("#message-pi").show();
			// se realiza una animación sobre el texto
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
				// se crea un nuevo parrafo en donde se van a poner los digitos de pi
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
				$("#otros").css("padding-bottom", "5px");
				var pi = "1415926535897932384626433832795028841971693993751" +
				"058209749445923078164062862089986280348253421170679";
				var i = 0;
				var $piGoal = $(this);
				var remaining = parseInt($piGoal.text());
				// los numeros se agregan uno por uno
				// al terminar, se cambia el color de fondo con los digitos restantes
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