document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cvt-accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            const accordion = this.closest('.cvt-accordion');
            const multipleOpen = accordion.getAttribute('data-multiple-open') === 'true';
            const content = document.querySelector(this.getAttribute('data-cvt-target'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            if (!multipleOpen && !isExpanded) {
                const allContentPanels = accordion.querySelectorAll('.cvt-accordion-collapse');
                const allButtons = accordion.querySelectorAll('.cvt-accordion-button');

                allContentPanels.forEach(panel => {
                    if (panel !== content) {
                        panel.style.height = '0';
                    }
                });

                allButtons.forEach(btn => {
                    if (btn !== this) {
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            if (isExpanded) {
                content.style.height = '0';
                this.setAttribute('aria-expanded', 'false');
            } else {
                content.style.height = content.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
