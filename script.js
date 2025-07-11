// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Chat demo animation
function animateChat() {
    const messages = document.querySelectorAll('.chat-message');
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, 100);
        }, index * 800);
    });
}

// Trigger chat animation when features section is visible
const featuresSection = document.querySelector('.features');
const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateChat, 500);
            featuresObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (featuresSection) {
    featuresObserver.observe(featuresSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    // Отключаем параллакс на мобильных
    if (hero && window.innerWidth > 900) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    } else if (hero) {
        hero.style.transform = 'none';
    }
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        // Track button click (you can add analytics here)
        console.log('CTA button clicked:', this.textContent.trim());
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for pricing items
const pricingItems = document.querySelectorAll('.pricing-item');
pricingItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 200);
});

// Add floating animation to hero elements
function addFloatingAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.animation = 'float 6s ease-in-out infinite';
        heroImage.style.animation = 'float 6s ease-in-out infinite reverse';
    }
}

// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .loaded .hero-content,
    .loaded .hero-image {
        animation: float 6s ease-in-out infinite;
    }
    
    .loaded .hero-image {
        animation-direction: reverse;
    }
`;
document.head.appendChild(style);

// Initialize floating animation
setTimeout(addFloatingAnimation, 1000);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add counter animation for testimonials
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when testimonials section is visible
const testimonialsSection = document.querySelector('.testimonials');
const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            testimonialsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (testimonialsSection) {
    testimonialsObserver.observe(testimonialsSection);
} 

// Карусель фотографий
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    const container = document.querySelector('.carousel-container');
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Автоматическое переключение карусели
function autoSlide() {
    changeSlide(1);
}

// Запускаем автопереключение каждые 6 секунд
let slideInterval = setInterval(autoSlide, 6000);

// Останавливаем автопереключение при наведении мыши
const carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 6000);
    });
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
}); 

// FAQ аккордеон на странице поддержки
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
}); 

// --- Интеграция с Telegram Web Apps API ---
window.addEventListener('DOMContentLoaded', function() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready(); // Сообщаем Telegram, что WebApp готов

        // Получаем данные пользователя
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            const user = tg.initDataUnsafe.user;
            console.log('Telegram user_id:', user.id);
            console.log('Имя:', user.first_name, 'Фамилия:', user.last_name, 'Username:', user.username);
            // Если есть элемент для приветствия — выводим имя
            const greet = document.getElementById('greeting');
            if (greet) {
                greet.textContent = `Привет, ${user.first_name || 'друг'}!`;
            }
        } else {
            console.log('Нет данных пользователя Telegram (Mini App не через Telegram?)');
        }
    } else {
        console.log('Telegram WebApp API недоступен');
    }
}); 