
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer(event) {
    if (event.target.innerHTML == a) {
        a = random(1, 3)
        if (l < 6) {
            q++
            l = Math.floor(Math.log2(q))
        }
        generate()
        timer.classList.remove('timer')
        console.log('Correct')
    } else {
        console.log('Wrong')
        
    }
}

function generate() {
    if (l === 2) {
        s = v[a][random(0, 1)];
    } else {
        s = v[a][random(2, 3)];
    }
    for (let i = l; i > 2; i--) {
        m = parseInt(s[s.length - 1])
        if (m === 0) {
            rnd = random(0, 2)
        } else {
            if (i === 3) {
                rnd = random(0, 1)
            } else {
                rnd = random(2, 3)
            }
        }
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

let equation = document.querySelector('.equation')
const buttons = document.querySelectorAll('.button')
const timer = document.querySelector('hr')
for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener('click', checkAnswer)
}

const v = [
    ['1-1', '2-2', '3-3'],
    ['2-1', '3-2', '1+0', '1-0'],
    ['1+1', '3-1', '2+0', '2-0'],
    ['1+2', '2+1', '3+0', '3-0']
];

let l = 2;
let a = 3;
let q = 4;
