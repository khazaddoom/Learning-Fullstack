document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-me')) {
        let userInput = prompt('Enter the ToDo item text');
        axios.post('/update-item', {text: userInput}).then(function() {
            alert('Succesfully updated the ToDo item.');
        }).catch(function (err) {
            console.error(err);
            alert('Please try again later!')
        })
    }
})