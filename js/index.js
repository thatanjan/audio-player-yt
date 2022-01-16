const audio = document.getElementById('audio')
const root = document.querySelector(':root')

const innerContainerEl = document.querySelector('.inner__container')
const grandContainerEl = document.querySelector('.grand__container')
const overlayEl = document.querySelector('.overlay')

// song details
const titleEl = document.querySelector('.title')
const artistEl = document.querySelector('.artist')
const albumEl = document.querySelector('.album')
const currentTimeEl = document.querySelector('.current__time')
const totalTime = document.querySelector('.total__time')

// controls
const trackThumbEl = document.querySelector('.track__thumb')
const playPauseBtn = document.getElementById('play-pause')
const nextBtn = document.querySelector('.fa-forward')
const prevBtn = document.querySelector('.fa-backward')
const playRangeContainerEl = document.querySelector('.play__range__container')

const CLICK = 'click'

let currentSongIndex = 0

const loadSong = () => {
	const { src, name, artist, cover, album, background, overlay } =
		songs[currentSongIndex]

	audio.src = src
	titleEl.textContent = name
	artistEl.textContent = artist
	albumEl.textContent = album
	currentTimeEl.textContent = '0:00'

	innerContainerEl.style.backgroundImage = `url(${cover})`
	grandContainerEl.style.background = background
	overlayEl.style.background = overlay

	root.style.setProperty('--audio-played', '0%')
}

const formatDuration = duration => {
	const { floor } = Math
	const minutes = floor(duration / 60)
	const seconds = floor(duration % 50)

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

audio.onloadedmetadata = function () {
	totalTime.textContent = formatDuration(audio.duration)
}

loadSong()

const playSong = () => {
	audio.play()
	playPauseBtn.classList.remove('fa-play')
	playPauseBtn.classList.add('fa-pause')
}

const pauseSong = () => {
	audio.pause()
	playPauseBtn.classList.add('fa-play')
	playPauseBtn.classList.remove('fa-pause')
}

const togglePlayPause = () => {
	if (audio.paused) {
		playSong()
		return true
	}

	pauseSong()
}

const playNextSong = () => {
	currentSongIndex++

	if (currentSongIndex > songs.length - 1) currentSongIndex = 0

	audio.src = songs[currentSongIndex].src

	loadSong()
	playSong()
}

const playPrevSong = () => {
	currentSongIndex--

	if (currentSongIndex < 0) currentSongIndex = songs.length - 1

	audio.src = songs[currentSongIndex].src

	loadSong()
	playSong()
}

const updateProgress = () => {
	const { currentTime, duration } = audio

	const progress = (currentTime / duration) * 100

	currentTimeEl.textContent = formatDuration(currentTime)
	root.style.setProperty('--audio-played', `${progress}%`)
}

const setProgress = event => {
	const totalWidth = playRangeContainerEl.clientWidth

	const clickX = event.offsetX

	const { duration } = audio

	const progress = (clickX / totalWidth) * duration

	audio.currentTime = progress
}

// event listeners

playPauseBtn.addEventListener(CLICK, togglePlayPause)
nextBtn.addEventListener(CLICK, playNextSong)
prevBtn.addEventListener(CLICK, playPrevSong)
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', playNextSong)
playRangeContainerEl.addEventListener(CLICK, setProgress)

