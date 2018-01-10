import howler from 'howler'

let tick = null
let lastProgressSave = new Date()
let timer = null

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

function startTimer (store, id) {
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => saveProgress(store, id, true), 2000)
}

function jump (store, value) {
  if (store.state.sound.source !== null) {
    let pos = store.state.sound.howl.seek()
    store.state.sound.howl.seek(pos + value.position)
  } else {
    value.book.progress += value.position
    startTimer(store, value.book.id)
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

function logout (store) {
  store.state.user = null
  localStorage.removeItem('user')
}

function loadUser (store) {
  let json = localStorage.getItem('user')
  if (json !== null) {
    store.state.user = JSON.parse(json)
  }
}

async function tryLogin (store, login) {
  let user = await store.dispatch('loginToServer', login)
  if (user === undefined) return false
  localStorage.setItem('user', JSON.stringify(user))
  store.state.user = user
  return true
}

export default { play, stop, playPause, jump, logout, tryLogin, loadUser }
