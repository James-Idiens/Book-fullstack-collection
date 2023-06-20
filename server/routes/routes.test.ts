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
