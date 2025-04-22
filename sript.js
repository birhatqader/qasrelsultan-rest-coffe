
// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// Language Switching
const languageBtns = document.querySelectorAll('.language-btn');
const arabicElements = document.querySelectorAll('[data-ar]');
const englishElements = document.querySelectorAll('[data-en]');

languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        
        // Update active button
        languageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Change document direction and font
        if (lang === 'ar') {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            document.title = 'قصر السولتان | Sultan\'s Palace';
            
            // Update content to Arabic
            document.querySelector('.logo').textContent = 'قصر السولتان';
            document.querySelector('.tagline').textContent = 'تجربة فاخرة من المذاق الملكي';
            document.getElementById('reservation-btn').textContent = 'احجز طاولتك';
            document.querySelector('.section-title').textContent = 'عن قصر السولتان';
            // Add more content updates as needed...
            
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            document.title = 'Sultan\'s Palace | قصر السولتان';
            
            // Update content to English
            document.querySelector('.logo').textContent = 'Sultan\'s Palace';
            document.querySelector('.tagline').textContent = 'A luxurious experience of royal taste';
            document.getElementById('reservation-btn').textContent = 'Book Your Table';
            document.querySelector('.section-title').textContent = 'About Sultan\'s Palace';
            // Add more content updates as needed...
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Menu Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-items');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding menu
        menuItems.forEach(menu => menu.classList.remove('active'));
        document.getElementById(`${category}-menu`).classList.add('active');
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevTestimonial = document.getElementById('prev-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentSlide].classList.add('active');
    testimonialDots[currentSlide].classList.add('active');
    
    // Reset timer when manually changing slides
    resetTimer();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

prevTestimonial.addEventListener('click', prevSlide);
nextTestimonial.addEventListener('click', nextSlide);

// Start auto slide change
slideInterval = setInterval(nextSlide, 5000);

// Reservation Modal
const reservationBtn = document.getElementById('reservation-btn');
const floatingReservation = document.getElementById('floating-reservation');
const reservationModal = document.getElementById('reservation-modal');
const closeModal = document.querySelector('.close-modal');
const reservationForm = document.getElementById('reservationForm');
const reservationFormContainer = document.querySelector('.reservation-form-container');
const successMessage = document.querySelector('.success-message');
const closeSuccessMessage = document.getElementById('close-success-message');

function openReservationModal() {
    reservationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    reservationFormContainer.style.display = 'block';
    successMessage.style.display = 'none';
}

reservationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openReservationModal();
});

floatingReservation.addEventListener('click', openReservationModal);

closeModal.addEventListener('click', () => {
    reservationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeSuccessMessage.addEventListener('click', () => {
    reservationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        reservationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form Submissions
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('شكرًا لتواصلك معنا! سنرد على رسالتك في أقرب وقت ممكن.');
    e.target.reset();
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    reservationFormContainer.style.display = 'none';
    successMessage.style.display = 'block';
    reservationForm.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const nav = document.getElementById('main-nav');
    
    // Add shadow to navbar on scroll
    if (scrollPosition > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollPosition > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        const increment = target / speed;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 1);
        } else {
            stat.innerText = target;
        }
    });
}

// Start counter animation when about section is visible
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// Gallery lightbox (simplified version)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.style.cursor = 'zoom-out';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        });
    });
});

// Initialize date picker for reservation (min date = today)
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}
