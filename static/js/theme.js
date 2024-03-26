
function cvtChangeTheme() {
    let theme = localStorage.getItem('theme');
    theme = (theme === 'dark-theme') ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
}

function applyTheme(theme) {
    document.body.className = theme;

    const toggleBtn = document.getElementById('cvtThemeToggle');

    if (theme === 'dark-theme') {
        toggleBtn.innerHTML = '<i class="bi bi-moon-stars fs-5 text-white"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="bi bi-sun-fill fs-5 text-warning"></i>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    applyTheme(savedTheme);
    document.getElementById('cvtThemeToggle').addEventListener('click', cvtChangeTheme);
});