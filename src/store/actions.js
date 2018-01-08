import howler from 'howler'

let tick = null
let lastProgressSave = new Date()

let play = function (store, value) {
  let book = store.getters.getBook(value)
  store.state.sound.howl = new howler.Howl({
    src: book.source,
    html5: true
  })

  store.state.sound.source = value
  store.state.sound.howl.seek(book.progress)
  store.state.sound.howl.play()
  tick = setInterval(() => update(store), 500)
}

let stop = function (store) {
  let seek = store.state.sound.howl.seek()
  store.getters.getBook(store.state.sound.source).progress = seek
  saveProgress(store, store.state.sound.source, true)
  store.state.sound.howl.stop()
  store.state.sound.howl = null
  store.state.sound.source = null
  clearInterval(tick)
}

let update = function (store) {
  let seek = store.state.sound.howl.seek()
  let book = store.getters.getBook(store.state.sound.source)
  book.progress = seek
  book.lastPlayed = new Date()
  saveProgress(store, book.id, false)
}

let playPause = function (store, value) {
  let sound = store.state.sound
  if (sound.source !== null) {
    stop(store)
  } else {
    play(store, value)
  }
}

let saveProgress = function (store, id, force) {
  if (!force) {
    let change = (new Date().getTime() - lastProgressSave.getTime()) / 1000
    if (change < 10) return // TODO: this should be a setting
    lastProgressSave = new Date()
  }
  let book = store.getters.getBook(id)

  store.dispatch('saveProgressToServer', book)
}

export default { play, stop, playPause }
