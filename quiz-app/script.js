const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "c",
    },
];
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submit = document.getElementById('submit')
const quiz = document.getElementById('quiz')
let currentQuiz=0
let score=0;
loadQuiz()
function loadQuiz(){
    deSelect()
    const currentQuizData = quizData[currentQuiz]
    questionEl.textContent = currentQuizData.question
    a_text.textContent = currentQuizData.a
    b_text.textContent = currentQuizData.b
    c_text.textContent = currentQuizData.c
    d_text.textContent = currentQuizData.d
}

function getSelected(){
    const answerEls = document.querySelectorAll('.answer')
    let answer=undefined
    answerEls.forEach((answerEl)=>{
        if(answerEl.checked)
        answer=answerEl.id
    })  
    return answer
}
function deSelect(){
    const answerEls = document.querySelectorAll('.answer')
    answerEls.forEach((answerEl)=>{
        answerEl.checked = false
    })  
}


submit.addEventListener('click',()=>{
    
    const answer = getSelected()
    if(answer){
        if(answer === quizData[currentQuiz].correct)
        score++
        currentQuiz++;
        if(currentQuiz<quizData.length){
            loadQuiz()
        }else{
            quiz.innerHTML = 
            `
                <h2>You have answered ${score} out of ${quizData.length} questions correctly.</h2>
                <button onclick=location.reload()>Reload</button>
            `
        }
    }
})
