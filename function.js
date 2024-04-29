const questions = [
 {
   question:"What is the tallest animal in the world",
   answers:[
    {text:"Giraffe",correct:true},
    {text:"Shark",correct:false},
    {text:"Whale",correct:false},
 {text:"Crocodile",correct:false},
   ]
 },
 {
   question:"If rice is 50pesos per kilo, how much is sum for 3 1/2 kilo?",
   answers:[
    {text:"180 pesos",correct:false}, 
    {text:"155 pesos",correct:false},
    {text:"175 pesos",correct:true},
  {text:"170 pesos",correct:false},
   ]
 },
 {
   question:"In the relationship who is always right?",
   answers:[
    {text:"Girls",correct:true}, 
    {text:"Boys",correct:false},
    {text:"===",correct:false},
    {text:"==",correct:false},
   ]
 },
 {
   question:"In computer programming array index start from?",
   answers:[
    {text:"1",correct:false}, 
    {text:"5",correct:false},
    {text:"0",correct:true},
    {text:"0.1",correct:false},
   ]
 },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
   currentQuestion.answers.forEach(answer=>{
     const button = document.createElement("button");
     button.innerHTML = answer.text;
     button.classList.add("btn"); answerButtons.appendChild(button);
     if(answer.correct){
       button.dataset.correct = answer.correct;
     }
     button.addEventListener("click", selectAnswer)
   
    });
}
 
const resetState = () => {  
 nextButton.style.display="none";
 while(answerButtons.firstChild){
     answerButtons.removeChild(answerButtons.firstChild);
 }
} 

const selectAnswer = (e) =>{
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();