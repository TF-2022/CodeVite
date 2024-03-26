
function updateLayout() {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    const sidebar = document.querySelector('.sidebar-fixed');
    const mainContent = document.querySelector('.main-content-cvt');

    if (isCollapsed) {
        sidebar.classList.add('sidebar-collapsed');
        mainContent.classList.remove('expanded');
        mainContent.classList.add('collapsed');
    } else {
        sidebar.classList.remove('sidebar-collapsed');
        mainContent.classList.remove('collapsed');
        mainContent.classList.add('expanded');
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-fixed');
    const isCurrentlyCollapsed = sidebar.classList.contains('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', !isCurrentlyCollapsed);
    updateLayout();
}

updateLayout();

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('sidebarToggle');
    toggleBtn.addEventListener('click', toggleSidebar);
});
