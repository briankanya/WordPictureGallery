var freeGoogleImageSearch = require("free-google-image-search");

var htmlTemplate = `
	<div class="card">
		<img src="%imageUrl%" alt="%searchTerm%">
	</div>
`;

var word;

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
	for(var imageUrl in returnImages(word)) {
		$("#gallery").append(returnTemplate(imageUrl, word));
	}
}

function returnImages(word) {
	freeGoogleImageSearch.default.searchImage(word).then(function(res) {
		return res;
	});
}

function returnTemplate(imageUrl, searchItem) {
	return htmlTemplate.replace("%imageUrl%", imageUrl).replace("%searchItem%", searchItem);
}