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

// --- Lenient answer matching (deterministic, no LLM) ---
// Normalizes case/punctuation/whitespace, then accepts the answer if it is
// close enough to the expected one by edit distance, or if every significant
// word of the expected answer appears (fuzzily) in the user's answer. This
// makes typos, capitalisation, punctuation, extra spaces and word order pass.
function _normAns(s){
    return (s||"").toLowerCase()
        .replace(/[^a-z0-9\s]/g," ")
        .replace(/\s+/g," ")
        .trim();
}
function _lev(a,b){
    var m=a.length,n=b.length,i,j;
    if(!m) return n; if(!n) return m;
    var prev=[],cur=[];
    for(j=0;j<=n;j++) prev[j]=j;
    for(i=1;i<=m;i++){
        cur[0]=i;
        for(j=1;j<=n;j++){
            var cost=a.charAt(i-1)===b.charAt(j-1)?0:1;
            cur[j]=Math.min(cur[j-1]+1, prev[j]+1, prev[j-1]+cost);
        }
        var t=prev; prev=cur; cur=t;
    }
    return prev[n];
}
function _sim(a,b){ var ml=Math.max(a.length,b.length); return ml===0?1:(1-_lev(a,b)/ml); }
function looseMatch(userRaw, correctRaw){
    var u=_normAns(userRaw), c=_normAns(correctRaw);
    if(!u || !c) return false;
    if(u===c) return true;
    // whole-string edit-distance tolerance (looser for longer answers)
    var ml=Math.max(u.length,c.length);
    var threshold = ml<=4 ? 0.75 : (ml<=8 ? 0.80 : 0.82);
    if(_sim(u,c) >= threshold) return true;
    // order-independent: same words in any order (handles reordering)
    if(_sim(u.split(" ").sort().join(" "), c.split(" ").sort().join(" ")) >= threshold) return true;
    // token match: every meaningful word of the expected answer appears (fuzzily)
    var stop={a:1,an:1,the:1,of:1,is:1,are:1,and:1,to:1,in:1,on:1,by:1,for:1,with:1};
    var cw=c.split(" ").filter(function(w){ return w && !stop[w]; });
    var uw=u.split(" ").filter(Boolean);
    if(cw.length){
        var all=cw.every(function(x){
            return uw.some(function(y){ return y===x || _sim(y,x)>=0.8; });
        });
        if(all) return true;
    }
    return false;
}

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
                        if(looseMatch(answer, orCommands[i].replace("/", ""))){//Checks if whether the answer starts with "/", if it does then it checks if the answer(lowercase) mathes with the correct answer
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
