class CvtCollapse {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('[data-cvt-toggle="collapse"]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.getAttribute('data-cvt-target');
                const targetEl = document.querySelector(targetId);
                this.toggleCollapse(targetEl, trigger);
            });
        });
    }

    toggleCollapse(targetEl, trigger) {
        if (targetEl.classList.contains('cvt-show')) {
            this.closeCollapse(targetEl, trigger);
        } else {
            this.openCollapse(targetEl, trigger);
        }
    }

    openCollapse(targetEl, trigger) {
        const chevronIcon = trigger.querySelector('.cvt-chevron');
        const height = targetEl.scrollHeight;
        targetEl.classList.add('cvt-show');
        targetEl.style.height = '0';
        targetEl.offsetHeight;
        targetEl.style.height = `${height}px`;
        chevronIcon.classList.add('rotated');
        trigger.classList.add('cvt-collapse-active');
    }

    closeCollapse(targetEl, trigger) {
        const chevronIcon = trigger.querySelector('.cvt-chevron');
        targetEl.style.height = `${targetEl.scrollHeight}px`;
        targetEl.offsetHeight;
        targetEl.style.height = '0';
        targetEl.classList.remove('cvt-show');
        chevronIcon.classList.remove('rotated');
        trigger.classList.remove('cvt-collapse-active');
    }
}

new CvtCollapse();