function logic(){
  document.querySelector('.img').classList.toggle('visible')
  document.body.classList.toggle('black')

}
const canvas = document.querySelector('#confetti')
const jsConfetti = new JSConfetti()
document.querySelector('.btn').addEventListener('click', logic)
document.querySelector('.btn').addEventListener('click',()  => {
  if (document.querySelector('.img').classList.contains('visible')){
    jsConfetti.addConfetti()
  } 
})
