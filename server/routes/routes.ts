import express, { Request, Response } from 'express'
import { Book, NewBook } from '../../models/book'
import * as db from '../db/db'

const router = express.Router()

// Get all books
router.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await db.getAllBooks()
    res.json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get a single book by ID
router.get('/books/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const book = await db.getBookById(parseInt(id, 10))
    if (book) {
      res.json(book)
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Add a new book
router.post('/books', async (req: Request, res: Response) => {
  const { title, author } = req.body
  const newBook: NewBook = { title, author }
  try {
    const createdBook = await db.createBook(newBook)
    res.json(createdBook)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update a book's details
router.put('/books/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, author } = req.body
  const updatedBook: Partial<Book> = { title, author }
  try {
    const updatedBookResult = await db.updateBook(parseInt(id), updatedBook)
    if (updatedBookResult) {
      res.json(updatedBookResult)
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete a book
router.delete('/books/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleted = await db.deleteBook(parseInt(id, 10))
    if (deleted) {
      res.json({ message: 'Book deleted successfully' })
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
