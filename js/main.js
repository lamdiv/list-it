//DARK & LIGHT THEME
const darkBtn = document.querySelector('.darkmode');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark')
}
darkBtn.addEventListener('click', () => {
    setDarkMode = localStorage.getItem('dark');

    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        setDarkMode = localStorage.setItem('dark', null);
    }
});
let setDarkMode = localStorage.getItem('dark');
if(setDarkMode === 'on') {
    darkMode();
}


// ---------------- index.js -----------------

var dayDate = new Date()

var date = document.getElementById('date');
var day = document.getElementById('day')

date.innerHTML = `${dayDate.getDate()} ${dayDate.toLocaleString('default', { month: 'long' })}, ${dayDate.getFullYear()}`;
day.innerHTML = `${dayDate.toLocaleString('default', { weekday: 'long' })}`

var form = document.getElementById('form');

submit();
function submit(){
form.addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData(form);

    var index = localStorage.getItem('index') ? localStorage.getItem('index'): null
    localStorage.removeItem('index')
    var data = formData.get('add')
    load(data,index);
   })
}


function load(value,val){
    var a = localStorage.getItem('add') ? (
        localStorage.getItem('add').split(',')
        ) : []

    if (value && !val){
        a.push(value);
        localStorage.setItem('add',a);
        form.reset();
    }

    if (value && val){
        a[val] = value;
        localStorage.setItem('add',a);
        form.reset();
    }

    var counter = document.getElementById('task-counter')
    counter.innerHTML = `<h1>${a.length}</h1><h3>Task Pending</h3>`

    var container = document.getElementById('task-wrapper')
    container.innerHTML = a.map(function(i,index){
        return (`<div class="task-box" onclick='edit(${index})'><h2 class="description">${i}</h2><img src="assets/delete.svg" class="delete" alt="delete" onclick='remove(${index})'><div class="clear"></div></div>`)
    }).join('')
    }
												

    function remove(rem){   
        var a = localStorage.getItem('add').split(',')
        var afterFil = a.filter((i,index)=>rem!=index)
        localStorage.setItem('add',afterFil)
        load()
    }   

    function edit(rem){
        var a = localStorage.getItem('add').split(',')
        var add = document.getElementById('add')
        add.value = a[rem]
        localStorage.setItem('index',rem)
        submit();
    }
    