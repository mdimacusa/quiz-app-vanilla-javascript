const data = [
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
 {
   question:`"The quality of  computer is looking good."<br><br> What is the noun in the sentence?`,
   answers:[
    {text:"Quality",correct:false}, 
    {text:"Good",correct:false},
    {text:"Computer",correct:true},
    {text:"Looking",correct:false},
   ]
 },
 {
    question:`"The snake in the Philippines is dangerous, but cobra is venomous in all"<br><br> What is the proper noun in the sentence?`,
   answers:[
    {text:"Snake",correct:false}, 
    {text:"Philippines",correct:false},
    {text:"Venomous",correct:false},
    {text:"Cobra",correct:true},
   ]
 },
 {
    question:`"It's very hot outside, would you like to bring cap, to protect your head from the sun."<br><br> What is the common noun in the sentence?`,
   answers:[
    {text:"Cap",correct:true}, 
    {text:"Head",correct:false},
    {text:"Protect",correct:false},
    {text:"Outside",correct:false},
   ]
 },
 {
    question:`"Samantha wants to play in computer."<br><br> What is the countable noun in the sentence?`,
   answers:[
    {text:"Computer",correct:true}, 
    {text:"Wants",correct:false},
    {text:"Samantha",correct:false},
    {text:"Play",correct:false},
   ]
 },
 {
    question:`"I'm so thirsty, can you get me water"<br><br> What is the not countable noun in the sentence?`,
   answers:[
    {text:"Thristy",correct:false}, 
    {text:"Water",correct:true},
    {text:"Get",correct:false},
    {text:"Can",correct:false},
   ]
 },
 {
    question:`"I've learned javascript programming and a little bit english yesterday, It's awesome."<br><br> What is the pronoun in the sentence?`,
   answers:[
    {text:"Javascript",correct:false}, 
    {text:"Programming",correct:false},
    {text:"English",correct:false},
    {text:"It's",correct:true},
   ]
 },
 
];

//generate shaffle question
let questions = Object.values(data);
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j],array[i]];
  }
}
shuffle(questions);

//set variable and get the element ID
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//set initial variable to 0
let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    //set initial variable to 0
    currentQuestionIndex = 0;
    score = 0;
    //put text on next button
    nextButton.innerHTML = "Next";
    //execute showQuestion function
    showQuestion();
}

const showQuestion = () => {
    //execute resetState function
    resetState();
    //get current question in object data, it depends on entries
    let currentQuestion = questions[currentQuestionIndex];
    //get the order number of question , this variable increment in every loop
    let questionNo = currentQuestionIndex + 1;
    
    //set question number with current question in text
    questionElement.innerHTML = questionNo + ".) " + currentQuestion.question;
    
    //set alphaLetter to 0
    let alphaLetter = 0;
   //display all question and answers per entries
   currentQuestion.answers.forEach(answer=>{
     const button = document.createElement("button");
     //add order letter
     let orderLetter = String.fromCharCode(97 + alphaLetter);
     
     //set button answer in text
     button.innerHTML = `${orderLetter.toUpperCase()}. ${answer.text}`;
     
     //Increment alphaletter in every loop 
     alphaLetter++;
     //add class name in button
     button.classList.add("btn");
     //append button element answer to the div parent
     answerButtons.appendChild(button);
     //add data-correct as attribute to the button and asign value to data-correct
     button.dataset.correct = answer.correct;
     //when button answer is click
     button.addEventListener("click", selectAnswer);

    });
}
 
const resetState = () => {  
 //set hide next button
 nextButton.style.display="none";
 //remove all first child answer button
 while(answerButtons.firstChild){
     answerButtons.removeChild(answerButtons.firstChild);
 }
} 

const selectAnswer = (e) =>{
    //get the selected answer button
    const selectedBtn = e.target;
    //set variable to true
    const isCorrect = selectedBtn.dataset.correct === "true";
    //if the variable is true then add class correct to the selected button and increment the score 
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    //if variable is false add class incorrect to selected button 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    //set all appended answer button to array obect and display button dataset attribute, if the dataset of the selected button is true then add class correct 
    Array.from(answerButtons.children).forEach(button=>{
         
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        //execute to disabled all answer button, after selecting button
        button.disabled = true;
    });
    //after selecting the answer the next button will show
    nextButton.style.display = "block";
}
const handleNextButton = () => {
    //increment currentQuestionIndex
    currentQuestionIndex++;
    //if currentQuestionIndex is less than question length then continue to show function showQuestion
    if(currentQuestionIndex < questions.length){
        showQuestion();
    //else execute showScore function
    }else{
        showScore();
    }
}

const showScore = () => {
    //execute resetState function
    resetState();
    //set text value in question element as score
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    //set next button to play again
    nextButton.innerHTML = "Play Again";
    //show button
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
  //if currentQuestionIndex is less than question length then execute handleNextButton functiom
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    //else execute startQuiz function
    }else{
        location.reload();
        //startQuiz();
    }
});

//execute startQuiz function
startQuiz();
