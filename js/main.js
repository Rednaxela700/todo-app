const clear__icon = document.querySelector('.icon__container--clear'),
    dateEl = document.getElementById('date'),
    listEl = document.getElementById('list'),
    inputEl = document.getElementById('note__input');

const el_style_check = 'far',
    el_style_uncheck = 'fas',
    el_style_lineThrough = 'lineThrough';

//adding date
const today = new Date(),
    dateOptions = {weekday: 'long', month: 'short', day: 'numeric'};

dateEl.innerHTML = today.toLocaleDateString('pl', dateOptions);

let toDoList__arr = [];

let id = 0;
//
// toDoList__arr[0] =
//
// {
//     name: 'drink coffee',
//     id: 0,
//     done: false,
//     trash: false
// };
// toDoList__arr[1] = {
//     name: 'Bike',
//     id: 1,
//     done: true,
//     trash: false
// };
function removeToDo(element) {

    //delete from html
    const toDoContainer = element.parentNode.parentNode;
    const thatToDo = element.parentNode;
    toDoContainer.removeChild(thatToDo);
    //set to trash in JS
    toDoList__arr[element.id].trash = true;
}
function completeToDo(element) {
    //change html
    element.classList.toggle(el_style_check);
    element.classList.toggle(el_style_uncheck);
    element.parentNode.querySelector('.list__paragraph').classList.toggle(el_style_lineThrough);
    console.log('now finish it in js arr')
    //update in js array
    // toDoList__arr[element.id].done ? false :true;
}

function addToDo(toDo, id, done, trash) {
    if (trash){return} //if item is in the trash further code in this func won't work

    const item__done = done ? el_style_check : el_style_uncheck;
    const item__line = done ? el_style_lineThrough : '';
    const list__html = `<li class="list__item">
                            <i class="fas fa-check-circle icon__item icon__item--complete" job="done" id="${id}"></i>
                            <p class="list__paragraph">${toDo}</p>
                            <i class="fas fa-trash icon__item icon__item--delete" job="delete" id="${id}"></i>
                        </li>`;
    const position = 'beforeend';
    listEl.insertAdjacentHTML(position, list__html)
}

clear__icon.addEventListener('click', () => {
    localStorage.clear();
    location.reload(); //reload page
});

let data = localStorage.getItem('TODO');
if (data) {
    toDoList__arr = JSON.parse(data);
    loadToDo(toDoList__arr);
    id = toDoList__arr.length
} else {
    toDoList__arr = [];
    id = 0;
}

function loadToDo(arr) {
    arr.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}
listEl.addEventListener('click', (e) => {
    let targetEl = e.target;
    // console.log(targetEl.parentNode.parentNode.)
    let targetEl_job = targetEl.getAttribute('job');
    // let targetEl_job = targetEl.attributes.job.value; //may be delete or complete
    if (targetEl_job === 'done') {
        completeToDo(targetEl);
    } else if (targetEl_job === 'delete') {
        removeToDo(targetEl)
    } else {
        console.log('dupa1');
        console.log(targetEl_job)
    }

    //update local storage
    localStorage.setItem("TODO", JSON.stringify(toDoList__arr));
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        const  toDo = inputEl.value;
        if(toDo) {  //add a toDo if not empty
            addToDo(toDo, id, false, false);
            toDoList__arr.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            )
        }

        inputEl.value = ''; //reset input value
        id++;
    }
});

// addToDo('start the game', 1, false, false)