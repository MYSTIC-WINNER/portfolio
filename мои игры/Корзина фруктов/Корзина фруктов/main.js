//Переменные для формы
let nik = document.getElementById('nikname');
let go = document.getElementById('GoGame');
//Переменные для игровой инфы
let timer = document.getElementById('timer');
let life = document.getElementById('life');
let lovko = document.getElementById('lovko');
let gamenik = document.getElementById('game_nik');
let [min,sec] = [0,0];
let schet=0;
let lifeS = 3;
//Перемынные для корзины
let korz = document.getElementById('korzina');
let korzX = 350;
korz.style.left = korzX + 'px';
//Таймер
let interval;
let interval2;
//Пауза
let isPause;
//Форма
nik.onchange = function(){
    if(nik.value != ''){
        go.removeAttribute('disabled');
    } else {
        go.setAttribute('disabled','disabled');
    }
}
function timerus (){
    if(min < 10 && sec < 10){
        timer.innerHTML = `Таймер: 0${min}:0${sec}`;
    } else if(min == 0 && (sec => 10 && sec<60)){
        timer.innerHTML = `Таймер: 0${min}:${sec}`;
    } else if (min>10 && set < 10){
        timer.innerHTML = `Таймер: ${min}:0${sec}`;
    } 
    if(sec==60){
        min++;
        sec = 0;
        timer.innerHTML = `Таймер: 0${min}:00`;
    }
    sec++;
};
go.onclick = function(){
    go.setAttribute('disabled','disabled');
    gamenik.innerText = "Имя: "+nik.value;
    console.log(nik.value);
    interval2 = setInterval(timerus,1000);
}

//Движение корзины

document.addEventListener('keydown', function(event){
    code=event.code;
    switch(code){
        case 'ArrowLeft': if(korzX - 25 > 0){
            korzX -= 25;
            korz.style.left = korzX + 'px';
            break;
        }
        case 'ArrowRight': if(korzX + 125 < 800){
            korzX += 25;
            korz.style.left = korzX + 'px';
            break;
        }
        case 'Escape': if(isPause){
            isPause=false;
            interval = setInterval(spawnRand,1000);
            interval2 = setInterval(timerus,1000);
            document.getElementById('pause').innerHTML = "Игра не на паузе"
        } else {
            isPause=true;
            clearInterval(interval);
            clearInterval(interval2);
            document.getElementById('pause').innerHTML = "Игра на паузе"
        }
        break; //esc
    }
})

//Спавн фруктов

class Fruit{

    #posX;
    #posY;

    constructor(posX,posY){
        this.#posX=posX;
        this.#posY=posY;
    }

    get posX(){
        return this.#posX;
    }
    get posY(){
        return this.#posY;
    }

    set posX(posX){
        this.#posX = posX;
    }
    set posY(posY){
        this.#posY = posY;
    }

    spawnfruit(){
        let startX = this.posX;
        let startY = this.#posY;
        //Стиляга
        let pole = document.getElementById('pole');
        let fruit = document.createElement('div');
        pole.appendChild(fruit);
        fruit.style.position = 'absolute';
        fruit.style.width = '100px';
        fruit.style.height = '100px';
        fruit.style.background = 'url(cherry.png)';
        fruit.style.backgroundSize = 'cover';
        fruit.style.backgroundPosition = 'center center';
        fruit.style.left = startX + "px";
        fruit.style.top = startY + "px";
        fruit.classList.add("fruit");
        //Двигатель
        setInterval(function(){
            startY += 0.5;
            fruit.style.top = startY + "px";
            if(startY == 500 && fruit.style.display!='none'){
                pole.removeChild(fruit);
                //fruit.style.display = 'none';
                lifeS-=1;
                life.innerHTML = `Жизни: ${lifeS}`;
            }
            //Ловика
            let korzYL = 500;
            if(startY+105==korzYL+50 && startX >= korzX-80 && startX<= korzX+80){
                pole.removeChild(fruit);
                //fruit.style.display = 'none';
                schet+=1;
                lovko.innerHTML = `Поймано: ${schet}`;
            }
            //Конец игры
            
        }, 10);
        
    }
}
interval = setInterval(spawnRand,1000);
function spawnRand(){
    let randLine = Math.random() * (9 - 1) + 1;
    randLine = parseInt(randLine);
    let startLeftPos;
    switch(randLine){
        case 1: startLeftPos = 0; break;
        case 2: startLeftPos = 100; break;
        case 3: startLeftPos = 200; break;
        case 4: startLeftPos = 300; break;
        case 5: startLeftPos = 400; break;
        case 6: startLeftPos = 500; break;
        case 7: startLeftPos = 600; break;
        case 8: startLeftPos = 700; break;
    }
    let startTopPos = 0;
    let NewFruit = new Fruit(startLeftPos,startTopPos);
    NewFruit.spawnfruit();
};
