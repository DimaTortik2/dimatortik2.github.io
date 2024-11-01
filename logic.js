let el = {
	message: document.querySelector('.message'),
	button: document.getElementById('button'),
	input: document.getElementById('input'),
	rotate: document.getElementById('rotate'),
	pause: document.getElementById('pause'),
	time: document.getElementById('time'),
	input_time: document.getElementById('input_time'),
	button_time: document.getElementById('button_time'),
	time_container: document.querySelector('.time_container'),
	bg: document.querySelector('.section'),
	bar: document.querySelector('.side-bar'),
}

let last_space = 0
let current_space

let speed = 250

function check_size(){
  if (window.innerWidth <= 880) {
		phone_mode()
	}
  else {
    desktop_mode()
  }
}

function read_UI() {
  el.button.classList.add('hide')
  el.input.classList.add('hide')
  el.rotate.classList.add('hide')
  el.time.classList.add('hide')
  el.pause.classList.remove('hide')
  el.bg.classList.add('color')
  el.time_container.classList.add('hide')

  el.time.style.display = 'none'
  el.rotate.style.display = 'none'



  if (!el.bar.classList.contains('hide')) {
		el.bar.classList.add('hide')
	}
}

function start_UI() {
  el.button.classList.remove('hide')
  el.input.classList.remove('hide')
  el.rotate.classList.remove('hide')
  el.pause.classList.add('hide')
  el.time.classList.remove('hide')
  el.bg.classList.remove('color')

  el.time.style.display = 'flex'
  el.rotate.style.display = 'flex'


  check_size()
  
}

function nextWord(text) {
  current_space = text.indexOf(' ', last_space + 1)

  let word = text.slice(last_space, current_space)
  // [last_space, current_space] = [current_space, last_space]
  last_space = current_space

  return word
}

function set_button(set_text) {
  el.button.textContent = set_text
}

function add_pause_listener(interval){
   el.pause.addEventListener('click', () => {
			clearInterval(interval)
			start_UI()
			set_button('continue')
		})
}

function add_listeners(){

  el.rotate.addEventListener('click', () => {
    last_space = 0
    el.message.textContent = ' '
    input.value = ''
    set_button('start')
  })

  el.button_time.addEventListener('click', () => {

    el.time.classList.remove('hide')
    el.time_container.classList.add('hide')
    if (input_time.value)
       speed = input_time.value
    
  })

  el.time.addEventListener('click', () => {

    //если окно уже открыто , то кнопка будет наоборот закрывать его
    if(!el.time_container.classList.contains('hide')){
      el.time.classList.remove('hide')
			el.time_container.classList.add('hide')

    }
    else{
      el.time.classList.add('hide')
			el.time_container.classList.remove('hide')
    }
   
  })
}

function phone_mode(){
  el.bar.classList.remove('hide')
  el.bar.appendChild(el.rotate)
  el.bar.appendChild(el.time)
 

  el.time.style.position = 'static' 
  el.rotate.style.position = 'static'
  
}

function desktop_mode(){
  el.bar.classList.add('hide')

  document.body.appendChild(el.rotate)
  document.body.appendChild(el.time)

  el.time.style.position = 'absolute'
	el.rotate.style.position = 'absolute'
  
}

function loop() {
  read_UI()

  let text = ` ${input.value} `   

  let interval = setInterval(() => {

    add_pause_listener(interval)

    let word = nextWord(text)

    if (word === '') {
      last_space = 0 //сбрасываем для того, чтобы все началось сначала
      start_UI()
      clearInterval(interval) //останавливаем процесс вывода
    }

    el.message.textContent = word
  }, Math.round(60000 / speed))



  
}

add_listeners()
window.addEventListener('resize', check_size)
check_size()

button.addEventListener('click', loop)