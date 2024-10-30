let message = document.querySelector('.message')
let button = document.getElementById('button')
let input = document.getElementById('input')
let rotate = document.getElementById('rotate')
let pause = document.getElementById('pause')
let time = document.getElementById('time')

let input_time = document.getElementById('input_time')
let button_time = document.getElementById('button_time')

let last_space = 0
let current_space

let speed = 250

function start_styles() {
	button.classList.add('hide')
	input.classList.add('hide')
	rotate.classList.add('hide')

	pause.classList.remove('hide')

	document.querySelector('section').classList.add('color')
}

function remove_styles() {
	button.classList.remove('hide')
	input.classList.remove('hide')
	rotate.classList.remove('hide')
	pause.classList.add('hide')

	document.querySelector('section').classList.remove('color')
}

function nextWord(text) {
	current_space = text.indexOf(' ', last_space + 1)

	let word = text.slice(last_space, current_space)
	// [last_space, current_space] = [current_space, last_space]
	last_space = current_space

	return word
}

function set_button_continue() {
	button.textContent = 'continue'
}

function set_button_start() {
	button.textContent = 'start'
}

function add_rotate_listener() {
	rotate.addEventListener('click', () => {
		last_space = 0
		message.textContent = ' '
		input.value = ''
		set_button_start()
	})
}

function add_pause_listener(interval) {
	pause.addEventListener('click', () => {
		clearInterval(interval)
		remove_styles()
		set_button_continue()
	})
}

function add_button_time_listener(){
	button_time.addEventListener('click', () => {

		time.classList.remove('hide')
		time_container.classList.add('hide')
		speed = input_time.value

	})
}

function add_time_listener() {

	time_container = document.querySelector('.time_container')

	time.addEventListener('click', () => {
		
		time.classList.add('hide')
		time_container.classList.remove('hide')

		add_button_time_listener()

	})
}


function loop() {
	start_styles()


	let text = ' ' + input.value + ' ' //для корректной работы

	let interval = setInterval(() => {

			


		add_pause_listener(interval)
		add_rotate_listener()

		let word = nextWord(text)

		if (word === '') {
			last_space = 0 //сбрасываем для того, чтобы все началось сначала
			remove_styles()
			clearInterval(interval) //останавливаем процесс вывода
		}

		message.textContent = word
	}, Math.round(60000 / speed))
}

add_time_listener()
button.addEventListener('click', loop)
