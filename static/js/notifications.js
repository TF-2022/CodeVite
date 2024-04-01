document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cvt-alert').forEach(alertElement => {
        const closeData = alertElement.getAttribute('data-notification-close');
        if (closeData === 'true') {
            const closeButton = document.createElement('span');
            closeButton.classList.add('cvt-close', 'btn', 'btn-close', 'bg-light');
            closeButton.textContent = '×';
            closeButton.addEventListener('click', (event) => {
                alertElement.classList.add('hide');
                alertElement.addEventListener('transitionend', () => {
                    alertElement.remove();
                });
            });
            alertElement.appendChild(closeButton);
        }
    });
});