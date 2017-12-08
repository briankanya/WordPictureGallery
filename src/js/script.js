'use strict';

var setImmediate = require('setimmediate');

var _reduxPersist = require('redux-persist');

var timers = require('timers');

var GoogleImages = require('google-images'); 
 
var client = new GoogleImages('000056057431469035473:udlnkwbrzyy', 'AIzaSyBQeZ_iU0xnDtgNPZadbWsnkT1V3zADVEI'); 

var htmlTemplate = `
	<div class="card">
		<img src="%imageUrl%" alt="%searchTerm%">
	</div>
`;

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
		console.log("Images: ", images);

		for(var image in images) {
			htmlString += returnTemplate(image.url, word);
		}
	});

	$("#gallery").fadeOut(1000, function() { 
        $("#gallery").empty().append(htmlString).fadeIn(); 
    }); 
}

function returnTemplate(imageUrl, searchItem) {
	return htmlTemplate.replace("%imageUrl%", imageUrl).replace("%searchItem%", searchItem);
}