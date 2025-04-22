const filterButtons = document.querySelectorAll('.filterContainer');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isActive = button.classList.contains('active');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        !isActive ? button.classList.add('active') : button.classList.remove('active');
    });
})