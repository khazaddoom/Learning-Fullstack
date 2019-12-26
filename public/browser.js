const todoInputElement = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

items.map(item => todoList.insertAdjacentHTML('beforeend', todItemTemplate(item)))
    .join('');


document.getElementById('todo-form').addEventListener('submit', function (e) {
    e.preventDefault();

    axios.post('/create-item', { text: todoInputElement.value }).then(function (response) {

        todoList.insertAdjacentHTML("beforeend", todItemTemplate(response.data));
        todoInputElement.value = '';
        todoInputElement.focus();

    }).catch(function (err) {
        console.error(err);
        alert('Please try again later!')
    })
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-me')) {
        let userInput = prompt('Enter the ToDo item text', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML);
        if (userInput) {
            axios.post('/update-item', { text: userInput, id: e.target.getAttribute('data-id') }).then(function () {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput
            }).catch(function (err) {
                console.error(err);
                alert('Please try again later!')
            })
        }
    }
    else if (e.target.classList.contains('delete-me')) {

        if (confirm('This will permanently delete this item. Agree?')) {
            axios.post('/delete-item', { id: e.target.getAttribute('data-id') })
                .then(function (message) {
                    e.target.parentElement.parentElement.remove();
                })
                .catch(function (err) {
                    console.error(err)
                });
        }
    }
});

function todItemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
    </li>`;
}