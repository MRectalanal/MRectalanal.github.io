$(document).ready(()=>{
	var audio_1 = new Howl({
      src: ['audio/1.mp3'],
      volume: 0.3,
  	  loop: true,
    });
    var audio_2 = new Howl({
      src: ['audio/win_sound.mp3'],
      volume: 0.4
    });
    var audio_menu = new Howl({
      src: ['audio/menu_hover.mp3'],
      volume: 0.3
    });
    var audio_button = new Howl({
      src: ['audio/button_click.mp3'],
      volume: 0.3
    });
    var audio_picture = new Howl({
      src: ['audio/picture_click.mp3'],
      volume: 0.3
    });
    var audio_lose = new Howl({
      src: ['audio/shitttt.mp3'],
      volume: 0.3
    });
	


	function play_1() {
		audio_2.pause();
	}
	function play_2() {
		audio_2.play();
	}
	function menu_sound() {audio_menu.play();}
	function button_sound() {audio_button.play();}
	function picture_sound() {audio_picture.play();}
	function lose_sound() {audio_lose.play();}
	
	
	function loh() {
		lose_sound();
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

	$('button').on('mouseenter', menu_sound);
	$('button').on('click', button_sound);

	

	$('#play').click(()=>{
		start_play();
	});

	function start_play() {
		clear_all();
		calc_score();
		$('.score').css('display', 'block');
		$('#stop_play').css('display', 'block');
		$('#play').css('display', 'none');

		$('path:not(.filled)').click(function() {
			if(!$(this).hasClass('filled')) {
				picture_sound();
				$(this).addClass('filled');
				calc_score();
			}
		});

		$('#stop_play').click(()=>{
			$("#stop_play").attr("disabled", true);
			$('path:not(.filled)').addClass('filled_lose');
			loh();
			setTimeout(stop_play, 2000);
		});
	}

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

	function win() {
		$('.score').addClass('winned');
		$('#stop_play').addClass('winned');
		play_2();
		setTimeout(()=>{$('.modal#win').show()}, 2000);
		$('#stop_play').off('click');
		$('path:not(.filled)').off('click');
	}

	$('.modal .close').click(function() {
		$('.modal#win').hide();
		stop_play();
		play_1();
	});

	function stop_play() {
		clear_all();
		$('#stop_play').css('display', '');
		$('.score').css('display', '');
		$('#play').css('display', '');
		$("#stop_play").attr("disabled", false);
		$('#stop_play').off('click');
		$('path:not(.filled)').off('click');
	}
});
