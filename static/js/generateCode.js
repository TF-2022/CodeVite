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

document.querySelectorAll('[data-notification-message]').forEach(button => {
    button.addEventListener('click', function() {
        const message = this.getAttribute('data-notification-message');
        const messageType = this.getAttribute('data-notification-type') || 'info';
        showNotification(message, messageType);
    });
});

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
    document.querySelectorAll('input[data-type], textarea[data-type]').forEach(control => {
        control.addEventListener('input', function () {
            const type = this.getAttribute('data-type');
            const content = this.tagName === "TEXTAREA" ? this.value : this.innerText;
            const element = createElement(type, this.className, content);
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
        this.cssStore = document.getElementById('cssStore');
    }

    generateCode() {
        return '';
    }
}

class ButtonCvtElement extends BaseElement {
    constructor(content, className) {
        super();
        this.content = content;
        this.className = className;
    }

    generateCode() {
        let inputValue = document.getElementById('input-ofgxbo280').value;
        const isButtonChecked = document.getElementById('checkbox-f83d232dq')?.checked ?? true;
        const styleOption = document.querySelector('input[name="styleOption"]:checked')?.value ?? 'none';
        const isShadowChecked = document.getElementById('checkbox-ydwkoan60')?.checked ?? false;
        const sizeClass = document.querySelector('input[name="size"]:checked')?.value ?? '';
        const colorValue = document.querySelector('input[name="btnColor"]:checked')?.value ?? 'primary';
        const textColorValue = document.querySelector('input[name="btnTextColor"]:checked')?.value;
        const isBtnNotifChecked = document.getElementById('checkbox-4mdoic8z2').checked;
 
        if (!isButtonChecked) {
            return '';
        }

        let baseClass = 'cvt-btn';
        let colorAndStyleClass;

        if (styleOption === 'survol') {
            colorAndStyleClass = `btn-h-${colorValue}`;
        } else if (styleOption === 'clique') {
            colorAndStyleClass = `btn-f-${colorValue}`;
        } else {
            colorAndStyleClass = `btn-n-${colorValue}`;
        }

        let textColorClass = '';
        if (textColorValue && textColorValue !== 'auto') {
            textColorClass = `t-${textColorValue}`;
        }

        let finalClasses = [baseClass, colorAndStyleClass];
        if (textColorClass) {
            finalClasses.push(textColorClass);
        }

        if (sizeClass) {
            finalClasses.push(`sz-btn${sizeClass}`);
        }

        if (isShadowChecked) {
            finalClasses.push('sh');
        }

        if (!inputValue.trim()) {
            inputValue = styleOption.charAt(0).toUpperCase() + styleOption.slice(1);
        }

        let htmlCode = `<button class="${finalClasses.join(' ')}">${inputValue}</button>`;

        if (isBtnNotifChecked) {
            const notifTypeValue = document.querySelector('input[name="rad-notif-type"]:checked')?.value ?? 'add'
            htmlCode = `<button class="${finalClasses.join(' ')}" data-notification-type="${notifTypeValue}" data-notification-message="message">${inputValue}</button>`;
        }
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
<button id="${buttonId}" class="cvt-btn btn-n-light sz-btn-sm sh" data-toggle="cvt-modal" data-target="#${modalId}">
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

        const buttonHtml = `<button id="${buttonId}" class="cvt-btn btn-n-light sz-btn-sm sh cvt-offcanvas-toggler" data-offcanvas-target="#${offCanvasId}">
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
        let accordionsHtml = `<div class="cvt-accordion" id="${accordionId}" data-multiple-open="${multipleOpenAttribute}">`;
        //var accordionCssContent = this.cssStore.dataset['accordions'];
        //const isStyleCssChecked = document.getElementById('checkbox-03ecx972x').checked; 

        for (let i = 1; i <= this.accordionCount; i++) {
            accordionsHtml += `
<div class="cvt-accordion-item">
    <button class="cvt-accordion-button" aria-expanded="false" data-cvt-target="#${accordionId}-collapse${i}">
        Accordion Item ${i} <i class="bi bi-chevron-down cvt-accordion-chevron"></i>
    </button>
    <div id="${accordionId}-collapse${i}" class="cvt-accordion-collapse">
        <div class="cvt-accordion-body">
            This is the content of accordion ${i}.
        </div>
    </div>
</div>`;
        }

        accordionsHtml += `</div>`;
        return accordionsHtml;
    }
}

class CardsElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.isCardChecked = document.getElementById('checkbox-tr21xswbc').checked;
        this.cardCountInput = document.getElementById('cardCount');
        this.showHeader = document.getElementById('checkbox-showHeader').checked;
        this.showTitle = document.getElementById('checkbox-showTitle').checked;
        this.showImage = document.getElementById('checkbox-showImage').checked;
        this.showBodyText = document.getElementById('checkbox-showBodyText').checked;
        this.showButton = document.getElementById('checkbox-showButton').checked;
        this.showFooter = document.getElementById('checkbox-showFooter').checked;
        this.showShadow = document.getElementById('checkbox-showShadow').checked;
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;
        this.contentCardValue = document.querySelector('input[name="contentCard"]:checked')?.value;

        this.cardCountInput.addEventListener('change', this.handleCardCountChange.bind(this));
    }

    handleCardCountChange() {
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;
    }

    generateCard(i) {
        const imageHtml = this.showImage ? `<img src="path/to/image" class="card-img-top" alt="Card image cap">` : '';
        const textAlignmentClass = this.getTextAlignmentClass(this.contentCardValue);
        const bodyTextHtml = this.showBodyText ? `<p class="card-text ${textAlignmentClass}">Ajouter du contenu ici.</p>` : '';
        const buttonHtml = this.showButton ? `<a href="#" class="cvt-btn btn-n-light sh">Mon Bouton</a>` : '';
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

    getTextAlignmentClass(value) {
        switch (value) {
            case 'start':
                return 'horiz-start';
            case 'center':
                return 'horiz-center';
            case 'end':
                return 'horiz-end';
            default:
                return '';
        }
    }
    generateCode() {
        if (!this.isCardChecked) {
            return '';
        }
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

class TexteAreaElement extends BaseElement {
    generateCode() {
        const textAreaId = `textArea-${this.uniqueId}`;
        let htmlCode = '';

        htmlCode += `
<div class="cvt-textarea-group">
    <textarea class="cvt-textarea" id="${textAreaId}" placeholder=" "></textarea>
    <label for="${textAreaId}">Votre message...</label>
</div>
        `;

        return htmlCode;
    }
}

class NumberInputElement extends BaseElement {
    generateCode() {
        const numberInputContainerId = `number-input-${this.uniqueId}`;
        return `
<div class="number-input-container" id="${numberInputContainerId}" data-number-input-id="${numberInputContainerId}">
    <button type="button" class="cvt-btn btn-h-warning t-dark sz-btn-sm sh" data-change="-1">
        <i class="bi bi-arrow-down-circle"></i>
    </button>
    <label><span class="number-value-display">3</span></label>
    <input type="number" class="number-input" id="${numberInputContainerId}" min="1" max="20" value="3" style="display: none;">
    <button type="button" class="cvt-btn btn-h-warning t-dark sz-btn-sm sh" data-change="1">
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
        const isInputValue = document.getElementById('input-07qzte9o7')?.value;

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
        htmlCode += `>${isInputValue}</label>\n`;

        if (checkboxCollapseCheckboxChecked) {
            htmlCode += `<div class="collapse-cvt-container" data-cvt-checkbox-group="${dataTargetCheckbox}" data-cvt-checkbox-multiple="${multipleOptionsChecked}" style="display: none;">\n`;
            htmlCode += `    <label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}-1">${isInputValue}_1</label>\n`;
            htmlCode += `    <label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}-2">${isInputValue}_2</label>\n`;
            htmlCode += `    <label class="checkbox-cvt"><input type="checkbox" id="${baseIdCheckbox}-3">${isInputValue}_3</label>\n`;
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

class RadioElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
    }

    generateCode() {
        const radioCountInput = document.getElementById('radioCount');
        const radioCount = parseInt(radioCountInput.value, 10) || 3;
        const nameRadioInput = document.getElementById('input-v4ux67ccz').value;

        let htmlCode = '';

        for (let i = 1; i <= radioCount; i++) {
            const radioId = `radio-${i}-${this.uniqueId}`;
            htmlCode += `
<label class="radio-cvt"><input type="radio" id="${radioId}" name="${nameRadioInput}" value="option_${i}">Option_${i}</label>
            `;
        }

        return htmlCode.trim();
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
            tabsHtml += `    <label for="${tabId}">Tab_${i}</label>\n`;
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
        this.cardDisposition = document.querySelector('input[name="cardDisposition"]:checked')?.value ?? '';
        this.applyToColOrRow = document.querySelector('input[name="colOrRow"]:checked')?.value ?? '';
    }

    generateGrid() {
        let gridHtml = this.useContainer ? '<div class="container">\n' : '';
        let rowClasses = "row";
        let colClassesModifier = "";

        if (this.applyToColOrRow === 'row' && this.cardDisposition) {
            rowClasses += ` d-flex justify-content-${this.cardDisposition}`;
        } else if (this.applyToColOrRow === 'col' && this.cardDisposition) {
            colClassesModifier = `d-flex justify-content-${this.cardDisposition} `;
        }

        gridHtml += this.useRow ? `  <div class="${rowClasses}">\n` : '';

        const colConfigs = this.colConfig.split('-');
        colConfigs.forEach(config => {
            const colSize = parseInt(config, 10);
            let colClasses = `${colClassesModifier}${this.generateBreakpointClasses(colSize)}`;
            gridHtml += `    <div class="${colClasses.trim()} mb-4">Contenu</div>\n`;
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

class BadgesElement extends BaseElement {
    constructor(className) {
        super();
        this.className = className;
        this.isLightChecked = document.getElementById('checkbox-t90k01vec')?.checked ?? false;
        this.isBorderChecked = document.getElementById('checkbox-n9d3avw23')?.checked ?? false;
        this.sizeBadgeValue = document.querySelector('input[name="sizeBadge"]:checked')?.value || '';
        this.colorBadgeValue = document.querySelector('input[name="badgeColor"]:checked')?.value || 'primary';
        this.isInputValue = document.getElementById('input-zuo9itt3m')?.value || 'Badge';
    }

    generateCode() {

        let baseStyleClass = this.isLightChecked ? 'bdg-light' : 'bdg';

        let badgeClasses = `cvt-badge ${baseStyleClass}-${this.colorBadgeValue}`;
        if (this.sizeBadgeValue) {
            badgeClasses += ` bdg-size${this.sizeBadgeValue}`;
        }
        if (this.isBorderChecked) {
            badgeClasses += ' bdg-light-bordered';
        }

        let badgeContent = this.isInputValue.trim() ? this.isInputValue : 'Badge';

        let htmlCode = `<span class="${badgeClasses}">${badgeContent}</span>`;

        return htmlCode;
    }
}

class NotificationsElement extends BaseElement {
    constructor(content) {
        super();
        this.content = content;
    }

    generateCode() {
        const isAlertChecked = document.getElementById('checkbox-ot4eoeelg').checked;
        const isCloseButtonChecked = document.getElementById('checkbox-qzmn5g7c8').checked;
        const isIconChecked = document.getElementById('checkbox-00k4ivwny').checked;
        const buttonCloseActive = isCloseButtonChecked ? 'data-notification-close="true"' : '';
        const colorAlertValue = document.querySelector('input[name="colorAlert"]:checked')?.value ?? 'primary';
        const iconTypeValue = document.querySelector('input[name="rad-group-icon-alert"]:checked')?.labels[0].textContent.toLowerCase() ?? 'info';
        const isContentArea = document.getElementById('textArea-bkbo5zx01').value.trim() || 'Notification';

        if (!isAlertChecked) {
            return '';
        }

        let iconHref;
        if (isIconChecked) {
            switch(iconTypeValue) {
                case 'success':
                    iconHref = "#cvt-check-circle-fill";
                    break;
                case 'info':
                    iconHref = "#cvt-info-fill";
                    break;
                case 'warning':
                    iconHref = "#cvt-exclamation-triangle-fill";
                    break;
                case 'danger':
                    iconHref = "#cvt-exclamation-triangle-fill";
                    break;
                default:
                    iconHref = "";
            }
        }

        const iconHtml = iconHref ? `<svg class="cvt-icon flex-shrink-0 me-2" role="img"><use xlink:href="${iconHref}" /></svg>` : '';

        return `
<div class="cvt-alert cvt-alert-${colorAlertValue}" role="alert" ${buttonCloseActive}>
    ${iconHtml}
    <div>${isContentArea}</div>
</div>
        `;
    }
}

class NotificationButtonElement extends BaseElement {
    generateCode() {
        const isBtnNotifChecked = document.getElementById('checkbox-4mdoic8z2').checked;
        const notifTypeValue = document.querySelector('input[name="rad-notif-type"]:checked')?.value ?? 'add';

        if (!isBtnNotifChecked) {
            return '';
        }
        
        let htmlCode = '';

        htmlCode += `
<button class="cvt-btn btn-n-primary" data-notification-message="message" data-notification-type="${notifTypeValue}">Clique</button>
        `;

        return htmlCode;
    }
}

class RadioGroupElement extends BaseElement {
    constructor(content, className) {
        super();
        this.content = content;
        this.className = className;
    }

    generateCode() {
        const groupName = `rad-group-${this.uniqueId}`;
        let htmlCode = `<div class="cvt-group" role="group" aria-label="Basic radio toggle button group">\n`;
        for (let i = 1; i <= 3; i++) {
            htmlCode += `    <input type="radio" class="cvt-btn-group-check" name="${groupName}" value="" id="${groupName}-${i}" autocomplete="off"${i === 1 ? ' checked' : ''}>\n`;
            htmlCode += `    <label class="cvt-btn-group" for="${groupName}-${i}">Radio ${i}</label>\n`;
        }
        htmlCode += `</div>`;
        return htmlCode;
    }
}

class CheckboxGroupElement extends BaseElement {
    constructor(content, className) {
        super();
        this.content = content;
        this.className = className;
    }

    generateCode() {
        let htmlCode = `<div class="cvt-group" role="group" aria-label="Basic checkbox toggle button group">\n`;
        for (let i = 1; i <= 3; i++) {
            const checkboxId = `check-group-${this.uniqueId}-${i}`;
            htmlCode += `    <input type="checkbox" class="cvt-btn-group-check" id="${checkboxId}" autocomplete="off">\n`;
            htmlCode += `    <label class="cvt-btn-group" for="${checkboxId}">Checkbox ${i}</label>\n`;
        }
        htmlCode += `</div>`;
        return htmlCode;
    }
}

class MoveHideShowSectionElement extends BaseElement {
    generateCode() {
        const moveHideShowSectionId = `move-hide-show-section-${this.uniqueId}`;

        let htmlCode = `
<div class="cvt-dropdown" id="${moveHideShowSectionId}" data-hover-toggle="false">
    <button class="btn cvt-dropdown-toggle" type="button">Actions</button>
    <div class="cvt-dropdown-menu" data-cvt-auto-close="true">`;

        for (let i = 1; i <= 4; i++) {
            const sectionId = `section${i}-${this.uniqueId}`;
            htmlCode += `
        <a class="cvt-dropdown-item" href="#" data-action="move" data-target="#${sectionId}">Mettre Section ${i} en premier</a>
        <a class="cvt-dropdown-item" href="#" data-action="hide" data-target="#${sectionId}">Masquer Section ${i}</a>
        <a class="cvt-dropdown-item" href="#" data-action="show" data-target="#${sectionId}">Afficher Section ${i}</a>
            `;
            if (i < 4) {
                htmlCode += '<div class="dropdown-divider"></div>';
            }
        }

        htmlCode += `</div></div><div id="sectionsContainer-${this.uniqueId}" class="mt-3">`;

        for (let i = 1; i <= 4; i++) {
            const sectionId = `section${i}-${this.uniqueId}`;
            htmlCode += `
<div id="${sectionId}" class="section my-5">
    <h2>Section ${i}</h2>
    <p>Contenu de la section ${i}...</p>
</div>`;
        }

        htmlCode += `
</div>`;
        return htmlCode;
    }
}




// Fonction factory pour créer des éléments
const elementClasses = {
    'cvt-button': ButtonCvtElement,
    'title': TitleElement,
    'title-color': TitleElement,
    'subtitle': TitleElement,
    'subsubtitle': TitleElement,
    'subsubsubtitle': TitleElement,
    'subsubsubsubtitle': TitleElement,
    'subsubsubsubsubtitle': TitleElement,
    'input': InputElement,
    'textArea': TexteAreaElement,
    'input-number': NumberInputElement,
    'modal': ModalElement,
    'config-panel': ModalElement,
    'off-canvas': OffCanvasElement,
    'dropdown': DropdownElement,
    'accordion': AccordionsElement,
    'toggle-switch': ToggleSwitchElement,
    'checkbox': CheckboxElement,
    'radio': RadioElement,
    'card': CardsElement,
    'drag-drop': DragAndDropElement,
    'tabs-nav': TabsElement,
    'table': TablesElement,
    'chart': ChartElement,
    'button-collapse': CollapseButtonElement,
    'select': SelectElement,
    'grid': BootstrapGridElement,
    'badge': BadgesElement,
    'notification': NotificationsElement,
    'btn-notification': NotificationButtonElement,
    'radio-group': RadioGroupElement,
    'checkbox-group': CheckboxGroupElement,
    'move-hide-show-Section': MoveHideShowSectionElement,
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

