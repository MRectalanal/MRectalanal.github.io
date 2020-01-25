$(document).ready(()=>{
	var audio_1 = new Howl({
      src: ['audio/1.mp3'],
      volume: 0.5
    });
	audio_1.play();

	/*play_1();

	function play_1() {
		$('#audio_1').play();
	}*/
	
	
	function loh() {
		let i = 0;
		let loh_count = $('body').height() * $('body').width() / 3690;
		while (i < loh_count) {
		    (function(i) {
		      setTimeout(function() {
		        $('.loh').append('<span> лох </span>');
		      }, 1*i)
		    })(i++)
		}
		setTimeout(function() {$('.loh span').remove();}, 2000)
	}


	$('path').click(function() {
		$(this).addClass('filled');
		calc_score();
	});

	$('#clear_all').click(()=>{
		clear_all();
	});

	$('#show_all').click(()=>{
		$('path').addClass('filled');
	});

	$('#play').click(()=>{
		$('#clear_all').click();
		calc_score();
		$('.score').css('display', 'block');
		$('#stop_play').css('display', 'block');
		$('#dropdownMenuButton').css('display', 'none');
	});

	$('#stop_play').click(()=>{
		$('path:not(.filled)').addClass('filled_lose');
		loh();
		setTimeout(stop_play, 2000);
	});

	function calc_score() {
		let all = $('path').length,
			cur = $('path.filled').length;
		$('.score span#all')[0].innerHTML = all;
		$('.score span#cur')[0].innerHTML = cur;
		if(all == cur) win();
	}

	function clear_all() {
		$('path').removeClass('filled');
		$('path').removeClass('filled_lose');
	}

	function win(argument) {
		$('.score').addClass('winned');
		$('#stop_play').addClass('winned');
		setTimeout(()=>{$('.modal#win').show()}, 2000);
	}

	$('.modal .close').click(function() {
		$('.modal#win').hide();
		stop_play();
	});

	function stop_play() {
		clear_all();
		$('#stop_play').css('display', '');
		$('.score').css('display', '');
		$('#dropdownMenuButton').css('display', '');
	}
});