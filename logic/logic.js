function sumTo(n){
  return (1 + n) / 2 * n
}

document.querySelector('.button_calculate').addEventListener('click', e=>{
  document.querySelector('.result').classList.add('active')

// посчитаем и выведем 
  let input = document.querySelector('input')
  let value = +input.value
  value <=1000 ? value = sumTo(value) : value = 'не потянешь'
  
  let p = document.createElement('p')
  p.classList.add('result__value')

  let text = document.createTextNode(value)
  p.appendChild(text)

  document.querySelector('.result__p').appendChild(p)

// передвинем balck_bg
document.querySelector('.black_bg').classList.add('move')

})



document.querySelector('.button_continue').addEventListener('click', e => {
	document.querySelector('.result').classList.remove('active')

  // удаляем предыдущий резульат
  document.querySelectorAll('.result__value').forEach(item => {
		item.remove()
	})

  // двигаем black_bg назад
  document.querySelector('.black_bg').classList.remove('move')


})