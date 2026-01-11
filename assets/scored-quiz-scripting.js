


const $el = {
    cont: $('.option-container'),
    opt: $('.option'),
    prog: $('.progress-bar'),
    quesCont: $('.question-container'),
    question: $('.question'),
    continue: $('.continue'),
    workerImg: $('.worker-img')
}

const $audio = {
    hover: $('.hover')[0],
    click: $('.click')[0],
    end: $('.end')[0],
    success: $('.success')[0]
}

let progress = 0;

let correct = 0;


let fullUrl;
function init(){
    const fullCont = $('.quiz-container');
    
    $audio.hover.volume = 0.03;
    $audio.hover.playbackRate = 7;
    $audio.hover.preservesPitch = false;
    $audio.click.volume = 0.1;
    $audio.click.playbackRate = 1.5;
    $audio.click.preservesPitch = false;
    $audio.success.volume = 0.1;

    fullUrl = window.location.toString();

    // Mutates the original quiz object in place
    randomizeCorrectAnswers(obj);


    $('.start')
        .on('click', function(){
            playAudio($audio.click)
            $('.quiz-title').hide();
            $('.start').hide();
            $el.cont.show();
            $el.quesCont.css('display', 'flex');
            $el.prog.show();
            $el.opt.show();
            $('.disclaimer').hide();
            if($('.skip-quiz').length === 1) $('.skip-quiz').remove();
            createOptions();
            
        })
        .on('mouseenter', function(){
            playAudio($audio.hover)
        })

    if(localStorage.getItem('$badge').includes($urls.url)){
        const href = fullCont.find('.next-quiz').length > 0 ? fullCont.find('.next-quiz').attr('href') : false;

        if(href){
            fullCont.children().first().after(
                $(`<a class="summary-button skip-quiz"  
                    href="${href}"
                    style="
                        box-shadow: 0px 0px 10px rgba(255, 246, 246, 0.75); 
                        text-decoration: none;
                        color: white; 
                        font-size: 1.3em;">
                        Quiz completed already!<br>Go to next one?</a>`
                ))
        }
    }

}
function randomizeCorrectAnswers(quizObj) {
  for (const key in quizObj) {
    const options = quizObj[key].options;

    // Fisher–Yates shuffle (in place)
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  }
}
function createOptions(){
    $el.cont.empty();
    $el.question.text(obj[progress].question)
    setTimeout(()=>{
        obj[progress].options.forEach((option, id) =>{
            setTimeout(()=>{
                const correctAnswer = option[0].slice(-1).includes('T');
                const el = $(`<div class="option" data-tag="${option[1][0] + ' ' + option[1][1]}">
                                ${correctAnswer ? option[0].slice(0, -1) : option[0]}
                            </div>`).appendTo($el.cont);
                if(correctAnswer) el.attr('data-correct', 'true');
                if(id === obj[progress].options.length - 1) eventHandlers();
            }, 100 * id)
        })
    }, 2000)

function eventHandlers(){
    $el.cont[0].offsetHeight;
    const opt = $('.option');
    opt.on('click', function(){
        opt.off('click');
        playAudio($audio.click);
        const el = $(this);
        const arr = el.attr('data-tag').split(' ');

        tags[arr[0]]++;
        tags[arr[1]]++;

        opt.each((id)=>{
            if(typeof opt.eq(id).attr('data-correct') === 'string') opt.eq(id).css('background-color', 'rgb(130, 255, 92)');
        })

        if(typeof el.attr('data-correct') != 'string'){
            el.css('background-color', 'rgba(255, 92, 92, 1)');
            $el.question.html($el.question.text() + '<br><span style="color:red; font-size: 1.5em;">Incorrect...</span>')
        }else{
            playAudio($audio.success)
            $el.question.text('Correct!');
            correct++;
        }

        setTimeout(()=>{
        opt.each((id)=>{
            if(typeof opt.eq(id).attr('data-correct') != 'string') 
                setTimeout(()=>{
                    opt.eq(id).css('animation', 'shrink 0.5s forwards linear')
                    setTimeout(()=>{
                        opt.eq(id).hide();
                    }, 500)
                }, id * 100)
            else{
                setTimeout(()=>{
                    opt.eq(id).html(opt.eq(id).text() + '<br><br>Explanation:<br><span style="font-weight: 800">' + obj[progress].answerContext + '</span>')
                    progress++;
                    $el.prog.animate({width: ((progress/9) * 100) + '%'}, 500);
 
        
        $el.continue
            .show()
            .on('click', function(){
                $el.continue.hide();
                $el.continue.off('click');
                if(progress <= Object.values(obj).length - 1){
                    el.css('background-color', 'aqua');
                    setTimeout(()=>{
                        opt.each((id)=>{
                            setTimeout(()=>{
                                opt.eq(id).css('animation', 'shrink 0.3s linear forwards');
                            }, 100 * id)
                        })
                        
                        setTimeout(()=>{
                            createOptions();
                        }, 500)
                    }, 500)
                }else endQuiz(opt);
            })
            }, 1500)
            }
        })   
        }, 1500)


    })
    .on('mouseenter', function(){
        playAudio($audio.hover);
    })
}

}

function endQuiz(opt){
    const score = 100 * (correct/9);
    // Get weighted matches
    opt.hide();
    const td = interpretResults();
    const qParent = $el.question.parent().css('background-color', td.color);
    $el.prog.hide();
    qParent.hide();
    $('.summary-share').on('click', function(){
        $(this).off('click');
        shareResult(score, td.title);
    })

    setTimeout(()=>{
        qParent.show();
        $('.result-container').show().children().css('font-size', '1.4em');
        if (window.__sharethis__) {
            __sharethis__.initialize();
        }
        $el.question.text(td.title)
        setTimeout(()=>{
            $('.result').html(`You got ${correct} out of 9 correct!<br>` + td.description)
        Object.keys(tags).forEach(k => tags[k] = 0); correct = 0;
        }, 500)
    }, 2000)
}


$('.restart').on('click', function(){
    progress = 0;
    $('.result-container').hide();
    $el.question.parent().css('background-color', '')
    createOptions();
})
function shareResult(score, personalSummary) {
if (navigator.share) {
    console.log(personalSummary);
    navigator.share({
    title: personalSummary.title,
    text: `I scored ${score}% on the ${$urls.descrip} Quiz” I'm a "${personalSummary}"`,
    url: fullUrl
    }).catch((err) => {
    // User cancelled or sharing failed â€” no big dealc
    console.warn('Share canceled or failed:', err);
    });
} else {
    // Optional: fallback behavior for unsupported browsers
    alert('Sharing not supported on this device. Try copying the link manually.');
}
}
function playAudio(el) {
  el.currentTime = 0; // rewind to start
  el.play();
}


function typeKeep(string, el, speed, func){
    let strLen = string.length, i = 0;
    function typing(){
        el.html(string.slice(0, i + 1)); i++;
        if(i < strLen) setTimeout(function(){typing()}, speed)
        else if(func) func();
    }
    typing();
}