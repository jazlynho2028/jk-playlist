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

  let currentTrackIndex = 1;
  let isPlaying = false;

  // Load track
  function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.path;
    songTitleEl.textContent = track.title;
    artistNameEl.textContent = track.artist;
    
    audioPlayer.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audioPlayer.duration);
    });
    
    if (isPlaying) {
      audioPlayer.play();
      playBtn.textContent = 'Pause';
    }
  }

  // Play/Pause toggle
  function togglePlay() {
    if (isPlaying) {
      audioPlayer.pause();
      playBtn.textContent = 'Play';
    } else {
      audioPlayer.play();
      playBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  }

  // Previous track
  function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = playlist.length - 1;
    }
    loadTrack(currentTrackIndex);
  }

  // Next track
  function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= playlist.length) {
      currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
  }

  // Update progress bar
  function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
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

  // Event listeners
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', nextTrack);
  progressBar.addEventListener('click', setProgress);

  // Load first track
  loadTrack(currentTrackIndex);
});