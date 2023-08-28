import request from 'supertest'
import server from '../server'
import { describe, it, expect, vi } from 'vitest'
import * as db from '../db/db'
import { NewBook } from '../../models/book'

vi.mock('../db/db')

describe('POST /api/v1/books', () => {
  it('should create a book', async () => {
    // Arrange
    vi.mocked(db.createBook).mockImplementation(async (newBook: NewBook) => {
      return {
        id: 1,
        title: newBook.title,
        author: newBook.author,
      }
    })

    // Act
    const response = await request(server).post('/api/v1/books').send({
      title: 'Test Book',
      author: 'John Doe',
    })

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      title: 'Test Book',
      author: 'John Doe',
    })
  })

  it('should return 500 for internal server error', async () => {
    // Arrange
    vi.mocked(db.createBook).mockRejectedValue(
      new Error('Something went wrong')
    )

    // Act
    const response = await request(server).post('/api/v1/books').send({
      title: 'Test Book',
      author: 'John Doe',
    })

    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Internal server error' })
  })
})

describe('GET /api/v1/books', () => {
  it('should return all books', async () => {
    // Arrange
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
    ]
    vi.mocked(db.getAllBooks).mockResolvedValue(mockBooks)

    // Act
    const response = await request(server).get('/api/v1/books')

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockBooks)
  })

  it('should return 500 for internal server error', async () => {
    // Arrange
    vi.mocked(db.getAllBooks).mockRejectedValue(
      new Error('Something went wrong')
    )

    // Act
    const response = await request(server).get('/api/v1/books')

    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Internal server error' })
  })
})

describe('GET /api/v1/books/:id', () => {
  it('should return a book by id', async () => {
    // Arrange
    const mockBook = { id: 1, title: 'Book 1', author: 'Author 1' }
    vi.mocked(db.getBookById).mockResolvedValue(mockBook)

    // Act
    const response = await request(server).get('/api/v1/books/1')

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockBook)
  })

  it('should return 404 if book not found', async () => {
    // Arrange
    vi.mocked(db.getBookById).mockResolvedValue(null)

    // Act
    const response = await request(server).get('/api/v1/books/1')

    // Assert
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Book not found' })
  })

  it('should return 500 for internal server error', async () => {
    // Arrange
    vi.mocked(db.getBookById).mockRejectedValue(
      new Error('Something went wrong')
    )

    // Act
    const response = await request(server).get('/api/v1/books/1')

    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Internal server error' })
  })
})
