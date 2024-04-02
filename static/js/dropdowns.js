document.addEventListener('DOMContentLoaded', function () {

  function closeAllDropdowns() {
    document.querySelectorAll('.cvt-dropdown-menu.show').forEach(function (menu) {
      menu.classList.remove('show');
    });
  }

  function addDropdownHeaders() {
    document.querySelectorAll('.cvt-dropdown-menu').forEach(function (menu) {
      const headerText = menu.getAttribute('data-header');
      if (headerText) {
        const header = document.createElement('h6');
        header.classList.add('dropdown-cvt-header');
        header.textContent = headerText;

        const divider = document.createElement('div');
        divider.classList.add('dropdown-cvt-divider');

        menu.insertBefore(divider, menu.firstChild);
        menu.insertBefore(header, divider);
      }
    });
  }

  document.addEventListener('click', function (event) {
    let insideDropdown = event.target.closest('.cvt-dropdown-menu');
    if (insideDropdown && insideDropdown.getAttribute('data-cvt-auto-close') === 'false') {
      return;
    }

    if (!event.target.matches('.cvt-dropdown-toggle')) {
      closeAllDropdowns();
    } else {
      let currentMenu = event.target.nextElementSibling;
      let isShown = currentMenu.classList.contains('show');
      closeAllDropdowns();
      if (!isShown) {
        currentMenu.classList.add('show');
      }
      event.preventDefault();
    }
  });

  document.querySelectorAll('.cvt-dropdown-item').forEach(function (item) {
    item.addEventListener('click', function (event) {
      let dropdownMenu = this.closest('.cvt-dropdown-menu');
      if (dropdownMenu && dropdownMenu.getAttribute('data-cvt-auto-close') === 'true') {
        dropdownMenu.classList.remove('show');
      }
    });
  });

  document.querySelectorAll('.cvt-dropdown').forEach(function (dropdown) {
    if (dropdown.getAttribute('data-hover-toggle') === 'true') {
      let toggleButton = dropdown.querySelector('.cvt-dropdown-toggle');
      let menu = dropdown.querySelector('.cvt-dropdown-menu');

      toggleButton.addEventListener('mouseenter', function () {
        closeAllDropdowns();
        menu.classList.add('show');
      });

      dropdown.addEventListener('mouseleave', function () {
        menu.classList.remove('show');
      });
    }
  });

  addDropdownHeaders();
});
