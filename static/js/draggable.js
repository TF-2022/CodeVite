
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dropEffect = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(data);
    const enableSwap = document.querySelector('.cvt-container-drag').getAttribute('data-enable-swap') === 'true';

    if (enableSwap && e.target.classList.contains('cvt-container-drag') && e.target.children.length > 0) {
        let targetElement = e.target.children[0];
        let targetContainer = draggedElement.parentNode;
        e.target.replaceChild(draggedElement, targetElement);
        targetContainer.appendChild(targetElement);
    } else if (enableSwap && e.target.classList.contains('cvt-draggable-element')) {
        let targetElement = e.target;
        let targetContainer = targetElement.parentNode;
        let sourceContainer = draggedElement.parentNode;
        if (targetContainer !== sourceContainer) {
            sourceContainer.appendChild(targetElement);
            targetContainer.appendChild(draggedElement);
        } else {
            let nextSibling = targetElement.nextSibling === draggedElement ? targetElement : targetElement.nextSibling;
            targetContainer.insertBefore(draggedElement, nextSibling);
            targetContainer.insertBefore(targetElement, draggedElement);
        }
    } else if (!enableSwap) {
        if (e.target.classList.contains('cvt-container-drag')) {
            e.target.appendChild(draggedElement);
        } else if (e.target.classList.contains('cvt-draggable-element')) {
            let container = e.target.closest('.cvt-container-drag');
            if (container) {
                container.insertBefore(draggedElement, e.target.nextSibling);
            }
        }
    }
}

function cvtDragAndDropInit() {
    const draggables = document.querySelectorAll('.cvt-draggable-element');
    const containers = document.querySelectorAll('.cvt-container-drag');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.id = 'draggable-' + Math.random().toString(36).substr(2, 9);
    });

    containers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
    });
}

cvtDragAndDropInit();