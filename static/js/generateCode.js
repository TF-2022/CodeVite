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
});

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
class ButtonElement extends BaseElement {
    constructor(content, className) {
        super();
        this.content = content;
        this.className = className;
    }

    generateCode() {
        const selectTypeButton = document.getElementById('selectTypeButton').value;
        const isSmallChecked = document.getElementById('checkbox-ryx3dh0q6') ? document.getElementById('checkbox-ryx3dh0q6').checked : false;
        const isLargeChecked = document.getElementById('checkbox-iu8l4b6ui') ? document.getElementById('checkbox-iu8l4b6ui').checked : false;
        let finalClassName = this.className;

        if (selectTypeButton === 'outline') {
            finalClassName = finalClassName.replace('btn-', 'btn-outline-');
        }

        if (isSmallChecked) {
            finalClassName += " btn-sm";
        } else if (isLargeChecked) {
            finalClassName += " btn-lg";
        }

        finalClassName = finalClassName.trim().split(/\s+/).filter((v, i, a) => a.indexOf(v) === i).join(' ');

        return `<button class="${finalClassName}" data-type="button">${this.content}</button>`;
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
        const modalId = `modal-${this.uniqueId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
        const buttonId = `button-${this.uniqueId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
        const isConfigPanel = this.content.includes("Panneau de Configuration");
        const modalStyle = isConfigPanel ? 'style="height: 80%; width: 80%; max-height: 80%; max-width: 80%;"' : '';

        return `
<button id="${buttonId}" class="btn custom-button" data-toggle="cvt-modal" data-target="#${modalId}">
    ${this.content}
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

        const autoClose = document.getElementById('autoCloseCheckbox') ? document.getElementById('autoCloseCheckbox').checked : true;
        const autoCloseAttribute = autoClose ? 'true' : 'false';
        const dataValueIncluded = document.getElementById('checkbox-a2azhe3q5') ? document.getElementById('checkbox-a2azhe3q5').checked : false;
        const includeLinks = document.getElementById('includeDefaultLinksCheckbox') ? document.getElementById('includeDefaultLinksCheckbox').checked : false;
        const onClickElementIdIncluded = document.getElementById('checkbox-2pwh3ggjq') ? document.getElementById('checkbox-2pwh3ggjq').checked : false;
        const mobileMenu = document.getElementById('checkbox-4pnloidkd') ? document.getElementById('checkbox-4pnloidkd').checked : false;
        const linkNamesInputValue = document.getElementById('searchInputTable-gji6hjwaw') ? document.getElementById('searchInputTable-gji6hjwaw').value : '';

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

        return `<div class="cvt-dropdown${menuClass}" id="${dropdownId}">
  <button class="btn cvt-dropdown-toggle" type="button">${this.content}</button>
  <div class="cvt-dropdown-menu" id="${menuId}" data-cvt-auto-close="${autoCloseAttribute}">
${linksHtml}  </div>
</div>`;
    }
}

class SelectElement extends BaseElement {
    constructor(type, className, content) {
        super(type, className, content);
        this.includedOptions = document.getElementById('checkbox-ogqqa4w2u') ? document.getElementById('checkbox-ogqqa4w2u').checked : true;
        this.optionsDefault = document.getElementById('checkbox-e6ysu3392') ? document.getElementById('checkbox-e6ysu3392').checked : false;
        this.disableValue = document.getElementById('checkbox-hhpb72uk4') ? document.getElementById('checkbox-hhpb72uk4').checked : true;
        this.optionsInput = document.getElementById('input-top2szt9f') ? document.getElementById('input-top2szt9f').value : '';
    }

    generateCode() {
        const selectId = `select-${this.uniqueId}`;
        let optionsHtml = '';

        if (this.includedOptions) {
            optionsHtml += `        <option value="0" disabled selected>Actif</option>\n`;
        }

        if (this.optionsDefault) {
            if (this.optionsInput.trim()) {
                const optionNames = this.optionsInput.split(/[\s,]+/).filter(name => name !== '');
                optionNames.forEach((option, index) => {
                    optionsHtml += `        <option value="${index + 1}">${option}</option>\n`;
                });
            } else {
                optionsHtml += `        <option value="1">Option_1</option>\n`;
                optionsHtml += `        <option value="2">Option_2</option>\n`;
                optionsHtml += `        <option value="3">Option_3</option>\n`;
            }
        }

        return `<div class="cvt-select">\n` +
               `    <select id="${selectId}" ${this.disableValue ? 'disabled' : ''}>\n` +
               optionsHtml +
               `    </select>\n` +
               `</div>`;
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
        const inputId = `searchInputTable-${this.uniqueId}`;
        return `
<div class="cvt-form-group">
  <input type="search" id="${inputId}" aria-describedby="inputGroup-sizing-sm" autocomplete="off">
  <label for="${inputId}">Recherche...</label>
</div>
        `;
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
    <label>Taille : <span class="number-value-display">10</span></label>
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
        const toggleTypeValue = document.getElementById('toggleType').value;

        switch (toggleTypeValue) {
            case 'toggle-icon':
                return this.generateIconToggle();
            case 'toggle-text':
                return this.generateTextToggle();
            case 'toggle-icon-text':
                return this.generateIconTextToggle();
            case 'toggle-simple':
                return this.generateSimpleToggle();
            default:
                return '';
        }
    }

    generateIconToggle() {
        return `
<div data-toggle-group="${this.groupId}">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${this.switchId}" data-toggle-type="icon"
            data-toggle-values="bi-check-circle,bi-x-circle" data-toggle-target="${this.contentId}">
        <label class="form-check-label" for="${this.switchId}">Interrupteur Icône</label>
    </div>
    <span id="${this.contentId}"><i class="bi-x-circle"></i></span>
</div>`;
    }

    generateTextToggle() {
        return `
<div data-toggle-group="${this.groupId}">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${this.switchId}" data-toggle-type="text"
            data-toggle-values="On,Off" data-toggle-target="${this.contentId}">
        <label class="form-check-label" for="${this.switchId}">Interrupteur Texte</label>
    </div>
    <span id="${this.contentId}">Off</span>
</div>`;
    }

    generateIconTextToggle() {
        return `
<div data-toggle-group="${this.groupId}">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${this.switchId}" data-toggle-type="icon-text"
            data-toggle-values="bi-check-circle On,bi-x-circle Off" data-toggle-target="${this.contentId}">
        <label class="form-check-label" for="${this.switchId}">Interrupteur Icône + Texte</label>
    </div>
    <span id="${this.contentId}"><i class="bi-x-circle"></i> Off</span>
</div>`;
    }

    generateSimpleToggle() {
        return `
<div data-toggle-group="${this.groupId}">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${this.switchId}" data-toggle-type="simple"
            data-toggle-target="${this.contentId}">
        <label class="form-check-label" for="${this.switchId}">Interrupteur simple</label>
    </div>
    <span id="${this.contentId}"></span>
</div>`;
    }
}

class CheckboxElement extends BaseElement {
    generateCode() {
        const checkboxId = `checkbox-${this.uniqueId}`;
        return `
<label class="checkbox-cvt"><input type="checkbox" id="${checkboxId}" ${this.isChecked ? 'checked' : ''}>${this.content}</label>`;
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


// Fonction factory pour créer des éléments
const elementClasses = {
    'button': ButtonElement,
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
        const previewElement = document.getElementById('preview');
        previewElement.innerHTML += finalCode;
    } else {
        document.getElementById('preview').innerHTML = finalCode;
    }

    activateCustomComponents();
}

function activateCustomComponents() {
    document.querySelectorAll('.cvt-accordion-button').forEach(button => {
        button.addEventListener('click', function () {
            const accordionContentId = this.getAttribute('data-cvt-target');
            const accordionContent = document.querySelector(accordionContentId);

            if (accordionContent.style.display === 'block') {
                accordionContent.style.display = 'none';
            } else {
                accordionContent.style.display = 'block';
            }
        });
    });

}



class ButtonUIManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('selectTypeButton').addEventListener('change', this.handleStyleChange.bind(this));

        const checkboxSmall = document.getElementById('checkbox-ryx3dh0q6');
        const checkboxLarge = document.getElementById('checkbox-iu8l4b6ui');

        checkboxSmall.addEventListener('change', () => this.handleSizeChange(checkboxSmall, checkboxLarge));
        checkboxLarge.addEventListener('change', () => this.handleSizeChange(checkboxLarge, checkboxSmall));
    }

    handleStyleChange(event) {
        const selectValue = event.target.value;
        const buttons = document.querySelectorAll('#buttonContainer button[data-type="button"]');

        buttons.forEach(button => {
            let currentClasses = button.className.split(' ');

            const isOutline = currentClasses.some(cls => cls.startsWith('btn-outline-'));

            if (selectValue === 'outline' && !isOutline) {
                button.className = button.className.replace(/btn-(?!link\b)/g, 'btn-outline-');
            } else if (selectValue === 'simple' && isOutline) {
                button.className = button.className.replace(/btn-outline-/g, 'btn-');
            }
        });
    }

    handleSizeChange(checkedCheckbox, otherCheckbox) {
        if (checkedCheckbox.checked) {
            otherCheckbox.checked = false;
        }
    }
}

// Initialisation
new ButtonUIManager();
