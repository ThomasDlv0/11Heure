import {playlist} from "./playlist.js";



function initList() {

    playlist.forEach(function(value,index) {
        const list = document.querySelector("#list");
        const divItems = document.createElement('div');
        const imgItems = document.createElement('img');
        const titreItems = document.createElement('span');
        const barreItems = document.createElement('span');
        const artiste = document.createElement('span');
        const playIcon = document.createElement('i');
        const loveIcon = document.createElement('i');
        let isPLay = false;
        let isLove = false;
        divItems.classList.add("divItems");
        imgItems.classList.add("imgItems");
        list.append(divItems);
        imgItems.src = playlist[index].cover;
        divItems.append(imgItems);
        titreItems.textContent = playlist[index].titre
        divItems.append(titreItems);
        barreItems.textContent = "-"
        divItems.append(barreItems);
        artiste.textContent = playlist[index].artiste
        divItems.append(artiste);
        playIcon.classList.add("fa-solid");
        playIcon.classList.add("fa-play");
        divItems.append(playIcon);
        loveIcon.classList.add("fa-heart");
        loveIcon.classList.add("fa-regular");
        divItems.append(loveIcon);

        playIcon.addEventListener("click", () => {
            i = index;

            // enverse de 
            isPLay = !isPLay
            
            nextTrack(false);
                if (isPLay) {
                    playIcon.classList.replace("fa-pause", "fa-play");
                } else {
                    playIcon.classList.replace("fa-play", "fa-pause");
                }
        });
        
        loveIcon.addEventListener("click", () => {
            i = index;
            isLove = !isLove
            if (isLove) {
                loveIcon.classList.replace("fa-regular", "fa-solid");
            } else {
                loveIcon.classList.replace("fa-solid", "fa-regular");
            }
        });
    });
}


export {initList};