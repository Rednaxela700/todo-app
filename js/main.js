const clear__icon = document.querySelector('.icon__container--clear'),
    dateEl = document.getElementById('date'),
    listEl = document.getElementById('list'),
    inputEl = document.getElementById('note__input');

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

function addToDo(toDo) {
    const list__html = `<li class="list__item">
                            <i class="fa fa-circle icon__item--complete" job="done"></i>
                            <p class="list__paragraph">${toDo}</p>
                            <i class="fa fa-trash-o icon__item--delete" job="delete"></i>
                        </li>`;
    const position = 'beforeend';
    listEl.insertAdjacentHTML(position, list__html)
}

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