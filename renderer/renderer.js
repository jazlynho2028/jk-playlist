import playlist from './playlist.js';

document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const songTitleEl = document.getElementById('song-title');
  const artistNameEl = document.getElementById('artist-name');
  const coverArtEl = document.getElementById('cover-art')

  const playImg = playBtn.querySelector('img');

  let currentTrackIndex = 1;
  let isPlaying = false;

  // Load track
  function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.audioPath;
    songTitleEl.textContent = track.title;
    artistNameEl.textContent = track.artist;
    coverArtEl.src = track.coverPath;
    document.documentElement.style.setProperty('--album-bg', track.bgColor);
    
    audioPlayer.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audioPlayer.duration);
    });
  }

  // Event listeners
  playBtn.addEventListener('click', playPause);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', nextTrack);
  progressBar.addEventListener('click', setProgress);

  // Play/Pause toggle
  function playPause() {
    if (isPlaying) {
      isPlaying = false;
      audioPlayer.pause();
      playImg.src = '../assets/icons/play-circle.png';
    } else {
      isPlaying = true;
      audioPlayer.play();
      playImg.src = '../assets/icons/pause.png';
    }
  }
  
  // Previous track
  function prevTrack() {
    isPlaying = !isPlaying;
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = playlist.length - 1;
    }
    loadTrack(currentTrackIndex);
    playPause();
  }

  // Next track
  function nextTrack() {
    isPlaying = !isPlaying;
    currentTrackIndex++;
    if (currentTrackIndex >= playlist.length) {
      currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    playPause();
  }

  // Update progress bar
  function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    progressBar.style.background = `linear-gradient(to right, #FFFFFF ${progressPercent}%, #FFFFFF40 ${progressPercent}%)`;
    currentTimeEl.textContent = formatTime(currentTime);
  }

  // Set progress bar
  function setProgress(e) {
    audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
  }

  // Format time
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${formatLeading0(mins)}:${formatLeading0(secs)}`;
  }
  function formatLeading0(num) {
    return `${num < 10 ? '0' : ''}${num}`;
  }

  // Load first track
  loadTrack(currentTrackIndex);
});