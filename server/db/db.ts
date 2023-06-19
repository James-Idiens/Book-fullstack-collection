import connection from './connection'
import { Book, NewBook } from '../../models/book'

const db = connection

export async function createBook(newBook: NewBook): Promise<Book> {
  const insertedBook = await db('books').insert(newBook).returning('*')
  return insertedBook[0]
}

export async function updateBook(
  id: number,
  updatedBook: Partial<Book>
): Promise<Book | null> {
  const updatedCount = await db('books').where('id', id).update(updatedBook)
  if (updatedCount > 0) {
    const book = await db('books').where('id', id).first()
    return book
  }
  return null
}

export async function getAllBooks(): Promise<Book[]> {
  const books = await db('books')
  return books
}

export async function getBookById(id: number): Promise<Book | null> {
  const book = await db('books').where('id', id).first()
  return book || null
}

export async function deleteBook(id: number): Promise<boolean> {
  const deletedCount = await db('books').where('id', id).del()
  return deletedCount > 0
}
