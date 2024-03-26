

document.addEventListener('DOMContentLoaded', function() {
    const tabGroups = document.querySelectorAll('[data-tab-group]');
    tabGroups.forEach(group => {
        initializeTabs(group);
    });

    function initializeTabs(group) {
        const groupName = group.getAttribute('data-tab-group');
        const tabs = group.querySelectorAll('input[type="radio"][data-tab-target]');
        tabs.forEach(tab => {
            tab.classList.add('cvt-check');
            tab.setAttribute('autocomplete', 'off');
            const tabId = tab.getAttribute('id');
            const label = group.querySelector(`label[for="${tabId}"]`);
            if (label) {
                label.classList.add('btn', 'cvt-tab-checked');
            }

            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab-target');
                toggleTabs(groupName, targetId);
                addCustomClassToTabContent(targetId);

            });
        });

        const selectedTab = localStorage.getItem(groupName);
        if (selectedTab) {
            group.querySelector(`input[data-tab-target="${selectedTab}"]`).click();
            addCustomClassToTabContent(selectedTab);

        } else if (tabs.length > 0) {
            tabs[0].click();
            addCustomClassToTabContent(tabs[0].getAttribute('data-tab-target'));

        }
    }

    function toggleTabs(groupName, targetId) {
        const allTabsContent = document.querySelectorAll(`[data-tab-content="${groupName}"]`);
        allTabsContent.forEach(content => {
            if (content.id === targetId) {
                content.style.display = '';
                content.classList.add('cvt-fade-in');
                content.addEventListener('animationend', () => content.classList.remove('cvt-fade-in'), { once: true });
            } else {
                content.style.display = 'none';
            }
        });
        localStorage.setItem(groupName, targetId);
    }
    

    function addCustomClassToTabContent(targetId) {
        const tabContent = document.getElementById(targetId);
        if (tabContent) {
            tabContent.classList.add('text-color');
        }
    }
});
