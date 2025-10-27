const glowOverlay = document.createElement('div');

document.body.appendChild(glowOverlay);

Object.assign(glowOverlay.style, {
    position: 'fixed',
    top: '-1px',
    left: '-1px',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '20000',
    border: '2px solid transparent',
    boxShadow: 'inset 0 0 40px rgba(255, 0, 0, 1)',
    opacity: '75%',
    transition: 'box-shadow 0.1s ease',
});

let hue = 0;

function animateGlow() {
    const color = `hsl(${hue}, 100%, 60%)`;
    glowOverlay.style.boxShadow = `inset 0 0 75px ${color}`;
    hue = (hue + 0.1) % 360;
    requestAnimationFrame(animateGlow);
}

animateGlow();

const modalContainer = document.createElement('div');

Object.assign(modalContainer.style, {
    display: 'flex',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(33, 23, 89, 0.8)',
    zIndex: '20001',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    opacity: '0',
    transition: 'opacity 1s ease',
    textAlign: 'left',
    fontFamily: "'FiraCode Nerd Font', monospace",
});

document.body.appendChild(modalContainer);

requestAnimationFrame(() => {
    modalContainer.style.opacity = '1';
});

modalContainer.addEventListener('click', () => {
    modalContainer.style.opacity = '0';
    setTimeout(() => {
        modalContainer.remove();
    }, 1000);
});

const modalWelcomeText = document.createElement('div');
Object.assign(modalWelcomeText.style, {
    position: 'absolute',
    zIndex: '1',
    fontSize: '70px',
    left: '10%',
    top: '35%',
    color: 'rgba(126, 83, 206, 1)',
    textShadow: '0 0 10px rgba(126, 83, 206, 1)',
});
modalWelcomeText.innerHTML = 'Welcome back!';
modalContainer.appendChild(modalWelcomeText);

const modalWelcomeTextSub = document.createElement('div');
Object.assign(modalWelcomeTextSub.style, {
    position: 'absolute',
    zIndex: '1',
    fontSize: '50px',
    left: '10%',
    top: 'calc(35% + 80px)',
    color: 'rgba(162, 119, 242, 1)',
    textShadow: '0 0 10px rgba(162, 119, 242, 1)',
});
modalWelcomeTextSub.innerHTML = 'おかえりなさい！';
modalContainer.appendChild(modalWelcomeTextSub);

const modalWelcomeSeparator = document.createElement('hr');
Object.assign(modalWelcomeSeparator.style, {
    position: 'fixed',
    top: 'calc(35% + 80px + 60px)',
    left: '10%',
    width: '80%',
    height: '4px',
    backgroundColor: '#a3a3a37f',
    border: 'none',
});
modalContainer.appendChild(modalWelcomeSeparator);

const modalInfoText1 = document.createElement('div');
Object.assign(modalInfoText1.style, {
    position: 'absolute',
    zIndex: '1',
    fontSize: '20px',
    left: '10%',
    top: 'calc(35% + 80px + 90px)',
    color: 'rgba(193, 162, 252, 1)',
    textShadow: '0 0 10px rgba(193, 162, 252, 1)',
});
modalInfoText1.innerHTML = `VSCode improvements and visuals by Lanzoor.<br>Good luck, and have fun!`;
modalContainer.appendChild(modalInfoText1);

const modalCloseInfoText = document.createElement('div');
Object.assign(modalCloseInfoText.style, {
    position: 'absolute',
    zIndex: '1',
    fontSize: '20px',
    textAlign: 'center',
    left: '50%',
    bottom: '20px',
    transform: 'translateX(-50%)',
    animation: 'blurpleGlow 5s infinite linear',
});
modalCloseInfoText.innerHTML = '- Click anywhere on screen to close modal -<br>- 画面のどこかをクリックするとモーダルが閉じます -';
modalContainer.appendChild(modalCloseInfoText);

const circle1 = document.createElement('div');
Object.assign(circle1.style, {
    position: 'fixed',
    top: '50%',
    left: '100%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vw',
    borderRadius: '50%',
    backgroundColor: 'rgba(126, 83, 206, 0.2)',
    zIndex: '20001',
    transition: 'transform 0.1s ease',
});
modalContainer.appendChild(circle1);

const circle2 = document.createElement('div');
Object.assign(circle2.style, {
    position: 'fixed',
    top: '50%',
    left: '100%',
    transform: 'translate(-50%, -50%)',
    width: '75vw',
    height: '75vw',
    borderRadius: '50%',
    backgroundColor: 'rgba(126, 83, 206, 0.4)',
    zIndex: '20001',
    transition: 'transform 0.1s ease',
});
modalContainer.appendChild(circle2);
s;
const brightnessCurve = [
    { hour: 0, brightness: 0.5 },
    { hour: 3, brightness: 0.75 },
    { hour: 6, brightness: 0.9 },
    { hour: 9, brightness: 0.95 },
    { hour: 12, brightness: 1.0 },
    { hour: 15, brightness: 0.95 },
    { hour: 18, brightness: 0.9 },
    { hour: 21, brightness: 0.75 },
    { hour: 24, brightness: 0.5 },
];

function getBrightness(hour) {
    let prev = brightnessCurve[0];
    let next = brightnessCurve[brightnessCurve.length - 1];

    for (let i = 0; i < brightnessCurve.length; i++) {
        if (hour < brightnessCurve[i].hour) {
            next = brightnessCurve[i];
            prev = brightnessCurve[i - 1] || brightnessCurve[0];
            break;
        }
    }

    const ratio = (hour - prev.hour) / (next.hour - prev.hour);
    return prev.brightness + ratio * (next.brightness - prev.brightness);
}

function updateBrightness() {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const brightness = getBrightness(hour);
    document.body.style.filter = `brightness(${brightness})`;
}

setInterval(updateBrightness, 2000);
updateBrightness();
