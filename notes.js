var rta, guess, picas, fijas;


initGame();

$('input.form-control').keypress(function (e) {
	if(e.which == 13) {
		e.preventDefault();
		console.log('ENTER!');
		$('input#user').blur();
		rta = $('input.form-control').val().split('');
		console.log('Respuesta entrada: ' + rta.join(''));
	 	if(checkInput()) {
	 		test();	
	 	}
	} else {
		$('spam#warning').removeClass('error');
		$('input#user').removeClass('bgError');
		console.log('Remove both error classes');
	}
});

$('button#reset').on('click', function(e) {
	e.preventDefault();
	$('table#game').remove();
	initGame();
	$('div.container-fluid').addClass('d-none');
	console.log('Reset!');
});

function checkInput() {
	if(rta.length != 4 | checkRepeat()) {
		console.log('Add class errors and !=4 or repeat error')
		$('spam#warning').addClass('error');
		$('input#user').addClass('bgError');
		return false;
	} else {
		console.log('Ok 4 o No repeat');
		$('input.form-control').val('');
		$('input#user').focus();
		return true;
	}
}

function checkRepeat() {
	var arry = $('input.form-control').val().split('');
	if($('input.form-control').val().length > 1) {
		for(var i=0; i<$('input.form-control').val().length; i++ ) {
			for(var j=0; j<$('input.form-control').val().length; j++ ) {
				if(i!=j) {
					if(arry[i] == arry[j]) {
						console.log('Repeat error');
						return true;
					}
				}
			}
		}
		console.log('No repeat error');
		return false;
	}
}

function initGame() {
	var n1, n2, n3, n4;
	guess = [];
	picas = 0;
	fijas = 0;	
	n1 = (Math.random()*9).toFixed();
	guess.push(n1);
	n2 = (Math.random()*9).toFixed();
	while(n2 == n1) {
		n2 = (Math.random()*9).toFixed();
	}
	guess.push(n2);
	n3 = (Math.random()*9).toFixed();
	while(n3 == n1 | n3 == n2) {
		n3 = (Math.random()*9).toFixed();
	}
	guess.push(n3);
	n4 = (Math.random()*9).toFixed();
	while(n4 == n1 | n4 == n2 | n4 == n3) {
		n4 = (Math.random()*9).toFixed();
	}
	guess.push(n4);
	$('div#table').append(	'<table class="table table-bordered" id="game">' +
						'<thead>' +
						'<th>Número</th>' +
						'<th>Picas</th>' +
						'<th>Fijas</th>' +
						'</thead>' +
						'<tbody>' +
						'</tbody>' +
						'</table>'
						);
	console.log('Adivina! ' + guess.join());
	$('div.container-fluid').addClass('d-none');
	console.log('Inicializado!');
}

function test() {
	var template =	  '<tr>' +
	                  '<td>' + rta.join('') + '</td>' +
	                  '<td>' + picas + '</td>'  +
	                  '<td>' + fijas + '</td>'  +
	                  '</tr>';
	for(var i=0; i<guess.length; i++) {
		for(var j=0; j<rta.length; j++) {
			if(guess[i] == rta[j]) {
				if(i==j) {
					fijas++;
					console.log('fija!');
				} else {
					picas++;
					console.log('pica!');
				}
			}
		}
	}
	if(prepend == 0) {
		$('tbody').append(template);
		prepend = 1;	
	} else {
		$(template).insertBefore('table > tbody > tr:first');
	}
	if(fijas == 4) {
		$('.container-fluid').removeClass('d-none');
	} else {
		picas = 0;
		fijas = 0;
	}
}