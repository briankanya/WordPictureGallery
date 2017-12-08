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
				$("#gallery").append(returnTemplate(image.url, word));
			}
		}
	});
}

function returnImages(word) {
	GoogleImageSearch.default.searchImage(word).then(function(res) {
		return res;
	});
}

function returnTemplate(imageUrl, searchItem) {
	return htmlTemplate.replace("%imageUrl%", imageUrl).replace("%searchItem%", searchItem);
}