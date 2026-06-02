window.onload = function(){
var myLink = document.getElementById('buttoon');
var prevButton = document.getElementById("buttoon2");
prevButton.onclick = function(){
    link = (String(window.location.href).substring(0,String(window.location.href).lastIndexOf("/")+1) + String(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) -1));//fix this kid
    location.href=link;


}

myLink.onclick = function(){
    elem = this.getAttribute("data-attr");


    link = (String(window.location.href).substring(0,String(window.location.href).lastIndexOf("/")+1)+ String(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) + 1));

    if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(elem) - 1){
    location.href=link;
        }






}







var qhasfinished = false;
function soundex(s){
    var a = s.toLowerCase().split(''),
        f = a.shift(),
        r = '',
        codes = { a: '', e: '', i: '', o: '', u: '', b: 1, f: 1, p: 1, v: 1, c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5, n: 5, r: 6 };

    r = f +
        a
        .map(function(v, i, a) {
            return codes[v]
        })
        .filter(function(v, i, a) {
            return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
        })
        .join('');

    return (r + '000').slice(0, 4).toUpperCase();
};

var Question = document.querySelector('[id$="active"]');
function initBarCount(){
    var start = Date.now()
    var divTimeLeft = document.getElementById("divTimeLeft");
    var divCountdownBar = document.getElementById("divCountdownBar");
    var word = document.getElementById("qpara").innerHTML.split(' ').length;
    var time = document.getElementById("TimeLeft");

    var startTimer = setInterval(barCount, 100);
    function barCount(){

        if(divTimeLeft.clientWidth < divCountdownBar.clientWidth){
            if(!(parseInt(Question.getAttribute('data-tries')) >= 3)){
            divTimeLeft.style.width =  ((((Date.now()-start)/1000)/(word/2)) * (700))+ "px";
 }

            if(time.innerHTML > 0){
                if(!(parseInt(Question.getAttribute('data-tries')) >= 3)){
                time.innerHTML = (Math.trunc(((word)*500 - (Date.now()-start))/1000));}}

        if(time.innerHTML == 0){
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(document.getElementById('buttoon').getAttribute("data-attr")) - 1){
        $(document.getElementById("buttoon")).fadeIn(200);}
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) > 1){

        $(document.getElementById("buttoon2")).fadeIn(200);
        }
        time.innerHTML = 0;
        if(qhasfinished == false){
        qhasfinished = true;
        if(result == 1){

        Question.style.background = "linear-gradient(90deg, rgba(6,184,0,1) 0%, rgba(7,117,0,1) 100%)";
        document.getElementById("qpara").style.color = "white";
        }
        else{

        Question.style.background = "linear-gradient(90deg, rgba(184,0,0,1) 0%, rgba(117,0,0,1) 100%)";
        document.getElementById("qpara").style.color = "white";
            document.querySelector('[id$="CorrectOrNot"]').innerHTML = "Wrong";
                document.querySelector('[id$="activecorrect"]').style.background = "linear-gradient(90deg, rgba(184,0,0,1) 0%, rgba(117,0,0,1) 100%)";
                $(document.querySelector('[id$="activecorrect"]')).fadeIn(800);
                 if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(document.getElementById('buttoon').getAttribute("data-attr")) - 1){
        $(document.getElementById("buttoon")).fadeIn(200);}
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) > 1){

        $(document.getElementById("buttoon2")).fadeIn(200);
        }
        }}
        }}
        else{
        divTimeLeft.style.width = divCountdownBar.clientWidth + "px";
        }
    }
}
initBarCount();

var P = $('.sentences > p');

P.hide().contents().each(function() {
    var Words;
    if (this.nodeType === 3) {
        Words = '<span> ' + this.data.split(/\s+/).join(' </span><span> ') + ' </span>';
        $(this).replaceWith(Words);
    } else if (this.nodeType === 1) {
        this.innerHTML = '<span> ' + this.innerHTML.split(/\s+/).join(' </span><span> ') + ' </span>';
    }
});

P.find('span').hide().each(function() {
    if( !$.trim(this.innerHTML) ) {
        $(this).remove();
    }
});
if(Question.style.display !== "none"){
P.show().find('span').each(function(I) {
    $(this).delay(200 * I).fadeIn(800);


});}
var time = document.getElementById("TimeLeft");
var result = 0;
var tries = parseInt(Question.getAttribute('data-tries'));
function submitOnEnter(event){
if(result == 1 && tries == 0){ // i dont understand why but for some reason when u get correct tries become 0 sooooo ig it is what et ezz
 event.preventDefault();
event.target.value = "";



}
    if(tries >= 3){

    event.preventDefault();
event.target.value = "";


    }
    if(time.innerHTML > 0 && tries < 3){
    if(event.which === 13 && !event.shiftKey){

        answer = event.target.value;
        correctAnswer = document.getElementById("qpara").getAttribute("data-answer");
        commands = correctAnswer.split(";");
        for (var i = 0; i < commands.length; i++) {
                command = commands[i];
                var orCommands;
                var orResults = [];
                if (command.includes(":")){// ":" means or so you can add multiple statements
                    orCommands = command.split(":");

                }
                else{
                    orCommands = [command];

                }
                console.log(orCommands);
                for (var i = 0; i < orCommands.length; i++) {

                if(orCommands[i].charAt(0) === "/"){ //If command is strating with / then make sure these words are the answer
                    if(orCommands[i].charAt(1) === "#"){// If commands starts with # that means it accepts spelling mistakes
                        if(soundex(answer.toLowerCase()) === soundex(orCommands[i].replace("#", "").replace("/", "").toLowerCase())){

                           orResults.push(1);


                    }
                    else{
                        orResults.push(0);
                    }}
                    if(orCommands[i].charAt(1) === "?"){
                        if(answer === orCommands[i].replace("?", "").replace("/", "")){//non case sensitive

                        orResults.push(1);


                    }
                    else{
                        orResults.push(0);
                    }}
                    if(orCommands[i].charAt(1) !== "#" && orCommands[i].charAt(1) !== "?"){// If commands starts with # that means it accepts spelling mistakes
                     console.log(orCommands[i])
                        if(answer.toLowerCase() === orCommands[i].replace("/", "").toLowerCase()){//Checks if whether the answer starts with "/", if it does then it checks if the answer(lowercase) mathes with the correct answer
                            console.log("ANSWER       " + (answer.toLowerCase()));
                            console.log("CORRECT ANS   " + (orCommands[i].replace("/", "").toLowerCase()))
                        orResults.push(1);


                    }
                    else{
                        orResults.push(0);
                    }}





                }
				if(orCommands[i].charAt(0) === "!"){



                    if(orCommands[i].charAt(1) === "?"){
                        if(answer.includes(orCommands[i].replace("?", "").replace("!", ""))){//check if input answer includes correct answer case sensitive




                    }
                    }
                    if(orCommands[i].charAt(1) !== "#" && orCommands[i].charAt(1) !== "?"){// If commands starts with ! it cheks if input answer includes correct answer case insensitive but DOSENT accept spelling mistakes
                        if(answer.toLowerCase().includes(orCommands[i].replace("!", "").toLowerCase())){



                    }
                  }}
                if(orCommands[i].charAt(0) === ","){//contains some sentences


                    if(orCommands[i].charAt(1) === "#"){// If commands starts with # that means it accepts spelling mistakes
                        var correct = orCommands[i].replace("#", "").replace(",", "").toLowerCase();
                        var answer_words = answer.split(" ");
                        var correct_words = correct.split(" ");
                        var soundex_correct_words =  correct_words.map(soundex).toString();
                        var soundex_answer_words = answer_words.map(soundex).toString();


                        if(soundex_answer_words.includes(soundex_correct_words) == true){
                            orResults.push(1);
                        }
                        else{
                        orResults.push(0);
                    }







                        }
                        if(orCommands[i].charAt(1) === "@"){// dosent accept spelling mistakes
                        var correct = orCommands[i].replace("@", "").replace(",", "").toLowerCase();
                        var answer_words = answer.toLowerCase().split(" ");
                        var correct_words = correct.toLowerCase().split(" ");
                        var soundex_correct_words =  correct_words.toString();
                        var soundex_answer_words = answer_words.toString();

                        if(soundex_answer_words.includes(soundex_correct_words) == true){
                            orResults.push(1);
                        }
                        else{
                        orResults.push(0);
               }








                        }
                        if(orCommands[i].charAt(1) === "$"){// If commands starts with $ it dosent search for consecutive string searchs each word differently and if that word is there then it allows unlike the # one
                        var correct = orCommands[i].replace("$", "").replace(",", "").toLowerCase();
                        var answer_words = answer.split(" ");
                        var correct_words = correct.split(" ");
                        var soundex_correct_words =  correct_words.map(soundex);
                        var soundex_answer_words = answer_words.map(soundex);

                        var check = soundex_correct_words.every(i => soundex_answer_words.includes(i));
                        if(check == true){
                            orResults.push(1);
                        }
                        else{
                        orResults.push(0);
         }
                        }
                        if(orCommands[i].charAt(1) === "?"){// Searches if certain words are in a sentence (not case sensitive)
                        var correct = orCommands[i].replace("?", "").replace(",", "").toLowerCase();
                        var answer_words = answer.toLowerCase().split(" ");
                        var correct_words = correct.split(" ");


                        var check = correct_words.every(i => answer_words.includes(i));
                        if(check == true){
                            orResults.push(1);
                        }
                        else{
                        orResults.push(0);
             }
                        }
                        if(orCommands[i].charAt(1) === "%"){//Searches if certain words are in a sentence case sensitive
                        var correct = orCommands[i].replace("%", "").replace(",", "");
                        var answer_words = answer.split(" ");
                        var correct_words = correct.split(" ");


                        var check = correct_words.every(i => answer_words.includes(i));

                        if(check == true){
                            orResults.push(1);
                        }
                        else{
                        orResults.push(0);
}
                        }


                }




                }
                console.log(orResults);
                if (orResults.includes(1) && orResults){
                    // Prevents the addition of a new line in the text field (not needed in a lot of cases)

                result = 1;

                (Question.setAttribute('data-tries', 3))
                if(parseInt(Question.getAttribute('data-tries')) == 3 && orResults.includes(1) && orResults){
                 if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(document.getElementById('buttoon').getAttribute("data-attr")) - 1){
        $(document.getElementById("buttoon")).fadeIn(200);}//Next buttons and previous buttons display
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) > 1){

        $(document.getElementById("buttoon2")).fadeIn(200);//Next buttons and previous buttons display
        }
                document.querySelector('[id$="activecorrect"]').style.background = "linear-gradient(90deg, rgba(6,184,0,1) 0%, rgba(7,117,0,1) 100%)";
                $(document.querySelector('[id$="activecorrect"]')).fadeIn(800);
                Question.style.background = "linear-gradient(90deg, rgba(6,184,0,1) 0%, rgba(7,117,0,1) 100%)";
        document.getElementById("qpara").style.color = "white";

                P.show().find('span').each(function(I) {
             $(this).show();

});}


                }
                if(orResults.includes(1) == false && orResults){
                if(tries != 3){
                (Question.setAttribute('data-tries', tries+=1));}
                if(tries == 3 && orResults.includes(1) == false && orResults){
                 if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(document.getElementById('buttoon').getAttribute("data-attr")) - 1){
        $(document.getElementById("buttoon")).fadeIn(200);}
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) > 1){

        $(document.getElementById("buttoon2")).fadeIn(200);
        }
                document.querySelector('[id$="CorrectOrNot"]').innerHTML = "Wrong";
                document.querySelector('[id$="activecorrect"]').style.background = "linear-gradient(90deg, rgba(184,0,0,1) 0%, rgba(117,0,0,1) 100%)";
                $(document.querySelector('[id$="activecorrect"]')).fadeIn(800);
                Question.style.background = "linear-gradient(90deg, rgba(184,0,0,1) 0%, rgba(117,0,0,1) 100%)";

        document.getElementById("qpara").style.color = "white";
        P.show().find('span').each(function(I) {
             $(this).show();

});


                }

                }


  }
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
}

else{

event.preventDefault();
event.target.value = "";
    document.querySelector('[id$="CorrectOrNot"]').innerHTML = "Wrong";
     if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) < parseInt(document.getElementById('buttoon').getAttribute("data-attr")) - 1){
        $(document.getElementById("buttoon")).fadeIn(200);}
        if(parseInt(String(window.location.href).substr(String(window.location.href).length - 5).match(/\d/g).join("")) > 1){

        $(document.getElementById("buttoon2")).fadeIn(200);
        }
                document.querySelector('[id$="activecorrect"]').style.background = "linear-gradient(90deg, rgba(184,0,0,1) 0%, rgba(117,0,0,1) 100%)";
                $(document.querySelector('[id$="activecorrect"]')).fadeIn(800);

}}


document.getElementById("comment").addEventListener("keypress", submitOnEnter);

}
