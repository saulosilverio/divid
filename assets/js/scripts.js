// NIVEL
$('.star.rating').click(function(){
	//console.log( $(this).parent().data('stars') + ", " + $(this).data('rating'));
	$(this).parent().attr('data-stars', $(this).data('rating'));
});

// LISTA
$(function(){
  $('#list > li').on('swipeleft', swipeleftHandler);
  $('#list > li').on('swiperight', swiperightHandler);
 
  function swipeleftHandler(event){
	event.preventDefault();
    $(event.target).addClass('show-remove');
  }
  function swiperightHandler(event){
	event.preventDefault();
    $(event.target).removeClass('show-remove');
  }
});


// REMOVE LINHA
$('.btn-remove-lista').click(removeLinha);

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}
    