document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Animado ---
    const target = document.querySelectorAll('[data-anime]');
    const animationClass = 'animate';

    function animeScroll() {
        const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
        target.forEach(function(element) {
            if((windowTop) > element.offsetTop) {
                element.classList.add(animationClass);
            }
        })
    }

    animeScroll();

    if(target.length) {
        window.addEventListener('scroll', function() {
            animeScroll();
        })
    }

    // --- Smooth Scroll NavBar ---
    document.querySelectorAll('.nav-links a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetNode = document.getElementById(targetId);
            if(targetNode) {
                targetNode.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Galeria Slider ---
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    let currentSlideIndex = 0;

    const moveToSlide = (track, currentSlide, targetSlide) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const targetIndex = slides.indexOf(targetSlide);
        track.style.transform = 'translateX(-' + targetIndex * slideWidth + 'px)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        currentSlideIndex = targetIndex;
    }

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        
        // Loop back to start
        if(!nextSlide) {
            nextSlide = slides[0];
        }
        
        moveToSlide(track, currentSlide, nextSlide);
    });

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        
        // Loop to end
        if(!prevSlide) {
            prevSlide = slides[slides.length - 1];
        }
        
        moveToSlide(track, currentSlide, prevSlide);
    });

    // Handle Resize maintaining slide position
    window.addEventListener('resize', () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + currentSlideIndex * slideWidth + 'px)';
        track.style.transition = 'none'; // Prevent animation glitch on resize
        setTimeout(() => {
             track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });

    // --- FAQ Interativo ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            faqItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked
            item.classList.add('active');
            
            // Get answer
            const answer = item.getAttribute('data-answer');
            
            const currentContent = document.querySelector('.faq-answer-content h3');
            
            // Re-trigger animation by cloning and replacing node
            if (currentContent) {
                const newContent = currentContent.cloneNode(true);
                newContent.innerText = answer;
                currentContent.parentNode.replaceChild(newContent, currentContent);
            }
        });
    });
});
