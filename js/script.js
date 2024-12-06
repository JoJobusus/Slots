document.addEventListener('DOMContentLoaded', () => {
    const slotMachine = document.getElementById('slot-machine');
    const spinBtn = document.getElementById('spin-btn');
    const message = document.getElementById('message');
    const welcome = document.getElementById('welcome');
    const gameContainer = document.getElementById('game');

    const images = ['🍎', '🍌', '🍒', '🍇', '🍉'];
    let attempts = 3;
    let userName;

    const initializeGame = () => {
        attempts = 3;
        message.textContent = `Спроби залишились: ${attempts}`;
        spinBtn.style.display = 'block'; // Показуємо кнопку "Крутити"
        document.getElementById('restart-btn')?.remove(); // Видаляємо кнопку "Рестарт", якщо існує
        generateSlots();
    };

    // Під час першого запуску запитуємо ім'я
    if (!userName) {
        userName = prompt("Введіть ваше ім’я:");
        if (!userName || userName.trim() === "") {
            userName = "Гравець"; // Ім'я за замовчуванням
        }
        welcome.textContent = `Ласкаво просимо, ${userName}!`;
    }

    const generateSlots = () => {
        slotMachine.innerHTML = '';
        let columns = [[], [], []];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let randomImg;
                do {
                    randomImg = images[Math.floor(Math.random() * images.length)];
                } while (columns[j].includes(randomImg));
                columns[j].push(randomImg);

                const slotElement = document.createElement('div');
                slotElement.textContent = randomImg;
                slotElement.classList.add('spinning');
                setTimeout(() => slotElement.classList.remove('spinning'), 400);
                slotMachine.appendChild(slotElement);
            }
        }
        return columns;
    };

    const checkAnyRowWin = (columns) => {
        for (let i = 0; i < 3; i++) {
            if (
                columns[0][i] === columns[1][i] &&
                columns[1][i] === columns[2][i]
            ) {
                return true; // Якщо всі елементи в рядку співпадають
            }
        }
        return false;
    };

    const showRestartButton = () => {
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Рестарт';
        restartBtn.id = 'restart-btn';
        restartBtn.addEventListener('click', initializeGame);
        gameContainer.appendChild(restartBtn);
    };

    spinBtn.addEventListener('click', () => {
        if (attempts > 0) {
            const columns = generateSlots();
            if (checkAnyRowWin(columns)) {
                message.textContent = '🎉 Вітаємо! Ви перемогли! 🎉';
                spinBtn.style.display = 'none';
                showRestartButton();
                return;
            } else {
                attempts--;
                message.textContent = `Спроби залишились: ${attempts}`;
            }
        } else {
            message.textContent = '😞 На жаль, ви програли. Спроби закінчились.';
            spinBtn.style.display = 'none';
            showRestartButton();
        }
    });

    initializeGame();
});
