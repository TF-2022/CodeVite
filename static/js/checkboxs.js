
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.checkbox-cvt').forEach(function (label) {
    if (!label.querySelector('.checkmark-cvt')) {
      const checkmarkSpan = document.createElement('span');
      checkmarkSpan.className = 'checkmark-cvt';
      label.appendChild(checkmarkSpan);
    }
  });

  document.querySelectorAll('.radio-cvt').forEach(function (label) {
    if (!label.querySelector('.radiomark-cvt')) {
      const radiomarkSpan = document.createElement('span');
      radiomarkSpan.className = 'radiomark-cvt';
      label.appendChild(radiomarkSpan);
    }
  });
});


// checkboxes collapse
document.addEventListener("DOMContentLoaded", function() {
  var searchRelatedCheckboxes = document.querySelectorAll('input[type="checkbox"][data-cvt-checkbox-collapse]');
  searchRelatedCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      var targetId = checkbox.getAttribute("data-cvt-checkbox-collapse");
      var inputGroup = document.querySelector(`div[data-cvt-checkbox-group="${targetId}"]`);
      if (inputGroup) {
        inputGroup.style.display = checkbox.checked ? "" : "none";
        if (!checkbox.checked) {
          var searchInput = inputGroup.querySelector('input[type="search"]');
          if (searchInput) {
            searchInput.value = "";
          }
        }
      } else {
        console.warn(`No element found for div[data-cvt-checkbox-group="${targetId}"]`);
      }
    });
  });

  document.querySelectorAll('div[data-cvt-checkbox-group][data-cvt-checkbox-multiple="false"] input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
        let group = checkbox.closest('div[data-cvt-checkbox-group]');
        group.querySelectorAll('input[type="checkbox"]').forEach(function(innerCheckbox) {
          if (innerCheckbox !== checkbox) {
            innerCheckbox.checked = false;
          }
        });
      }
    });
  });

  var mainCheckboxes = document.querySelectorAll('input[type="checkbox"][data-cvt-checkbox-check-collapse], input[type="checkbox"][data-cvt-checkbox-collapse="checkbox"]');
  mainCheckboxes.forEach(function(mainCheckbox) {
    mainCheckbox.addEventListener("change", function() {
      var groupValue = mainCheckbox.getAttribute('data-cvt-checkbox-check-collapse') || mainCheckbox.getAttribute('data-cvt-checkbox-collapse');
      var childCheckboxesContainer = document.querySelector(`div[data-cvt-checkbox-group="${groupValue}"]`);
      var isMultiple = childCheckboxesContainer.getAttribute('data-cvt-checkbox-multiple') === 'true';
      if (childCheckboxesContainer) {
        childCheckboxesContainer.style.display = mainCheckbox.checked ? "" : "none";
        if (!mainCheckbox.checked || !isMultiple) {
          childCheckboxesContainer.querySelectorAll('input[type="checkbox"]').forEach(function(childCheckbox) {
            if (!isMultiple) childCheckbox.checked = false;
          });
        }
      }
    });
  });
});



