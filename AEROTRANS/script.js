// script.js - AeroTrans Logistics - Enhanced with human-like touches

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚚 AeroTrans Logistics - Ready to deliver!');
    
    // Mobile menu with natural easing
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            // Natural rotation animation
            if (navMenu.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.style.transform = 'rotate(0deg)';
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Add slight bounce effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Close mobile menu when clicking outside - with natural delay
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-menu-btn')) {
            
            // Fade out animation
            navMenu.style.opacity = '0.8';
            setTimeout(() => {
                navMenu.classList.remove('active');
                navMenu.style.opacity = '1';
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }, 200);
        }
    });
    
    // Form submission 
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            
            setTimeout(() => {
                // Simple form validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const service = document.getElementById('service').value;
                
                if (!name || !email || !phone || !service) {
                    // Shake animation for empty fields
                    const emptyFields = [];
                    if (!name) emptyFields.push('name');
                    if (!email) emptyFields.push('email');
                    if (!phone) emptyFields.push('phone');
                    if (!service) emptyFields.push('service');
                    
                    emptyFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        field.style.animation = 'shake 0.5s';
                        field.style.borderColor = 'var(--danger)';
                        setTimeout(() => {
                            field.style.animation = '';
                        }, 500);
                    });
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Error message
                    alert('📝 Oops! Please fill in the highlighted fields. We need those details to give you an accurate quote.');
                    return;
                }
                
                // Success message with emoji
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = 'var(--success)';
                
                // Show confirmation message 
                const confirmationDiv = document.createElement('div');
                confirmationDiv.className = 'handwritten-note';
                confirmationDiv.innerHTML = `
                    <strong>✓ Got it!</strong><br>
                    Thanks ${name.split(' ')[0]}! We'll email you a quote within 24 hours.<br>
                    <small>Check your inbox (and spam folder just in case).</small>
                `;
                quoteForm.parentNode.insertBefore(confirmationDiv, quoteForm.nextSibling);
                
                // Reset form after delay
                setTimeout(() => {
                    quoteForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    // Remove confirmation after 5 seconds
                    setTimeout(() => {
                        confirmationDiv.style.opacity = '0';
                        confirmationDiv.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            confirmationDiv.remove();
                        }, 300);
                    }, 5000);
                }, 2000);
                
            }, 1500); // Simulate processing time
        });
    }
    
    // Animate stats counter with easing
    const statNumbers = document.querySelectorAll('.stat-item h3');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.textContent.replace('+', ''));
                    let current = 0;
                    const duration = 2000; // ms
                    const increment = target / (duration / 30);
                    const startTime = Date.now();
                    
                    const updateCounter = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function for natural feel
                        const easeOutQuad = t => t * (2 - t);
                        current = target * easeOutQuad(progress);
                        
                        if (progress < 1) {
                            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(stat);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset based on header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Add focus to form field if it's a form link
                if (targetId.includes('quote')) {
                    setTimeout(() => {
                        const firstInput = document.querySelector('#quote-form input, #quote-form select');
                        if (firstInput) {
                            firstInput.focus();
                            firstInput.style.boxShadow = '0 0 0 3px rgba(74, 123, 201, 0.3)';
                            setTimeout(() => {
                                firstInput.style.boxShadow = '';
                            }, 1000);
                        }
                    }, 500);
                }
            }
        });
    });
    
    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to service tags
    document.querySelectorAll('.service-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) rotate(1deg)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
});