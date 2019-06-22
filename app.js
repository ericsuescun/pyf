var rta, guess, picas, fijas, prepend;


initGame();

$('input.form-control').keypress(function (e) {
	if(e.which == 13) {
		e.preventDefault();
		$('input#user').blur();
		rta = $('input.form-control').val().split('');
	 	if(checkInput()) {
	 		test();	
	 	}
	} else {
		$('spam#warning').removeClass('error');
		$('input#user').removeClass('bgError');
	}
});

$('button#reset').on('click', function(e) {
	e.preventDefault();
	$('table#game').remove();
	initGame();
	$('div.container-fluid').addClass('d-none');
});

function checkInput() {
	if(rta.length != 4 | checkRepeat()) {
		$('spam#warning').addClass('error');
		$('input#user').addClass('bgError');
		return false;
	} else {
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
						return true;
					}
				}
			}
		}
		return false;
	}
}

function initGame() {
	var n1, n2, n3, n4;
	guess = [];
	picas = 0;
	fijas = 0;	
	prepend = 0;
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
	console.log('Adivina! ' + guess.join(''));
	$('div.container-fluid').addClass('d-none');
}

function test() {
	for(var i=0; i<guess.length; i++) {
		for(var j=0; j<rta.length; j++) {
			if(guess[i] == rta[j]) {
				if(i==j) {
					fijas++;
				} else {
					picas++;
				}
			}
		}
	}
	var template =	  	  '<tr>' +
	                  '<td>' + rta.join('') + '</td>' +
	                  '<td>' + picas + '</td>'  +
	                  '<td>' + fijas + '</td>'  +
	                  '</tr>';
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