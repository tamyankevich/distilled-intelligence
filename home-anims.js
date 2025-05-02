console.log('home-anims.js loaded');

// Social proof logo hover animations
document.querySelectorAll('.social_proof--item').forEach(logo => {
    const tooltip = logo.querySelector('.tooltip--wrapper');
    const tooltipLine = tooltip.querySelector('.tooltip-line');
    const eyebrow = logo.closest('.w-dyn-item').querySelector('#social-proof-eyebrow');
    const trigger = logo.querySelector('.social_proof-logo-img');
    
    // Get original line height and store it
    const lineHeight = tooltipLine.offsetHeight;
    
    // Set initial states
    gsap.set(tooltip, { opacity: 0 });
    gsap.set(tooltipLine, { height: 0 });
    
    // Create hover animation timeline
    const tl = gsap.timeline({ paused: true });
    
    tl.to(tooltip, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
    })
    .to(tooltipLine, {
        height: lineHeight,
        duration: 0.4,
        ease: "power2.inOut"
    }, "<")
    .to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "<0.1");
    
    // Add hover listeners
    trigger.addEventListener('mouseenter', () => tl.play());
    trigger.addEventListener('mouseleave', () => tl.reverse());
});

// Timeline animation with ScrollTrigger
document.addEventListener('DOMContentLoaded', () => {
    const timelineWrapper = document.querySelector('.timeline--wrapper');
    
    if (!timelineWrapper) return; // Exit if timeline wrapper doesn't exist
    
    // Select all tooltips (2-4)
    const tooltips = [
        document.querySelector('.timeline-tooltip._2'),
        document.querySelector('.timeline-tooltip._3'),
        document.querySelector('.timeline-tooltip._4')
    ].filter(tooltip => tooltip); // Filter out any null elements
    
    // Create a timeline for the animation
    const timelineTl = gsap.timeline({
        scrollTrigger: {
            trigger: timelineWrapper,
            start: "top 80%", // Start when timeline is 20% above bottom of viewport
            toggleActions: "play none none none", // Play once on enter, no reverse
            // markers: true,  // Uncomment for debugging
        }
    });
    
    // Add animations for each tooltip
    tooltips.forEach((tooltip, index) => {
        const content = tooltip.querySelector('.timeline-paragraph');
        const heading = content.querySelector('.u-text-primary');
        gsap.set(heading, {opacity: 0})
        
        // Store the final right position before we change it
        const finalRight = window.getComputedStyle(tooltip).right;
        
        // Set initial states
        gsap.set(tooltip, { right: "80%" });
        gsap.set(content, { opacity: 0 });
        gsap.set(heading, { opacity: 0, y: 10 });

        // Add to timeline with staggered start times
        timelineTl.to(tooltip, {
            right: finalRight,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                // Fade in content when tooltip reaches final position
                gsap.to(content, {
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.inOut"
                }, "<0.25");
                // gsap.to(heading, {
                //     opacity: 1,
                //     y: 0,
                //     duration: 0.5,
                //     ease: "power2.inOut"
                // });
            }
        }, index * 0.2); // Stagger the animations
    });
});

// Road images animation
document.addEventListener('DOMContentLoaded', () => {
    const roadImgsWrapper = document.querySelector('.road_imgs--wrapper');
    
    if (!roadImgsWrapper) return; // Exit if wrapper doesn't exist
    
    // Select all road images
    const roadImages = roadImgsWrapper.querySelectorAll('.img_road');
    
    if (roadImages.length === 0) return; // Exit if no images found
    
    // Create a timeline for the animation
    const roadImagesTl = gsap.timeline({
        scrollTrigger: {
            trigger: roadImgsWrapper,
            start: "top 80%", // Start when images are 20% above bottom of viewport
            toggleActions: "play none none none", // Play once on enter, no reverse
            // markers: true,  // Uncomment for debugging
        }
    });
    
    // Set initial states for all images
    gsap.set(roadImages, { 
        opacity: 0,
        x: '5rem' // Start 5rem to the right of final position
    });
    
    // Add animations for each image
    roadImagesTl.to(roadImages, {
        opacity: 1,
        x: 0, // Move to original position
        duration: 0.8,
        stagger: 0.15, // Stagger the animations
        ease: "power2.out"
    });

    // Add hover interactions
    roadImages.forEach((img) => {
        // Create hover timeline
        const hoverTl = gsap.timeline({ paused: true });
        
        // Add hover animation
        hoverTl.to(img, {
            y: '-10rem',
            duration: 0.15,
            ease: "power2.out"
        })
        .to(img, {
            scale: 1.2,
            duration: 0.1,
            ease: "power2.in"
        }, 0.05); // Start 0.05s after the timeline begins

        // Add hover listeners
        img.addEventListener('mouseenter', () => hoverTl.play());
        img.addEventListener('mouseleave', () => hoverTl.reverse());
    });
});

// Hero image idle hover effect - gentle floating animation

document.addEventListener('DOMContentLoaded', () => {
    const heroWrappers = document.querySelectorAll('.hero_img--wrapper');
    console.log(heroWrappers);
    if (heroWrappers.length === 0) return;

    // Select all wrappers for set 1 and set 2
    const set1Wrappers = document.querySelectorAll('.hero_img--wrapper.u-img-set-1');
    const set2Wrappers = document.querySelectorAll('.hero_img--wrapper.u-img-set-2');

    // // Floating animation for all wrappers
    const allWrappers = [...set1Wrappers, ...set2Wrappers];
    allWrappers.forEach((wrapper, i) => {
        gsap.to(wrapper, {
            y: '+=15',
            duration: 4.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: i * 0.3
        });
        gsap.to(wrapper, {
            x: '+=8',
            duration: 3.7,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: 0.5 + i * 0.2
        });
    });

    // Start with set 1 visible, set 2 hidden
    set1Wrappers.forEach(el => gsap.set(el, { opacity: 1, overflow: 'hidden' }));
    set2Wrappers.forEach(el => gsap.set(el, { opacity: 0, overflow: 'hidden' }));

    let showingSet1 = true;
    setInterval(() => {
        if (showingSet1) {
            // Fade out set 1 with staggered delay, then fade in set 2
            const outTotalDuration = 0.7 + (set1Wrappers.length - 1) * 0.4;
            set1Wrappers.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    delay: i * 0.4
                });
            });
            set2Wrappers.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    delay: outTotalDuration + i * 0.4
                });
            });
        } else {
            // Fade out set 2 with staggered delay, then fade in set 1
            const outTotalDuration = 0.7 + (set2Wrappers.length - 1) * 0.4;
            set2Wrappers.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    delay: i * 0.4
                });
            });
            set1Wrappers.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    delay: outTotalDuration + i * 0.4
                });
            });
        }
        showingSet1 = !showingSet1;
    }, 8000);
});

// Pulsate animation for swiper-button-next until first click
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.swiper-button-next');
    
    if (nextButton) {
        // Create pulsate animation
        const pulsateAnimation = gsap.timeline({ repeat: -1 })
            .to(nextButton, {
                scale: 1.2,
                duration: 1.4,
                ease: 'power1.inOut'
            })
            .to(nextButton, {
                scale: 1,
                duration: 1.6,
                ease: 'power1.inOut'
            });
        
        // Stop animation on first click
        nextButton.addEventListener('click', () => {
            pulsateAnimation.kill();
            gsap.to(nextButton, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }, { once: true });
    }
});
