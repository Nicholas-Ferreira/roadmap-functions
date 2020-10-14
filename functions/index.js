const functions = require('firebase-functions');
const express = require('express')
const app = express();

const repositories = {
  '1': {
    id: 1,
    name: "Fundamental",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1200px-Closed_Book_Icon.svg.png",
    branches: [
      { id: 1, name: "Git - Version Control" },
      { id: 2, name: "Basic Terminal Usage" },
      { id: 3, name: "Data Structures & Algorithms" },
      { id: 4, name: "GitHub" },
      { id: 5, name: "Licenses" },
      { id: 6, name: "Semantic Versioning" },
      { id: 7, name: "SSH" },
      { id: 8, name: "HTTP/HTTPS and APIs" },
      { id: 9, name: "Design Patterns" },
      { id: 10, name: "Character Encodings" },
    ]
  },
  '2': {
    id: 2,
    name: "Front-End",
    photo: "https://icon-library.com/images/frontend-icon/frontend-icon-24.jpg"
  },
  '3': {
    id: 3,
    name: "Back-End",
    photo: "https://hackernoon.com/hn-images/1*GkzKz-wfxLaShBREklifbg.png"
  },
  '4': {
    id: 4,
    name: "DevOps",
    photo: "https://www.vhv.rs/dpng/d/215-2152054_transparent-model-icon-png-devops-icon-png-download.png"
  }
}


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
app.get('/', (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) - 3;
  res.json({ bongs: 'BONG '.repeat(hours) });
});

app.get('/repository', (req, res) => {
  const retorno = []
  for (const rep in repositories) {
    if (repositories.hasOwnProperty(rep)) {
      const repository = repositories[rep];
      retorno.push(repository)
    }
  }
  return res.status(200).json(retorno)
});

app.get('/repository/:id', (req, res) => {
  const { id } = req.params
  const repository = repositories[id] || {}
  return res.status(200).json(repository)
});

app.get('/repository/:id/branch', (req, res) => {
  const { id } = req.params
  const repository = repositories[id]
  const branches = repository.branches ? repository.branches : []

  return res.status(200).json(branches)
});

exports.app = functions.https.onRequest(app);
