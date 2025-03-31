const input_text = document.getElementById("input-text");
const list_container = document.getElementById('list-container');

function addTask() {
    if(input_text.value === ''){
        alert('You must fill this blank !');
    } 
    else {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.innerHTML = input_text.value;
        li.appendChild(p);
        list_container.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }

    input_text.value = '';
    saveData();
}

list_container.addEventListener('click', function(e){
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    } 
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }

    saveData();
}, false)

function saveData() {
    localStorage.setItem('data-myself', list_container.innerHTML);
}

function loadData() {
    list_container.innerHTML = localStorage.getItem('data-myself');
}

loadData();