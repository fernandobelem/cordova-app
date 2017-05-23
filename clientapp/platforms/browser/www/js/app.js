$(document).ready(function() {

	//selection box
  $('select').material_select();

  //tabs
	$('ul.tabs').tabs();

  //carousel
	$('.carousel.carousel-slider').carousel({full_width: true});

  //collapsible
   $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

  //btn voltar
  $('.voltar').click(function(){

      $('ul.tabs').tabs('select_tab', 'minha'); 

        $("body").fadeOut(150,function(){
          window.location.href = "index.html"
        });
  });

  //btn seu projeto
  $('.seu-projeto').click(function(){
       $("body").fadeOut(150,function(){
       window.location.href = "mensagem.html"
    });
  });

  $('.next-ambiente').click(function(itemSelecionado){
    $( ".segundo-modal" ).append( "<h4>Title test</h4>" );
    $( ".segundo-modal" ).append( "<p>Test</p>" );

  });


});


function showToast(){
	console.log('test');
	Materialize.toast('Mensagem enviada', 3000);
}




