document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.cvt-nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const currentPath = window.location.hash;

    function updateActiveIndicator() {
        navItems.forEach(item => {
            const existingIndicator = item.querySelector('.border-active');
            if (existingIndicator) {
                existingIndicator.remove();
            }

            if (item.classList.contains('active')) {
                const indicator = document.createElement('div');
                indicator.className = 'border-active';
                item.appendChild(indicator);
                item.style.backgroundColor = 'var(--background-color)';
            } else {
                item.style.backgroundColor = '';
            }
        });
    }

    contentSections.forEach(section => section.style.display = 'none');

    if (currentPath) {
        const activeContent = document.querySelector(currentPath);
        if (activeContent) {
            activeContent.style.display = 'block';
        } else {
            console.error('Element not found for contentId:', currentPath);
        }
    } else {
        document.getElementById('content-generator').style.display = 'block';
    }

    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    updateActiveIndicator(); 

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            contentSections.forEach(section => section.style.display = 'none');

            const contentId = item.getAttribute('href');
            const activeContent = document.querySelector(contentId);
            if (activeContent) {
                activeContent.style.display = 'block';
            } else {
                console.error('Element not found for contentId:', contentId);
            }

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            window.location.hash = contentId;
            updateActiveIndicator(); 
        });
    });
});
