
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