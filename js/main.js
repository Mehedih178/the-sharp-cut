document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const bookingForm = document.getElementById('bookingForm');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Swiper
    const swiper = new Swiper('.portfolio .swiper', {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.nav-next',
            prevEl: '.nav-prev',
        }
    });

    // Add hover pause functionality
    const swiperContainer = document.querySelector('.portfolio .swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    }

    // Booking Modal
    const bookingModal = document.getElementById('bookingModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const bookingButtons = document.querySelectorAll('a[href="#booking"]');
    const closeButtons = document.querySelectorAll('.close-modal');
    const okButton = document.querySelector('.ok-btn');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Function to toggle body scroll
    const toggleBodyScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    // Open booking modal
    bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.style.display = 'block';
            toggleBodyScroll(true);
        });
    });

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            bookingModal.style.display = 'none';
            confirmationModal.style.display = 'none';
            toggleBodyScroll(false);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            toggleBodyScroll(false);
        }
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            toggleBodyScroll(false);
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const warningMessage = 'REMINDER: This is a demo website. No actual appointment will be booked. Continue?';
            if (!confirm(warningMessage)) {
                return;
            }

            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').options[document.getElementById('service').selectedIndex].text,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                notes: document.getElementById('notes').value
            };

            // Display confirmation
            const confirmationDetails = document.getElementById('confirmationDetails');
            confirmationDetails.innerHTML = `
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Service:</strong> ${formData.service}</p>
                <p><strong>Date:</strong> ${formData.date}</p>
                <p><strong>Time:</strong> ${formData.time}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                ${formData.notes ? `<p><strong>Notes:</strong> ${formData.notes}</p>` : ''}
            `;

            // Hide booking modal and show confirmation
            bookingModal.style.display = 'none';
            confirmationModal.style.display = 'block';

            // Reset form
            bookingForm.reset();
        });
    }

    // Handle OK button in confirmation modal
    if (okButton) {
        okButton.addEventListener('click', () => {
            confirmationModal.style.display = 'none';
            toggleBodyScroll(false);
        });
    }

    // Add warning when entering personal information
    const personalInputs = document.querySelectorAll('input[type="email"], input[type="tel"]');
    personalInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!this.dataset.warningShown) {
                alert('Reminder: This is a demo site. Please do not enter real personal information.');
                this.dataset.warningShown = 'true';
            }
        });
    });

    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (
            // F12
            e.key === 'F12' ||
            // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            (e.ctrlKey && 
             (e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
             e.key === 'u'
            )
        ) {
            e.preventDefault();
        }
    });

    // Disable viewing source
    document.onkeypress = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    }

    // Disable developer tools
    document.onmousedown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            return false;
        }
    }

    // Additional security for developer tools
    window.addEventListener('devtoolschange', function (e) {
        if (e.detail.open) {
            document.body.innerHTML = 'Developer tools are not allowed on this site.';
        }
    });

    // Disable text selection
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // Disable copy
    document.addEventListener('copy', (e) => e.preventDefault());

    // Disable cut
    document.addEventListener('cut', (e) => e.preventDefault());

    // Disable paste
    document.addEventListener('paste', (e) => e.preventDefault());
}); 