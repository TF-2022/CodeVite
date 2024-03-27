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


// number
class setupNumberInput {
  constructor(container) {
      this.container = container;
      this.interval = null;

      this.input = this.container.querySelector('.number-input');
      this.display = this.container.querySelector('.number-value-display');

      this.initializeDisplay();
      this.attachEventListeners();
  }

  initializeDisplay() {
      this.display.textContent = this.input.value;
  }

  startAdjustingFontSize(change) {
      this.adjustFontSize(change);
      this.interval = setInterval(() => this.adjustFontSize(change), 100);
  }

  stopAdjustingFontSize() {
      clearInterval(this.interval);
      this.resetIconAppearance();
  }

  adjustFontSize(change) {
      let newValue = parseInt(this.input.value) + change;
      newValue = Math.max(parseInt(this.input.min), newValue);
      newValue = Math.min(parseInt(this.input.max), newValue);

      this.input.value = newValue;
      this.display.textContent = newValue;

      this.updateIconAppearance(change);
  }

  updateIconAppearance(change) {
      if (change > 0) {
          this.container.querySelector('[data-change="1"]').classList.add('text-primary');
          this.container.querySelector('[data-change="-1"]').classList.remove('text-primary');
      } else {
          this.container.querySelector('[data-change="-1"]').classList.add('text-primary');
          this.container.querySelector('[data-change="1"]').classList.remove('text-primary');
      }
  }

  resetIconAppearance() {
      this.container.querySelectorAll('[data-change]').forEach(button => button.classList.remove('text-primary'));
  }

  attachEventListeners() {
      this.container.querySelectorAll('[data-change]').forEach(button => {
          const change = parseInt(button.getAttribute('data-change'));

          button.addEventListener('mousedown', () => this.startAdjustingFontSize(change));
          document.addEventListener('mouseup', () => this.stopAdjustingFontSize());
      });
  }
}

document.querySelectorAll('.number-input-container').forEach(container => { new setupNumberInput(container);});
