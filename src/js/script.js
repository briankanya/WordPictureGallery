'use strict';

var gis = require('g-i-s');

var htmlTemplate = `
	<div class="card">
		<img src="%imageUrl%" alt="%searchTerm%">
	</div>
`;

var word;
var array;

$(document).ready(function() {
	console.log("Document is ready");
	$("body").keyup(function(e) {
		if(e.keyCode == 32){
			setWord();
			populateImages();
		}
	});
});

function setWord() {
	word = chance.word();
	console.log("Word set to", word);
}

function populateImages() {
	console.log("Populating images");

	gis(word, function(error, results) {
		console.log("Running the search with the word", word);

		if(error) {
			console.log(error);
		}
		if(results) {
			console.log("Got the results of", results);
			array = JSON.parse(results);

			for(var image in array) {
				console.log("Found image of", image);
				$("#gallery").append(returnTemplate(image.url, word));
			}
		}
	});
}

function returnTemplate(imageUrl, searchItem) {
	console.log("Replacing template with", imageUrl, searchItem);
	return htmlTemplate.replace("%imageUrl%", imageUrl).replace("%searchItem%", searchItem);
}