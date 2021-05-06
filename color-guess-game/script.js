class Store{
    static getHighestScore(){
        let highestScore
        if(localStorage.getItem('highestScore') === null)
        highestScore = 0
        else{
            highestScore = JSON.parse(localStorage.getItem('highestScore'))
        }
        return highestScore
    }
    static updateScore(){
        let highestScore = Store.getHighestScore()
        if(highestScore<currentScore){
            highestScore = currentScore
        }
        localStorage.setItem('highestScore',highestScore)
    }
}
const hardDivs = document.querySelectorAll('[data-hide]')
const selectButton = document.querySelector('#select')
const divs = document.querySelectorAll('.content div')
const headerRGB = document.querySelector('#rgb')
const currentScoreSpan = document.querySelector('#current')
const highestScoreSpan = document.querySelector('#highest')
const tryOther = document.querySelector('#try')
selectButton.addEventListener('click',()=>{
    
    hardDivs.forEach(div => {
        div.classList.toggle('hide')
        if(div.classList.contains('hide')){
            selectButton.innerHTML = 'Hard'
        }else{
            selectButton.innerHTML = 'Easy'
        }
    })
    giveDivColor()

})
let selectedColor
function giveDivColor(){
    divs.forEach(div => {
        let red,green,blue
        red = Math.floor(Math.random()*255)
        green = Math.floor(Math.random()*255)
        blue = Math.floor(Math.random()*255)
        div.style.backgroundColor = `rgb(${red},${green},${blue})`
    })
    if(selectButton.innerHTML === 'Hard')
    selectedColor = divs[Math.floor(Math.random()*3)].style.backgroundColor
    else
    selectedColor = divs[Math.floor(Math.random()*6)].style.backgroundColor

    headerRGB.innerHTML = selectedColor
    highestScoreSpan.innerHTML = Store.getHighestScore()
}
giveDivColor()

let currentScore = 0
divs.forEach(div => {
    div.addEventListener('click',()=>{
        if(div.style.backgroundColor === selectedColor){
            currentScore++
        }else{
            currentScore = 0
        }
        currentScoreSpan.innerHTML = currentScore
        Store.updateScore()
        giveDivColor()
    })
})
tryOther.addEventListener('click',giveDivColor)
