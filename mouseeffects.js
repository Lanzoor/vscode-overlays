let isClicking = false;

document.addEventListener('mousedown', () => {
    isClicking = true;
    clearTimeout(idleTimer);
    cursorRing.style.opacity = '1';
    cursorRing.style.border = '2px solid #ff00ffff';
    cursorRing.style.boxShadow = '0 0 20px #ff00ff50';
    cursorRing.style.width = '45px';
    cursorRing.style.height = '45px';
});

document.addEventListener('mouseup', () => {
    isClicking = false;
    idleTimer = setTimeout(() => {
        cursorRing.style.opacity = '0';
    }, 500);
    cursorRing.style.border = '2px solid #00ffff';
    cursorRing.style.boxShadow = '0 0 8px #00ffff50';
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
});

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    const baseTrailStyles = {
        position: 'fixed',
        left: `${isClicking ? e.clientX - 15 : e.clientX - 5}px`,
        top: `${isClicking ? e.clientY - 15 : e.clientY - 5}px`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '30000',
        opacity: '1',
        transition: 'opacity 1.75s ease',
    };

    const clickTrailStyles = {
        width: '30px',
        height: '30px',
        backgroundColor: '#ff00ff35',
        boxShadow: '0 0 8px #ff00ff35',
    };

    const idleTrailStyles = {
        width: '10px',
        height: '10px',
        backgroundColor: '#00ffff35',
        boxShadow: '0 0 8px #00ffff35',
    };

    Object.assign(trail.style, baseTrailStyles, isClicking ? clickTrailStyles : idleTrailStyles);

    document.body.appendChild(trail);

    requestAnimationFrame(() => {
        trail.style.opacity = '0';
    });

    setTimeout(() => {
        document.body.removeChild(trail);
    }, 1750);
});

const cursorRing = document.createElement('div');
document.body.appendChild(cursorRing);

Object.assign(cursorRing.style, {
    position: 'fixed',
    width: '40px',
    height: '40px',
    border: '2px solid #00ffff',
    boxShadow: '0 0 8px #00ffff50',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '30001',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    transition: 'transform 0.05s ease-out, border 0.1s ease, box-shadow 0.1s ease, opacity 0.1s ease',
    opacity: '1',
});

let idleTimer;

document.addEventListener('mousemove', (e) => {
    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;
    cursorRing.style.opacity = '1';

    clearTimeout(idleTimer);

    if (!isClicking) {
        idleTimer = setTimeout(() => {
            cursorRing.style.opacity = '0';
        }, 500);
    }
});

const rippleContainer = document.createElement('div');
Object.assign(rippleContainer.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '29999',
});

document.body.appendChild(rippleContainer);

document.addEventListener('mousedown', (event) => {
    const ripple = document.createElement('div');
    const size = 20;
    const x = event.clientX - size / 2;
    const y = event.clientY - size / 2;

    Object.assign(ripple.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        transform: 'scale(1)',
        opacity: '0.6',
        zIndex: '2147483647',
    });

    rippleContainer.appendChild(ripple);

    requestAnimationFrame(() => {
        Object.assign(ripple.style, {
            transform: 'scale(7.5)',
            opacity: '0',
        });
    });

    setTimeout(() => {
        ripple.remove();
    }, 500);
});
