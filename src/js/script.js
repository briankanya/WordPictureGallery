'use strict';

var setImmediate = require('setimmediate');

var GoogleImages = require('google-images'); 
 
var client = new GoogleImages('000056057431469035473:udlnkwbrzyy', 'AIzaSyBQeZ_iU0xnDtgNPZadbWsnkT1V3zADVEI'); 

var htmlTemplate = '<div class="card img-fluid"><img src="%imageUrl%" alt="%searchTerm%"></div>';

var word;
var htmlString;

$(document).ready(function() {
	setWord();
	populateImages();

	$("body").keyup(function(e) {
		if(e.keyCode == 32){
			setWord();
			populateImages();
		}
	});
});

function setWord() {
	word = chance.word();
	$("#random-word").text("Random Word: " + word);
}

function populateImages() {
	htmlString = "";

	client.search(word).then(images => {
		for(var imageIndex in images) {
			htmlString = htmlString.concat(returnTemplate(images[imageIndex].url, word));
		}

		$("#gallery").hide().html(htmlString).fadeIn("slow");
	});
}

function returnTemplate(imageUrl, searchItem) {
	var html = htmlTemplate.replace("%imageUrl%", imageUrl);
	html = html.replace("%searchTerm%", searchItem);
	return html;
}