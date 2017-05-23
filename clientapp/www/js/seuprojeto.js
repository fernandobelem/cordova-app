$(document).ready(function() {

   $('select').material_select();

   //init modal ambiente
   $('.novo-ambiente.modal-trigger').leanModal({
   		ready: function() { carregarCategorias(); }
   });

   //init modal objetos
   $('.novo-objetos.modal-trigger').leanModal({
   		ready: function() {
   			if(validaAmbienteSelecionado()){
   				$('#modal-objetos').closeModal();
				$('#modal-mensagem-ambiente-existente').openModal();
   			} else {
   				var idCategoria = $("input[name='catgrp']:checked").attr('id');
   				carregarObjetos(idCategoria); 
   			}

   		}
   });

   //init modal deatlhes
   $('.trigger-detalhes.modal-trigger').leanModal({
   		ready: function() { }
   });

   $('.inserir-ambiente').click(function (){
   		adicionarAmbiente();
	   $('.remover-ambiente').click(function (){
	   		removerAmbiente($(this));
	   });
   });

   $('.voltar-ambiente').click(function (){
   		$('#modal-ambiente').openModal();
   });

   $('.voltar-objetos').click(function (){
   		$('#modal-objetos').openModal();
   });


});

function removerAmbiente(obj){
	console.log($(obj).parent().prev('.li-novo-ambiente'));
	$(obj.parent()).fadeOut(300,function(){
		$(obj).parent().remove();
	});
}

function appendModalMensagem(){
	var ambiente = getAmbienteSelecionado();
	var mensagem = "<p> O ambiente " +  ambiente  + " já foi adicionado !</p>"

	$('#div-mensagem-ambiente').append(mensagem);
}

function validaAmbienteSelecionado(){
	if( $('.li-novo-ambiente span.title').text().match(getAmbienteSelecionado()) ){
		return true;
	} else {
		return false;
	}
}

function adicionarAmbiente(){

	var ambiente = getAmbienteSelecionado();
	var tituloAmbiente = $("#tituloAmbiente").val();
	var altura = $("#altura").val();
	var largura = $("#largura").val();
	var novoAmbienteLI = "";

	novoAmbienteLI += "<li class='collection-item avatar li-novo-ambiente'>";
	novoAmbienteLI += "<i class='material-icons circle " + getRandomColor() + "' style='margin-top: 10px;'>insert_chart</i>";
	novoAmbienteLI +="<span class='title'><b>" + ambiente + ": </b>" + tituloAmbiente + "</span>";
	novoAmbienteLI +="<br><span class='title'><b> Altura: </b>" + altura +  " / <b>Largura: </b>"+ largura +"</span>";
	novoAmbienteLI +="<span class='remover-ambiente new badge red valign-wrapper waves-effect waves-light' data-badge-caption='Remover'></span> <br><br>";

	novoAmbienteLI = appendObjetos(novoAmbienteLI);

	novoAmbienteLI +="</li>";
	$("#ambientes-adicionados").append(novoAmbienteLI);
}

function appendObjetos(novoAmbienteLI){

	var selected = [];
	$('#divObjetos p input:checked').each(function() {
	    selected.push($(this).next().text());
	});

	var novosObjetosDiv = "";

	$.each(selected, function( key, value ) {
		novosObjetosDiv += "<div class='chip'>" + value + "<i class='close material-icons'>close</i> </div>";
	});

	novoAmbienteLI += novosObjetosDiv;

	return novoAmbienteLI;

}

function getRandomColor(){
	var colors = Array('red ','blue ','green ','yellow ');
	var tones = Array(' darken-1','darken-2','darknen-3','darken-4', 'accent-1', 'accent-2', 'accent-3', 'accent-4', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5');

	var color = colors[Math.floor(Math.random()*colors.length)];
	var tone = tones[Math.floor(Math.random()*tones.length)];

	return color + tone;

}

function getAmbienteSelecionado(){

	var selecionado = $("input[name='catgrp']:checked").attr('id');
	var ambiente = $('.label-'+ selecionado).text();

	return ambiente;
}

// CHAMADAS AJAX 
function carregarObjetos(idCategoriaParam){
	$.ajax({

		url: 'https://todeschini-backend.herokuapp.com/selectObjetos',
		type: "get",
		data: {idCategoria: idCategoriaParam},
		success: function (objetos){

			$('#divObjetos').empty();
			objetos.forEach(function(key, index){

				var checkbox =  '<p>'
     					+ '<input type="checkbox" id="' + key.nome + '" />'
     					+ '<label for="'+ key.nome + '">'+ key.nome +'</label> </p>';

				$('#divObjetos').append(checkbox);
			})

		},

		error: function(erro){
			Materialize.toast(erro.responseText, 3000, 'red-text');
			console.log(erro.responseText);
		}

	});
}



function carregarCategorias(){
	$.ajax({

		url: 'https://todeschini-backend.herokuapp.com/selectCategorias',

		success: function (categorias){
			
			$('#divCategorias').empty();
			categorias.forEach(function(key, index){

				var radio = '<p class="col s6">'
                     + '<input name="catgrp" type="radio" id="' + key.id + '" />'
                     + '<label class="label-' + key.id + '" for="' + key.id + '" >' + key.nome + '</label>  </p>';
                   

				$('#divCategorias').append(radio);
			})

		},

		error: function(erro){
			$('#divCategorias').append(divErro);
			console.log(erro.responseText);
		}

	});

}
