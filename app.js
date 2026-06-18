/**
 * app.js - Birthday Gifting Website Logic
 * Features: Canvas animations, Web Audio synthesizer, typewriter effects, interactive jar, cake, and 3D flipping books notes.
 */

// ==========================================================================
// 1. CONFIGURATION BLOCK - Easily customize details here!
// ==========================================================================
const BIRTHDAY_CONFIG = {
    recipientName: "Birthday Princess 👑",
    senderName: "kumar 💙",
    
    // Welcome Letter Contents
    letterText: "Happy Birthday! Today is all about celebrating the wonderful, kind, and amazing person you are. I wanted to create something special that brings a smile to your face. May this year be filled with beautiful moments, laughter, success, and all the happiness your heart can hold. Explore this page to find memories, make wishes, blow out your candles, and open the special little books I wrote for you! Have the best day ever! 💫✨",
    
    // Memory Lane Grid Elements (6 memories/pictures)
    memories: [
        {
            title: "Cozy Coffee Chats",
            message: "To all the deep discussions, silly laughs, and endless caffeine fueled talks. ☕",
            svgKey: "cozyCoffee",
            imageSrc: "" // Paste absolute image URLs here to replace SVG vectors, e.g., "assets/photo1.jpg"
        },
        {
            title: "Under The Stars",
            message: "Remembering our late-night walks, silent thoughts, and wishing on shooting stars. 🌌",
            svgKey: "starryNight",
            imageSrc: ""
        },
        {
            title: "Road Trips & Travels",
            message: "For the paths traveled, playlists sung out loud, and adventures yet to come! 🚗",
            svgKey: "adventure",
            imageSrc: ""
        },
        {
            title: "Celebrating You",
            message: "Cheers to another brilliant year of your light shining bright. Keep glowing! 🎉",
            svgKey: "partyTime",
            imageSrc: ""
        },
        {
            title: "Sweet Treats & Dates",
            message: "Every moment spent sharing desserts and laughter is a favorite memory of mine. 🧁",
            svgKey: "sweetTreats",
            imageSrc: ""
        },
        {
            title: "Glowing Surprises",
            message: "To the unexpected gifts, spontaneous smiles, and warm little packages of happiness. 🎁",
            svgKey: "giftGlow",
            imageSrc: ""
        }
    ],

    // Heartwarming wishes for the Jar
    wishes: [
        "May you be surrounded by endless love and laughter today! ❤️",
        "Wishing you a year filled with exciting new adventures! 🗺️",
        "May all your wildest dreams take flight this year! 🌟",
        "Good health, positive vibes, and peace of mind always. 🍃",
        "Never forget how incredibly special and appreciated you are! 💙",
        "May every day bring you a reason to smile. 😊",
        "Success in everything you set your mind and heart to do! 🚀",
        "Here's to making memories that you will cherish forever! 📸"
    ],

    // Special Notes / Thoughts (styled as books)
    notes: [
        {
            id: "n1",
            tag: "A Reminder",
            title: "A Little Reminder",
            crest: "✨", // Golden emoji crest on the book cover
            content: "You are stronger than you think, kinder than you know, and more loved than you could ever imagine. No matter what challenges come your way, always keep believing in yourself! You have a beautiful soul, and your strength is inspiring. Never doubt the value you bring to the world."
        },
        {
            id: "n2",
            tag: "Poem",
            title: "Shine Bright",
            crest: "💫",
            content: "Like a star in the deep blue night,\nYour smile makes the darkest moments bright.\nMay your year ahead be pure delight,\nFilled with joy, love, and endless light.\n\nKeep shining your beautiful sparkle everywhere you go! 🌟"
        },
        {
            id: "n3",
            tag: "Gratitude",
            title: "Thank You",
            crest: "💙",
            content: "Thank you for being such an incredible presence in my life. Your laughter, support, and kindness make every day so much better. I am truly grateful for our bond and for the warmth you share. Having you in my corner is a blessing I cherish."
        },
        {
            id: "n4",
            tag: "Wisdom",
            title: "The Year Ahead",
            crest: "🚀",
            content: "Don't count the years, count the memories. Don't look back at what was, look forward to the beautiful stories you are going to write next. This coming year is a blank slate full of opportunities. Go out there, chase your dreams, and make every single second count!"
        }
    ]
};

// Frequencies for our Happy Birthday synthesizer
const NOTE_FREQS = {
    "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A4": 440.00, "A#4": 466.16, "C5": 523.25
};

const BIRTHDAY_MELODY = [
    { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "D4", dur: 0.8 }, { note: "C4", dur: 0.8 }, { note: "F4", dur: 0.8 }, { note: "E4", dur: 1.4 },
    { note: "rest", dur: 0.2 },
    { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "D4", dur: 0.8 }, { note: "C4", dur: 0.8 }, { note: "G4", dur: 0.8 }, { note: "F4", dur: 1.4 },
    { note: "rest", dur: 0.2 },
    { note: "C4", dur: 0.4 }, { note: "C4", dur: 0.2 }, { note: "C5", dur: 0.8 }, { note: "A4", dur: 0.8 }, { note: "F4", dur: 0.8 }, { note: "E4", dur: 0.8 }, { note: "D4", dur: 1.4 },
    { note: "rest", dur: 0.2 },
    { note: "A#4", dur: 0.4 }, { note: "A#4", dur: 0.2 }, { note: "A4", dur: 0.8 }, { note: "F4", dur: 0.8 }, { note: "G4", dur: 0.8 }, { note: "F4", dur: 1.6 }
];


// ==========================================================================
// 2. STATE VARIABLES & AUDIO SETUP
// ==========================================================================
let audioCtx = null;
let synthLoopId = null;
let currentMelodyIndex = 0;
let isMusicPlaying = false;
let isUnwrapped = false;
let canvas, ctx;
let particles = [];
let stars = [];

// Initialize config text in DOM
document.getElementById('nav-birthday-girl').textContent = BIRTHDAY_CONFIG.recipientName;
document.querySelectorAll('.recipient-name').forEach(el => el.textContent = BIRTHDAY_CONFIG.recipientName);
document.getElementById('sender-signature').textContent = BIRTHDAY_CONFIG.senderName;

// ==========================================================================
// 3. CANVAS PHYSICS ENGINE (STARS & CONFETTI)
// ==========================================================================
function initCanvas() {
    canvas = document.getElementById('particle-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Generate background stars
    stars = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            speed: Math.random() * 0.02 + 0.005,
            factor: Math.random() > 0.5 ? 1 : -1
        });
    }
    
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(updateAndDraw);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle Class
class Particle {
    constructor(x, y, type = 'confetti') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (type === 'burst' ? 12 : 5) + (type === 'burst' ? 5 : 2);
        
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (type === 'burst' ? 5 : 2);
        
        this.size = Math.random() * 8 + 4;
        this.gravity = 0.2;
        this.drag = 0.97;
        this.opacity = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        
        const hues = [190, 205, 220, 240, 270];
        const randomHue = hues[Math.floor(Math.random() * hues.length)];
        const light = Math.floor(Math.random() * 30) + 50;
        this.color = `hsl(${randomHue}, 95%, ${light}%)`;
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.rotation += this.rotationSpeed;
        this.opacity -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        if (this.type === 'balloon') {
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 1.3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, this.size * 1.3);
            ctx.lineTo(-3, this.size * 1.3 + 5);
            ctx.lineTo(3, this.size * 1.3 + 5);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        }
        ctx.restore();
    }
}

function spawnExplosion(x, y, count = 100, type = 'burst') {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, type));
    }
}

function updateAndDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.opacity += star.speed * star.factor;
        if (star.opacity > 1 || star.opacity < 0.2) {
            star.factor *= -1;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(updateAndDraw);
}

// ==========================================================================
// 4. WEB AUDIO SYNTHESIZER
// ==========================================================================
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playChime(freq, startTime, duration, volume = 0.15) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle';
    osc2.type = 'sine';
    
    osc.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    
    osc.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
}

function playPopSound() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        playChime(600, now, 0.1, 0.1);
        playChime(1200, now + 0.02, 0.08, 0.05);
    } catch (e) {
        console.log("Audio failed to load", e);
    }
}

function playCelebrationMelody() {
    try {
        const ctx = getAudioContext();
        let now = ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            playChime(freq, now + i * 0.08, 0.8, 0.12);
        });
    } catch(e) {
        console.log("Audio failed to play", e);
    }
}

function startMelodyPlayer() {
    if (isMusicPlaying) return;
    
    getAudioContext();
    isMusicPlaying = true;
    currentMelodyIndex = 0;
    
    const musicBtn = document.getElementById('music-toggle-btn');
    musicBtn.querySelector('.play').classList.add('hidden');
    musicBtn.querySelector('.mute').classList.remove('hidden');
    document.getElementById('music-status').textContent = "Mute Song 🔊";
    document.getElementById('music-controller').classList.remove('hidden');
    
    playNextNote();
}

function stopMelodyPlayer() {
    isMusicPlaying = false;
    clearTimeout(synthLoopId);
    
    const musicBtn = document.getElementById('music-toggle-btn');
    musicBtn.querySelector('.play').classList.remove('hidden');
    musicBtn.querySelector('.mute').classList.add('hidden');
    document.getElementById('music-status').textContent = "Play Song 🎵";
}

function playNextNote() {
    if (!isMusicPlaying) return;
    
    const noteInfo = BIRTHDAY_MELODY[currentMelodyIndex];
    const duration = noteInfo.dur;
    
    if (noteInfo.note !== "rest") {
        const freq = NOTE_FREQS[noteInfo.note];
        const ctxTime = audioCtx.currentTime;
        playChime(freq, ctxTime, duration * 1.5, 0.12);
    }
    
    currentMelodyIndex = (currentMelodyIndex + 1) % BIRTHDAY_MELODY.length;
    synthLoopId = setTimeout(playNextNote, duration * 1000 * 0.95);
}

document.getElementById('music-toggle-btn').addEventListener('click', () => {
    if (isMusicPlaying) {
        stopMelodyPlayer();
    } else {
        startMelodyPlayer();
    }
});

// ==========================================================================
// 5. STAGE 1: GIFT UNWRAPPING
// ==========================================================================
const giftBox = document.getElementById('birthday-gift');
giftBox.addEventListener('click', () => {
    if (isUnwrapped) return;
    isUnwrapped = true;
    
    giftBox.classList.add('unpacking');
    
    try {
        getAudioContext();
        let now = audioCtx.currentTime;
        playChime(261.63, now, 0.2, 0.1);
        playChime(329.63, now + 0.1, 0.2, 0.1);
        playChime(392.00, now + 0.2, 0.2, 0.1);
        playChime(523.25, now + 0.3, 0.4, 0.15);
    } catch (e) {}

    setTimeout(() => {
        giftBox.classList.remove('unpacking');
        giftBox.classList.add('opened');
        
        const rect = giftBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        spawnExplosion(centerX, centerY, 160, 'burst');
        
        setTimeout(() => {
            startMelodyPlayer();
        }, 300);

        setTimeout(() => {
            document.getElementById('intro-stage').classList.add('hidden');
            document.getElementById('main-stage').classList.remove('hidden');
            resizeCanvas();
        }, 1200);
        
    }, 450);
});

// ==========================================================================
// 6. DASHBOARD & TAB SWITCHING
// ==========================================================================
const navItems = document.querySelectorAll('.nav-item');
const tabPanels = document.querySelectorAll('.tab-panel');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const tabName = item.getAttribute('data-tab');
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${tabName}-panel`) {
                panel.classList.add('active');
            }
        });
        
        if (tabName === 'welcome') {
            triggerTypewriter();
        } else if (tabName === 'wish') {
            initWishJarBubbles();
        } else if (tabName === 'notes') {
            initNotes();
        }
    });
});

// ==========================================================================
// 7. TAB 1: ENVELOPE & TYPEWRITER TEXT
// ==========================================================================
const envelope = document.getElementById('envelope');
const openedLetter = document.getElementById('opened-letter');
let typewriterTriggered = false;

envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) return;
    
    envelope.classList.add('open');
    
    try {
        const now = audioCtx.currentTime;
        playChime(523.25, now, 0.5, 0.1);
        playChime(659.25, now + 0.1, 0.5, 0.1);
    } catch(e) {}

    setTimeout(() => {
        envelope.classList.add('hidden');
        openedLetter.classList.remove('hidden');
        triggerTypewriter();
    }, 1200);
});

function triggerTypewriter() {
    if (typewriterTriggered || openedLetter.classList.contains('hidden')) return;
    typewriterTriggered = true;
    
    const textContainer = document.getElementById('typewriter-text');
    const message = BIRTHDAY_CONFIG.letterText;
    let idx = 0;
    
    textContainer.innerHTML = '';
    
    function type() {
        if (idx < message.length) {
            textContainer.innerHTML += message.charAt(idx);
            idx++;
            setTimeout(type, 25);
        }
    }
    
    type();
}

// ==========================================================================
// 8. TAB 2: "THE PIC I LOVED MOSTLY" — Static HTML, no JS needed
//    Photos are loaded directly from assets/photo1.jpg & assets/photo2.jpg
// ==========================================================================


// ==========================================================================
// 9. TAB 3: WISHING JAR & BUBBLES
// ==========================================================================
const bubblesContainer = document.getElementById('bubbles-container');
const wishMessageBox = document.getElementById('wish-message-box');
let bubbleTimer = null;
let wishIndex = 0;

function initWishJarBubbles() {
    if (bubbleTimer) clearInterval(bubbleTimer);
    bubblesContainer.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        spawnBubble(Math.random() * 100, Math.random() * 5);
    }
    
    bubbleTimer = setInterval(() => {
        spawnBubble(Math.random() * 80 + 10, 0);
    }, 2800);
}

function spawnBubble(xPos, delaySec) {
    const bubble = document.createElement('div');
    bubble.className = 'wish-bubble';
    
    const size = Math.random() * 30 + 35;
    const duration = Math.random() * 5 + 7;
    const drift = (Math.random() * 50 - 25) + 'px';
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.setProperty('--x-pos', xPos + '%');
    bubble.style.setProperty('--duration', duration + 's');
    bubble.style.setProperty('--delay', delaySec + 's');
    bubble.style.setProperty('--drift', drift);
    
    bubble.addEventListener('click', (e) => {
        if (bubble.classList.contains('popped-bubble')) return;
        
        playPopSound();
        bubble.classList.add('popped-bubble');
        
        const rect = bubble.getBoundingClientRect();
        spawnExplosion(rect.left + rect.width/2, rect.top + rect.height/2, 15, 'burst');
        displayWish();
        
        setTimeout(() => {
            bubble.remove();
        }, 300);
    });
    
    bubblesContainer.appendChild(bubble);
}

function displayWish() {
    const wishText = BIRTHDAY_CONFIG.wishes[wishIndex];
    wishIndex = (wishIndex + 1) % BIRTHDAY_CONFIG.wishes.length;
    
    const icons = ["✨", "🌟", "🌸", "🎈", "💎", "💙", "🕊️", "🍀"];
    const randIcon = icons[Math.floor(Math.random() * icons.length)];
    
    wishMessageBox.innerHTML = `
        <div class="revealed-wish">
            <span class="wish-icon-glow">${randIcon}</span>
            <p>${wishText}</p>
        </div>
    `;
    
    const rect = wishMessageBox.getBoundingClientRect();
    spawnExplosion(rect.left + rect.width/2, rect.top + rect.height/2 - 20, 20, 'confetti');
}

// ==========================================================================
// 10. TAB 4: BIRTHDAY CAKE & CANDLE BLOWING
// ==========================================================================
const candles = document.querySelectorAll('.candle');
const blowAllBtn = document.getElementById('blow-all-btn');
const relightBtn = document.getElementById('relight-btn');
const cakeSurprise = document.getElementById('cake-surprise');
const closeSurpriseBtn = document.getElementById('close-surprise-btn');

candles.forEach(candle => {
    candle.addEventListener('click', () => {
        if (candle.classList.contains('out')) return;
        extinguishCandle(candle);
        checkAllCandles();
    });
});

blowAllBtn.addEventListener('click', () => {
    let index = 0;
    
    function blowSequence() {
        const litCandles = Array.from(candles).filter(c => !c.classList.contains('out'));
        if (litCandles.length > 0) {
            extinguishCandle(litCandles[0]);
            checkAllCandles();
            setTimeout(blowSequence, 200);
        }
    }
    
    blowSequence();
});

relightBtn.addEventListener('click', () => {
    candles.forEach(c => {
        c.classList.remove('out');
    });
    relightBtn.classList.add('hidden');
    blowAllBtn.classList.remove('hidden');
    cakeSurprise.classList.add('hidden');
});

closeSurpriseBtn.addEventListener('click', () => {
    cakeSurprise.classList.add('hidden');
});

function extinguishCandle(candle) {
    candle.classList.add('out');
    
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    candle.appendChild(smoke);
    
    try {
        playChime(800 + Math.random() * 200, audioCtx.currentTime, 0.1, 0.05);
    } catch(e){}
    
    setTimeout(() => {
        smoke.remove();
    }, 600);
}

function checkAllCandles() {
    const activeCandles = Array.from(candles).filter(c => !c.classList.contains('out'));
    if (activeCandles.length === 0) {
        setTimeout(() => {
            playCelebrationMelody();
            
            const cakeRect = document.querySelector('.cake').getBoundingClientRect();
            const startX = cakeRect.left + cakeRect.width / 2;
            const startY = cakeRect.top;
            
            spawnExplosion(startX, startY, 150, 'burst');
            
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    particles.push(new Particle(
                        Math.random() * window.innerWidth,
                        window.innerHeight + 20,
                        'balloon'
                    ));
                }, i * 80);
            }
            
            blowAllBtn.classList.add('hidden');
            relightBtn.classList.remove('hidden');
            
            setTimeout(() => {
                cakeSurprise.classList.remove('hidden');
            }, 800);
            
        }, 500);
    }
}

// ==========================================================================
// 11. TAB 5: SINGLE INTERACTIVE BOOK — PAGE-TURNING LOGIC
// ==========================================================================

// 4-page heartfelt Telugu letter content
const BOOK_PAGES = [
    {
        tag: "To My Heart 💙",
        title: "The Beginning…",
        content: `Eppudu idhi intha special avuthundhi ani nenu asalu anukoledhu.
Slow ga modhalaina maatalu, chinna chinna conversations… ippudu naa roju lo most important part ayipoyayi.
Every day morning phone theesukunnaka unknowingly first thought nuvve avuthunnav.
Message vachindha ani choodatam, nuvvu online lo unnava ani gamaninchadam… ivanni ippudu habit ayipoyayi.
Konni habits manaki teliyakundane heart ki close ayipothayi antaru kadha… nuvvu kuda alane ayyav.
Nijam cheppalante, modhatlo ninnu normal friend laage choosanu.
Kaani rojulu gadichekoddi neetho maatladakunda roju complete kaakapovadam modalayindhi.
Edhaina funny vishayam jarigina neeke cheppali anipisthundhi.
Edhaina bad mood lo unna nuvvu okkasari maatladithe chaalu anipisthundhi.
Nuvvu "em ayyindhi?" ani adige vidhaanam kuda naaku special gaane anipisthundhi.
Endhuko telidhu kaani nee care lo oka peace untundhi.
Nee maatallo oka comfort untundhi.
Adhi fake kaadhu… forced kaadhu… genuine.`
    },
    {
        tag: "My Feelings 💙",
        title: "What You Mean to Me",
        content: `Kontha mandhi people mana life loki vachaka everything colourful ga anipisthundhi antaru kadha…
Naa life lo aa person nuvve.
Nuvvu navvithe honestly naa mood motham change ayipothundhi.
Nee smile choosthe entha tension unna taggipothundhi.
Nuvvu happy ga unte chaalu anipinche antha ga nenu neeku attach ayipoyanu.
Maybe nenu perfect person kaakapovachu. Konni times childish ga behave chesthaanu, konni times overthink chesthaanu, inkonni times unnecessary ga silent ayipothaanu.
Kaani oka vishayam maatram nijam… Naa feelings maatram fake kaavu.
Ninnu impress cheyadaniki kaadhu ee letter.
Nijanga naa heart lo em undho cheppadaniki raasthunnaanu.
Ninnu choosaka naaku love ante kevalam "I love you" anadam maathrame kaadhu anipinchindhi.
Someone gurinchi rojantaa alochinchadam, vaallu sad ga unte manaki kuda baadha ga anipinchadam, vaallu smile chesthe manam kuda happy avvadam… idhe nijamaina love anipinchindhi.
Nuvvu naaku entha important ayyavo words lo poorthiga explain cheyyalenu.
Kaani oka vishayam maatram cheppagalanu… Sometimes future gurinchi alochisthe fear kuda vasthundhi — "Mana iddaram eppatiki ila maatladukuntaama?" ani.
Endhukante konni people ni lose avuthaam ane thought kuda painful ga untundhi. Nuvvu alanti person.`
    },
    {
        tag: "My Truth 💙",
        title: "Genuine & Real",
        content: `Ninnu force cheyyaali ani kaadhu, pressure pettali ani kaadhu…
Kevalam naa heart lo unna nijam neeku teliyali anipinchindhi anthe.
Neetho late night chats, random jokes, unnecessary fights, sudden caring moments… ivanni naaku memories kaadhu… feelings.
Chinna chinna moments aina naaku chaala valuable. Antha effect undhi nee paina naaku.
Ninnu choosaka naaku inko vishayam ardham ayyindhi… Manaki nachina person perfect avvalsina avasaram ledhu.
Mana heart ki peace ivvali… anthe. Nuvvu naaku aa peace.
Life lo future ela untundho naaku telidhu. Years tharvatha em avuthaamo kuda telidhu.
Kaani ee moment lo maatram naa heart genuinely neekosame feel avuthundhi.
Nenu eppudu nee side lo undaali anipisthundhi.
Nuvvu sad ga unnappudu support avvaali anipisthundhi.
Nuvvu success aithe first clap kottedhi nene avvaali anipisthundhi.
Nuvvu tired ga unnappudu "nenu unnaanu" ani cheppe person nene kaavali anipisthundhi.
Idi movie dialogue kaadhu.
Idi temporary attraction kaadhu.
Idi just timepass kuda kaadhu.
Idi nijanga naa heart nundi vachina feeling.`
    },
    {
        tag: "Always 💙",
        title: "You Are My Peace",
        content: `Nuvvu naa life loki vachaka naaku teliyakundane nenu chaala change ayyanu.
Asalu nee gurinchi raayadam start chesthe ekkada aapalo ardham kaavatledhu.
Endhukante nuvvu naa life lo ochhina tarvatha ordinary days kuda konchem different ga feel avuthunnayi.
Naa roju entha irritating ga unna, nee oka "oye" chaalu mood marchadaniki.
And one thing — mana madhya maatalu vunna lekhapoina, you are the most very very important person to me rahh...
Konthamandhi people mana life loki silent ga vastaaru… kaani vellipoye chance ane thought vachina kuda bayam vesthundhi. Nuvvu alanti person.
Naa daggara expensive gifts levu, cinematic dialogues levu, over promises kuda levu.
Kaani nijamaina attachment undhi — fake ga kaakunda, temporary ga kaakunda… genuine ga.
Nuvvu eppudu naa pakkane undaali ani cheppalenu.
But i want you in my life raa...
Endhukante ippudu naa happiness lo nuvvu kuda unnav.
Nee peru screen meedha kanipinchina smile vachesthundhi.
Nenu nee life lo special person avuthaano ledho telidhu.
Kaani nuvvu maatram naa life lo very special.
Chivaraga okkate chepthaanu… Nuvvu happy ga undaali. Nee face meedha smile undaali.
Adhi naa valla aithe inkaa happy.
And finally — Nuv naa heart raa ❤️`
    }
];

let currentBookPage = 0;
let isBookOpen = false;

function initNotes() {
    currentBookPage = 0;
    isBookOpen = false;

    const book      = document.getElementById('central-book');
    const actionBtn = document.getElementById('book-action-btn');
    const prevBtn   = document.getElementById('book-prev-btn');
    const nextBtn   = document.getElementById('book-next-btn');

    if (!book) return;

    book.classList.remove('open');
    if (actionBtn) actionBtn.textContent = 'Open Book 📖';
    if (prevBtn)   prevBtn.classList.add('hidden');
    if (nextBtn)   nextBtn.classList.add('hidden');

    renderBookPage(currentBookPage);

    // Click on book cover to open (but not on page content area)
    book.onclick = (e) => {
        if (e.target.closest('.book-face-page')) return;
        if (!isBookOpen) openBook();
    };

    // Rebind buttons by replacing nodes (removes stale listeners)
    function rebind(el, handler) {
        if (!el) return null;
        const clone = el.cloneNode(true);
        el.parentNode.replaceChild(clone, el);
        clone.addEventListener('click', handler);
        return clone;
    }

    rebind(actionBtn, () => { if (!isBookOpen) openBook(); else closeBook(); });
    rebind(prevBtn,   () => prevPage());
    rebind(nextBtn,   () => nextPage());
}

function renderBookPage(idx) {
    const page      = BOOK_PAGES[idx];
    const tagEl     = document.getElementById('page-tag');
    const numEl     = document.getElementById('page-number');
    const titleEl   = document.getElementById('page-title');
    const contentEl = document.getElementById('page-content');

    if (!page || !contentEl) return;

    if (tagEl)     tagEl.textContent   = page.tag;
    if (numEl)     numEl.textContent   = `Page ${idx + 1} of ${BOOK_PAGES.length}`;
    if (titleEl)   titleEl.textContent = page.title;
    if (contentEl) contentEl.innerHTML = page.content.replace(/\n/g, '<br>');
}

function openBook() {
    isBookOpen = true;
    const book      = document.getElementById('central-book');
    const actionBtn = document.getElementById('book-action-btn');

    book.classList.add('open');
    if (actionBtn) actionBtn.textContent = 'Close Book 📕';
    updateNavButtons();

    try {
        const now = audioCtx.currentTime;
        playChime(440.00, now,        0.18, 0.1);
        playChime(554.37, now + 0.10, 0.28, 0.08);
        playChime(659.25, now + 0.20, 0.22, 0.06);
    } catch(e){}

    const rect = book.getBoundingClientRect();
    spawnExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, 'confetti');
}

function closeBook() {
    isBookOpen = false;
    currentBookPage = 0;
    const book      = document.getElementById('central-book');
    const actionBtn = document.getElementById('book-action-btn');
    const prevBtn   = document.getElementById('book-prev-btn');
    const nextBtn   = document.getElementById('book-next-btn');

    book.classList.remove('open');
    if (actionBtn) actionBtn.textContent = 'Open Book 📖';
    if (prevBtn)   prevBtn.classList.add('hidden');
    if (nextBtn)   nextBtn.classList.add('hidden');

    renderBookPage(0);

    try { playChime(370.00, audioCtx.currentTime, 0.25, 0.07); } catch(e){}
}

function nextPage() {
    if (currentBookPage < BOOK_PAGES.length - 1) {
        currentBookPage++;
        animatePageTurn('next');
        renderBookPage(currentBookPage);
        updateNavButtons();
        try { playChime(523.25, audioCtx.currentTime, 0.15, 0.08); } catch(e){}
    }
}

function prevPage() {
    if (currentBookPage > 0) {
        currentBookPage--;
        animatePageTurn('prev');
        renderBookPage(currentBookPage);
        updateNavButtons();
        try { playChime(392.00, audioCtx.currentTime, 0.15, 0.08); } catch(e){}
    }
}

function animatePageTurn(direction) {
    const pageEl = document.querySelector('#central-book .book-face-page');
    if (!pageEl) return;
    const cls = direction === 'next' ? 'turning-next' : 'turning-prev';
    pageEl.classList.add(cls);
    setTimeout(() => pageEl.classList.remove(cls), 560);
}

function updateNavButtons() {
    const prevBtn = document.getElementById('book-prev-btn');
    const nextBtn = document.getElementById('book-next-btn');
    if (!prevBtn || !nextBtn) return;
    prevBtn.classList.toggle('hidden', currentBookPage === 0);
    nextBtn.classList.toggle('hidden', currentBookPage === BOOK_PAGES.length - 1);
}

// ==========================================================================
// 12. RUN AT START
// ==========================================================================
window.addEventListener('load', () => {
    initCanvas();
});

