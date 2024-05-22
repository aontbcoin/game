document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const fill = document.getElementById('fill');
    const clickCounter = document.getElementById('click-counter');
    const menuButton = document.getElementById('menu-button');
    const profileButton = document.getElementById('profile-button');
    const menuDrawer = document.getElementById('menu-drawer');
    const profileDrawer = document.getElementById('profile-drawer');
    const multiclickUpgrade = document.getElementById('multiclick-upgrade');
    const multiclickPriceElem = document.getElementById('multiclick-price');
    const multiclickLevelElem = document.getElementById('multiclick-level');
    const autoclickerUpgrade = document.getElementById('autoclicker-upgrade');
    const autoclickerPriceElem = document.getElementById('autoclicker-price');
    const autoclickerLevelElem = document.getElementById('autoclicker-level');
    const levelUpNotification = document.getElementById('level-up-notification');
    const levelUpRewardElem = document.getElementById('level-up-reward');
    const levelUpConfirm = document.getElementById('level-up-confirm');
    
    let clicks = 0;
    const maxClicks = 100;
    let multiclickLevel = 1;
    let multiclickPrice = 100;
    let autoclickerLevel = 1;
    let autoclickerPrice = 100;
    let autoClickInterval = null;
    let level = 1;
    const levels = [
        { threshold: 100, reward: 50 },
        { threshold: 500, reward: 100 },
        { threshold: 2000, reward: 500 },
        { threshold: 5000, reward: 1000 },
        { threshold: 20000, reward: 2000 }
    ];

    function showEffect(x, y, text) {
        const effect = document.createElement('div');
        effect.className = 'effect';
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        effect.textContent = `+${text}`;
        document.body.appendChild(effect);
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 1000);
    }

    function checkLevelUp() {
        if (clicks >= levels[level - 1].threshold) {
            clicks += levels[level - 1].reward;
            clickCounter.textContent = `ATBCOIN: ${clicks}`;
            levelUpRewardElem.textContent = levels[level - 1].reward;
            levelUpNotification.classList.remove('hidden');
            level++;
        }
    }

    coin.addEventListener('click', (event) => {
        const rect = coin.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        clicks += multiclickLevel;
        clickCounter.textContent = `ATBCOIN: ${clicks}`;
        fill.style.width = `${(clicks / maxClicks) * 100}%`;
        coin.style.transform = 'rotate(-5deg) scale(0.95)';
        setTimeout(() => {
            coin.style.transform = 'rotate(0deg) scale(1)';
        }, 100);

        showEffect(x, y, multiclickLevel);
        checkLevelUp();
    });

    menuButton.addEventListener('click', () => {
        menuDrawer.classList.toggle('open');
        profileDrawer.classList.remove('open');
    });

    profileButton.addEventListener('click', () => {
        profileDrawer.classList.toggle('open');
        menuDrawer.classList.remove('open');
    });

    multiclickUpgrade.addEventListener('click', () => {
        if (clicks >= multiclickPrice) {
            clicks -= multiclickPrice;
            multiclickLevel++;
            multiclickPrice = multiclickPrice * 2;
            clickCounter.textContent = `ATBCOIN: ${clicks}`;
            multiclickPriceElem.textContent = multiclickPrice;
            multiclickLevelElem.textContent = multiclickLevel;
        }
    });

    autoclickerUpgrade.addEventListener('click', () => {
        if (clicks >= autoclickerPrice) {
            clicks -= autoclickerPrice;
            autoclickerLevel++;
            autoclickerPrice = autoclickerPrice * 2;
            clickCounter.textContent = `ATBCOIN: ${clicks}`;
            autoclickerPriceElem.textContent = autoclickerPrice;
            autoclickerLevelElem.textContent = autoclickerLevel;
            if (!autoClickInterval) {
                autoClickInterval = setInterval(() => {
                    clicks += 1;
                    clickCounter.textContent = `ATBCOIN: ${clicks}`;
                    fill.style.width = `${(clicks / maxClicks) * 100}%`;
                    checkLevelUp();
                }, 10000);
            }
        }
    });

    levelUpConfirm.addEventListener('click', () => {
        levelUpNotification.classList.add('hidden');
    });
});
