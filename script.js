// FinVault - Basic JavaScript Functionality

// 0. Check login status and update navbar
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const profileMenu = document.getElementById('profileMenu');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (currentUser) {
        // User is logged in
        if (profileMenu) profileMenu.style.display = 'block';
        if (getStartedBtn) getStartedBtn.style.display = 'none';
        
        // Update profile avatar and dropdown
        const initials = currentUser.email.split('@')[0].charAt(0).toUpperCase();
        const profileAvatarSmall = document.getElementById('profileAvatarSmall');
        const dropdownEmail = document.getElementById('dropdownEmail');
        
        if (profileAvatarSmall) profileAvatarSmall.textContent = initials;
        if (dropdownEmail) dropdownEmail.textContent = currentUser.email;
        
        // Toggle profile dropdown
        if (profileToggle) {
            profileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                if (profileDropdown) {
                    profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (profileDropdown) profileDropdown.style.display = 'none';
        });
    } else {
        // User is not logged in
        if (profileMenu) profileMenu.style.display = 'none';
        if (getStartedBtn) getStartedBtn.style.display = 'block';
    }
});

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberEmail');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// 3. Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// 4. Form handling for contact page
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll reply within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// 5. Button click effects and navigation
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Check if button is "Get Started" or "Start Investing"
        const buttonText = this.textContent.toLowerCase();
        if (buttonText.includes('get started') || buttonText.includes('start investing') || buttonText.includes('open free account')) {
            e.preventDefault();
            // Navigate to login page
            window.location.href = 'login.html';
            return;
        }

        // Create ripple effect for other buttons
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
});
// 6. Console greeting
console.log('%cWelcome to FinVault! 🚀', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%cBuilding a smarter investment platform', 'color: #667eea; font-size: 14px;');
