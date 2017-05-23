$(document).ready(function() {

	$('select').material_select();

   //modal ambiente
   $('.novo-ambiente.modal-trigger').leanModal({
   		ready: function() { carregarCategorias(); }
   });

   //modal objetos
   $('.novo-objetos.modal-trigger').leanModal({
   		ready: function() { 
   			var idCategoria = $("input[name='catgrp']:checked").attr('id');
   			console.log(idCategoria);
   			carregarObjetos(idCategoria); 
   		}
   });


});

function carregarObjetos(idCategoriaParam){
	$.ajax({

		url: 'https://postgres.heroku.com/selectObjetos',
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
			Materialize.toast(erro.resposeText, 3000, 'red-text');
			console.log(erro.resposeText);
		}

	});
}



function carregarCategorias(){
	$.ajax({

		url: 'https://postgres.heroku.com/selectCategorias',

		success: function (categorias){
			
			$('#divCategorias').empty();
			categorias.forEach(function(key, index){

				var radio = '<p class="col s6">'
                     + '<input name="catgrp" type="radio" id="' + key.id + '" />'
                     + '<label for="' + key.id + '" >' + key.nome + '</label>  </p>';
                   

				$('#divCategorias').append(radio);
			})

		},

		error: function(erro){
			//Materialize.toast(erro.responseText, 3000, 'red-text');
			var divErro = '<div>' + erro.responseText + '</div>'
			$('#divCategorias').append(divErro);

			console.log(erro.responseText);
		}

	});

}
