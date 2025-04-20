const equation = document.querySelector('.equation')
const buttons = document.querySelectorAll('.button')
const timer = document.querySelector('.hr')
const score = document.querySelector('.score')
const stage = document.querySelector('.stage')
const repeat = document.querySelector('.repeat')

let l;
let a;
let q;
let scr
let t

startGame()

function startGame() {
    repeat.style.display = 'none'
    timer.style.display = 'block'
    game_run = true
    l = 2;
    a = 3;
    q = 1;
    scr = 0
    t = 2100
    stage.innerHTML = 'Уровень 1'
    score.innerHTML = 'Счёт: 0'
    equation.innerHTML = '1+2=?'
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function endGame() {
    timer.style.display = 'none'
    timer.style.transition = 'none'
    timer.style.width = '100%'
    game_run = false
    repeat.style.display = 'block'
    console.log('end')
}

function checkAnswer(event) {
    if (game_run && equation.innerHTML.indexOf('?') > 0) {
        if (event.target.innerHTML == a) {
            if (q > 1) {
                scr += Math.round((t - timer.getAnimations()[0].currentTime) * 10 * q / t)
            } else {
                scr += 1
            }
            score.innerHTML = 'Счёт: ' + scr
            a = random(1, 3)
            console.log(a)
            q++
            if (l < 6) {
                l = Math.floor(Math.log2(q + 3))
            }
            if (t > 2000) {
                t -= 100
            }
            timer.style.transition = 'none'
            timer.style.width = '100%'
            equation.innerHTML = equation.innerHTML.replace('?', event.target.innerHTML)
            setTimeout(() => {
                timer.style.transition = 'all ' + t / 1000 + 's linear';
                timer.style.width = '0';
                stage.innerHTML = 'Уровень ' + q
                generate()
            }, 1000)
            console.log('Correct')
        } else {
            endGame()
            console.log('Wrong')
            
        }
    }
    
}

function generate() {
    s = v[a][random(0, 1+2*(l!=2))];
    for (let i = l; i > 2; i--) {
        m = parseInt(s[s.length - 1])
        rnd = random(0, (1+2*(i!=3))*(m!=0)+2*(m===0))
        p = v[m][rnd]
        if (s[s.length - 2] === '-') {
            if (v[m][rnd][1] === '-') {
                p = v[m][rnd].replace('-', '+')
            } else {
                p = v[m][rnd].replace('+', '-')
            }
        }
        s = s.slice(0, -1) + p;
    }
    equation.innerHTML = s + '=?'
}

for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener('click', checkAnswer)
}
timer.addEventListener('transitionend', endGame)
repeat.addEventListener('click', startGame)

const v = [
    ['1-1', '2-2', '3-3'],
    ['2-1', '3-2', '1+0', '1-0'],
    ['1+1', '3-1', '2+0', '2-0'],
    ['1+2', '2+1', '3+0', '3-0']
];