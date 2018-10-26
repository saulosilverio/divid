// NIVEL
$('.star.rating').click(function(){
	//console.log( $(this).parent().data('stars') + ", " + $(this).data('rating'));
	$(this).parent().attr('data-stars', $(this).data('rating'));
});

// LISTA
$('#jogador').on("swipeleft", function(){
	$(this).addClass('left');
});
    