const uri = '/api/Users';
let users = [];

function getUsers() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayUsers(data))
        .catch(error => console.error('Unable to get users.', error));
}

function addUser() {
    const addNameTextbox = document.getElementById('add-name');
    const addEmailTextbox = document.getElementById('add-email');

    const user = {
        name: addNameTextbox.value.trim(),
        email: addEmailTextbox.value.trim()
    };

    fetch(uri,
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(() => {
            addNameTextbox.value = '';
            addEmailTextbox.value = '';
        })
        .catch(error => console.error('Unable to add user.', error));
}

function deleteUser(id) {
    fetch(`${uri}/${id}`,
        {
            method: 'DELETE'
        })
        .then(() => getUsers())
        .catch(error => console.error('Unable to delete user.', error));
}

function displayEditForm(id) {
    const user = users.find(user => user.id === id);

    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-id').value = user.id;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('editForm').setAttribute('class', `container-fluid bg-secondary text-white d-block`);
}

function updateUser() {
    const userId = document.getElementById('edit-id').value;
    const user =
    {
        id: parseInt(userId, 10),
        name: document.getElementById('edit-name').value.trim(),
        email: document.getElementById('edit-email').value.trim()
    };

    fetch(`${uri}/${userId}`,
        {
            method: 'PUT',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(() => getUsers())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').setAttribute('class', `container-fluid bg-secondary text-white d-none`);
}

function _displayCount(userCount) {
    const name = (userCount === 1) ? 'user' : 'users';

    document.getElementById('counter').innerText = `${userCount} ${name}`;
}

function _displayUsers(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(user => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${user.id})`);
        editButton.setAttribute('class', `btn btn-outline-primary`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteUser(${user.id})`);
        deleteButton.setAttribute('class', `btn btn-outline-danger`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(user.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(user.email);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    users = data;
}