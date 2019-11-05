const clear__icon = document.querySelector('.icon__container--clear'),
    dateEl = document.getElementById('date'),
    listEl = document.getElementById('list'),
    inputEl = document.getElementById('note__input');

const el_style_check = 'fa-check-circle',
    el_style_uncheck = 'fa-circle-thin',
    el_style_lineThrough = 'lineThrough';

let toDoList__arr = [];

let id = 0;

toDoList__arr[0] =

{
    name: 'drink coffee',
    id: 0,
    done: false,
    trash: false
};
toDoList__arr[1] = {
    name: 'Bike',
    id: 1,
    done: true,
    trash: false
};
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
    //update in js array
    toDoList__arr[element.id].done ? false :true;
}

function addToDo(toDo, id, done, trash) {
    if (trash){return} //if item is in the trash further code in this func won't work

    const item__done = done ? el_style_check : el_style_uncheck;
    const item__line = done ? el_style_lineThrough : '';
    const list__html = `<li class="list__item">
                            <i class="fa fa-circle icon__item--complete" job="done" id="${id}"></i>
                            <p class="list__paragraph">${toDo}</p>
                            <i class="fa fa-trash-o icon__item--delete" job="delete" id="${id}"></i>
                        </li>`;
    const position = 'beforeend';
    listEl.insertAdjacentHTML(position, list__html)
}


listEl.addEventListener('click', (e) => {
    let targetEl = e.target;
    const targetEl_job = targetEl.attributes.job.value; //may be delete or complete
    if (targetEl_job === 'done') {
        completeToDo(targetEl);
    } else if (targetEl_job === 'delete') {
        removeToDo(targetEl)
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