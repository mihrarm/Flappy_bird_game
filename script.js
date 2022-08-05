let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp-1.png";
pipeDown.src = "img/flappy_bird_pipeBottom.png";

const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -=25;
    fly.play();
}

const pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}
var score = 0;

let xPos = 10;
let yPos = 150;
let grav = 1.5;
function draw () {
    ctx.drawImage(bg, 0, 0);

    for(i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 105){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height - pipeUp.height)
            });
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y +pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos+=grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);
}

pipeDown.onload = draw;