const WHITE_KEYS = ['z','x','c','v','b','n','m']
const BLACK_KEYS = ['s','d','g','h','j']
const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click',()=> playNote(key))
})
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
document.addEventListener('keydown',(e)=>{
    if(e.repeat)
    return
    const key = e.key
    if(WHITE_KEYS.indexOf(key)>-1){
        const whiteKeyIndex = WHITE_KEYS.indexOf(key)
        playNote(whiteKeys[whiteKeyIndex])
    }
    if(BLACK_KEYS.indexOf(key)>-1){
        const blackKeyIndex = BLACK_KEYS.indexOf(key)
        playNote(blackKeys[blackKeyIndex])
    }
})
function playNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended',()=>{
        key.classList.remove('active')
    })
}