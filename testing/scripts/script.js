let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle');
    const swayAmount = 20; // Adjust this value for more or less sway

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    circles.forEach(circle => {
        const offsetX = (Math.random() - 0.5) * swayAmount + deltaX * 0.1;
        const offsetY = (Math.random() - 0.5) * swayAmount + deltaY * 0.1;

        circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        circle.style.transform = `translate(0, 0)`;
    });
});