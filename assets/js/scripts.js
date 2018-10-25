// NIVEL
$('.star.rating').click(function(){
	console.log( $(this).parent().data('stars') + ", " + $(this).data('rating'));
	$(this).parent().attr('data-stars', $(this).data('rating'));
});

// LISTA
new SwipeOut(document.getElementById("list"));

// DELETE
$("#list").on("click", "li", function(e) {
	// editar jogador
}).on("delete", "li", function(e) {
	$(this).addClass("delete");
});
    