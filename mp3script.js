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
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",

  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
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
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  }
];

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
const renderSongs= array =>{ 
   //The map() method is used to iterate through an array and return a new array. 
  const songsHTML = array.map((song) => {
    return `<li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
    </li>`
  }).join(" ") //concatenating all elements of an array into a single string kinda like lists;

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
  renderSongs(sortSongs);


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