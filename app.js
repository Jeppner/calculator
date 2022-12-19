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
let dotCount = 0;

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if(e.target.getAttribute('data-digit') == '.') {
            if(dotCount > 0 || x != null && operator == null){
                return;
            } else {
                dotCount++;
            }
        }
        if(screen.textContent === '0' && e.target.getAttribute('data-operator') != '=') {
            clearScreen();
        }
        if(e.target.getAttribute('data-operator') != '=' && e.target.getAttribute('data-misc') != 'del') {
            if (/[+-\/*]/.test(e.target.getAttribute('data-operator')) && /[+-\/*]$/.test(screen.textContent)) {
                screen.textContent = screen.textContent.slice(0, -1);
                operator = e.target.getAttribute('data-operator');
            }
            screen.textContent += btn.textContent;
        }
        // Calculate X
        if(e.target.getAttribute('data-operator') && x == null && screen.textContent != '') {
            currentNum = Number(screen.textContent.replace(/[^0-9.]+/g, ""));
            x = currentNum;
            dotCount = 0;
        // Calculate Y
        } else if (e.target.getAttribute('data-operator') && y == null && res == null) {
            if(screen.textContent.includes(operator) && Number(screen.textContent.substring(screen.textContent.indexOf(operator) + 1).replace(/[^0-9.]+/g, "")) != 0 || !!Number(screen.textContent.substring(screen.textContent.indexOf(operator) + 1).replace(/[^0-9.]+/g, ""))) {
                y = Number(screen.textContent.substring(screen.textContent.indexOf(operator) + 1).replace(/[^0-9.]+/g, ""));
                dotCount = 0;
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


document.addEventListener("keydown", e => {
    let keypress = e.key;
    for(let btn of btns) {
        if(keypress === btn.textContent) {
            if(keypress === '.' && dotCount > 0) {
                return;
            } else if (keypress === '.'){
                dotCount++;
                return screen.textContent += keypress;
            }
            screen.textContent += keypress;
        }
    }
})

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
    dotCount = 0;
}