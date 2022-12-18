let screen = document.querySelector('.main-screen');
let equation = document.querySelector('.screen-equation');
let btns = document.querySelectorAll('.btn');
let operatorBtns = document.querySelectorAll('.operator');
let clearBtn = document.querySelector('.clearBtn');

let operators = ['-', '+', '/', '*'];

let x = null;
let y = null;
let res = null;
let operator = null;
let currentNum = null;

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if(screen.textContent === '0' && e.target.getAttribute('data-operator') != '=') {
            clearScreen();
        }
        if(e.target.getAttribute('data-operator') != '=') {
            screen.textContent += btn.textContent;
        }
        if(e.target.getAttribute('data-operator') && x == null && screen.textContent != '') {
            currentNum = Number(screen.textContent.replace(/\D/g, ""));
            x = currentNum;
        } else if (e.target.getAttribute('data-operator') && y == null && res == null) {
            if(screen.textContent.includes(operator)) {
                y = Number(screen.textContent.substring(screen.textContent.indexOf(operator) + 1).replace(/\D/g, ""));
                console.log(screen.textContent);
                console.log('Y iz '+ y);
                currentNum = y;
            } else {
                y = Number(screen.textContent.replace(/\D/g, ""));
                console.log('Y is ' + y);
            }
        }
        if(e.target.getAttribute('data-operator') == '=' && x !== null && y !== null) {
            res = calc(x, y);
            screen.textContent = res;
            x = res;
            y = null;
        }
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if (!!x && !!y && !!operator) {
            screen.textContent = calc(x, y);
            currentNum = calc(x, y);
            x = currentNum;
            !!y;
        }
        if(x == null) return; else {
            operator = e.target.getAttribute('data-operator');
        }
    })
})

function clearScreen() {
    screen.textContent = '';
}

clearBtn.addEventListener("click", clearAll);

function clearAll() {
    screen.textContent = '0';
    x = null;
    y = null;
    operator = null;
}

function calc(x = x, y = y) {
    switch(operator) {
        case '+':
            return x+y;
        case '-': 
            return x-y;
        case '/':
            return x/y;
        case '*':
            return x*y;
    }
}