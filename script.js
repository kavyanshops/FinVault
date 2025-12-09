// Theme Toggle Function
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        html.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDarkTheme = html.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
            themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initThemeToggle);

// 0. Check login status 
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const profileMenu = document.getElementById('profileMenu');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (currentUser) {
        if (profileMenu) profileMenu.style.display = 'block';
        if (getStartedBtn) getStartedBtn.style.display = 'none';
        
        const initials = currentUser.email.split('@')[0].charAt(0).toUpperCase();
        const profileAvatarSmall = document.getElementById('profileAvatarSmall');
        const dropdownEmail = document.getElementById('dropdownEmail');
        
        if (profileAvatarSmall) profileAvatarSmall.textContent = initials;
        if (dropdownEmail) dropdownEmail.textContent = currentUser.email;
        
        if (profileToggle) {
            profileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                if (profileDropdown) {
                    profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
        
        document.addEventListener('click', function() {
            if (profileDropdown) profileDropdown.style.display = 'none';
        });
    } else {
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
