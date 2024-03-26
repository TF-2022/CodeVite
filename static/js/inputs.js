document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.cvt-form-group input');

    const toggleLabelClass = (input) => {
      const label = input.nextElementSibling;
      if (input.value !== '') {
        label.classList.add('cvt-label-active');
      } else {
        label.classList.remove('cvt-label-active');
      }
    };

    inputs.forEach(input => {
      toggleLabelClass(input);
      input.addEventListener('input', () => toggleLabelClass(input));
    });
  });