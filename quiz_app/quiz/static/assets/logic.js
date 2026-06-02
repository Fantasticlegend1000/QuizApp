window.onload = function(){
var navelements = document.getElementsByClassName("navelement");
var navbar = document.getElementById("navbar");
function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
        if (arrayElements[i] === elementToFind) {
            return i;
        }
    }
    return null; //not found
}


var prevselected = navelements[0];
 navbar.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  if($(event.target).hasClass('selected') != true){
        event.target.style.color = "orange";
  }





  // reset the color after a short delay

}, false);
navbar.addEventListener("mouseout", function( event ) {
  // highlight the mouseover target
  event.target.style.color = "";



  // reset the color after a short del

}, false);

navbar.addEventListener("click", function( event ){
    prevselected.classList.remove("selected");

    event.target.classList.add("selected");
    prevselected = event.target;

},false);
var card = document.querySelectorAll(".flip-card-inner");
card.forEach(el => el.addEventListener('click', event => {
    console.log("E");
  event.currentTarget.classList.toggle('is-flipped');
}));


checkbox = document.getElementById("vehicle1");

function linkgobrr(link){
    if(checkbox.checked == false){
        console.log("AYY");
        document.getElementsByClassNameById("bruuhhh").href = "#";
    }
}
$("#bar").each(function(){
  $(this).find("#bar-inner").animate({
    width: $(this).attr("data-width")
  },2000)
});

}




  function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
  var questions = []
  var tries;
  function MCQIsCorrect(correct, option, element){

    var Question = element.getAttribute("data-question");

    var co = correct.split(",");

    console.log(co);
    var question = document.getElementById("q" + Question);
    var mco = []; //mco = multiple correct options
    var correctOption;
    var alloptions = document.getElementById("q" + Question).querySelectorAll("div");
    if(question.getAttribute("data-mode") == "False"){
    console.log("FASLE Q");
    for (var i = 0; i < alloptions.length; i++){
      elem = alloptions[i];
      if (elem.getAttribute("data-answer") == correct){

        correctOption = elem;
      }



    }}
    else{
        for (var i = 0; i < alloptions.length; i++){
      elem = alloptions[i];
      if (co.includes(elem.getAttribute("data-answer"))){

        mco.push(elem);
        console.log(mco);
      }
    }}

    if(tries == undefined){

      tries = 4 - co.length;

    }


    if(question.getAttribute("data-mode") == "True"){
      var correctSelected = 0;
      var prevChoice;

      console.log(tries);
      if(element != prevChoice){
        prevChoice = element;

        if((co.includes(element.getAttribute("data-answer")) == true) && (tries > 0)){

          element.style.background = "#6ad93b";
        element.style.color = "white";
        element.style.border = "8px solid green";
        correctSelected += 1;



        }
        if((co.includes(element.getAttribute("data-answer")) == false) && (tries > 0)){
          element.style.background = "#d9503b";
          element.style.color = "white";
          element.style.border = "8px solid red";
          tries -= 1;

        }


      }
if(tries == 0 || (correctSelected ==  4 - co.length)){

        for(var i = 0; i < mco.length; i++){
              mco[i].style.background = "#6ad93b";
              mco[i].style.color = "white";
      }
         question.style.height = "800px";

  $("#expa" + Question).show();}


      } //E






    else{
    if (questions.length == 0){
      console.log(questions);
      questions.push(Question)
      console.log(questions);
       if (option == correct){

        element.style.background = "#6ad93b";
        element.style.color = "white";
        element.style.border = "8px solid green";

    }
    else {
        element.style.background = "#d9503b";
        element.style.color = "white";
        element.style.border = "8px solid red";

    }

    }
    if (questions.includes(Question)){


    }
    else{
     questions.push(Question)
     console.log(questions);
     if (correct == option){

        element.style.background = "#6ad93b";
        element.style.color = "white";
        element.style.border = "8px solid green";
    }
    else {
        element.style.background = "#d9503b";
        element.style.color = "white";
        element.style.border = "8px solid red";


    }}
  if(element != correctOption){
  async function delayedGreeting() {
      correctOption.style.background = "#6ad93b";
      correctOption.style.color = "white";
      await sleep(700);
      correctOption.style.background = "#a3c793";
      await sleep(700);
      correctOption.style.background = "#6ad93b";
}
      delayedGreeting();}


  question.style.height = "800px";

  $("#expa" + Question).show();}





}



