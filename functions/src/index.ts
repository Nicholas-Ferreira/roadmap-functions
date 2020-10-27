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
app.post('/login', async (req, res) => {
  const { email, senha } = req.body
  const snapshot = await db.collection('users')
    .where('email', '==', email)
    .where('senha', '==', senha)
    .get()

  const user = snapshotToArray(snapshot)[0]
  return res.status(200).json(user)
});

app.get('/user', async (req, res) => {
  const snapshot = await db.collection('users').get()
  const users = snapshotToArray(snapshot)

  return res.status(200).json(users)
});

app.post('/user', async (req, res) => {
  const { name, email, senha } = req.body

  await db.collection('users').add({ name, email, senha })

  return res.status(200).json({ name, email, senha })
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
    const snapshot = await db.collection('repositories').doc(id).collection('branches').get()
    const branches = snapshotToArray(snapshot)
    return res.status(200).json(branches)
  } catch (error) {
    return res.status(500).json({ error })
  }
});

export const roudmap = functions.https.onRequest(app);
