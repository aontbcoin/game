document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const fill = document.getElementById('fill');
    const clickCounter = document.getElementById('click-counter');
    const levelCounter = document.getElementById('level-counter');
    const menuButton = document.getElementById('menu-button');
    const profileButton = document.getElementById('profile-button');
    const menu = document.getElementById('menu');
    const profile = document.getElementById('profile');
    const upgradeMulticlickButton = document.getElementById('upgrade-multiclick');
    const upgradeAutoclickerButton = document.getElementById('upgrade-autoclicker');
    const multiclickLevel = document.getElementById('multiclick-level');
    const multiclickPrice = document.getElementById('multiclick-price');
    const autoclickerLevel = document.getElementById('autoclicker-level');
    const autoclickerPrice = document.getElementById('autoclicker-price');

    let totalClicks = 0;
    let level = 1;
    let multiclickLevelValue = 1;
    let autoclickerLevelValue = 1;
    let multiclickCost = 100;
    let autoclickerCost = 100;
    const levelThresholds = [100, 500, 2000, 7000, 18000];
    const maxLevel = levelThresholds.length;

    const updateProgress = () => {
        const currentThreshold = levelThresholds[level - 1];
        const previousThreshold = level > 1 ? levelThresholds[level - 2] : 0;
        const levelClicks = totalClicks - previousThreshold;
        fill.style.width = `${(levelClicks / (currentThreshold - previousThreshold)) * 100}%`;
    };

    coin.addEventListener('click', () => {
        if (level <= maxLevel) {
            totalClicks += multiclickLevelValue;
            clickCounter.textContent = `Clicks: ${totalClicks}`;
            updateProgress();

            const currentThreshold = levelThresholds[level - 1];
            if (totalClicks >= currentThreshold) {
                level++;
                if (level <= maxLevel) {
                    levelCounter.textContent = `Level: ${level}`;
                    updateProgress();
                } else {
                    levelCounter.textContent = `Level: Max`;
                }
            }

            coin.style.transform = 'rotate(-5deg) scale(0.95)';
            setTimeout(() => {
                coin.style.transform = 'rotate(0deg) scale(1)';
            }, 100);
        }
    });

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        profile.classList.remove('open');
    });

    profileButton.addEventListener('click', () => {
        profile.classList.toggle('open');
        menu.classList.remove('open');
    });

    upgradeMulticlickButton.addEventListener('click', () => {
        if (totalClicks >= multiclickCost) {
            totalClicks -= multiclickCost;
            clickCounter.textContent = `Clicks: ${totalClicks}`;
            multiclickLevelValue++;
            multiclickCost *= 4;
            multiclickLevel.textContent = multiclickLevelValue;
            multiclickPrice.textContent = multiclickCost;
        }
    });

    upgradeAutoclickerButton.addEventListener('click', () => {
        if (totalClicks >= autoclickerCost) {
            totalClicks -= autoclickerCost;
            clickCounter.textContent = `Clicks: ${totalClicks}`;
            autoclickerLevelValue++;
            autoclickerCost *= 3;
            autoclickerLevel.textContent = autoclickerLevelValue;
            autoclickerPrice.textContent = autoclickerCost;
            startAutoclicker();
        }
    });

    const startAutoclicker = () => {
        setInterval(() => {
            if (autoclickerLevelValue > 1) {
                totalClicks += autoclickerLevelValue - 1;
                clickCounter.textContent = `Clicks: ${totalClicks}`;
                updateProgress();
            }
        }, 5000);
    };

    updateProgress();
});
