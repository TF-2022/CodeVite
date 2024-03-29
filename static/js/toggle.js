document.addEventListener('DOMContentLoaded', function() {
    const toggleGroups = document.querySelectorAll('[data-toggle-group]');
    toggleGroups.forEach(group => {
        initializeToggles(group);
    });

    function initializeToggles(group) {
        const toggles = group.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => {
            const toggleType = toggle.getAttribute('data-toggle-type');
            const toggleValuesAttribute = toggle.getAttribute('data-toggle-values');
            
            // Vérifier si l'attribut data-toggle-values est défini
            if (toggleValuesAttribute) {
                const toggleValues = toggleValuesAttribute.split(',');
                const toggleTargetId = toggle.getAttribute('data-toggle-target');
                const toggleTarget = document.getElementById(toggleTargetId);
    
                toggle.addEventListener('change', () => {
                    updateToggleContent(toggle, toggleType, toggleValues, toggleTarget);
                    saveToggleState(group, toggle);
                });
    
                restoreToggleState(group, toggle, toggleType, toggleValues, toggleTarget);
            } else {
                // Gérer le cas où l'attribut data-toggle-values n'est pas défini
                console.error('Attribute data-toggle-values is not defined for toggle:', toggle);
            }
        });
    }
    

    function updateToggleContent(toggle, type, values, target) {
        if (type === 'text') {
            target.textContent = toggle.checked ? values[0] : values[1];
        } else if (type === 'icon') {
            target.innerHTML = `<i class="${toggle.checked ? values[0] : values[1]} mx-2"></i>`;
        } else if (type === 'icon-text') {
            let valueParts = (toggle.checked ? values[0] : values[1]).split(' ');
            target.innerHTML = `<i class="${valueParts[0]} mx-2"></i> ${valueParts[1]}`;
        }
        if (!toggle.checked) {
            target.parentElement.style.opacity = 0.5;
        } else {
            target.parentElement.style.opacity = 1;
        }
    }

    function saveToggleState(group, toggle) {
        const groupName = group.getAttribute('data-toggle-group');
        const state = toggle.checked ? 'checked' : 'unchecked';
        localStorage.setItem(groupName + ':' + toggle.getAttribute('id'), state);
    }

    function restoreToggleState(group, toggle, type, values, target) {
        const groupName = group.getAttribute('data-toggle-group');
        const savedState = localStorage.getItem(groupName + ':' + toggle.getAttribute('id'));
        if (savedState) {
            toggle.checked = (savedState === 'checked');
            updateToggleContent(toggle, type, values, target);
        }
    }
});