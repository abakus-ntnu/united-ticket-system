import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router()

const prisma = new PrismaClient()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// Fetch a ticket
router.get('/attendees/:id', async (req, res) => {
  res.send('Fetching ticket')
})

// Set photo_consent true/false
router.patch('/attendees/:id/photo_consent', (req, res) => {
  res.send('Setting photo consent')
})

export default router;
