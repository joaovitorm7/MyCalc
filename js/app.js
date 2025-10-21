// Variaveis
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');

// Visor da calculadora
let realTimeScreenValue = [];

// Função Limpar
clearbtn.addEventListener("click", () => {

    realTimeScreenValue = [''];
    answerScreen.innerHTML = 0;
    currentInput.className = 'currentInput'
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = " rgba(150, 150, 150, 0.87)";
})

// Função Avaliar Expressão com Segurança sem usar eval()
function safeEvaluate(expression) {
    try {
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            return 'Erro';
        }

        let tokens = expression.match(/[0-9.]+|[+\-*/]/g);
        if (!tokens) return 0;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "*" || tokens[i] === "/") {
                let result = tokens[i] === "*"
                    ? parseFloat(tokens[i - 1]) * parseFloat(tokens[i + 1])
                    : parseFloat(tokens[i - 1]) / parseFloat(tokens[i + 1]);

                tokens.splice(i - 1, 3, result.toString());
                i -= 1;
            }
        }
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "*" || tokens[i] === "/") {
                let result = tokens[i] === "*"
                    ? parseFloat(tokens[i - 1]) * parseFloat(tokens[i + 1])
                    : parseFloat(tokens[i - 1]) / parseFloat(tokens[i + 1]);

                tokens.splice(i - 1, 3, result.toString());
                i -= 1;
            }
        }

        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            let op = tokens[i];
            let num = parseFloat(tokens[i + 1]);
            if (op === "+") result += num;
            if (op === "-") result -= num;
        }
        return result;
    } catch (e) {
        return 'Erro';
    }
}

// Função anexada a todos os botões
buttons.forEach((btn) => {

    btn.addEventListener("click", () => {
        // Se o botão clicado não é o botão de apagar
        if (!btn.id.match('erase')) {
            // Mostrar o valor do botão pressionado
            realTimeScreenValue.push(btn.value)
            currentInput.innerHTML = realTimeScreenValue.join('');

            // Executar e mostrar a resposta em tempo real
            if (btn.classList.contains('num_btn')) {

                answerScreen.innerHTML = safeEvaluate(realTimeScreenValue.join(''));
            }
        }
        
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = safeEvaluate(realTimeScreenValue.join(''));
        }

        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = "#fff";
        }

        if (typeof safeEvaluate(realTimeScreenValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0;
        }

    })
})