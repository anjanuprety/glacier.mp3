//accessing the elements and storing them in the variables
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

//storing all the songs in an array as objects
const allSongs=[
  {
    id: 0,
    title: "One",
    artist: "Ed Sheeran",
    duration: "4:12",
    src: "https://www.dropbox.com/scl/fi/so6171mtkcxvbhfotguj5/Ed_Sheeran-One_Audio-128k.m4a?rlkey=c4vm84b4n7f21pvjywofpro49&st=zocecwnq&dl=1",
    
  },
  {
    id: 1,
    title: "Creature Fear",
    artist: "Bon Iver",
    duration: "3:06",
    src: "https://www.dropbox.com/scl/fi/72ueso1y2ueqgcyxeylbr/Creature-Fear.mp3?rlkey=ghqh957gooffsrc20sjyw8tcb&st=1igtrk8d&dl=1",

  },
  {
    id: 2,
    title: "Cherry Wine",
    artist: "Hozier",
    duration: "4:13",
    src: "https://www.dropbox.com/scl/fi/t3t44bkelnwq6433m6q8j/Hozier_-_Cherry_Wine_-Official_Video-128k.m4a?rlkey=fb33d32nncd4eb66hq0r4r263&st=31wjj5a6&dl=1",
  },
  {
    id: 3,
    title: "Hawaaijahaaj",
    artist: "Sajjan Raj Vaidhya",
    duration: "4:05",
    src: "https://www.dropbox.com/scl/fi/mazx8znpqe48x94j4vktn/Hawaaijahaaj-128k.m4a?rlkey=4zvylxjvk1wftcpnry7vzd0s2&st=2ac6xwkz&dl=1",
  },
  {
    id: 4,
    title: "Leaving My Love Behind",
    artist: "Lewis Capaldi",
    duration: "3:35",
    src: "https://www.dropbox.com/scl/fi/ef9kdd18vmpgvdmwf9huh/Leaving_My_Love_Behind-128k.m4a?rlkey=rltrhobg2z32qfz4rxscwbss0&st=f2olm66t&dl=1",
  },
  {
    id: 5,
    title: "I Know the End",
    artist: "Phoebe Bridgers",
    duration: "5:44",
    src: "https://www.dropbox.com/scl/fi/d4kohnow564kz3f68lohx/I-Know-The-End.mp3?rlkey=8a8m3erb2ecrqup26tj5dxcrt&st=9bqay80d&dl=1",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Crossfire (Live)",
    artist: "Rag'n Bone Man",
    duration: "4:06",
    src: "https://www.dropbox.com/scl/fi/t3t44bkelnwq6433m6q8j/Hozier_-_Cherry_Wine_-Official_Video-128k.m4a?rlkey=fb33d32nncd4eb66hq0r4r263&st=u4upyflk&dl=1",
  },
  {
    id: 8,
    title: "Seventeen Going Under",
    artist: "Sam Fender",
    duration: "4:57",
    src: "https://www.dropbox.com/scl/fi/el9erjhvgad8yrma691jz/Seventeen_Going_Under-128k.m4a?rlkey=84gyptmk5m5yvubteq8wyle1q&st=fr15sdpr&dl=1",
  },
  {
    id: 9,
    title: "SongBird",
    artist: "Fleetwood Mac",
    duration: "3:20",
    src: "https://www.dropbox.com/scl/fi/0qa4saq3bar7ia5966tl9/Songbird_-2004_Remaster-128k.m4a?rlkey=l58gklmx55lhoqipercefphel&st=61e37o88&dl=1",
  },
  {
    id: 10,
    title: "Space Oddity",
    artist: "David Bowie",
    duration: "5:18",
    src: "https://www.dropbox.com/scl/fi/dtguv86aynb2fjwokpn7x/Space-Oddity-2015-Remaster.mp3?rlkey=suii7u99t6q8zpaofmemhci0u&st=573sxrqw&dl=1", 
  },
  {
    id: 11,
    title: "To Be Loved",
    artist: "Adele",
    duration: "6:43",
    src: "https://www.dropbox.com/scl/fi/l89o93cv74y1s7eetkqwl/To_Be_Loved-128k.mp3?rlkey=gq3pnq36xlk8nhvs0iquu8qdz&st=ng12y6ni&dl=1", 
  }
];
/*  {
    id: ,
    title: "",
    artist: "",
    duration: "",
    src: "", 
  }
    */

//Integrating the Web Audio API that lets you generate and process audio in web app
//creating a HTML5 audio element with 'new' and storing in a variable

const audio= new Audio();

//creating an object to keep track of the songs 
let userData={
  //spread operator [...] allows to copy one array into another i.e. concatenate n-arrays into one
  //copying all songs into an array without mutation
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0 //tracking song and its time

};
//creating a function to display songs in the UI
const renderSongs= (array) =>{ 
   //The map() method is used to iterate through an array and return a new array. 
  const songsHTML = array.map((song) => {
    return `<li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
    </li>`
  }).join("") //concatenating all elements of an array into a single string kinda like lists;

  //updating HTML elements to display the songs
  playlistSongs.innerHTML= songsHTML;
};

const getCurrentSongIndex=()=>{
  return userData?.songs.indexOf(userData?.currentSong);
}

  playButton.addEventListener('click', ()=>{
    if(userData?.currentSong===null){
      playSong(userData?.songs[0].id)
    }
    //current playing song to continue
    else{
      playSong(userData?.currentSong.id)
    }
  })

  //sorting songs alphabetically
  const sortSongs=()=>{
    userData?.songs.sort((a,b)=>{
      if(a.title<b.title){
        return -1;
      }
      if(a.title>b.title){
        return 1;
      }
      return 0; //change nothing is a.title===b.title
    })
    return userData?.songs; //returns the songs list
  }

  //passing alphabetically sorted songs data to display in the UI
  renderSongs(sortSongs());


const playSong= id =>{
  const song= userData?.songs.find((song) => song.id===id);
  //set the audio source to the song source and display corresponding data
  audio.src=song.src;
  audio.title=song.title;

  //check if no current song is playing or if the current song is different from the one that is about to be played.

  if(userData?.currentSong=== null || userData.currentSong.id !== song.id){
    audio.currentTime=0;
  }

  //else resume the current song
  else{
    audio.currentTime=userData?.songCurrentTime
  }
  //look for class playing in CSS and add it to playBtn
  userData.currentSong=song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

  const pauseSong=()=>{
    userData.songCurrentTime=audio.currentTime
    //pause the song that was playing
    playButton.classList.remove("playing")
    audio.pause()
  };
const playNextSong=()=>{
  //checking if there's no current song playing in the userData object.
  if(userData?.currentSong===null){
    playSong(userData?.songs[0].id);
  }
  else{
    const currentSongIndex= getCurrentSongIndex();
  }
  //retriving the next song in the playlist
  const nextSong= userData?.songs[currentSongIndex+1];
  playSong(nextSong.id);
}

const playPreviousSong=()=>{
  //checking if there's no current song playing in the userData obj
  if(userData?.currentSong===null){
    return;
  }
  else{
    const currentSongIndex=getCurrentSongIndex();
  }
  //retriving the previous song in the playlist
  const previousSong= userData?.songs[currentSongIndex-1];
  playSong(previousSong.id);
}

const shuffle=()=>{
  //subtracting 0.5 from math.random will give either a positive or negative value
  //This should re-order the elements randomly when sorting
  userData?.songs.sort(()=>Math.random()-0.5);
  userData.currentSong= null;
  userData.songCurrentTime=0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
}

const deleteSong=(id)=>{
  //when deleting a song currently in play, reset
  if(userData?.currentSong?.id===id){
    userData.currentSong=null;
    userData.songCurrentTime=0;
    pauseSong();
    setPlayerDisplay();
  }
  //update userData.songs with only the songs that do not match the id.
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  
  //elements to display when the playList is empty
  if(userData?.songs.length===0){
    const resetButton= document.createElement('button');
    const resetText= document.createTextNode('Reset Playlist');
    resetButton.id="reset";
    resetButton.ariaLabel="Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener('click',()=>{
      userData.songs=[...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();  
    });
  }
}

//To display the current song title and artist in player display
const setPlayerDisplay=()=>{
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle=userData?.currentSong?.title;
  const currentArtist=userData?.currentSong?.artist;

  //setting text content value
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";

}

const setPlayButtonAccessibleText=()=>{
  const song= userData?.currentSong || userData?.songs[0];
  playButton.setAttribute("aria-label", song?.title? `Play ${song.title}`: "Play");
}

//highlightin the current playing song
const highlightCurrentSong=()=>{
  const playlistSongElements= document.querySelectorAll('.playlist-song');
  const songToHighlight= document.getElementById(`song-${userData?.currentSong?.id}`);
  playlistSongElements.forEach(songEl => {
    //removing attribute for each song
    songEl.removeAttribute("aria-current");
   
    //adding attribute back to current playing song
  if(songToHighlight){
    songToHighlight.setAttribute("aria-current", "true")
     }
  });
}

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener('click',playPreviousSong);
shuffleButton.addEventListener('click', shuffle);
audio.addEventListener('ended',()=>{
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = currentSongIndex +1 < userData.songs.length;
  if(nextSongExists){
    playNextSong();
  }
  else{
    userData.currentSong=null;
    userData.songCurrentTime=0;
  }
})

pauseSong();
setPlayerDisplay();
highlightCurrentSong();
setPlayButtonAccessibleText();