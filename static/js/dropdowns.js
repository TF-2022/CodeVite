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
    } else { // Si le clic est sur un toggle, gérer l'affichage du menu
      let currentMenu = event.target.nextElementSibling;
      let isShown = currentMenu.classList.contains('show');
      document.querySelectorAll('.cvt-dropdown-menu.show').forEach(function(menu) {
        menu.classList.remove('show');
      });
      if (!isShown) {
        currentMenu.classList.add('show');
      }
      event.preventDefault(); // Prévenir le comportement par défaut du navigateur
    }
  });

  // Ajout d'un écouteur pour chaque élément du menu déroulant
  document.querySelectorAll('.cvt-dropdown-item').forEach(function(item) {
    item.addEventListener('click', function() {
      // Récupérer la valeur ou le texte de l'élément cliqué
      let value = this.getAttribute('data-value') || this.innerText;
      // Mettre à jour le texte du bouton toggle correspondant
      let toggleButton = this.closest('.cvt-dropdown').querySelector('.cvt-dropdown-toggle');
      if (toggleButton) {
        toggleButton.innerText = value;
      }
      // Fermer le menu déroulant
      this.closest('.cvt-dropdown-menu').classList.remove('show');
    });
  });
});
