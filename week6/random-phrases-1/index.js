let phrases = [
  "Nobody respects women more than me.",
  "Why can’t we use nuclear weapons?",
  "You do know you just attacked a Gold Star family?",
  "I’ve been treated very unfairly by this judge. Now, this judge is of Mexican heritage. I'm building a wall, OK? I'm building a wall.",
  "I'm also honored to have the greatest temperament that anybody has.",
  "I sorta get away with things like that.",
  "I could stand in the middle of Fifth Avenue and shoot somebody, and I wouldn't lose any voters, okay? It's, like, incredible.",
  "We won with poorly educated. I love the poorly educated.",
  "We have some bad hombres here, and we're going to get them out."
]

let randomPhrase = phrases[Math.floor(Math.random()* phrases.length)]

let phraseEl = document.getElementById('RandomPhrase');

phraseEl.innerText = randomPhrase;
