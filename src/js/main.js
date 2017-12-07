var htmlTemplate = `
	<div class="col-lg-4">
		<img class="img-thumbnail" src="%imageUrl%" alt="%description%">
		<p>%name%: %price%</p>
		<button onclick="cart.addProduct(%index%)" type="button" class="btn btn-primary btn-sm btn-sm-block mx-auto">Add to Cart</button>
	</div>
`;

var cart = new Cart(0.075);

$(document).ready(function() {
	var flower;
	
	for(var index = 0; index < flowers.length; index++) {
		cart.products[index] = null;
		flower = flowers[index];
		$("#flowers").append(productHTMLTemplate(flower.name, flower.price, flower.description, flower.imageUrl, index));
	}
});

function productHTMLTemplate(name, price, description, imageUrl, index) {
	var html = htmlTemplate.replace("%name%", name);
	html = html.replace("%price%", accounting.formatMoney(price));
	html = html.replace("%description%", description);
	html = html.replace("%imageUrl%", imageUrl);
	html = html.replace("%index%", index);
	
	return html;
}