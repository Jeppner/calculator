let screen = document.querySelector('.main-screen');
let equation = document.querySelector('.screen-equation');

let btns = document.querySelectorAll('.btn');
let operatorBtns = document.querySelectorAll('.operator');
let clearBtn = document.querySelector('.clearBtn');
let deleteBtn = document.querySelector('.deleteBtn');

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
        if(e.target.getAttribute('data-operator') != '=' && e.target.getAttribute('data-misc') != 'del') {
            screen.textContent += btn.textContent;
        }
        if(e.target.getAttribute('data-operator') && x == null && screen.textContent != '') {
            currentNum = Number(screen.textContent.replace(/\D/g, ""));
            x = currentNum;
        } else if (e.target.getAttribute('data-operator') && y == null && res == null) {
            if(screen.textContent.includes(operator)) {
                y = Number(screen.textContent.substring(screen.textContent.indexOf(operator) + 1).replace(/[^0-9.]+/g, ""));
            } 
        }
        if(e.target.getAttribute('data-operator') == '=' && x !== null && y !== null) {
            res = calc(x, y);
            if(res > 9999999999) {
                screen.textContent = res.toExponential();
            } else if(res % 1 !== 0) {
                screen.textContent = res.toFixed(2);
            } else {
                screen.textContent = res;
            }
            currentNum = res;
            x = res;
            y = null;
            res = null;
            operator = null;
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
            y = null;
        }
        if(x == null || x == 0) return; else {
            operator = e.target.getAttribute('data-operator');
        }
    })
})

deleteBtn.addEventListener("click", () => {
    return screen.textContent = screen.textContent.slice(0, -1);
})

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