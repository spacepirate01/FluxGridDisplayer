document.addEventListener('DOMContentLoaded', () => {
    fetch('template.json')
        .then(response => response.json())
        .then(data => {
            buildTreeView(data);

            const searchButton = document.getElementById('searchButton');
            searchButton.addEventListener('click', () => {
                const searchBar = document.getElementById('searchBar');
                const searchTerm = searchBar.value.toLowerCase();
                if (searchTerm.length < 3) {
                    buildTreeView(data); // Show default view if search term is less than 3 characters
                } else {
                    filterTreeView(data, searchTerm);
                }
            });
        });
});

function buildTreeView(data) {
    const treeView = document.getElementById('treeView');
    treeView.innerHTML = '';
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
        childrenList.className = 'hidden';
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

function filterTreeView(data, searchTerm) {
    const filteredData = data.reduce((acc, item) => {
        const matchedItems = filterItem(item, searchTerm);
        return acc.concat(matchedItems);
    }, []);
    buildTreeView(filteredData);
}

function filterItem(item, searchTerm) {
    const matchedItems = [];
    if (item.objectName.toLowerCase().includes(searchTerm)) {
        matchedItems.push(item);
    }
    if (item.children) {
        item.children.forEach(child => {
            matchedItems.push(...filterItem(child, searchTerm));
        });
    }
    return matchedItems;
}