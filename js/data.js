const convertUnderscoreToSpace = text =>
	typeof text === 'string' ? text.replace(/_/g, ' ').toLowerCase().trim() : ''

class Song {
	constructor(song, album, artist) {
		this.name = convertUnderscoreToSpace(song)
		this.artist = artist
		this.album = album
		this.cover = `../media/covers/${song}.jpg`
		this.src = `../media/audios/${song}.mp3`
	}

	addColors(overlay, bg) {
		this.overlay = overlay
		this.background = bg

		return this
	}
}

class TaylorSong extends Song {
	constructor(song, album) {
		super(song, album, 'Taylor swift')
	}
}

const songs = [
	new TaylorSong('begin_again', 'RED').addColors(
		'linear-gradient(180deg, rgba(244, 1, 1, 0.37) 0%, rgba(79, 41, 71, 0.85) 100%)',
		'rgba(250, 0, 0, 0.2)'
	),
	new Song('everything_i_need', 'aquaman', 'skylar grey').addColors(
		'linear-gradient(180deg, rgba(239, 255, 0, 0.4) 0%, rgba(36, 83, 35, 0.85) 100%)',
		'rgba(249, 179, 0, 0.4)'
	),
	new TaylorSong('lover', 'lover').addColors(
		'linear-gradient(rgba(241, 56, 119, 0.53) 0%, rgb(175 66 164 / 47%) 100%)',
		'rgba(239, 55, 121, 0.53)'
	),
]

