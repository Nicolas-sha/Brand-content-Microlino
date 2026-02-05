/* ================================
   MICROLINO SCROLLYTELLING
   GSAP ScrollTrigger Animations
   ================================ */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Animate counter from 0 to target value
 */
function animateCounter(element, target, duration = 2) {
    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
            element.textContent = Math.floor(obj.value).toLocaleString('fr-FR') + 'K';
        }
    });
}

// ================================
// DOM ELEMENTS
// ================================

const microlino = document.getElementById('microlino');
const trottinette = document.getElementById('trottinette');
const introSection = document.getElementById('intro');
const transitionSection = document.getElementById('transition');
const agiliteSection = document.getElementById('agilite');
const techniqueSection = document.getElementById('technique');
const humourSection = document.getElementById('humour');
const accelerationSection = document.getElementById('acceleration');
const activationSection = document.getElementById('activation');

// ================================
// PHASE 1: INTRO - LE HOOK
// Trottinette → Microlino transition
// ================================

// Initial state: Microlino hidden
gsap.set(microlino, { opacity: 0 });

// Timeline for intro section
const introTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: introSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: false,
    }
});

// Trottinette grows and fades out
introTimeline
    .to(trottinette, {
        scale: 2.5,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    });

// ================================
// TRANSITION: Light to Dark + Microlino appears
// ================================

const transitionTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: transitionSection,
        start: "top 80%",
        end: "bottom center",
        scrub: 1,
    }
});

// Microlino fades in during transition
transitionTimeline
    .to(microlino, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });

// ================================
// CONTEXT STRATÉGIQUE ANIMATIONS
// ================================

// Title animation
gsap.from('.section--context .section-title', {
    y: 50,
    opacity: 0,
    scrollTrigger: {
        trigger: '#context',
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
    }
});

// Cards stagger animation
gsap.from('.context-card', {
    y: 80,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.context-grid',
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
    }
});

// ================================
// MISSION & VISION ANIMATIONS
// ================================

gsap.from('.mission-box', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        trigger: '#mission',
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
    }
});

gsap.from('.vision-box', {
    x: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: '#mission',
        start: "top 70%",
        end: "top 40%",
        scrub: 1,
    }
});

gsap.from('.territoire-badge', {
    y: 30,
    opacity: 0,
    scrollTrigger: {
        trigger: '.territoire-badge',
        start: "top 90%",
        end: "top 70%",
        scrub: 1,
    }
});

// ================================
// VALEURS ANIMATIONS
// ================================

gsap.from('.section--valeurs .section-title', {
    y: 50,
    opacity: 0,
    scrollTrigger: {
        trigger: '#valeurs',
        start: "top 90%",
        end: "top 60%",
        scrub: 1,
    }
});

// Animation des cartes valeurs - départ visible
gsap.set('.valeur-card', { opacity: 1, y: 0 }); // Assure qu'elles sont visibles par défaut
gsap.from('.valeur-card', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.valeurs-grid',
        start: "top 95%",
        end: "top 60%",
        scrub: 1,
    }
});

// ================================
// PHASE 2A: PILIER AGILITÉ
// L'esquive commence ICI (après transition)
// ================================

// Animation du texte du pilier (déjà visible, on ajoute juste un effet d'entrée)
gsap.from('#pillar-agilite', {
    scale: 0.8,
    opacity: 0,
    scrollTrigger: {
        trigger: agiliteSection,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
    }
});

// La Microlino esquive le texte par la GAUCHE (section Agilité uniquement)
const slalomTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: agiliteSection,
        start: "top 60%",
        end: "bottom 60%",  // Se termine AVANT la section suivante
        scrub: 1,
    }
});

slalomTimeline
    // Écart vers la GAUCHE pour éviter le texte central
    .to(microlino, {
        x: -200,
        rotation: -8,
        duration: 1.5,
        ease: "power2.inOut"
    })
    // Retour au centre (pour être prêt pour la section Technique et Humour)
    .to(microlino, {
        x: 0,
        rotation: 0,
        duration: 1.5,
        ease: "power2.inOut"
    });


// ================================
// PHASE 2B: PILIER TECHNIQUE
// La voiture reste au centre, les pointeurs apparaissent
// ================================

// Timeline avec PIN pour la section Technique
// La Microlino reste en place pendant l'affichage des flèches
const techniqueTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: techniqueSection,
        start: "top -25%",     // Voiture descend ~250px avant de se figer
        end: "+=200%",      // La section reste épinglée longtemps
        scrub: 1,
        pin: true,
        anticipatePin: 1,
    }
});

// Animation du texte à droite (dans la timeline)
techniqueTimeline.from('#pillar-technique', {
    x: 100,
    opacity: 0,
    duration: 1,
}, 0);

// Animation des pointeurs SVG (apparition séquentielle avec tracé)
const svgPointers = document.querySelectorAll('.tech-pointers-svg .pointer');
svgPointers.forEach((pointer, index) => {
    // Fade in du groupe entier
    techniqueTimeline.to(pointer, {
        opacity: 1,
        duration: 1,
    }, 0.5 + (index * 0.8));  // Décalage entre chaque pointeur

    // Animation du tracé de la courbe (draw effect)
    const path = pointer.querySelector('path');
    if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        techniqueTimeline.to(path, {
            strokeDashoffset: 0,
            duration: 1,
        }, 0.5 + (index * 0.8));
    }
});

// Pause après l'affichage des flèches (la voiture reste en place un moment)
techniqueTimeline.to({}, { duration: 1 });


// ================================
// PHASE 2C: PILIER HUMOUR
// Le SUV arrive de la gauche et s'envole en tourbillon
// ================================

const giantSuv = document.getElementById('giant-suv');

// Animation du texte - apparaît dès l'entrée
gsap.from('#pillar-humour', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        trigger: humourSection,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
    }
});

// Animation du SUV avec PIN de la section
// La section est "gelée" pendant que le SUV fait son animation
const suvTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: humourSection,
        start: "top -25%",     // Voiture descend ~250px avant de se figer
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
    }
});

suvTimeline
    // 1. Le SUV arrive de la gauche (menaçant)
    .to(giantSuv, {
        left: '35%',    // S'approche un peu plus près
        duration: 2,
        ease: "power2.out"
    })
    // 2. Anticipation : La Microlino se prépare (recule légèrement)
    .to(microlino, {
        x: 30,          // Recule vers la droite
        rotation: 5,    // Se penche vers l'arrière
        scale: 0.95,    // Se compresse (squash)
        duration: 0.2,
        ease: "power1.in"
    })
    // 3. IMPACT VIOLENT ! 💥 (Strike rapide)
    .to(microlino, {
        x: -120,        // Frappe loin vers la gauche
        rotation: -10,  // Penche vers l'avant dans l'impact
        scale: 1.15,    // Grossit (puissance)
        duration: 0.1,  // Très rapide !
        ease: "power4.out"
    })
    // 4. EJECTION DU SUV (Réaction immédiate et rapide)
    .to(giantSuv, {
        left: '150%',
        top: '-100%',     // Vole plus haut
        rotation: 1200,   // Tourne plus vite
        scale: 0.1,
        opacity: 0,
        duration: 0.8,    // Disparaît vite
        ease: "power4.in" // Accélère vers la sortie
    }, "<") // Synchro parfaite avec l'impact
    // 5. La Microlino revient en mode "Boss" (rebond cool)
    .to(microlino, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)" // Rebond élastique "cool"
    });


// ================================
// PHASE 3: ACCELERATION
// Microlino accelerates upward and exits
// ================================

const accelerationTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: accelerationSection,
        start: "top center",
        end: "bottom center",
        scrub: 1,
    }
});

accelerationTimeline
    .to(microlino, {
        y: -window.innerHeight,
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power2.in"
    });

// Acceleration text animation
gsap.from('.acceleration-text', {
    scale: 0.8,
    opacity: 0,
    scrollTrigger: {
        trigger: accelerationSection,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
    }
});

// ================================
// PHASE 3: ACTIVATION
// View counter + Tweet wall
// ================================

const viewCounter = document.getElementById('viewCounter');
let counterAnimated = false;

// Trigger counter animation when activation section is visible
ScrollTrigger.create({
    trigger: activationSection,
    start: "top 60%",
    onEnter: () => {
        if (!counterAnimated) {
            counterAnimated = true;
            animateCounter(viewCounter, 950, 3);
        }
    }
});

// Activation header animation
gsap.from('.activation-header', {
    y: 50,
    opacity: 0,
    scrollTrigger: {
        trigger: activationSection,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
    }
});

// iPhone mockup animation
gsap.from('.iphone-mockup', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        trigger: activationSection,
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
    }
});

// Tweet wall animation
gsap.from('.tweet-wall', {
    x: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: activationSection,
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
    }
});

// ================================
// FOOTER CTA
// ================================

gsap.from('.footer-content', {
    y: 80,
    opacity: 0,
    scrollTrigger: {
        trigger: '#footer',
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
    }
});

// CTA button hover glow effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
            boxShadow: '0 0 80px rgba(250, 150, 30, 0.6)',
            duration: 0.3
        });
    });

    ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
            boxShadow: '0 0 40px rgba(250, 150, 30, 0.3)',
            duration: 0.3
        });
    });
}

// ================================
// SMOOTH SCROLL ENHANCEMENT
// ================================

// Add smooth reveal for glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    gsap.from(card, {
        backdropFilter: 'blur(0px)',
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
        }
    });
});

// ================================
// PARALLAX ROAD EFFECT
// ================================

document.querySelectorAll('.road-background').forEach(road => {
    gsap.to(road, {
        y: -200,
        scrollTrigger: {
            trigger: road.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
});

// ================================
// DEBUG MODE (uncomment to enable)
// ================================
// ScrollTrigger.defaults({ markers: true });

console.log('🚗 Microlino Scrollytelling - Loaded!');
console.log('📍 Scroll to experience the Urban Joyride');
