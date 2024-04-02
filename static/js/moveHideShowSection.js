document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cvt-dropdown-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const action = this.getAttribute('data-action');
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);

            if (action === 'move') {
                const sectionsContainerId = targetSection.closest('[id^="sectionsContainer"]').id;
                const sectionsContainer = document.getElementById(sectionsContainerId);
                sectionsContainer.prepend(targetSection);
            } else {
                switch (action) {
                    case 'hide':
                        targetSection.style.display = 'none';
                        break;
                    case 'show':
                        targetSection.style.display = 'block';
                        break;
                }
            }
        });
    });
});
