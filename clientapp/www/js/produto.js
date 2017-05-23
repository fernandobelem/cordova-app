function carregarProdutos(){

	$.ajax({

		//url: 'http://localhost:8080/selectProduto',
		url: 'http://localhost:8080/selectTodosProdutos',

		success: function (produtos){
			

			produtos.forEach(function(key, index){

				var card = '<div class="col s6">' 
				+'<div class="card">' 
				+	'<div class="card-image waves-effect waves-block waves-light">' 
				+		'<img class="activator" src="img/ex1.png" >'
				+	'</div>' 
				+	'<div class="card-reveal">' 
				+		'<span class="card-title grey-text text-darken-4"><b><font size="1.0em">' + key.nome + '</font></b><i class="material-icons right">close</i></span>' 
				+		'<p>' + key.descricao + '</p>' 
				+	'</div>'
				+'</div>' 
				+'</div>';

				$('#divProdutos').append(card);
			})

					

		},

		error: function(erro){
			Materialize.toast(erro.resposeText, 3000, 'red-text');
			console.log(erro.resposeText);
		}

	});

}

$(document).ready(function() {
    carregarProdutos();
});


