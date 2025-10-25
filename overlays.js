const lightGreen = 'rgba(174, 252, 122, 0.75)';
const solidGreen = '#40ff00';
const lightCyan = 'rgba(94, 162, 158, 0.75)';
const solidCyan = '#61ffff';
const lightRed = 'rgba(213, 69, 69, 0.75)';
const solidRed = '#c52929';
const solidYellow = '#e7c15f';
const dimGreen = 'rgba(77, 99, 62, 0.75)';
const dimCyan = 'rgba(62, 99, 97, 0.75)';
const dimRed = 'rgba(115, 24, 24, 0.75)';

const descStyle = {
    position: 'absolute',
    padding: '10px 15px',
    background: 'rgba(30, 30, 30, 0.85)',
    fontFamily: "'FiraCode Nerd Font', monospace",
    fontSize: '13px',
    border: `1px solid ${solidCyan}`,
    borderRadius: '8px',
    boxShadow: `0 0 15px ${solidCyan}, inset 0 0 15px ${solidCyan}`,
    pointerEvents: 'none',
    color: `${solidCyan}`,
    zIndex: '30000',
    maxWidth: '300px',
    whiteSpace: 'pre-wrap',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: '0',
    transform: 'translateY(5px)',
};

const textStyle = {
    position: 'relative',
    zIndex: '1',
};

const overlayStyle = {
    padding: '7.5px 15px',
    background: dimCyan,
    fontFamily: "'FiraCode Nerd Font', monospace",
    fontSize: '14px',
    border: `1px solid ${solidCyan}`,
    borderRadius: '8px',
    boxShadow: `0 0 20px ${solidCyan}`,
    transition: 'background-color 0.5s ease, transform 0.5s ease',
    pointerEvents: 'auto',
    cursor: 'default',
    zIndex: '20001',
    color: `${solidCyan}`,
    position: 'relative',
};

const startTime = Date.now();
const overlayContainer = document.createElement('div');
overlayContainer.id = 'overlay-container';
document.body.appendChild(overlayContainer);

Object.assign(overlayContainer.style, {
    position: 'fixed',
    bottom: '30px',
    left: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
    zIndex: '20000',
    pointerEvents: 'none',
});

const timeOverlay = document.createElement('div');
const timerText = document.createElement('div');
const line = document.createElement('div');

timeOverlay.appendChild(timerText);
timeOverlay.appendChild(line);
overlayContainer.appendChild(timeOverlay);

Object.assign(timeOverlay.style, overlayStyle);

Object.assign(timerText.style, textStyle);
timerText.style.animation = 'blurpleGlow 5s infinite linear';

Object.assign(line.style, {
    position: 'absolute',
    top: '0',
    width: '2px',
    height: '100%',
    backgroundColor: '#beffffff',
});

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;

    const hours = Math.floor(elapsed / 3600000);
    const mins = Math.floor((elapsed % 3600000) / 60000);
    const secs = Math.floor((elapsed % 60000) / 1000);
    const ms = elapsed % 1000;

    const msPadded = ms.toString().padStart(3, '0');

    timerText.textContent = `${hours}h ${mins}m ${secs}.${msPadded}s`;

    requestAnimationFrame(updateTimer);
}

updateTimer();

let position = 0;
let direction = 1;
const speed = 3;

function bounceLine() {
    const boxWidth = timeOverlay.clientWidth;
    const lineWidth = line.clientWidth;

    position += direction * speed;

    if (position + lineWidth >= boxWidth) {
        direction = -1;
        position = boxWidth - lineWidth;
    } else if (position <= 0) {
        direction = 1;
        position = 0;
    }

    line.style.left = `${position}px`;
    requestAnimationFrame(bounceLine);
}

bounceLine();

const blurContainer = document.createElement('div');
document.body.appendChild(blurContainer);
Object.assign(blurContainer.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '20050',
    pointerEvents: 'none',
    overflow: 'hidden',
});

const blurOverlay = document.createElement('div');
blurContainer.appendChild(blurOverlay);

Object.assign(blurOverlay.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(3px)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
});

function trackQuickInput() {
    const widget = document.querySelector('.quick-input-widget');
    const isVisible = widget && widget.offsetParent !== null;

    if (isVisible) {
        blurOverlay.style.opacity = '1';
        const rect = widget.getBoundingClientRect();
        const clipPath = `polygon(
            0 0,
            0 100%,
            ${rect.left}px 100%,
            ${rect.left}px ${rect.top}px,
            ${rect.right}px ${rect.top}px,
            ${rect.right}px ${rect.bottom}px,
            ${rect.left}px ${rect.bottom}px,
            ${rect.left}px 100%,
            100% 100%,
            100% 0
        )`;
        blurOverlay.style.clipPath = clipPath;
    } else {
        blurOverlay.style.opacity = '0';
        blurOverlay.style.clipPath = 'none';
    }

    requestAnimationFrame(trackQuickInput);
}

trackQuickInput();

const keyOverlay = document.createElement('div');
const keyText = document.createElement('div');

keyOverlay.appendChild(keyText);
overlayContainer.appendChild(keyOverlay);

Object.assign(keyOverlay.style, overlayStyle);

Object.assign(keyText.style, textStyle);

let keyCount = localStorage.getItem('keyCount');
if (keyCount === null) {
    keyCount = 0;
    localStorage.setItem('keyCount', keyCount);
} else {
    keyCount = parseInt(keyCount, 10);
}

let currentKeyCount = 0;
let text_hue = 0;

keyText.textContent = `⌨️ ${currentKeyCount} (${keyCount})`;
keyText.style.color = `hsl(${text_hue}, 100%, 60%)`;
keyOverlay.style.border = `1px solid hsl(${text_hue}, 100%, 60%)`;
keyOverlay.style.backgroundColor = `hsla(${text_hue}, 100%, 60%, 0.25)`;
keyOverlay.style.boxShadow = `0 0 20px hsl(${text_hue}, 100%, 60%)`;

document.addEventListener('keydown', () => {
    keyOverlay.style.transition = 'none';
    keyOverlay.style.transform = 'translateY(-5px) scale(1.1)';
    keyOverlay.style.backgroundColor = `hsla(${text_hue}, 100%, 60%, 0.5)`;
    keyOverlay.style.boxShadow = `0 0 20px hsl(${text_hue}, 100%, 60%), inset 0 0 20px hsl(${text_hue}, 100%, 60%)`;
    keyOverlay.style.border = `1px solid hsl(${text_hue}, 100%, 75%)`;
    keyText.style.color = `hsl(${text_hue}, 100%, 75%)`;

    void keyOverlay.offsetWidth;

    requestAnimationFrame(() => {
        keyOverlay.style.transition = 'transform 0.1s ease, background-color 0.1s ease';
        keyOverlay.style.transform = 'translateY(0px) scale(1)';
        keyOverlay.style.backgroundColor = `hsla(${text_hue}, 100%, 60%, 0.5)`;
        keyOverlay.style.boxShadow = `0 0 20px hsl(${text_hue}, 100%, 60%)`;
    });
});

document.addEventListener('keyup', () => {
    keyCount++;
    currentKeyCount++;
    localStorage.setItem('keyCount', keyCount);
    keyText.textContent = `⌨️ ${currentKeyCount} (${keyCount})`;
});

setInterval(() => {
    text_hue += 1;
    keyOverlay.style.backgroundColor = `hsla(${text_hue}, 100%, 60%, 0.5)`;
    keyOverlay.style.boxShadow = `0 0 20px hsl(${text_hue}, 100%, 60%)`;
    keyOverlay.style.border = `1px solid hsl(${text_hue}, 100%, 75%)`;
    keyText.style.color = `hsl(${text_hue}, 100%, 75%)`;
}, 100);

let latitude;
let longitude;
let availableLocation = true;

function updateLocation() {
    fetch('http://ip-api.com/json/')
        .then((res) => res.json())
        .then((data) => {
            latitude = parseFloat(data.lat);
            longitude = parseFloat(data.lon);
            console.log(`Location: ${latitude}, ${longitude}`);
            availableLocation = true;
            updateWeather();
        })
        .catch((err) => {
            console.error('Location failed:', err);
            latitude = 40.7128;
            longitude = -74.006;
            availableLocation = true;
            updateWeather();
        });
}

updateLocation();

const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

const weatherOverlay = document.createElement('div');
const weatherText = document.createElement('div');
const weatherDesc = document.createElement('div');
const weatherDescText = document.createElement('div');

let availableWeather = false;
let temperature = null;
let windSpeed = null;
let windDirection = null;
let windDirectionDescriptor = 'Unavailable';
let humidity = null;
let weatherCode = null;
let weatherDescriptor = 'Unavailable';
let pm10 = null;
let pm2_5 = null;

weatherOverlay.appendChild(weatherText);
document.body.appendChild(weatherDesc);
weatherDesc.appendChild(weatherDescText);
overlayContainer.appendChild(weatherOverlay);

Object.assign(weatherOverlay.style, overlayStyle);

Object.assign(weatherText.style, textStyle);

Object.assign(weatherDesc.style, descStyle);

Object.assign(weatherDescText.style, textStyle);

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
weatherText.textContent = `▲ ${timezone}`;

function degreesToCardinal(degrees) {
    if (typeof degrees !== 'number' || isNaN(degrees)) {
        return 'Unavailable';
    }
    degrees = ((degrees % 360) + 360) % 360;

    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

function updateWeather() {
    if (!latitude || !longitude || !availableLocation) {
        console.error('Latitude or longitude is undefined. Waiting for location...');
        availableWeather = false;
        updateWeatherContent();
        return;
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,wind_speed_10m,wind_direction_10m,relative_humidity_2m&timezone=auto`;
    const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5&timezone=auto`;

    Promise.all([
        fetch(weatherUrl).then((res) => {
            if (!res.ok) {
                console.error(`Weather HTTP error: ${res.status}`);
                availableWeather = false;
                return Promise.reject();
            }
            return res.json();
        }),
        fetch(airUrl).then((res) => {
            if (!res.ok) {
                console.error(`Air HTTP error: ${res.status}`);
                return Promise.reject();
            }
            return res.json();
        }),
    ])
        .then(([weatherData, airData]) => {
            temperature = weatherData.current?.temperature_2m ?? 'N/A';
            weatherCode = weatherData.current?.weathercode ?? 0;
            weatherDescriptor = weatherDescriptions[weatherCode] || 'Unknown';
            windSpeed = weatherData.current?.wind_speed_10m ?? 'N/A';
            windDirection = weatherData.current?.wind_direction_10m ?? 0;
            windDirectionDescriptor = degreesToCardinal(windDirection);
            humidity = weatherData.current?.relative_humidity_2m ?? 'N/A';
            pm10 = airData?.current?.pm10 ?? 'N/A';
            pm2_5 = airData?.current?.pm2_5 ?? 'N/A';

            availableWeather = true;
            updateWeatherContent();
        })
        .catch((err) => {
            console.error('Weather/Air fetch failed:', err);
            availableWeather = false;
            updateWeatherContent();
        });
}

setTimeout(() => {
    updateLocation();
    setInterval(updateLocation, 50000);
}, 1000);

setTimeout(() => {
    updateWeather();
    setInterval(updateWeather, 10000);
}, 1500);

function updateWeatherStatus() {
    if (availableWeather && availableLocation) {
        weatherOverlay.style.background = dimCyan;
        weatherOverlay.style.boxShadow = `0 0 20px ${solidCyan}`;
        weatherOverlay.style.border = `1px solid ${solidCyan}`;
        weatherOverlay.style.color = `${solidCyan}`;
    } else {
        weatherOverlay.style.background = dimRed;
        weatherOverlay.style.boxShadow = `0 0 20px ${solidRed}`;
        weatherOverlay.style.border = `1px solid ${solidRed}`;
        weatherOverlay.style.color = `${solidRed}`;
    }
}

updateWeatherStatus();
setInterval(updateWeatherStatus, 500);

function updateWeatherContent() {
    if (availableWeather && availableLocation) {
        weatherDescText.innerHTML = `🌡️ ${temperature}°C 💦 ${humidity}%\n💨 ${windSpeed}m/s @ ${windDirection}° (${windDirectionDescriptor})\n🌤️ <span id="highlight">${weatherDescriptor}</span>\n🌫️ <span id="highlight">PM10</span> ${pm10}µg/m³ <span id="highlight">PM2.5</span> ${pm2_5}µg/m³`;
    } else {
        if (!availableLocation) {
            weatherDescText.innerHTML = "Couldn't fetch current user location";
        } else {
            weatherDescText.innerHTML = "Couldn't fetch weather information";
        }
    }
}

weatherOverlay.addEventListener('mouseenter', () => {
    weatherText.textContent = `▼ ${timezone}`;
    const rect = weatherOverlay.getBoundingClientRect();

    updateWeatherContent();
    weatherDesc.style.left = `${rect.left + rect.width / 2}px`;
    weatherDesc.style.top = `${rect.top - weatherDesc.offsetHeight - 10}px`;
    weatherDesc.style.transform = 'translateX(-50%) translateY(0)';
    weatherDesc.style.opacity = '1';
    weatherOverlay.style.transform = 'translateY(-2.5px) scale(1.05)';
});

weatherOverlay.addEventListener('mouseleave', () => {
    weatherText.textContent = `▲ ${timezone}`;
    weatherDesc.style.opacity = '0';
    weatherDesc.style.transform = 'translateX(-50%) translateY(5px)';
    weatherOverlay.style.transform = 'translateY(0px) scale(1)';
});

weatherOverlay.addEventListener('mousedown', () => {
    updateWeather();
    updateWeatherStatus();
    updateWeatherContent();

    if (!availableLocation) {
        updateLocation();
    }

    weatherOverlay.style.transition = 'none';
    weatherOverlay.style.background = availableWeather ? lightCyan : lightRed;
    weatherOverlay.style.transform = 'translateY(-5px) scale(1.1)';

    void weatherOverlay.offsetWidth;

    weatherOverlay.style.transition = 'background-color 0.5s ease, transform 0.5s ease';

    requestAnimationFrame(() => {
        weatherOverlay.style.background = availableWeather ? dimCyan : dimRed;
        weatherOverlay.style.transform = 'translateY(-2.5px) scale(1)';
    });
});

const levelOverlay = document.createElement('div');
const levelProgress = document.createElement('div');
const levelText = document.createElement('div');

levelOverlay.appendChild(levelText);
levelOverlay.appendChild(levelProgress);
document.body.appendChild(levelOverlay);

Object.assign(levelOverlay.style, {
    position: 'absolute',
    zIndex: '20002',
    fontSize: '17.5px',
    color: 'rgb(255, 62, 62)',
    textShadow: '0 0 10px rgb(255, 62, 62)',
    backgroundColor: 'rgba(255, 62, 62, 0.25)',
    border: '2px solid rgba(255, 25, 25, 1)',
    boxShadow: '0 0 10px rgba(255, 25, 25, 1), inset 0 0 10px rgba(255, 25, 25, 1)',
    borderRadius: '5px',
    textAlign: 'center',
    left: '50%',
    top: '10px',
    transform: 'translateX(-50%)',
    fontFamily: "'FiraCode Nerd Font', monospace",
    transition: 'opacity 1s ease',
    width: '25%',
});

Object.assign(levelText.style, textStyle);

Object.assign(levelProgress.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '0%',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 25, 25, 0.35)',
    transition: 'width 0.2s ease',
    zIndex: '20001',
});

function getCurrentLevelStatus() {
    let baseLevel = 1000;
    let copyKeyCount = keyCount;
    let level = 0;

    while (true) {
        if (copyKeyCount >= baseLevel) {
            copyKeyCount -= baseLevel;
            level++;
            baseLevel += 50;
        } else {
            return [level, copyKeyCount, baseLevel];
        }
    }
}

function updateLevelContent() {
    const [level, keys, nextLevelReq] = getCurrentLevelStatus();
    levelText.textContent = `Lv. ${level} | ${keys}/${nextLevelReq} (${nextLevelReq - keys} left)`;

    const progressPercent = (keys / nextLevelReq) * 100;
    levelProgress.style.width = `${progressPercent}%`;
    requestAnimationFrame(updateLevelContent);
}

updateLevelContent();

let level_hue = 0;

function rainbowGlow() {
    level_hue = (level_hue + 0.5) % 360;
    levelText.style.color = `hsl(${level_hue}, 100%, 60%)`;
    levelText.style.textShadow = `0 0 10px hsl(${level_hue}, 100%, 60%), inset 0 0 10px hsl(${level_hue}, 100%, 60%)`;
    levelOverlay.style.backgroundColor = `hsla(${level_hue}, 100%, 50%, 0.25)`;
    levelOverlay.style.borderColor = `hsla(${level_hue}, 100%, 50%, 1)`;
    levelOverlay.style.boxShadow = `0 0 10px hsla(${level_hue}, 100%, 50%, 1), inset 0 0 10px hsla(${level_hue}, 100%, 50%, 1)`;
    levelProgress.style.backgroundColor = `hsla(${level_hue}, 100%, 50%, 0.35)`;
    requestAnimationFrame(rainbowGlow);
}

rainbowGlow();
