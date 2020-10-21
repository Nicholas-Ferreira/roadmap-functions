import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import express from 'express'
import { snapshotToArray } from './utils/firebase.utils'
admin.initializeApp(functions.config().firebase);

const app = express();
const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('OK')
});

app.get('/repository', async (req, res) => {
  const snapshot = await db.collection('repositories').get()
  const repositories = snapshotToArray(snapshot)

  return res.status(200).json(repositories)
});

app.get('/repository/:id', async (req, res) => {
  const { id } = req.params
  try {
    const repository = await db.collection('repositories').doc(id).get()
    return res.status(200).json({ _id: repository.id, ...repository.data() })
  } catch (error) {
    return res.status(500).json({ error })
  }
});

app.get('/repository/:id/branch', async (req, res) => {
  const { id } = req.params
  try {
    const repository = await db.collection('repositories').doc(id).get()
    const branches = repository.data().branches
    return res.status(200).json(branches)
  } catch (error) {
    return res.status(500).json({ error })
  }
});

export const roudmap = functions.https.onRequest(app);
