function populateDummyData () {
  let books = []
  console.log('setting up dummy data')
  for (let index = 0; index < 2; index++) {
    let date = randomDate(new Date(2017, 0, 1), new Date())
    let length = 4201 // Math.floor(Math.random() * 40000)
    let progressState = Math.floor(Math.random() * 3)

    let progress
    switch (progressState) {
      case 0: progress = 0; break
      case 1: progress = length * Math.random(); break
      case 2: progress = length; break
    }

    let book = {
      title: getString(),
      author: getString(),
      id: Math.floor(Math.random() * 10000000),
      length: length,
      progress: progress,
      lastPlayed: date,
      source: '/static/audio/test.mp3',
      cover: 'https://images-na.ssl-images-amazon.com/images/I/51ea%2B8DhKrL.jpg'
    }
    books.push(book)
  }

  return books
}

function getMetadata () {
  return {
    title: getString(),
    author: getString(),
    album: getString(),
    filename: `${getString()}${getString()}${getString()}`,
    path: `${getString()}${getString()}${getString()}`,
    id: Math.floor(Math.random() * 10000000)
  }
}

function populateImports () {
  let imports = []
  for (let index = 0; index < 15; index++) {
    imports.push(getMetadata())
  }
  return imports
}

function getString () {
  return Math.random().toString(36).substring(7)
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getSearchResults () {
  return [
    'https://images-na.ssl-images-amazon.com/images/I/51AEI3isFiL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51JVp8YV3ZL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51Yt1NrsfbL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51VNlzbfpXL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51zbaGLMMfL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51PHThzD-2L.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51nQKQZWR-L.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/416ZrnNLj6L.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61WFjEDBktL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/611uatTt36L.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61aUY28XbmL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/41Mq7Ss7lPL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/31I4V%2BLaeJL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51ea%2B8DhKrL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51xzy3xHgNL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51OOD3HzgzL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51kgOTJWNXL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51lCGlVV7HL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/41xpRvU1IhL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/510Cy8v8H3L.jpg'
  ]
}

export default { populateDummyData, getMetadata, getSearchResults, populateImports }
