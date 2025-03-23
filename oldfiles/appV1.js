document.addEventListener('DOMContentLoaded', () => {
    fetch('template.json')
        .then(response => response.json())
        .then(data => {
            buildTreeView(data);
        });
});

function buildTreeView(data) {
    const treeView = document.getElementById('treeView');
    data.forEach(item => {
        const treeItem = createTreeItem(item);
        treeView.appendChild(treeItem);
    });
}

function createTreeItem(item) {
    const treeItem = document.createElement('div');
    treeItem.className = 'tree-item';
    treeItem.textContent = item.objectName;
    treeItem.onclick = (event) => {
        event.stopPropagation();
        selectItem(item);
        toggleChildrenVisibility(treeItem);
    };

    if (item.children && item.children.length > 0) {
        const childrenList = document.createElement('ul');
        childrenList.className = 'hidden'; // Hide children initially
        item.children.forEach(child => {
            const childItem = createTreeItem(child);
            const listItem = document.createElement('li');
            listItem.appendChild(childItem);
            childrenList.appendChild(listItem);
        });
        treeItem.appendChild(childrenList);
    }

    return treeItem;
}

function toggleChildrenVisibility(treeItem) {
    const childrenList = treeItem.querySelector('ul');
    if (childrenList) {
        childrenList.classList.toggle('hidden');
    }
}

function selectItem(item) {
    const propertiesDiv = document.getElementById('properties');
    propertiesDiv.innerHTML = '';
    for (const key in item.properties) {
        const propertyDiv = document.createElement('div');
        propertyDiv.textContent = `${key}: ${item.properties[key]}`;
        propertiesDiv.appendChild(propertyDiv);
    }
}