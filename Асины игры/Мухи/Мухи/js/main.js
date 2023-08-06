//Начальные настройки
let texture;
let lev;
let hits=5;
let playerX;
let playerY;
let playerSpeed=5;
let playerWidth=50;
let playerHeight=50;
let exitX;
let exitY;
let exitWidth=100;
let exitHeight=100;
let countFoys=0;
let countTraps=0;
let countTimer;

let levels=document.querySelectorAll('.preview');
let user=document.querySelector('#name');
let go=document.querySelector('#go');
let player=document.querySelector('#player');
let w=800;
let h=550;
let isPause;

let nrand=(a,b) => Math.floor(Math.random()*(b-a)+a);

class Foy {
	#x
	#y
	#width=50
	#height=50
	#speed=5
	#direction
	#id
	#back=''
	constructor (x, y, direction, speed, id, width, height) {
		this.#x=x;
		this.#y=y;
		this.#speed=speed;
		this.#width=width;
		this.#height=height;	
		this.#id=id;
		switch (direction) {
			case 1: this.#back='img/foy-up.png'; break;
			case 2: this.#back='img/foy-left.png'; break;
			case 3: this.#back='img/foy-right.png'; break;
			case 4: this.#back='img/foy-down.png'; break;
		}
		this.#direction=direction;		
	}
	set x(x) {
		this.#x=x;
	}
	set y(y) {
		this.#y=y;
	}
	set id(id) {
		this.#id=id;
	}
	set speed(speed) {
		this.#speed=speed;
	}
	set width(width) {
		this.#width=width;
	}
	set height(height) {
		this.#height=height;
	}
	set direction(direction) {
		this.#direction=direction;
	}
	set back(back) {
		this.#back=back;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get id() {
		return this.#id;
	}
	get speed() {
		return this.#speed;
	}
	get width() {
		return this.#width;
	}
	get heght() {
		return this.#height;
	}
	get direction() {
		return this.#direction;
	}
	get back() {
		return this.#back;
	}
	movie() {
		let el=document.querySelector('#'+this.#id);
		switch (this.#direction) {
		case 1: if (this.#y-this.#speed>0) {
				this.#y-=this.speed;
				el.style.left=this.#x+'px';
				el.style.top=this.#y+'px';
				} else {
				foys.deleteFoy(this.#id);
				//document.querySelector('#game').removeChild(el);
				el.style.display='none'; //up
				}  
				break;//top
		case 2: if (this.#x-this.#speed>0) {
				this.#x=this.speed;
				el.style.left=this.#x+'px';
				el.style.top=this.#y+'px';
				} else {
				foys.deleteFoy(this.#id);
				//document.querySelector('#game').removeChild(el);
				el.style.display='none'; //left
				} 
				break; //left
		case 3: if (this.#x+this.#speed+this.#width<w) {
				this.#x+=this.speed;
				el.style.left=this.#x+'px';
				el.style.top=this.#y+'px';
				} else {
				foys.deleteFoy(this.#id);
				//document.querySelector('#game').removeChild(el);
				el.style.display='none'; //right
				} 
				break;//right
		case 4: if (this.#y+this.#speed+this.#height<h) {
				this.#y+=this.speed;
				el.style.left=this.#x+'px';
				el.style.top=this.#y+'px';
				} else {
				foys.deleteFoy(this.#id);
				//document.querySelector('#game').removeChild(el);
				el.style.display='none'; 
				}
				break;//down
		}
	// столкновение с монстрами
	if  (this.#x+this.#width>=playerX && this.#x<=playerX+playerWidth && this.#y+this.#height>=playerY && this.#y<=playerY+playerHeight) {
		hits--;
		countFoys++;
		document.querySelector('#hits').innerHTML=hits;
		el.style.display='none';
		if (hits==0) {
			result();
			}
		}
	}
}

class FoyMass {
	#arr
	#count
	constructor () {
		this.#arr=[];
		this.#count=0;
	}
	get count() {
		return this.#count;
	}	
	addFoy() {
		this.#count++;
		let speed=nrand(1,5);
		let x=nrand(0,w-50);
		let y=nrand(0,h-50);
		let direction=nrand(1,5);
		let id='idf'+String(this.#count);
		let foy=new Foy(x,y,direction,speed, id,50,50);
		this.#arr.push(foy);
		let el=document.createElement('div');
		el.classList.add('foy');
		el.setAttribute('id',id);
		document.querySelector('#game').appendChild(el);
		el.style.left=x+'px';
		el.style.top=y+'px';
		el.style.backgroundImage='url('+foy.back+')';
	
	}		
	deleteFoy(id) {
		
	}
	movieFoys() {
		for (let foy of this.#arr) {
			foy.movie();
		}
	}
}

class Trap{
	#x
	#y
	#width=100
	#height=100
	#id
	constructor (x, y, id, width, height) {
		this.#x=x;
		this.#y=y;
		this.#width=width;
		this.#height=height;	
		this.#id=id;
	}
	set x(x) {
		this.#x=x;
	}
	set y(y) {
		this.#y=y;
	}
	set width(width) {
		this.#width=width;
	}
	set height(height) {
		this.#height=height;
	}
	set id(id) {
		this.#id=id;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
	get id() {
		return this.#id;
	}
	crash() {
		if  (this.#x+this.#width>=playerX && this.#x<=playerX+playerWidth && this.#y+this.#height>=playerY && this.#y<=playerY+playerHeight) {
			hits--;
			countTraps++;
			document.querySelector('#hits').innerHTML=hits;
			console.log(this.#id);
			console.dir(document.querySelector('#'+this.#id));
			document.querySelector('#'+this.#id).style.display='none';
			if (hits==0) {
				result();
				}
		}
	}
}

class TrapMass {
	#arr
	#count
	constructor () {
		this.#arr=[];
		this.#count=0;
	}
	get count() {
		return this.#count;
	}	
	addTrap() {
		this.#count++;
		let x=nrand(0,w-100);
		let y=nrand(0,h-100);
		let id='idt'+String(this.#count);
		let trap=new Trap(x,y,id,100,100);
		this.#arr.push(trap);
		let el=document.createElement('div');
		el.classList.add('trap');
		el.setAttribute('id',id);
		document.querySelector('#game').appendChild(el);
		el.style.left=x+'px';
		el.style.top=y+'px';
	
	}		
	crashTraps() {
		for (let trap of this.#arr) {
			trap.crash();
		}
	}
}

let foys=new FoyMass();
let traps=new TrapMass();

//таймер
let interval;

function to2(t) {
let str_t;
if (t<10) str_t="0"+t.toString();
else str_t=t.toString();
return str_t;
}

function timer () {
	
if (countTimer!=0) {
	countTimer--;
	}
else {
	countTimer=4;
	for (let i=0;i<10;i++) {
		foys.addFoy();
		}
	for (let i=0;i<2;i++) {
		traps.addTrap();
		}	
	}	
foys.movieFoys();
	
minute=parseInt(document.querySelector('#min').innerHTML);
second=parseInt(document.querySelector('#sec').innerHTML);
let end=false;

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
document.querySelector('#min').innerHTML=to2(minute);
document.querySelector('#sec').innerHTML=to2(second);
}
}

//движение игрока
document.addEventListener('keydown', function(event) {
code=event.code;
switch (code) {
case 'ArrowLeft': if (playerX-playerSpeed>0) playerX-=playerSpeed; break; //left
case 'ArrowUp': if  (playerY-playerSpeed>0) playerY-=playerSpeed; break; //up
case 'ArrowRight': if (playerX+playerSpeed+playerWidth<w) playerX+=playerSpeed; break; //right
case 'ArrowDown': if (playerY+playerSpeed+playerHeight<h) playerY+=playerSpeed; break; //down
case 'Escape': if (isPause) {
	isPause=false;
	interval=setInterval(timer,1000);
	document.querySelector('#pause').innerHTML='Игра&nbsp;';
	}
	else {
	isPause=true;
	clearInterval(interval);
	document.querySelector('#pause').innerHTML='Пауза';
	}
	break; //esc
}	
player.style.left=playerX+'px';
player.style.top=playerY+'px';
traps.crashTraps();
if (playerX>exitX && playerX+playerWidth<exitX+exitWidth && playerY>exitY && playerY+playerHeight<exitY+exitHeight) {
	result();
}
});

//результаты игры
function result() {
	clearInterval(interval);
	document.querySelector('#play').style.display="none";	
	document.querySelector('#result').style.display="block";	
	document.querySelector('#ruser').innerHTML=user.value;
	document.querySelector('#rlivetime').innerHTML=document.querySelector('#min').innerHTML+':'+document.querySelector('#sec').innerHTML;
	document.querySelector('#countfoys').innerHTML=countFoys;
	document.querySelector('#counttraps').innerHTML=countTraps;
	document.querySelector('#counthits').innerHTML=hits;
}

//выбор уровня

for (let level of levels) level.addEventListener('click',function() {
	texture=this.getAttribute('src');
	let reg=new RegExp('[0-9]');
	lev=texture.match(reg)[0];
	document.querySelector('#registration').style.display='block';
});

//форма
user.addEventListener('change', function () {
	if (user.value!='') go.disabled=false;
	else go.disabled=true;
})


//player.addEventListener('keydown', fPlayerMovie, false);

//экран игры
go.addEventListener('click',function () {
document.querySelector('#start').style.display="none";
document.querySelector('#play').style.display="block";	

document.querySelector('#user').innerHTML=user.value;

let t=new Date();
t=t.toLocaleTimeString();
document.querySelector('#starttime').innerHTML=t;

document.querySelector('#game').style.backgroundImage='url('+texture+')';
switch(lev) {
	case '1': playerX=0; playerY=0; exitX=w-exitWidth; exitY=h-exitHeight; break; 
	case '2': playerX=0; playerY=h-playerHeight; exitX=w-exitWidth; exitY=0; break;
	case '3': playerX=w-playerWidth; playerY=0; exitX=0; exitY=h-exitHeight; break;
	case '4': playerX=w-playerWidth; playerY=h-exitHeight; exitX=0; exitY=0; break;
}
player.style.left=playerX+'px';
player.style.top=playerY+'px';
exit.style.left=exitX+'px';
exit.style.top=exitY+'px';
countTimer=4;
countTimer=4;
isPause=false;
interval=setInterval(timer,1000);
})
