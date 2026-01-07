


const $el = {
    cont: $('.option-container'),
    opt: $('.option'),
    prog: $('.progress-bar'),
    quesCont: $('.question-container'),
    question: $('.question'),
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

function init(){
    $audio.hover.volume = 0.03;
    $audio.hover.playbackRate = 7;
    $audio.hover.preservesPitch = false;
    $audio.click.volume = 0.1;
    $audio.click.playbackRate = 1.5;
    $audio.click.preservesPitch = false;
    $audio.success.volume = 0.1;
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
            createOptions();
        })
        .on('mouseenter', function(){
            playAudio($audio.hover)
        })

}

function createOptions(){
    $el.cont.empty();
    $el.question.text(obj[progress].question)
    setTimeout(()=>{
        obj[progress].options.forEach((option, id) =>{
            setTimeout(()=>{
                $(`<div class="option" data-tag="${option[1][0] + ' ' + option[1][1]}">${option[0]}</div>`).appendTo($el.cont);
                if(id === 3) eventHandlers();
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

        opt.not(el).remove();

        el.css('background-color', 'aqua')
        progress++;
        $el.prog.animate({width: ((progress/(Object.values(obj).length - 1)) * 100) + '%'}, 500);
        setTimeout(()=>{
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
    })
    .on('mouseenter', function(){
        playAudio($audio.hover);
    })
}

}

function endQuiz(opt){
    // Get weighted matches
    opt.hide();
    const td = interpretResults();
    const qParent = $el.question.parent().addClass('finish-question')
    $el.prog.hide();
    qParent.hide();
    $('.summary-share').on('click', function(){
        $(this).off('click');
        shareResult(td.title);
    })

    sendQuizData(getSlug(window.location.href), td.title);
    setTimeout(()=>{
        qParent.show();
        $('.result-container').show().children().css('font-size', '1.4em');
        if (window.__sharethis__) {
            __sharethis__.initialize();
        }
        $el.question.text(td.title)
        setTimeout(()=>{
            $('.result').html(td.description)
        Object.keys(tags).forEach(k => tags[k] = 0); correct = 0;
        }, 500)
    }, 900)
}


$('.restart').on('click', function(){
    progress = 0;
    $('.result-container').hide();
    $el.question.parent().css('background-color', '')
    createOptions();
})

function shareResult(personalSummary) {
if (navigator.share) {
    navigator.share({
    title: personalSummary.title,
    text: `I played the ${quizTitle} Quiz — I'm a "${personalSummary.title}" 🕯️`,
    url: window.location.href
    }).catch((err) => {
    // User cancelled or sharing failed — no big dealc
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

function getSlug(url) {
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  return parts[parts.length - 1];
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
