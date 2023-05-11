const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.backgroundColor = '#3c3c3c';
        link.style.transition = 'background-color 0.2s ease';
    });

    link.addEventListener('mouseout', () => {
        link.style.backgroundColor = '#383838';
        link.style.transition = 'background-color 0.2s ease';
    });
});
