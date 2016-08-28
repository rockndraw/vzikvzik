


/*-----  SVG  -----*/
var plate = $('.plate');
var plateNumb = plate.find('.numb');
var platePrice = plate.find('.price');
var svg = $('svg');
var popupFlat = $('.popup-flat');
var popupSettings = {
	plan: popupFlat.find('.plan img'),
	rooms: popupFlat.find('.rooms .value'),
	price: popupFlat.find('.price .value'),
	pricepermeter: popupFlat.find('.pricepermeter .value'),
	number: popupFlat.find('.number .value'),
	floor: popupFlat.find('.floor .value'),
	rooms_area: popupFlat.find('#rooms_area'),
	kitchen_area: popupFlat.find('#kitchen_area'),
	gross_area: popupFlat.find('#gross_area'),
	WC: popupFlat.find('#WC'),
	loggia: popupFlat.find('#loggia'),
	balcony: popupFlat.find('#balcony')
}

/*---  Plate  ---*/
	/*- data -*/
	$('path,polygon').mouseenter(function(){
		var id = $(this).attr('id').replace('front-','').replace('back-','');
		for(var i = 0; i < flats.length; i++){
			if( flats[i].number == id ){
				plateNumb.html( flats[i].rooms );
				if( flats[i].price == 'Продано' || flats[i].price == 'Резерв' ){
					platePrice.html( flats[i].price );
				}else{
					platePrice.html( '<b>' + flats[i].price + '</b><del>Р</del><br><span>Стоимость</span>' );
				}
			};
		}
		plate.addClass('visible');
	});
	/*- follow -*/
	$('path,polygon').mousemove(function(e){
		var x = e.pageX + 30;
		var y = e.pageY - 50;
		$('.plate').css({left:x,top:y});
	});
	/*- remove -*/
	$('svg').mouseout(function(){
		$('.plate').removeClass('visible');
	});

/*---  Popup  ---*/
	/*- click -*/
	$('path,polygon').click(function(){
		var id = $(this).attr('id').replace('front-','').replace('back-','');		for(var i = 0; i < flats.length; i++){			if( flats[i].number == id ){				plateNumb.html( flats[i].rooms );				if( flats[i].price == 'Продано'){					return false;				}}}
		for(var i = 0; i < flats.length; i++){
			if( flats[i].number == id ){
				popupSettings.plan.attr('src',flats[i].plan);
				popupSettings.rooms.html( flats[i].rooms );
				popupSettings.price.html( flats[i].price );
				popupSettings.pricepermeter.html( flats[i].pricepermeter );
				popupSettings.number.html( flats[i].number );
				popupSettings.floor.html( flats[i].floor );
				popupSettings.gross_area.html( flats[i].gross_area );
				popupSettings.rooms_area.html( flats[i].rooms_area );
				popupSettings.kitchen_area.html( flats[i].kitchen_area );
				popupSettings.WC.html( flats[i].WC );
				popupSettings.loggia.html( flats[i].loggia );
				popupSettings.balcony.html( flats[i].balcony );
				$('.inline-form input[name="info"]').val( flats[i].number );
				popupOpen('flat');
			};
		}
	});

/*---  Search  ---*/


/*- rotate -*/
$('.rotate').click(function(){
	$('.house-back,.house-front').fadeToggle();
});

/*-----  Popup  -----*/
$(document).keyup(function(d){
	if (d.keyCode == 27) {
		popupClose();
	}
});
$('.layout-overlay, .popup-close').click(function(){
	popupClose();
});
$('.versions li, .callback').click(function(){ popupOpen('form'); });
$('.information .more, .address-logo').click(function(){ popupOpen('information'); });
$('.address-logo').click(function(){ popupOpen('object'); });
function popupClose(){
	$('.layout, .popup').fadeOut();
	$('body').removeClass('lock');
	$('body,.popup-content').css({'margin-left':0});
}
function popupOpen(name){
	$('.popup').hide();
	$('.layout, .popup-' + name).fadeIn();
	var shift = $('body').width();
	$('body').addClass('lock');
	$('.header').width(shift);
	shift -= $('body').width();
	$('body,.popup-content').css({'margin-left':shift});
}

/*-----  Inputmask  -----*/
$('form').hover(function(){$('input[type="tel"]').inputmask("mask", {"mask": "+7 (999) 999-9999"});});

/*-----  Scroll  -----*/
$('a[href^="#"]').click(function(){var a=$(this).attr('href');var b=0;if(a!='#'){b = $(a).offset().top;}$('html, body').animate({scrollTop:b},500);return false;});

/*-----  Ajax Send  -----*/
$('form').submit(function(){
	$.ajax({
		url:'mail.php',
		type:'post',
		dataType:'html',
		data:$(this).serialize(), 
		success: function(response){
			popupOpen('ok');
		},
		error: function(response){
			alert('Ошибка при отправке формы');
		}
	});
	return false;
});
function sendOk(){
	$('.popup').fadeOut();
	$('.send-ok').fadeIn();
	setTimeout(function(){
		$('.layout, .send-ok').fadeOut();
	},3000);
}