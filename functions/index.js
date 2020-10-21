const admin = require('firebase-admin')
const functions = require('firebase-functions');
const express = require('express')
const app = express();
const { snapshotToArray } = require('./utils/firebase.utils')

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
app.get('/', (req, res) => {
  const date = new Date();
  const hours = (date.getHours() % 12) - 3;
  res.json({ bongs: 'BONG '.repeat(hours) });
});

app.get('/repository', async (req, res) => {
  const snapshot = await db.collection('repositories').get()
  const repositories = snapshotToArray(snapshot)

  return res.status(200).json(repositories)
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
