let texture;
let hits;
let w;
let h;
let wShip=100;
let hShip=150;
let wStar=50;
let hStar=50;
let wMeteo=50;
let hMeteo=50;
let xShip;
let yShip;
let xStar;
let yStar;
let xMeteo;
let yMeteo;
let speedShip;
let speedStar;
let speedMeteo;
let isPause;
let countStars;
let user;

let interval;

function nrand(a,b) { 
return Math.floor(Math.random()*(b-a)+a)
};

function setShip() {
	xShip=(w-wShip)/2;
	yShip=(h-hShip)/2;
	$('#ship').css('left',xShip+'px');
	$('#ship').css('top',yShip+'px');
}

function setStar() {
	xStar=nrand(0, w-wStar);
	yStar=0;
	$('#star').css('left',xStar+'px');
	$('#star').css('top',yStar+'px');
}

function setMeteo() {
	xMeteo=nrand(0, w-wMeteo);
	yMeteo=0;
	$('#meteo').css('left',xMeteo+'px');
	$('#meteo').css('top',yMeteo+'px');
}

function movieMeteo() {
	yMeteo+=speedMeteo;
	if (yMeteo>h-hMeteo) setMeteo();
	$('#meteo').css('left',xMeteo+'px');
	$('#meteo').css('top',yMeteo+'px');
	if (xMeteo+wMeteo>=xShip && xMeteo<=xShip+wShip && yMeteo+hMeteo>=yShip && yMeteo<=yShip+hShip) {
		$('#ship').effect('explode',{pieces: 9},1000, function(){$(this).show()});
		hits--;
		$('#hits').text(hits);
		setMeteo();
		setShip();
	}
	if (hits==0) result();
}


function movieStar() {
	yStar+=speedStar;
	$('#star').css('left',xStar+'px');
	$('#star').css('top',yStar+'px');
	if (xStar+wStar>=xShip && xStar<=xShip+wShip && yStar+hStar>=yShip && yStar<=yShip+hShip) {
		countStars++;
		$('#ship').effect('pulsate',{times: 1},1000, function(){$(this).show()});
		setStar();
	}
}

function result() {
	clearInterval(interval);
	$('#play').hide();
	$('#result').show();
	$('#ruser').text(user);
	$('#rstarttime').text($('#starttime').text());
	$('#livetime').text($('#min').text()+':'+$('#sec').text());
	$('#countstars').text(countStars);
}

function to2(t) {
let str_t;
if (t<10) str_t="0"+t.toString();
else str_t=t.toString();
return str_t;
}

function timer () {
let minute=parseInt($('#min').text());
let second=parseInt($('#sec').text());
let end=false;

movieMeteo();
movieStar();

if (second<59) second++;
else {
second=0;
if (minute<59) minute++;
else { 
end=true;
}
}

if (end) {
clearInterval(interval);
window.alert("Таймер сработал!");
}
else {
$('#min').text(to2(minute));
$('#sec').text(to2(second));
}
}

$(document).ready(function(){
$(".preview").on('click',
function(){
	$('#registration').show('fold');
	texture=$(this).attr('src');
	hits=2;
	speedShip=5;
	speedStar=5;
	speedMeteo=10;
	});	
$("#go").on('click', function (){
	user=$('#name').val();
	$('#start').hide();
	$('#play').show();
	$('#user').text(user);
	
	let t=new Date();
	t=t.toLocaleTimeString();
	$('#starttime').text(t);
	$('#hits').text(hits);	

	w=$('#game').width();
	h=$('#game').height();
	$('#game').css('background-image','url('+texture+')');
	
	setShip();
	setStar();
	setMeteo();
	
	countStars=0;
	
	$(document).on('keydown', function(event) {
	code=event.code;
		switch (code) {
		case 'ArrowLeft': if (xShip-speedShip>0) xShip-=speedShip; break; //left
		case 'ArrowUp': if  (yShip-speedShip>0) yShip-=speedShip; break; //up
		case 'ArrowRight': if (xShip+speedShip+wShip<w) xShip+=speedShip; break; //right
		case 'ArrowDown': if (yShip+speedShip+hShip<h) yShip+=speedShip; break; //down
		case 'Escape': if (isPause) {
			isPause=false;
			interval=setInterval(timer,1000);
			$('#pause').text('Игра&nbsp;');
			}
			else {
			isPause=true;
			clearInterval(interval);
			$('#pause').text('Пауза');
			}
		break; //esc
		}	
		$('#ship').css('left',xShip+'px');
		$('#ship').css('top', yShip+'px');
	});
	
	interval=setInterval(timer,1000);
	});	
});