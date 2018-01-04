import howler from 'howler'

let tick = null

let play = function (store, value) {
  store.state.sound.howl = new howler.Howl({
    src: ['/static/audio/test.mp3'],
    html5: true,
    onpause: () => { popup() },
    onstop: () => { popup() }
  })

  store.state.sound.source = value
  let book = store.getters.getBook(value)
  store.state.sound.howl.seek(book.progress)
  store.state.sound.howl.play()
  tick = setInterval(() => update(store), 500)
}

let stop = function (store, value) {
  let seek = store.state.sound.howl.seek()
  store.getters.getBook(store.state.sound.source).progress = seek
  store.state.sound.howl.stop()
  store.state.sound.howl = null
  store.state.sound.source = null
  clearInterval(tick)
}

let update = function (store) {
  let seek = store.state.sound.howl.seek()
  store.getters.getBook(store.state.sound.source).progress = seek
}

let popup = function () {
  alert('pause')
}

let playPause = function (store, value) {
  let sound = store.state.sound
  if (sound.source !== null) {
    stop(store, value)
  } else {
    play(store, value)
  }
}

export default { play, stop, playPause }
