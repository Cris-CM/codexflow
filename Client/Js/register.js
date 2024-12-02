document.addEventListener('DOMContentLoaded', function() {
    const robot = document.querySelector('.robot');
    const eyes = document.querySelectorAll('.pupil');
    const passwordInput = document.getElementById('password');
    const form = document.getElementById('registration-form');

    // Eye tracking with faster movement
    document.addEventListener('mousemove', function(e) {
        if (!robot.classList.contains('covering-eyes')) {
            eyes.forEach(eye => {
                const rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + (rect.width / 2);
                const eyeCenterY = rect.top + (rect.height / 2);
                
                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 15);
                
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                eye.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    });

    // Blinking animation
    function blink() {
        if (!robot.classList.contains('covering-eyes')) {
            robot.classList.add('covering-eyes');
            setTimeout(() => {
                robot.classList.remove('covering-eyes');
            }, 150);
        }
    }

    // Blink randomly
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance to blink every 5 seconds
            blink();
        }
    }, 5000);

    // Password field focus/blur handling
    passwordInput.addEventListener('focus', function() {
        robot.classList.add('covering-eyes');
    });

    passwordInput.addEventListener('blur', function() {
        if (!passwordInput.value) {
            robot.classList.remove('covering-eyes');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate happy animation
        robot.classList.remove('covering-eyes');
        robot.style.transform = 'scale(1.1)';
        setTimeout(() => {
            robot.style.transform = 'scale(1)';
        }, 500);

        // Add your registration logic here
        console.log('Registration attempted');
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = this.value.length;
        let color = '';
        if (strength < 6) {
            color = '#ef4444';
        } else if (strength < 10) {
            color = '#40c4ff';
        } else {
            color = '#22c55e';
        }
        this.style.borderColor = color;
    });
});

