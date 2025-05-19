document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter');
    const professions = ['Web Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver'];
    let i = 0;
    let j = 0;
    let currentProfession = '';
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        isEnd = false;
        typewriterElement.textContent = currentProfession;
        
        if (i < professions.length) {
            if (!isDeleting && j <= professions[i].length) {
                currentProfession = professions[i].substr(0, j++);
                typewriterElement.textContent = currentProfession;
            }
            
            if (isDeleting && j >= 0) {
                currentProfession = professions[i].substr(0, j--);
                typewriterElement.textContent = currentProfession;
            }
            
            if (j == professions[i].length) {
                isEnd = true;
                isDeleting = true;
            }
            
            if (isDeleting && j === 0) {
                isDeleting = false;
                i++;
                if (i == professions.length) i = 0;
            }
        }
        
        const speed = isEnd ? 2000 : isDeleting ? 50 : 150;
        setTimeout(typeWriter, speed);
    }
    
    setTimeout(typeWriter, 1000);
    
    // Tab System
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percent = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = percent;
            }, 100);
        });
    }
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.creative-header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Button Hover Effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('main-button')) {
                this.style.transform = 'translateX(10px)';
            } else {
                this.style.transform = 'translateX(-10px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('creative-skills')) {
                    animateSkillBars();
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});