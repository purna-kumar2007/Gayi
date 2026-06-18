/**
 * assets/placeholder.js
 * Generates beautiful, responsive SVGs to act as memory lane images
 * Theme: Midnight blue, cyan glow, starry skies, cozy aesthetic
 */

const MemoryPlaceholders = {
    // 1. Starry Night Silhouette
    starryNight: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#020617" />
                    <stop offset="60%" stop-color="#0f172a" />
                    <stop offset="100%" stop-color="#1e3a8a" />
                </linearGradient>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#e0f2fe" stop-opacity="1" />
                    <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#020617" stop-opacity="0" />
                </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#skyGrad)"/>
            <!-- Moon -->
            <circle cx="320" cy="80" r="40" fill="url(#moonGlow)"/>
            <circle cx="320" cy="80" r="20" fill="#f8fafc"/>
            <!-- Stars -->
            <circle cx="50" cy="40" r="1.5" fill="#fff" opacity="0.8"/>
            <circle cx="90" cy="80" r="1" fill="#fff" opacity="0.5"/>
            <circle cx="120" cy="30" r="2" fill="#38bdf8" opacity="0.9"/>
            <circle cx="210" cy="60" r="1.5" fill="#fff" opacity="0.8"/>
            <circle cx="160" cy="120" r="1" fill="#fff" opacity="0.4"/>
            <circle cx="260" cy="40" r="2" fill="#fff" opacity="0.7"/>
            <circle cx="70" cy="140" r="1.5" fill="#38bdf8" opacity="0.6"/>
            <!-- Mountains/Hills -->
            <path d="M 0 300 L 0 250 Q 80 200 160 260 T 320 230 Q 360 240 400 210 L 400 300 Z" fill="#0f172a" opacity="0.9"/>
            <path d="M 0 300 L 0 270 Q 120 220 240 280 T 400 260 L 400 300 Z" fill="#020617"/>
            <!-- Silhouettes -->
            <g transform="translate(180, 220) scale(0.6)">
                <!-- Figure 1 -->
                <circle cx="40" cy="30" r="10" fill="#020617"/>
                <path d="M 30 40 Q 40 42 50 40 L 52 80 L 28 80 Z" fill="#020617"/>
                <!-- Figure 2 -->
                <circle cx="65" cy="32" r="9" fill="#020617"/>
                <path d="M 56 42 Q 65 44 74 42 L 72 80 L 58 80 Z" fill="#020617"/>
            </g>
        </svg>
    `,

    // 2. Cozy Coffee Date
    cozyCoffee: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0b1329" />
                    <stop offset="100%" stop-color="#1e1b4b" />
                </linearGradient>
                <linearGradient id="cupGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#06b6d4" />
                    <stop offset="100%" stop-color="#0891b2" />
                </linearGradient>
                <linearGradient id="cupGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#3b82f6" />
                    <stop offset="100%" stop-color="#1d4ed8" />
                </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bgGrad)"/>
            <!-- Table top -->
            <path d="M -50 300 L 450 300 L 400 180 L 0 180 Z" fill="#111827" opacity="0.9"/>
            
            <!-- Steam effects -->
            <path d="M 140 100 Q 130 70 145 50 T 135 20" fill="none" stroke="#67e8f9" stroke-width="3" opacity="0.3" stroke-linecap="round"/>
            <path d="M 155 95 Q 165 75 150 55 T 160 25" fill="none" stroke="#67e8f9" stroke-width="2" opacity="0.2" stroke-linecap="round"/>
            <path d="M 245 90 Q 235 65 250 45 T 240 15" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.3" stroke-linecap="round"/>
            
            <!-- Mug 1 (Cyan) -->
            <g transform="translate(100, 110)">
                <!-- Mug handle -->
                <path d="M 20 20 C -10 20 -10 60 20 60" fill="none" stroke="url(#cupGrad1)" stroke-width="10" stroke-linecap="round"/>
                <!-- Mug body -->
                <rect x="20" y="0" width="70" height="80" rx="10" fill="url(#cupGrad1)"/>
                <!-- Drink inner -->
                <ellipse cx="55" cy="0" rx="30" ry="8" fill="#451a03"/>
                <!-- Heart art in coffee -->
                <path d="M 55 2 C 51 -2 46 2 55 7 C 64 2 59 -2 55 2 Z" fill="#fed7aa"/>
            </g>

            <!-- Mug 2 (Blue) -->
            <g transform="translate(210, 115) scale(0.95)">
                <!-- Mug body -->
                <rect x="0" y="0" width="70" height="80" rx="10" fill="url(#cupGrad2)"/>
                <!-- Mug handle -->
                <path d="M 50 20 C 80 20 80 60 50 60" fill="none" stroke="url(#cupGrad2)" stroke-width="10" stroke-linecap="round"/>
                <!-- Drink inner -->
                <ellipse cx="35" cy="0" rx="30" ry="8" fill="#451a03"/>
                <!-- Foam pattern -->
                <circle cx="35" cy="0" r="10" fill="#fed7aa" opacity="0.7"/>
            </g>
            
            <!-- Twinkling stars on table -->
            <circle cx="80" cy="240" r="2" fill="#06b6d4" opacity="0.5"/>
            <circle cx="320" cy="220" r="1.5" fill="#3b82f6" opacity="0.6"/>
        </svg>
    `,

    // 3. Road Trip/Adventure
    adventure: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="roadSky" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#020617" />
                    <stop offset="50%" stop-color="#1e1b4b" />
                    <stop offset="100%" stop-color="#311042" />
                </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#roadSky)"/>
            
            <!-- Mountains -->
            <polygon points="50,220 180,80 300,220" fill="#1e1b4b" opacity="0.8"/>
            <polygon points="-20,220 100,50 220,220" fill="#0f172a" opacity="0.9"/>
            <polygon points="200,220 300,100 420,220" fill="#0f172a" opacity="0.95"/>
            
            <!-- Road -->
            <polygon points="170,180 230,180 380,300 20,300" fill="#111827"/>
            <!-- Road Lines -->
            <polygon points="198,180 202,180 205,210 195,210" fill="#facc15"/>
            <polygon points="196,220 204,220 208,255 192,255" fill="#facc15"/>
            <polygon points="192,265 208,265 215,300 185,300" fill="#facc15"/>
            
            <!-- Flying shooting star -->
            <path d="M 50 30 L 150 70" stroke="#06b6d4" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
            <circle cx="150" cy="70" r="2" fill="#fff" opacity="0.9"/>
            
            <!-- Pine tree silhouettes -->
            <g fill="#020617">
                <polygon points="10,230 25,190 40,230"/>
                <polygon points="5,245 25,200 45,245"/>
                <polygon points="30,220 45,180 60,220"/>
                <polygon points="350,230 365,190 380,230"/>
                <polygon points="345,245 365,200 385,245"/>
            </g>
        </svg>
    `,

    // 4. Celebration Party
    partyTime: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="partyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#020617" />
                    <stop offset="50%" stop-color="#111827" />
                    <stop offset="100%" stop-color="#0f172a" />
                </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#partyGrad)"/>
            
            <!-- Confetti loops -->
            <path d="M 50 120 Q 90 90 120 150 T 180 110" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5 5" opacity="0.6"/>
            <path d="M 220 80 Q 260 120 300 70 T 350 110" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5 5" opacity="0.6"/>
            
            <!-- Balloons -->
            <g transform="translate(120, 80) rotate(-10)">
                <ellipse cx="0" cy="0" rx="30" ry="40" fill="#06b6d4" opacity="0.8"/>
                <path d="M 0 40 L -5 48 L 5 48 Z" fill="#0891b2"/>
                <path d="M 0 48 Q -10 70 5 90 T -5 120" fill="none" stroke="#0891b2" stroke-width="2" opacity="0.5"/>
            </g>
            <g transform="translate(250, 100) rotate(15)">
                <ellipse cx="0" cy="0" rx="25" ry="35" fill="#3b82f6" opacity="0.8"/>
                <path d="M 0 35 L -5 42 L 5 42 Z" fill="#2563eb"/>
                <path d="M 0 42 Q 10 65 -5 85 T 5 115" fill="none" stroke="#2563eb" stroke-width="2" opacity="0.5"/>
            </g>
            <g transform="translate(180, 130) scale(0.85) rotate(-5)">
                <ellipse cx="0" cy="0" rx="28" ry="38" fill="#6366f1" opacity="0.8"/>
                <path d="M 0 38 L -5 45 L 5 45 Z" fill="#4f46e5"/>
                <path d="M 0 45 Q -8 68 8 88 T -8 118" fill="none" stroke="#4f46e5" stroke-width="2" opacity="0.5"/>
            </g>
            
            <!-- Sparkles -->
            <path d="M 60 50 L 60 70 M 50 60 L 70 60" stroke="#22d3ee" stroke-width="2" stroke-linecap="round"/>
            <path d="M 330 200 L 330 220 M 320 210 L 340 210" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `,

    // 5. Sweet Treats
    sweetTreats: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="treatsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#020617" />
                    <stop offset="100%" stop-color="#1e1b4b" />
                </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#treatsGrad)"/>
            <!-- Cupcake wrapper and frosting details -->
            <g transform="translate(140, 90)">
                <!-- Cupcake base -->
                <path d="M 30 80 L 15 130 Q 60 140 105 130 L 90 80 Z" fill="#3b82f6" opacity="0.8"/>
                <path d="M 30 80 L 35 130 M 48 80 L 52 130 M 68 80 L 70 130 M 85 80 L 85 130" stroke="#1d4ed8" stroke-width="2"/>
                <!-- Cake -->
                <path d="M 12 80 Q 60 40 108 80 Z" fill="#06b6d4" opacity="0.9"/>
                <!-- Soft Cream swirls -->
                <path d="M 20 80 Q 60 50 100 80" fill="none" stroke="#e0f2fe" stroke-width="25" stroke-linecap="round"/>
                <path d="M 35 65 Q 60 40 85 65" fill="none" stroke="#f0f9ff" stroke-width="18" stroke-linecap="round"/>
                <path d="M 45 50 Q 60 30 75 50" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
                <!-- Cherry on top -->
                <circle cx="60" cy="30" r="8" fill="#ef4444"/>
                <path d="M 60 22 Q 65 10 80 8" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
            </g>
            <circle cx="60" cy="50" r="1.5" fill="#38bdf8" opacity="0.6"/>
            <circle cx="340" cy="80" r="2" fill="#06b6d4" opacity="0.4"/>
            <circle cx="280" cy="240" r="1" fill="#fff" opacity="0.7"/>
        </svg>
    `,

    // 6. Glowing Surprise Gift
    giftGlow: `
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="giftBoxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="100%" stop-color="#020617" />
                </linearGradient>
                <radialGradient id="sparkleGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
                </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#giftBoxGrad)"/>
            <!-- Glow background -->
            <circle cx="200" cy="150" r="90" fill="url(#sparkleGlow)"/>
            
            <!-- Box Body -->
            <g transform="translate(140, 100)">
                <rect x="15" y="40" width="90" height="70" rx="4" fill="#1e40af" stroke="#3b82f6" stroke-width="2"/>
                <!-- Lid -->
                <rect x="8" y="20" width="104" height="20" rx="3" fill="#2563eb" stroke="#60a5fa" stroke-width="2"/>
                <!-- Ribbons -->
                <rect x="52" y="20" width="16" height="90" fill="#06b6d4"/>
                <!-- Bow loops -->
                <path d="M 40 20 C 25 -5 50 -5 55 20" fill="none" stroke="#06b6d4" stroke-width="7" stroke-linecap="round"/>
                <path d="M 80 20 C 95 -5 70 -5 65 20" fill="none" stroke="#06b6d4" stroke-width="7" stroke-linecap="round"/>
            </g>
            <path d="M 90 220 L 110 240 M 310 70 L 320 85" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        </svg>
    `
};
