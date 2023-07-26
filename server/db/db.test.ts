import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import * as db from './db'
import connection from './connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('createBook', () => {
  it('should add a book to the book database', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
    }
    const insertedBook = await db.createBook(newBook)
    expect(insertedBook.title).toBe(newBook.title)
    expect(insertedBook.author).toBe(newBook.author)

    const fetchedBook = await connection('books')
      .where({ id: insertedBook.id })
      .first()
    expect(fetchedBook.title).toBe(newBook.title)
    expect(fetchedBook.author).toBe(newBook.author)
  })
})

describe('updateBook', () => {
  it('should update a book in the book database', async () => {
    const updatedBook = {
      title: 'Updated Book',
      author: 'Prince Harry',
    }
    const bookIdToUpdate = 1
    const changedBook = await db.updateBook(bookIdToUpdate, updatedBook)

    // Ensure that the returned value is not null
    expect(changedBook).not.toBeNull()

    if (changedBook) {
      expect(changedBook.title).toBe(updatedBook.title)
      expect(changedBook.author).toBe(updatedBook.author)

      const fetchedBook = await connection('books')
        .where({ id: bookIdToUpdate })
        .first()

      expect(fetchedBook.title).toBe(updatedBook.title)
      expect(fetchedBook.author).toBe(updatedBook.author)
    } else {
      return null
    }
  })
})
