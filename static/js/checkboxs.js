
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

  
// radio collapse
document.addEventListener("DOMContentLoaded", function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"][data-cvt-checkbox-collapse]');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      var targetId = checkbox.getAttribute("data-cvt-checkbox-collapse");
      var inputGroup = document.querySelector(`div[data-cvt-input-group="${targetId}"]`);
      
      if (checkbox.checked) {
        inputGroup.style.display = "";
      } else {
        inputGroup.style.display = "none";
        var searchInput = inputGroup.querySelector('input[type="search"]');
        if (searchInput) {
          searchInput.value = "";
        }
      }
    });
  });
});
