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
        end: "top 20%",
        scrub: 1,
    }
});

// Background color transition (handled via CSS classes, but we fade Microlino in)
transitionTimeline
    .to(microlino, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });

// ================================
// PHASE 2A: PILIER AGILITÉ
// Obstacles pass by the Microlino
// ================================

const obstacles = document.querySelectorAll('.obstacle');

// Animate each obstacle
obstacles.forEach((obstacle, index) => {
    const isLeft = obstacle.classList.contains('obstacle--left');
    const startX = isLeft ? -200 : 200;
    
    gsap.set(obstacle, { x: startX, opacity: 0 });
    
    gsap.to(obstacle, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: agiliteSection,
            start: `${20 + (index * 15)}% center`,
            end: `${35 + (index * 15)}% center`,
            scrub: 1,
        }
    });
    
    // Fade out after passing
    gsap.to(obstacle, {
        x: isLeft ? 200 : -200,
        opacity: 0,
        scrollTrigger: {
            trigger: agiliteSection,
            start: `${40 + (index * 15)}% center`,
            end: `${55 + (index * 15)}% center`,
            scrub: 1,
        }
    });
});

// Agilité pillar content animation
gsap.from('#agilite .pillar-content', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: agiliteSection,
        start: "60% center",
        end: "80% center",
        scrub: 1,
    }
});

// ================================
// PHASE 2B: PILIER TECHNIQUE
// Blueprint grid + SVG pointers
// ================================

const blueprintGrid = document.querySelector('.blueprint-grid');
const pointers = document.querySelectorAll('.pointer');

// Blueprint grid fade in
gsap.to(blueprintGrid, {
    opacity: 1,
    scrollTrigger: {
        trigger: techniqueSection,
        start: "top center",
        end: "30% center",
        scrub: 1,
    }
});

// Animate each pointer sequentially
pointers.forEach((pointer, index) => {
    gsap.to(pointer, {
        opacity: 1,
        scrollTrigger: {
            trigger: techniqueSection,
            start: `${20 + (index * 15)}% center`,
            end: `${35 + (index * 15)}% center`,
            scrub: 1,
        }
    });
});

// Technique pillar content animation
gsap.from('#technique .pillar-content', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: techniqueSection,
        start: "50% center",
        end: "70% center",
        scrub: 1,
    }
});

// ================================
// PHASE 2C: PILIER HUMOUR
// Giant element appears
// ================================

const giantElement = document.querySelector('.giant-element');

// Giant element slides in from right
gsap.to(giantElement, {
    opacity: 1,
    x: 0,
    scrollTrigger: {
        trigger: humourSection,
        start: "top center",
        end: "40% center",
        scrub: 1,
    }
});

gsap.set(giantElement, { x: 200 });

// Humour pillar content animation
gsap.from('#humour .pillar-content', {
    x: -100,
    opacity: 0,
    scrollTrigger: {
        trigger: humourSection,
        start: "30% center",
        end: "50% center",
        scrub: 1,
    }
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

const roadBackground = document.querySelector('.road-background');
if (roadBackground) {
    gsap.to(roadBackground, {
        y: -500,
        scrollTrigger: {
            trigger: agiliteSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
}

// ================================
// DEBUG MODE (uncomment to enable)
// ================================
// ScrollTrigger.defaults({ markers: true });

console.log('🚗 Microlino Scrollytelling - Loaded!');
console.log('📍 Scroll to experience the Urban Joyride');
