import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router()

const prisma = new PrismaClient()

// Get all attendees
router.get('/attendees')

// Insert a list/one attendee(s)
router.post('/attendees')

// Set admitted = NOW()
router.patch('/attendees/:id/admitted')

// Set active true/false
router.patch('/attendees/:id/active')

// Set email_sent true/false - should accept a list of ids
router.patch('/attendees/:id/email_sent')

export default router;
