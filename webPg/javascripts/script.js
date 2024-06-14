document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to change navbar color on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 0) {
            nav.style.backgroundColor = '#000'; // Black background
            nav.style.color = '#fff'; // White text
        } else {
            nav.style.backgroundColor = 'rgba(248, 249, 250, 0.8)'; // Original background color
            nav.style.color = 'inherit'; // Original text color
        }
    });
});
