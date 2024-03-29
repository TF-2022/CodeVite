let notificationsEnabled = true;


function showNotification(message, messageType) {
    if (!notificationsEnabled) return;
    document.querySelectorAll('.notification').forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${messageType}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function () {
    const editor = ace.edit("editor");
    editor.session.setMode("ace/mode/html");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        useSoftTabs: true,
    });

    document.querySelectorAll('[data-type]').forEach(el => {
        el.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const element = createElement(type, this.className, this.innerText);
            if (element) {
                const newCode = element.generateCode();
                updateEditorCode(editor, newCode);
            }
        });
    });

    document.getElementById('resetEditor').addEventListener('click', function () {
        editor.setValue('');
    });

    document.getElementById('copyButton').addEventListener('click', copyToClipboard);

    editor.session.on('change', function () {
        displayGeneratedContent();
    });
});

function displayGeneratedContent() {
    var editorContent = ace.edit("editor").getValue();
    var displayContainer = document.getElementById('previewCodeResult');
    displayContainer.innerHTML = editorContent;
    activateCustomComponents();
}


function copyToClipboard() {
    const code = ace.edit("editor").getValue();
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copié !', 'info');
    }, (err) => {
        console.error('Erreur lors de la copie:', err);
        showNotification('Erreur lors de la copie du code.', 'error');
    });
}

// Classe de base pour les éléments
class BaseElement {
    constructor(type, className, content) {
        this.type = type;
        this.className = className;
        this.content = content;
        this.uniqueId = Math.random().toString(36).substr(2, 9);
    }

    generateCode() {
        return '';
    }
}

// Classes create éléments 
class ButtonBoostrapElement extends BaseElement {
    constructor(content) {
        super();
        this.content = content;
    }

    generateCode() {
        const isButtonBootstrapChecked = document.getElementById('checkbox-b8zonwxpi')?.checked ?? true;
        if (!isButtonBootstrapChecked) return '';

        const isOutlineChecked = document.getElementById('checkbox-nugwde2vb-2')?.checked ?? false;
        const baseClass = isOutlineChecked ? 'btn-outline-primary' : 'btn-primary';
        let buttonClasses = ['btn', baseClass];

        const sizeClass = document.getElementById('checkbox-52skcrpn6')?.checked ? (
            document.getElementById('checkbox-ryx3dh0q6')?.checked ? 'btn-sm' :
                document.getElementById('checkbox-iu8l4b6ui')?.checked ? 'btn-lg' :
                    ''
        ) : '';

        if (sizeClass) buttonClasses.push(sizeClass);

        const colorClass = document.querySelector('input[type="radio"][name="couleur"]:checked')?.value;
        if (colorClass && colorClass !== 'primary') {
            buttonClasses[1] = isOutlineChecked ? `btn-outline-${colorClass}` : `btn-${colorClass}`;
        }

        return `<button class="${buttonClasses.join(' ')}">${this.content}</button>`;
    }
}
class ButtonCvtElement extends BaseElement {
    generateCode() {
        const isOutlineChecked = document.getElementById('checkbox-pt711drxn')?.checked ?? false;
        let htmlCode = '';

        htmlCode += `<button class="btn custom-button cvt-relief cvt-warning" data-type="button">Relief</button>
        `;

        return htmlCode;
    }
}

class CollapseButtonElement extends BaseElement {
    constructor(content, className) {
        super();
        this.content = content;
        this.className = className;
    }

    generateCode() {
        const numberInputContainer = document.getElementById('number-input-ks835gbv9');
        const numberInput = numberInputContainer.querySelector('.number-input');
        const collapseCount = parseInt(numberInput.value, 10) || 1;

        let html = '';
        for (let i = 0; i < collapseCount; i++) {
            const collapseContentId = `collapseContent-${this.uniqueId}-${i}`;
            html += `
<button class="${this.className}" data-cvt-toggle="collapse" data-cvt-target="#${collapseContentId}" data-cvt-rotated="false">
    ${this.content} ${i + 1} <span class="cvt-chevron"></span>
</button>
<div class="cvt-collapse" id="${collapseContentId}">
    <div class="card card-body">
        Contenu caché ${i + 1}
    </div>
</div>
`;
        }

        return html;
    }
}

class TitleElement extends BaseElement {
    generateCode() {
        let elementType = 'h1';
        switch (this.type) {
            case 'title':
                elementType = 'h1';
                break;
            case 'subtitle':
                elementType = 'h2';
                break;
            case 'subsubtitle':
                elementType = 'h3';
                break;
            case 'subsubsubtitle':
                elementType = 'h4';
                break;
            case 'subsubsubsubtitle':
                elementType = 'h5';
                break;
            case 'subsubsubsubsubtitle':
                elementType = 'h6';
                break;
            case 'title-color':
                elementType = 'h3';
                break;
            default:
                elementType = 'h1';
        }

        return `<${elementType} id="${this.uniqueId}" class="${this.className}">${this.content}</${elementType}>`;
    }
}

class ModalElement extends BaseElement {
    generateCode() {
        const modalChecked = document.getElementById('checkbox-0cg1k960g') ? document.getElementById('checkbox-0cg1k960g').checked : true;
        const modalId = `modal-${this.uniqueId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
        const buttonId = `button-${this.uniqueId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
        const modalStyleConfigPanel = document.getElementById('checkbox-29pm1r3v8') ? document.getElementById('checkbox-29pm1r3v8').checked : true;
        const modalStyle = modalStyleConfigPanel ? 'style="height: 80%; width: 80%; max-height: 80%; max-width: 80%;"' : '';

        if (!modalChecked) {
            return '';
        }

        return `
<button id="${buttonId}" class="btn custom-button" data-toggle="cvt-modal" data-target="#${modalId}">
    Button
</button>
<div id="${modalId}" class="cvt-modal" tabindex="-1" aria-hidden="true">
  <div class="cvt-modal-content" ${modalStyle}>
    <div class="cvt-modal-header header-circle">
      <h5 class="cvt-title" id="${modalId}-label">${this.content}</h5>
      <span class="cvt-close btn btn-close bg-light"></span>
    </div>
    <div class="cvt-modal-body text-custom-cvt">
      <!-- Espace réservé pour le contenu -->
      Mettez votre contenu ici...
    </div>
  </div>
</div>`;
    }
}

class OffCanvasElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
    }

    generateCode() {
        const position = document.getElementById('offCanvasPosition').value;
        const validPositions = ['right', 'left', 'top', 'bottom'];
        if (!validPositions.includes(position)) {
            throw new Error(`Position "${position}" invalide. Les positions valides sont : ${validPositions.join(', ')}.`);
        }

        const offCanvasId = `offcanvas-${this.uniqueId}`;
        const buttonId = `button-${this.uniqueId}`;
        const positionClass = `cvt-offcanvas-${position}`;

        const buttonHtml = `<button id="${buttonId}" class="btn custom-button cvt-relief cvt-offcanvas-toggler" data-offcanvas-target="#${offCanvasId}">
  <i class="bi bi-gear"></i>
</button>`;

        const offCanvasHtml = `<div id="${offCanvasId}" class="cvt-offcanvas ${positionClass}">
  <div class="cvt-offcanvas-header">
    <span class="cvt-offcanvas-title">${this.content}</span>
    <a href="#" class="cvt-close-offcanvas btn-close bg-light"></a>
  </div>
  <div class="cvt-offcanvas-body">
    <!-- Le contenu spécifique à chaque off-canvas peut être ajouté ici -->
  </div>
</div>`;

        return `${buttonHtml}\n${offCanvasHtml}`;
    }
}

class DropdownElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
    }

    generateCode() {
        const dropdownId = `dropdown-${this.uniqueId}`;
        const menuId = `dropdown-menu-${this.uniqueId}`;

        const dropdownChecked = document.getElementById('checkbox-hac6jof2u') ? document.getElementById('checkbox-hac6jof2u').checked : true;
        const autoClose = document.getElementById('autoCloseCheckbox') ? document.getElementById('autoCloseCheckbox').checked : true;
        const autoCloseAttribute = autoClose ? 'true' : 'false';
        const dataValueIncluded = document.getElementById('checkbox-a2azhe3q5') ? document.getElementById('checkbox-a2azhe3q5').checked : false;
        const includeLinks = document.getElementById('includeDefaultLinksCheckbox') ? document.getElementById('includeDefaultLinksCheckbox').checked : false;
        const onClickElementIdIncluded = document.getElementById('checkbox-2pwh3ggjq') ? document.getElementById('checkbox-2pwh3ggjq').checked : false;
        const mobileMenu = document.getElementById('checkbox-4pnloidkd') ? document.getElementById('checkbox-4pnloidkd').checked : false;
        const hoverDropdown = document.getElementById('checkbox-w90qw29wz') ? document.getElementById('checkbox-w90qw29wz').checked : false;
        const linkNamesInputValue = document.getElementById('searchInputTable-gji6hjwaw') ? document.getElementById('searchInputTable-gji6hjwaw').value : '';
        const headerChecked = document.getElementById('checkbox-onr0orc8h') ? document.getElementById('checkbox-onr0orc8h').checked : true;
        const headerInputValue = document.getElementById('input-onr0orc8h') ? document.getElementById('input-onr0orc8h').value : 'Titre';

        if (!dropdownChecked) {
            return '';
        }
        const menuClass = mobileMenu ? " d-md-none" : "";
        let linksHtml = '';
        if (includeLinks) {
            let linkNames = linkNamesInputValue.split(',').map(name => name.trim()).filter(name => name !== '');
            if (linkNames.length === 0) {
                linkNames = ['Link_1', 'Link_2', 'Link_3'];
            }

            linksHtml = linkNames.map((linkName, index) => {
                const dataValueAttr = dataValueIncluded ? ` data-value="${linkName}"` : '';
                const targetElementId = `elementId${index + 1}`;
                const onClickAction = onClickElementIdIncluded ? ` onclick="document.getElementById('${targetElementId}').click(); return false;"` : '';
                return `    <a class="cvt-dropdown-item"${dataValueAttr}${onClickAction} href="#">${linkName}</a>\n`;
            }).join('');
        }
        const headerAttributeValue = (headerInputValue.trim() !== '' || !headerChecked) ? headerInputValue : "Titre";


        return `<div class="cvt-dropdown${menuClass}" id="${dropdownId}" data-hover-toggle="${hoverDropdown}">
  <button class="btn cvt-dropdown-toggle" type="button">${this.content}</button>
  <div class="cvt-dropdown-menu" id="${menuId}" data-cvt-auto-close="${autoCloseAttribute}" ${headerAttributeValue ? `data-header="${headerAttributeValue}"` : ''}>
${linksHtml}  </div>
</div>`;
    }
}

class SelectElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.selectChecked = document.getElementById('checkbox-1i27d8hr0') ? document.getElementById('checkbox-1i27d8hr0').checked : true;
        this.includedLabel = document.getElementById('checkbox-3mshoosxmt9') ? document.getElementById('checkbox-3mshoosxmt9').checked : true;
        this.includedPlaceHolder = document.getElementById('checkbox-ogqqa4w2u') ? document.getElementById('checkbox-ogqqa4w2u').checked : true;
        this.optionsDefault = document.getElementById('checkbox-e6ysu3392') ? document.getElementById('checkbox-e6ysu3392').checked : false;
        this.incluedInputSearch = document.getElementById('checkbox-bupcolb8o') ? document.getElementById('checkbox-bupcolb8o').checked : true;
        this.fisrtOptionSelected = document.getElementById('checkbox-a4w0qzvr0') ? document.getElementById('checkbox-a4w0qzvr0').checked : true;
        this.optionsInput = document.getElementById('input-top2szt9f') ? document.getElementById('input-top2szt9f').value : '';
        this.labelContent = document.getElementById('input-3mshoomt9') && document.getElementById('input-3mshoomt9').value.trim() !== '' ? document.getElementById('input-3mshoomt9').value.trim() : 'Label par défaut';
        this.placeholderContent = document.getElementById('input-q4dd3led2') && document.getElementById('input-q4dd3led2').value.trim() !== '' ? document.getElementById('input-q4dd3led2').value.trim() : 'Sélectionnez une option';
    }

    generateCode() {

        if (!this.selectChecked) {
            return '';
        }
        const selectId = `select-${this.uniqueId}`;
        let selectAttributes = `data-cvt-input-select="${this.incluedInputSearch ? 'true' : 'false'}"`;
        let placeholderOption = this.includedPlaceHolder && this.placeholderContent ?
            `        <option value="0" disabled selected>${this.placeholderContent}</option>\n` :
            `        <option disabled></option>\n`;

        let optionsHtml = this.generateOptions(!this.includedPlaceHolder);

        if (this.includedLabel) {
            selectAttributes += ` data-cvt-label-border="${this.labelContent}"`;
        }

        return `<!-- Start select ${selectId} -->\n<div class="cvt-select">\n    <select id="${selectId}" ${selectAttributes}>\n${placeholderOption}${optionsHtml}    </select>\n</div>\n<!-- End select ${selectId} -->`;
    }

    generateOptions(isFirstOptionSelected) {
        let optionsHtml = '';
        let isSelectedApplied = !isFirstOptionSelected;

        if (this.optionsDefault) {
            const optionValues = this.optionsInput.trim() ?
                this.optionsInput.split(/[\s,]+/).filter(name => name !== '') :
                ['Option_1', 'Option_2', 'Option_3'];

            optionValues.forEach((option, index) => {
                const selectedAttribute = isSelectedApplied ? '' : ' selected';
                optionsHtml += `        <option value="${index + 1}"${selectedAttribute}>${option}</option>\n`;
                isSelectedApplied = true;
            });
        }

        return optionsHtml;
    }
}

class AccordionsElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.accordionCountInput = document.getElementById('accordionCount');
        this.accordionCount = parseInt(this.accordionCountInput.value, 10) || 3;

        this.accordionCountInput.addEventListener('change', this.handleAccordionCountChange.bind(this));

        this.multipleOpenCheckbox = document.getElementById('multipleOpenAccordion');
        this.multipleOpenCheckbox.addEventListener('change', this.handleCheckboxChange.bind(this));
        this.multipleOpen = this.multipleOpenCheckbox.checked;
    }

    handleAccordionCountChange() {
        this.accordionCount = parseInt(this.accordionCountInput.value, 10) || 3;
    }

    handleCheckboxChange() {
        this.multipleOpen = this.multipleOpenCheckbox.checked;
    }

    generateCode() {
        const accordionId = `accordion-${this.uniqueId}`;
        const multipleOpenAttribute = this.multipleOpen ? 'true' : 'false';
        let accordionsHtml = `<div class="cvt-accordion" id="${accordionId}" data-multiple-open="${multipleOpenAttribute}">\n`;

        for (let i = 1; i <= this.accordionCount; i++) {
            accordionsHtml += `    <div class="cvt-accordion-item">\n`;
            accordionsHtml += `        <button class="cvt-accordion-button" aria-expanded="false" data-cvt-target="#${accordionId}-collapse${i}">\n`;
            accordionsHtml += `            Accordion Item ${i} <i class="bi bi-chevron-down cvt-accordion-chevron"></i>\n`;
            accordionsHtml += `        </button>\n`;
            accordionsHtml += `        <div id="${accordionId}-collapse${i}" class="cvt-accordion-collapse">\n`;
            accordionsHtml += `            <div class="cvt-accordion-body">\n`;
            accordionsHtml += `                This is the content of accordion ${i}.\n`;
            accordionsHtml += `            </div>\n`;
            accordionsHtml += `        </div>\n`;
            accordionsHtml += `    </div>\n`;
        }

        accordionsHtml += `</div>`;
        return accordionsHtml;
    }
}

class CardsElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.cardCountInput = document.getElementById('cardCount');
        this.showHeader = document.getElementById('checkbox-showHeader').checked;
        this.showTitle = document.getElementById('checkbox-showTitle').checked;
        this.showImage = document.getElementById('checkbox-showImage').checked;
        this.showBodyText = document.getElementById('checkbox-showBodyText').checked;
        this.showButton = document.getElementById('checkbox-showButton').checked;
        this.showFooter = document.getElementById('checkbox-showFooter').checked;
        this.showShadow = document.getElementById('checkbox-showShadow').checked;
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;

        this.cardCountInput.addEventListener('change', this.handleCardCountChange.bind(this));
    }

    handleCardCountChange() {
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;
    }

    generateCard(i) {
        const imageHtml = this.showImage ? `<img src="path/to/image" class="card-img-top" alt="Card image cap">` : '';
        const bodyTextHtml = this.showBodyText ? `<p class="card-text">Ajouter du contenu ici.</p>` : '';
        const buttonHtml = this.showButton ? `<a href="#" class="btn btn-primary">Go somewhere</a>` : '';
        const footerHtml = this.showFooter ? `<div class="card-footer">Footer ${i}</div>` : '';
        const cardStyle = this.showShadow ? 'style="box-shadow: var(--effet-ombre); border:none;"' : '';

        let headerHtml = '';
        let bodyTitleHtml = '';

        if (this.showHeader) {
            if (this.showTitle) {
                headerHtml = `<div class="card-header"><h5 class="card-title">Card title ${i}</h5></div>`;
            } else {
                headerHtml = `<div class="card-header"></div>`;
            }
        } else if (this.showTitle) {
            bodyTitleHtml = `<h5 class="card-title">Card title ${i}</h5>`;
        }

        return `
<div class="card" id="card-${this.uniqueId}-${i}" ${cardStyle}>
    ${headerHtml}
    ${imageHtml}
    <div class="card-body">
        ${bodyTitleHtml}
        ${bodyTextHtml}
        ${buttonHtml}
    </div>
    ${footerHtml}
</div>`;
    }

    generateCode() {
        let cardsHtml = '';
        for (let i = 1; i <= this.cardCount; i++) {
            cardsHtml += this.generateCard(i) + '\n\n';
        }
        return cardsHtml.trim();
    }
}

class InputElement extends BaseElement {
    generateCode() {
        const inputId = `input-${this.uniqueId}`;
        let htmlCode = '';

        htmlCode += `
<div class="cvt-form-group">
    <input type="search" id="${inputId}" autocomplete="off">
    <label for="${inputId}">Recherche...</label>
</div>`;

        return htmlCode;
    }
}

class NumberInputElement extends BaseElement {
    generateCode() {
        const numberInputContainerId = `number-input-${this.uniqueId}`;
        return `
<div class="number-input-container" id="${numberInputContainerId}" data-number-input-id="${numberInputContainerId}">
    <button type="button" class="btn custom-button cvt-relief" data-change="-1">
        <i class="bi bi-arrow-down-circle"></i>
    </button>
    <label><span class="number-value-display">10</span></label>
    <input type="number" class="number-input" min="1" max="20" value="10" style="display: none;">
    <button type="button" class="btn custom-button cvt-relief" data-change="1">
        <i class="bi bi-arrow-up-circle"></i>
    </button>
</div>
        `;
    }
}

class ToggleSwitchElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.groupId = `${this.uniqueId}`;
        this.switchId = `toggle-${this.uniqueId}`;
        this.contentId = `toggle-content-${this.uniqueId}`;
    }

    generateCode() {
        const checkboxIconChecked = document.getElementById('create-toggle-kc8q2l9j1-2')?.checked;
        const checkboxTextChecked = document.getElementById('create-toggle-kc8q2l9j1-3')?.checked;

        let toggleType = 'simple';
        let toggleValues = 'on,off';
        let contentDisplay = '';

        if (checkboxIconChecked && checkboxTextChecked) {
            toggleType = 'icon-text';
            toggleValues = 'bi-check-circle On,bi-x-circle Off';
            contentDisplay = '<i class="bi-x-circle mx-2"></i> Off';
        } else if (checkboxIconChecked) {
            toggleType = 'icon';
            toggleValues = 'bi-check-circle,bi-x-circle';
            contentDisplay = '<i class="bi-x-circle mx-2"></i>';
        } else if (checkboxTextChecked) {
            toggleType = 'text';
            toggleValues = 'On,Off';
            contentDisplay = 'Off';
        }

        let htmlCode = `
<div data-toggle-group="${this.groupId}">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${this.switchId}"
            data-toggle-type="${toggleType}"
            data-toggle-values="${toggleValues}" 
            data-toggle-target="${this.contentId}">
        <label class="form-check-label" for="${this.switchId}">Interrupteur ${toggleType}</label>
    </div>
    <span id="${this.contentId}">${contentDisplay}</span>
</div>`;

        return htmlCode;
    }
}

class CheckboxElement extends BaseElement {
    generateCode() {
        const checkboxCollapseInputChecked = document.getElementById('checkbox-m1jfililx')?.checked;
        const checkboxCollapseCheckboxChecked = document.getElementById('checkbox-2tpytaeyd')?.checked;
        const multipleOptionsChecked = document.getElementById('checkbox-check-5m12adjzu-1')?.checked ? "true" : "false";

        const uniqueId = `${this.uniqueId}`;
        const baseIdCheckbox = `checkbox-${uniqueId}`;
        const dataTargetInput = `input-${uniqueId}`;
        const dataTargetCheckbox = `checkbox-check-${uniqueId}`;

        let htmlCode = '';

        htmlCode += `<label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}" `;
        if (checkboxCollapseCheckboxChecked) {
            htmlCode += `data-cvt-checkbox-check-collapse="${dataTargetCheckbox}" `;
        } else if (checkboxCollapseInputChecked) {
            htmlCode += `data-cvt-checkbox-collapse="${dataTargetInput}" `;
        }
        htmlCode += `>Checkbox</label>\n`;

        if (checkboxCollapseCheckboxChecked) {
            htmlCode += `<div class="collapse-cvt-container" data-cvt-checkbox-group="${dataTargetCheckbox}" data-cvt-checkbox-multiple="${multipleOptionsChecked}" style="display: none;">\n`;
            htmlCode += `    <label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}-1">Option_1</label>\n`;
            htmlCode += `    <label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}-2">Option_2</label>\n`;
            htmlCode += `</div>\n`;
        } else if (checkboxCollapseInputChecked) {
            htmlCode += `<div class="cvt-form-group collapse-cvt-container" data-cvt-checkbox-group="${dataTargetInput}" data-cvt-checkbox-multiple="${multipleOptionsChecked}" style="display: none;">\n`;
            htmlCode += `    <input type="search" id="input-${uniqueId}" autocomplete="off">\n`;
            htmlCode += `    <label for="input-${uniqueId}">Recherche...</label>\n`;
            htmlCode += `</div>\n`;
        }

        return htmlCode;
    }
}

class DragAndDropElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.draggableElementCount = parseInt(document.getElementById('dragElementsCount').value, 10) || 3;
        this.containerCount = parseInt(document.getElementById('dragContainerCount').value, 10) || 2;
        this.enableSwap = document.getElementById('enableSwapCheckbox').checked;
    }

    generateCode() {
        let html = '';

        const itemsPerContainer = this.enableSwap ? 1 : this.draggableElementCount;

        for (let i = 1; i <= this.containerCount; i++) {
            const containerId = `drag-and-drop-container${i}-${this.uniqueId}`;
            html += `<div id="${containerId}" class="cvt-container-drag" data-enable-swap="${this.enableSwap}">\n`;

            if (this.enableSwap) {
                if (i <= this.draggableElementCount) {
                    const draggableId = `draggable-${i}-${this.uniqueId}`;
                    html += `    <div id="${draggableId}" class="cvt-draggable-element" draggable="true">Item ${i}</div>\n`;
                }
            } else if (i === 1) {
                for (let j = 1; j <= itemsPerContainer; j++) {
                    const draggableId = `draggable-${j}-${this.uniqueId}`;
                    html += `    <div id="${draggableId}" class="cvt-draggable-element" draggable="true">Item ${j}</div>\n`;
                }
            }

            html += `</div>\n`;
        }

        return html.trim();
    }
}

class TabsElement extends BaseElement {
    constructor(type, className, content, tabCount = 2) {
        super(type, className, content);
        this.tabCount = tabCount;
    }

    generateCode() {
        const tabCountInput = document.getElementById('tabsCount');
        const tabCount = parseInt(tabCountInput.value, 10) || 2;

        const tabGroupId = `cvt-tab-container-${this.uniqueId}`;

        let tabsHtml = `<div data-tab-group="${tabGroupId}">\n`;

        for (let i = 1; i <= tabCount; i++) {
            const tabId = `tab-${this.uniqueId}-${i}`;
            const contentId = `tab-content-${this.uniqueId}-${i}`;

            const checkedAttribute = i === 1 ? ' checked="checked"' : '';

            tabsHtml += `    <input type="radio" id="${tabId}" name="tab-${this.uniqueId}" value="${contentId}" data-tab-target="${contentId}" style="display: none;"${checkedAttribute}>\n`;
            tabsHtml += `    <label for="${tabId}">Tab ${i}</label>\n`;
        }

        tabsHtml += `</div>\n`;

        for (let i = 1; i <= tabCount; i++) {
            const contentId = `tab-content-${this.uniqueId}-${i}`;
            const displayStyle = i === 1 ? '' : ' style="display: none;"';

            tabsHtml += `<div id="${contentId}" class="tab-content" data-tab-content="${tabGroupId}"${displayStyle}>\n`;
            tabsHtml += `    Contenu pour l'onglet ${i}\n`;
            tabsHtml += `</div>\n`;
        }

        return tabsHtml;
    }
}

class TablesElement extends BaseElement {
    constructor() {
        super();
        const columnsInput = document.getElementById('columnsTableCount');
        this.columnsTableCount = parseInt(columnsInput.value, 10) || 3;
        this.isEditable = document.getElementById('checkbox-6c8aqohwj').checked;
        this.isClickable = document.getElementById('checkbox-g3sf2q5fu').checked;
    }

    generateCode() {
        const tableId = `table-${this.uniqueId}`;
        const modalId = `modal-${this.uniqueId}`;
        let tableHtml = `<div class="table-responsive">\n`;
        tableHtml += `  <table id="${tableId}" class="table table-hover table-striped table-header-cvt">\n`;
        tableHtml += `    <thead>\n`;
        tableHtml += `      <tr>\n`;

        for (let i = 0; i < this.columnsTableCount; i++) {
            tableHtml += `        <th>Colonne ${i + 1}</th>\n`;
        }

        tableHtml += `      </tr>\n`;
        tableHtml += `    </thead>\n`;
        tableHtml += `    <tbody>\n`;
        tableHtml += `      <tr>\n`;

        for (let i = 0; i < this.columnsTableCount; i++) {
            let cellContent = `Donnée ${i + 1}`;
            let cellAttributes = this.isEditable ? ' contenteditable="true"' : '';
            cellAttributes += this.isClickable ? ` onclick="showModal('${modalId}', this.innerText)"` : '';
            tableHtml += `        <td${cellAttributes}>${cellContent}</td>\n`;
        }

        tableHtml += `      </tr>\n`;
        tableHtml += `    </tbody>\n`;
        tableHtml += `  </table>\n`;
        tableHtml += `</div>\n`;

        if (this.isClickable) {
            tableHtml += `<div id="${modalId}" class="cvt-modal" tabindex="-1" aria-hidden="true" style="display:none;">\n`;
            tableHtml += `  <div class="cvt-modal-content">\n`;
            tableHtml += `    <div class="cvt-modal-header">\n`;
            tableHtml += `      <h5 class="cvt-title">Contenu de la Cellule</h5>\n`;
            tableHtml += `      <span class="cvt-close btn btn-close bg-light" onclick="closeModal('${modalId}')"></span>\n`;
            tableHtml += `    </div>\n`;
            tableHtml += `    <div class="cvt-modal-body text-custom-cvt" id="${modalId}-body">\n`;
            tableHtml += `      <!-- Le contenu de la cellule sera inséré ici -->\n`;
            tableHtml += `    </div>\n`;
            tableHtml += `  </div>\n`;
            tableHtml += `</div>\n`;

            tableHtml += `<script>\n`;
            tableHtml += `  function showModal(modalId, content) {\n`;
            tableHtml += `    document.getElementById(modalId + '-body').innerText = content;\n`;
            tableHtml += `    document.getElementById(modalId).style.display = 'block';\n`;
            tableHtml += `  }\n`;
            tableHtml += `  function closeModal(modalId) {\n`;
            tableHtml += `    document.getElementById(modalId).style.display = 'none';\n`;
            tableHtml += `  }\n`;
            tableHtml += `</script>\n`;
        }

        return tableHtml;
    }
}

class ChartElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.chartType = document.getElementById('select-chartType').value;
        this.seriesCount = document.getElementById('seriesCount').value;
    }

    generateRandomData(chartType) {
        const randomData = [];

        switch (chartType) {
            case 'line':
            case 'bar':
            case 'horizontalBar':
                for (let i = 0; i < 5; i++) {
                    randomData.push(Math.floor(Math.random() * 100));
                }
                break;
            case 'scatter':
                for (let i = 0; i < 5; i++) {
                    randomData.push([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
                }
                break;
            case 'pie':
                for (let i = 0; i < 3; i++) {
                    randomData.push({ value: Math.floor(Math.random() * 500), name: `Option ${String.fromCharCode(65 + i)}` });
                }
                break;
            case 'candlestick':
                for (let i = 0; i < 5; i++) {
                    randomData.push([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
                }
                break;
            default:
                break;
        }

        return randomData;
    }

    generateCode() {
        const chartContainerId = `cvt-chart-container-${this.uniqueId}`;
        let xAxisType = 'category';
        let yAxisType = 'value';

        let seriesCode = '';
        let legendData = [];

        for (let i = 0; i < this.seriesCount; i++) {
            const seriesName = `Série ${i + 1}`;
            legendData.push(seriesName);

            const seriesData = this.generateRandomData(this.chartType);

            seriesCode += `
            {
                data: ${JSON.stringify(seriesData)},
                type: '${this.chartType === 'horizontalBar' ? 'bar' : this.chartType}',
                name: '${seriesName}'
            },`;
        }

        seriesCode = seriesCode.slice(0, -1);

        return `
<div id="${chartContainerId}" style="width: 100%;height: 400px;margin: 50px auto;"></div>
<script>
    var chartContainer = document.getElementById('${chartContainerId}');
    var chart = initEchartsCvtSetup('${chartContainerId}', {
        type: '${this.chartType}',
        xAxis: {
            type: '${xAxisType}',
            data: ${JSON.stringify(['A', 'B', 'C', 'D', 'E'])}
        },
        yAxis: {
            type: '${yAxisType}'
        },
        legend: {
            data: ${JSON.stringify(legendData)}
        },
        series: [${seriesCode}],
        animation: true
    });
</script>
        `;
    }
}

class BootstrapGridElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.useContainer = document.getElementById('checkbox-useContainer').checked;
        this.useRow = document.getElementById('checkbox-useRow').checked;
        this.breakpointPrefix = document.getElementById('colSizeSelect').value;
        this.colConfig = document.getElementById('colConfig').value;
        this.adaptationMobile = document.getElementById('checkbox-h7al54lyf').checked;
        this.centerContent = document.getElementById('checkbox-kgq7tnp4w').checked;
        this.spaceBetween = document.getElementById('checkbox-5fj65a36z').checked;
        this.alignItemsCenter = document.getElementById('checkbox-2dh39quyo').checked;

    }

    generateGrid() {
        let gridHtml = this.useContainer ? '<div class="container">\n' : '';
        let rowClasses = "row";

        if (this.centerContent) {
            rowClasses += " d-flex justify-content-center";
        } else if (this.spaceBetween) {
            rowClasses += " d-flex justify-content-between";
        }
        if (this.alignItemsCenter) {
            rowClasses += " align-items-center";
        }

        gridHtml += this.useRow ? `  <div class="${rowClasses}">\n` : '';

        const colConfigs = this.colConfig.split('-');
        colConfigs.forEach(config => {
            const colSize = parseInt(config, 10);
            const colClasses = this.generateBreakpointClasses(colSize);
            gridHtml += `    <div class="${colClasses} mb-4">Contenu</div>\n`;
        });

        gridHtml += this.useRow ? '  </div>\n' : '';
        gridHtml += this.useContainer ? '</div>\n' : '';

        return gridHtml;
    }

    generateBreakpointClasses(colSize) {
        if (!this.adaptationMobile) {
            return `${this.breakpointPrefix}${colSize}`;
        }

        const breakpointsOrder = ['col-', 'col-sm-', 'col-md-', 'col-lg-', 'col-xl-', 'col-xxl-'];
        const breakpointIndex = breakpointsOrder.findIndex(breakpoint => this.breakpointPrefix === breakpoint);
        let classes = '';

        for (let i = 0; i < breakpointIndex; i++) {
            let adjustedSize = Math.min(colSize + 2, 12);
            classes += `${breakpointsOrder[i]}${adjustedSize} `;
        }

        classes += `${this.breakpointPrefix}${colSize} `;

        for (let i = breakpointIndex + 1; i < breakpointsOrder.length; i++) {
            classes += `${breakpointsOrder[i]}${colSize} `;
        }

        return classes.trim();
    }

    generateCode() {
        return this.generateGrid();
    }
}



// Fonction factory pour créer des éléments
const elementClasses = {
    'button': ButtonBoostrapElement,
    'cvt-button': ButtonCvtElement,
    'title': TitleElement,
    'title-color': TitleElement,
    'subtitle': TitleElement,
    'subsubtitle': TitleElement,
    'subsubsubtitle': TitleElement,
    'subsubsubsubtitle': TitleElement,
    'subsubsubsubsubtitle': TitleElement,
    'input': InputElement,
    'input-number': NumberInputElement,
    'modal': ModalElement,
    'config-panel': ModalElement,
    'off-canvas': OffCanvasElement,
    'dropdown': DropdownElement,
    'accordion': AccordionsElement,
    'toggle-switch': ToggleSwitchElement,
    'checkbox': CheckboxElement,
    'card': CardsElement,
    'drag-drop': DragAndDropElement,
    'tabs-nav': TabsElement,
    'table': TablesElement,
    'chart': ChartElement,
    'button-collapse': CollapseButtonElement,
    'select': SelectElement,
    'grid': BootstrapGridElement,
};

function createElement(type, className, content) {
    const ElementClass = elementClasses[type];
    if (ElementClass) {
        return new ElementClass(type, className, content);
    } else {
        console.error('Type d\'élément non reconnu:', type);
        return null;
    }
}

function updateEditorCode(editor, newCode) {
    const mode = document.querySelector('input[name="genMode"]:checked').value;
    const prefix = document.getElementById('prefixInput').value || 'cvt';
    const regex = new RegExp('cvt-', 'g');

    const prefixedNewCode = newCode.replace(regex, prefix + '-');
    const finalCode = prefixedNewCode.replace(new RegExp('-cvt', 'g'), '-' + prefix);

    if (mode === 'single') {
        editor.setValue(finalCode.trim(), -1);
    } else {
        const existingCode = editor.getValue();
        editor.setValue(existingCode + "\n\n" + finalCode.trim(), -1);
    }

    if (mode === 'multiple') {
        const previewElement = document.getElementById('previewCodeResult');
        previewElement.innerHTML += finalCode;
    } else {
        document.getElementById('previewCodeResult').innerHTML = finalCode;
    }

    activateCustomComponents();
}

function activateCustomComponents() {
    // Réapplique les écouteurs pour les modaux
    document.querySelectorAll('[data-toggle="cvt-modal"]').forEach(toggle => {
        toggle.onclick = function () {
            var modalId = this.dataset.target;
            var modal = document.querySelector(modalId);
            modal.style.display = "block";
        };
    });
    // Écouteurs pour les toggles Offcanvas
    document.querySelectorAll('.cvt-offcanvas-toggler').forEach(toggler => {
        toggler.addEventListener('click', function () {
            const target = this.getAttribute('data-offcanvas-target');
            const offcanvasElement = document.querySelector(target);
            offcanvasElement.classList.toggle('active');

        });
    });

}

