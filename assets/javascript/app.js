var time = 25;
var isClockRunning = true;
var indexQuestion = 0;
var indexOptions = 0;
var questionDiv;
var optionDiv = $('#options')
var ans;
var count;
var rightAnsDiv;
var userPick;
var index = 0;
var intervalId;
var correctAnswers = 0
var questionsTotal = 0
var imgWinDiv;


var questions = [
    {
        question: "If my dog was as ugly as you, I'd shave its butt,and make it walk backwards:",
        options: ["Benny", "Tommy", "Yeah Yeah", "Ham"],
        rightAnswer: 3,
        imgWin: "https://media.giphy.com/media/l4FAW3z37RofhwqJ2/giphy.gif",
        imgLose: "https://media.giphy.com/media/l4FBd5ckjAB5BVzCo/giphy.gif"
    },

    {
        question: 'What decade does this movie take place in?',
        options: ['"1960s"', '"1970s"', '"1950s"', '"1980s"'],
        rightAnswer: 0,
        imgWin: "https://media.giphy.com/media/44PcCYeLHJ3Bm/giphy.gif",
        imgLose: "https://media.giphy.com/media/YhMFnzXDqYHSw/giphy.gif"
    },

    {
        question: "Which kid is new to the neighborhood?",
        options: ["squints", "benny", "ham", "smalls"],
        rightAnswer: 3,
        imgWin: "https://media.giphy.com/media/3oKHWexr5fG5f04kPm/giphy.gif",
        imgLose: "https://media.giphy.com/media/l1KXqW1L1DkCaFafu/giphy.gif"
    },

    {
        question: "Heroes get remembered, but legends never die",
        options: ["Benny", "The Babe", "Smalls", "Phillips"],
        rightAnswer: 1,
        imgWin: "https://media.giphy.com/media/3oKHWlQ6XmhZl2UU2A/giphy.gif",
        imgLose: "https://media.giphy.com/media/10krTfqs6pE1a/giphy.gif"
    }
    
]

function startTimer() {
    time = 25
    $('#time').show()
    if (isClockRunning) {
        intervalId = setInterval(count, 1000);
        isClockRunning = false;
    }
};

function count() {
    if (time === 0) {

        setTimeout(messageNoOption, 1000)
        setTimeout(start, 4000)
        stopTimer();
        time = 25

    }
    if (time > 0) {
        time--;
    }
    $('#time').text(time);
}

function stopTimer() {

    clearInterval(intervalId);
    isClockRunning = true;
    $('#time').empty()
    $('#time').hide()
   
}
function displayAll() {

    displayQuestion()
    displayOptions()
}

function displayQuestion() {

    questionDiv = $('#question')
    quest = $('<p>').text(questions[index].question)
    questionDiv.append(quest)
    index++
}

function displayOptions() {

    for (i = 0; i < questions[0].options.length; i++) {
        optionDiv = $('#options')
        ans = $('<p>').text(questions[index - 1].options[i])
        ans.addClass("ch")
        ans.attr('id', 'name' + i)
        optionDiv.append(ans)
    }

}

function checkForWin() {
   
    if (isClockRunning) {


        $('.ch').on('click', function (e) {
            userPick = $(this).attr("id");
            if (userPick == ('name' + questions[index - 1].rightAnswer)) {
                stopTimer()
                correctAnswers++
                setTimeout(messageWin, 1000)
                setTimeout(start, 4000)
            }

            else if (userPick) {
                stopTimer()
                setTimeout(messageLoss, 1000)
                setTimeout(start, 7000)
            }
        })
    }
    questionsTotal++
}

$('#start').on("click", function () {

    start();
    $('#start').remove()

});

 
function start() {
    time = 25
    $('#time').text(time);
    $('#time').hide()
    if (questionsTotal == questions.length) {
        $('#message').hide()
        $('#message').hide()
        setTimeout(messageTotal, 0)
    }
    $('#timeClock').show()
    $('#gif').hide()
    $('#main').show()
    $('#message').hide()
    $('#second').hide()
    empty()
    displayAll();
    checkForWin();

    startTimer()

}

function empty() {
    if (index == 1 || index > 1) {
        questionDiv.empty()
        optionDiv.empty()
    }
    $('#message').empty()
    $('#gif').empty()
}

function messageLoss() {
    $('#gif').show()
    $('#message').show()
    $("#main").hide()
    $('#second').show()
    var imgWinDiv = $('<img>').attr("src", questions[index - 1].imgLose)
    imgWinDiv.addClass("img-responsive col-sm-12")
    $('#gif').append(imgWinDiv)
    $('#message').text("You Struck Out. " + "The right answer is: " + questions[index - 1].options[questions[index - 1].rightAnswer])
}

function messageWin() {
    $('#second').show()
    $('#gif').show()
    $('#message').show()
    $("#main").hide()
    $('#message').text("Home Run! Run the bases.")
    var imgWinDiv = $('<img>').attr("src", questions[index - 1].imgWin)
    imgWinDiv.addClass("img-responsive col-sm-12")
    $('#gif').append(imgWinDiv)
}

function messageNoOption() {
    $('#second').show()
    $('#gif').show()
    $("#main").hide()
    $('#message').show()
    $('#message').text("You missed the ball!")
}

function messageTotal() {
    $('#second').show()
    $('#gif').show()
    $('#main').hide()
    $('#total').text("You hit " + correctAnswers + " out of " + questionsTotal + " at bats!")
}

 $(document).ready(function () {
    $('#message').hide()
    $('#second').hide()
    $('#time').hide()
    $('#timeClock').hide()

});