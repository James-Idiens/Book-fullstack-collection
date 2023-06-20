import request from 'supertest'
import { describe, it, expect, vi } from 'vitest'
import * as db from './db'
import server from '../server'

vi.mock('./db')

describe('POST /api/v1/books', () => {
  it('should create a book', async () => {
    // Arrange
    vi.mocked(db.createBook).mockImplementation(async (newBook) => {
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
    expect(response.body).toMatchInlineSnapshot(`
      {
        "author": "John Doe",
        "id": 1,
        "title": "Test Book",
      }
    `)
  })
})
