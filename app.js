let screen = document.querySelector('.main-screen');
let equation = document.querySelector('.screen-equation');
let btns = document.querySelectorAll('.btn');
let operatorBtns = document.querySelectorAll('.operator');
let clearBtn = document.querySelector('.clearBtn');

let x = null;
let y = null;
let operator = null;

let inputs = [];

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if(screen.textContent === '0') {
            clearScreen();
        }
        if(e.target.getAttribute('data-digit')) {
            screen.textContent += btn.getAttribute('data-digit');
        }
        if(e.target.getAttribute('data-operator') && x == null && screen.textContent != '') {
            x = Number(screen.textContent);
            clearScreen();
        } else if (e.target.getAttribute('data-operator') && y == null) {
            y = Number(screen.textContent);
            clearScreen();
        }
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if (x != null && y != null && operator != null) {
            screen.textContent = calc(x, y);
            x = calc(x, y);
            y = null;
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