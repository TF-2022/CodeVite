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
    generateCode() {
        return `<button id="${this.uniqueId}" class="${this.className}">${this.content}</button>`;
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
    <div class="cvt-modal-header header-circle p-2">
      <h5 class="cvt-title py-2" id="${modalId}-label">${this.content}</h5>
      <span class="cvt-close btn btn-close bg-light py-2"></span>
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

        const buttonHtml = `<button id="${buttonId}" class="btn btn-group-cvt cvt-offcanvas-toggler" data-offcanvas-target="#${offCanvasId}">
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
        const includeDefaultLinks = document.getElementById('includeDefaultLinksCheckbox') ? document.getElementById('includeDefaultLinksCheckbox').checked : true;
        const autoCloseAttribute = autoClose ? 'true' : 'false';

        let linksHtml = '';
        if (includeDefaultLinks) {
            linksHtml = `<a class="cvt-dropdown-item" href="#">Action</a>\n    <a class="cvt-dropdown-item" href="#">Another action</a>\n    <a class="cvt-dropdown-item" href="#">Something else here</a>`;
        }

        return `<div class="cvt-dropdown" id="${dropdownId}">
  <button class="btn cvt-dropdown-toggle" type="button">
    ${this.content}
  </button>
  <div class="cvt-dropdown-menu" id="${menuId}" data-cvt-auto-close="${autoCloseAttribute}">
    ${linksHtml}
  </div>
</div>`;
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
        this.cardTypeSelect = document.getElementById('typeCards');
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;
        this.cardType = this.cardTypeSelect.value;

        this.cardCountInput.addEventListener('change', this.handleCardCountChange.bind(this));
        this.cardTypeSelect.addEventListener('change', this.handleCardTypeChange.bind(this));
    }

    handleCardCountChange() {
        this.cardCount = parseInt(this.cardCountInput.value, 10) || 3;
    }

    handleCardTypeChange() {
        this.cardType = this.cardTypeSelect.value;
    }

    generateNormalCard(i) {
        const cardId = `card-normal-${this.uniqueId}-${i}`;
        return `<div class="card" id="${cardId}">
        <img src="path/to/image" class="card-img-top" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Card title ${i}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;
    }

    generateAllCard(i) {
        const cardId = `card-all-${this.uniqueId}-${i}`;
        return `<div class="card card-custom-border" id="${cardId}">
        <div class="card-header">Header ${i}</div>
        <div class="card-body">
            <h5 class="card-title">All Card title ${i}</h5>
            <p class="card-text">Text demonstrating a complete card with header, body, and footer.</p>
        </div>
        <div class="card-footer">Footer ${i}</div>
    </div>`;
    }

    generateTitleColorCard(i) {
        const cardId = `card-title-color-${this.uniqueId}-${i}`;
        return `<div class="card" id="${cardId}">
        <div class="card-body">
            <h5 class="card-title">Color Title Card ${i}</h5>
            <p class="card-text">Some quick example text to build on the colored card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;
    }

    generateShadowCard(i) {
        const cardId = `card-shadow-${this.uniqueId}-${i}`;
        return `<div class="cvt-card" id="${cardId}">
        <p class="card-text">Some quick example text to build on the colored card title and make up the bulk of the card's content.</p>
    </div>`;
    }


    generateCard(i) {
        switch (this.cardType) {
            case "normal":
                return this.generateNormalCard(i);
            case "shadow":
                return this.generateShadowCard(i);
            case "all-card":
                return this.generateAllCard(i);
            case "title-color":
                return this.generateTitleColorCard(i);
            default:
                return '';
        }
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
<div class="cvt-form-group searchCotTable">
  <input type="search" id="${inputId}" aria-describedby="inputGroup-sizing-sm" autocomplete="off">
  <label for="${inputId}">Recherche...</label>
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
        tableHtml += `  <table id="${tableId}" class="table">\n`;
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
            tableHtml += `    <div class="cvt-modal-header header-circle p-2">\n`;
            tableHtml += `      <h5 class="cvt-title py-2">Contenu de la Cellule</h5>\n`;
            tableHtml += `      <span class="cvt-close btn btn-close bg-light py-2" onclick="closeModal('${modalId}')"></span>\n`;
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


