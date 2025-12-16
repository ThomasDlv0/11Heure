import {playlist} from "./playlist.js";
import {initList} from "./initList.js";

globalThis.i = 0;
let isPlay = false;
let random = false;
let audio = new Audio(playlist[i].audio);

const videoBackground = document.querySelector("#videoBackground");
const music = document.querySelector("#music");
const slider = document.querySelector("#slider");
const coverMove = document.querySelector("#coverMove");
const cover = document.querySelector("#cover");
const rotateDisc = document.querySelector(".rotate-disc");
const artiste = document.querySelector("#artiste h2");
const titre = document.querySelector("#titre h2");
const album = document.querySelector("#album p");
const year = document.querySelector("#year p");
const timeLine = document.querySelector('#timeLine');
let innerTimeLine = document.querySelector("#innerTimeLine");
const nav = document.querySelector("#nav-play");
const rdm = document.querySelector('#rdm');
const forward = document.querySelector(".forward-anime");
const playBtn = document.querySelector(".play");
const backward = document.querySelector(".backward-anime");
const mc = new Hammer(slider);
const mcTime = new Hammer(timeLine);

audio.currentTime = 0;


// Prend les nth-child dans le css pour faire les rayllure du disque
const items = slider.children;
const rotateDiscBlack = items[items.length - 5];
const rotateDiscBlack0 = items[items.length - 4];
const rotateDiscBlack1 = items[items.length - 3];
const rotateDiscBlack2 = items[items.length - 2];

function updateTrackInfo() {
    // Update les informations dans le tableau sur la page web
    cover.src = playlist[i].cover;
    titre.textContent = playlist[i].titre;
    artiste.textContent = playlist[i].artiste;
    year.textContent = playlist[i].annee;
    album.textContent = playlist[i].album;
    music.style.backgroundImage = `url(${playlist[i].backgroundCover})`;
    
    setTimeout(() => {
        coverMove.style.transition = "none"
        coverMove.style.transform = "none"
        coverMove.src = playlist[i].cover
    }, 400);
}
updateTrackInfo();

function updatePlayState() {

//    videoBackground = new Video(playlist[i].audio);

    if (isPlay) {
        playBtn.classList.replace("fa-circle-play", "fa-circle-pause");

        setTimeout(()=> {
            // mets le petit rond blanc pour faire un CD
            rotateDisc.style.display = "block";

            // mets des bordures noir pour faire les rayllure d'un CD
            rotateDiscBlack.style.display = "block";
            rotateDiscBlack0.style.display = "block";
            rotateDiscBlack1.style.display = "block";
            rotateDiscBlack2.style.display = "block";

            // mets une animation pour faire une rotation infinie
            slider.style.animation = "rotateDisk 7s linear infinite";
        }, 1000);
        // mets des bordures noir pour faire un CD
        rotateDisc.style.border = "solid 2px black";
        cover.style.border = "solid 3px black";
        coverMove.style.border = "solid 3px black";

        // mettre des rondeurs aux images pour faire une simulation de CD
        coverMove.style.borderRadius = '50%';
        cover.style.borderRadius = '50%';

        // mets une animation pour faire un truc plus smooth
        coverMove.style.transition = '0.9s linear';
        cover.style.transition = '0.9s linear';

    } else {
        playBtn.classList.replace("fa-circle-pause", "fa-circle-play");

        // enlève toutes les bordures
        rotateDisc.style.border = "none";
        cover.style.border = "none";
        coverMove.style.border = "none";

        // enlève toutes les bordures noir pour faire les rayllure d'un CD
        rotateDiscBlack.style.display = "none";
        rotateDiscBlack0.style.display = "none";
        rotateDiscBlack1.style.display = "none";
        rotateDiscBlack2.style.display = "none";

        // enlève l'animation de rotation infinie
        slider.style.animation = "none";

        // enlève le petit rond blanc
        rotateDisc.style.display = "none";

        // enlève rondeur aux images
        coverMove.style.borderRadius = '5%';
        cover.style.borderRadius = '5%';

        // mets une animation pour faire un truc plus smooth
        coverMove.style.transition = '.5s linear';
        coverMove.style.transition = '.5s linear';
    }
}

updatePlayState();

function playNewTrack() {
    if (isPlay) {
        audio.pause();
        
        audio = new Audio(playlist[i].audio);
        audio.play();
        isPlay = true;
        
    }
}

globalThis.nextTrack = (fromList= true) =>{
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "translateX(-100%)";

    if (fromList) {
        if (random) {
            i = Math.floor(Math.random()*playlist.length);
        } else {
            if (i < (playlist.length - 1)) {
                i++;
            } else {
                i = 0;
            }
        }
    }

    coverMove.style.transform = "translateX(-100%) rotateY(90deg)";

    updateTrackInfo();

    playNewTrack();

    updatePlayState();
}

function prevTrack() {
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "translateX(100%)";

    if (random) {
        i = Math.floor(Math.random()*playlist.length);
    } else {
        if (i > 0) {
            i--;
        } else {
            i = playlist.length - 1;
        }
    }

    coverMove.style.transform = "translateX(100%)";

    updateTrackInfo();

    playNewTrack();

    updatePlayState();
}

updateTrackInfo();


mcTime.on("pan", (event) =>  {

    setTimeout(() => {
        let currentPan = event.deltaX;
        
        if(audio.currentTime < audio.duration) {
            audio.currentTime = currentPan*audio.duration/timeLine.clientWidth;
        }
    }, 10)
})

// Swipe left
mc.on("swipeleft", () => {
    nextTrack();
});

// Swipe right
mc.on("swiperight", () => {
    prevTrack();
});

forward.addEventListener("click", () => {
    nextTrack();
});

backward.addEventListener("click", () => {
    prevTrack();
});

nav.addEventListener("click", () => {
    if (!isPlay) {
        audio.play();
    } else {
        audio.pause();
    }
    
    console.log(playBtn);
    
    isPlay = !isPlay;
    
    updatePlayState();
});

rdm.addEventListener("click", () => {
    random = !random;
    
    if (random) {
        rdm.style.color = "grey";
    } else {
        rdm.style.color = "black";
    }
})

setInterval( () => {
    if (isPlay) {
        if (audio.currentTime >= audio.duration) {
            nextTrack();
        }
        let widthBar = (100 * audio.currentTime) / audio.duration;
        innerTimeLine.style.width = widthBar + "%";
    }
}, 100);

initList();