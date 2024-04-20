let sum = 3,
    x = 0,
    s = '',
    first = true;
    text = document.querySelector('.text'),
    buttons = document.querySelectorAll('.button');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    sum = 0;
    s = '';
    first = true;
    for (let i = 1; i <= 2; i++) {
        if (i != 2) {
            if (sum > 0 & sum < 3) {
                x = random(0, 1);
                if (x = 0) {
                    x = random(-3, -1);
                } else {
                    x = random(1, 3);
                }
            } else {
                if (sum < 1) {
                    x = random(1, 3);
                } else if (sum > 2) {
                    x = random(-3, -1);
                }
            }
        } else {
            if (sum == 0) {
                x = random(1, 3);
            } else if (sum < 0) {
                x = random(Math.abs(sum - 1), 3);
            } else if (sum > 3) {
                x = random(-3, -(sum - 2));
            } else if (sum == 1) {
                x = random(1, 2);
            } else if (sum == 3) {
                x = random(-2, -1);
            } else {
                x = random(0, 1);
                if (x == 0) {
                    x = -1;
                } else if (x == 1) {
                    x = 1;
                }
            }
        }
        sum += x;
        if (first) {
            s += x;
            first = false;
        } else if (x < 0) {
            s += x;
        } else if (x > 0) {
            s += '+' + x;
        }
    }
    text.innerHTML = s + '=?';
    console.log(sum);
}

for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener('click', function () {
        if (buttons[i].innerHTML == sum) {
            generate()
        }
    });
}