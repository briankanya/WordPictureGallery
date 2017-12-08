'use strict';

// var GoogleImages = require('google-images');

// var client = new GoogleImages('000056057431469035473:udlnkwbrzyy', 'AIzaSyBQeZ_iU0xnDtgNPZadbWsnkT1V3zADVEI');

var gis = require('g=i-s');

var htmlTemplate = `
	<div class="card">
		<img src="%imageUrl%" alt="%searchTerm%">
	</div>
`;

var word;
var array;

$(document).ready(function() {
	$("body").keyup(function(e) {
		if(e.keyCode == 32){
			setWord();
			populateImages();
		}
	});
});

function setWord() {
	word = chance.word();
}

function populateImages() {
	gis(word, function(error, results) {
		if(error) {
			console.log(error);
		}
		if(results) {
			array = JSON.parse(results);

			for(var image in array) {
				$("#gallery").fadeOut(1000, function() {
					$("#gallery").empty().append(returnTemplate(image.url, word)).fadeIn();
				});
			}
		}
	});
}

function returnTemplate(imageUrl, searchItem) {
	return htmlTemplate.replace("%imageUrl%", imageUrl).replace("%searchItem%", searchItem);
}