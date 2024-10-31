let el = {
  message : document.querySelector('.message'),
  button : document.getElementById('button'),
  input : document.getElementById('input'),
  rotate : document.getElementById('rotate'),
  pause : document.getElementById('pause'),
  time : document.getElementById('time'),
  input_time : document.getElementById('input_time'),
  button_time : document.getElementById('button_time'),
  time_container : document.querySelector('.time_container'),
  bg : document.querySelector('section'),
}

let last_space = 0
let current_space

let speed = 250

function read_UI() {
  el.button.classList.add('hide')
  el.input.classList.add('hide')
  el.rotate.classList.add('hide')
  el.time.classList.add('hide')
  el.pause.classList.remove('hide')
  el.bg.classList.add('color')
}

function start_UI() {
  el.button.classList.remove('hide')
  el.input.classList.remove('hide')
  el.rotate.classList.remove('hide')
  el.pause.classList.add('hide')
  el.time.classList.remove('hide')
  el.bg.classList.remove('color')
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

function add_listeners(interval){

  el.rotate.addEventListener('click', () => {
    last_space = 0
    el.message.textContent = ' '
    input.value = ''
    set_button('start')
  })

  el.pause.addEventListener('click', () => {
    clearInterval(interval)
    start_UI()
    set_button('continue')
  })

  el.button_time.addEventListener('click', () => {
    el.time.classList.remove('hide')
    el.time_container.classList.add('hide')
    speed = input_time.value
  })

  el.time.addEventListener('click', () => {
    el.time.classList.add('hide')
    el.time_container.classList.remove('hide')
  })
}

function loop() {
  read_UI()

  let text = ` ${input.value} `   

  let interval = setInterval(() => {

    let word = nextWord(text)

    if (word === '') {
      last_space = 0 //сбрасываем для того, чтобы все началось сначала
      start_UI()
      clearInterval(interval) //останавливаем процесс вывода
    }

    el.message.textContent = word
  }, Math.round(60000 / speed))

  add_listeners(interval)
}

button.addEventListener('click', loop)