document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
      let insideDropdown = event.target.closest('.cvt-dropdown-menu');
      if (insideDropdown && insideDropdown.getAttribute('data-cvt-auto-close') === 'false') {
        return;
      }
  
      if (!event.target.matches('.cvt-dropdown-toggle')) {
        document.querySelectorAll('.cvt-dropdown-menu.show').forEach(function(menu) {
          menu.classList.remove('show');
        });
      }
    });
  
    document.querySelectorAll('.cvt-dropdown-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(event) {
        let currentMenu = toggle.nextElementSibling;
        let isShown = currentMenu.classList.contains('show');
        document.querySelectorAll('.cvt-dropdown-menu.show').forEach(function(menu) {
          menu.classList.remove('show');
        });
        if (!isShown) {
          currentMenu.classList.add('show');
        }
        event.preventDefault();
      });
    });
  });
  