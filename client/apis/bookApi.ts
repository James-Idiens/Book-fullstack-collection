import request from 'superagent'
import { Book, NewBook } from '../../models/book'

const rootUrl = '/api/v1'

export async function fetchBooks() {
  try {
    const response = await request.get(`${rootUrl}/books`)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createBook(newBook: NewBook): Promise<Book> {
  try {
    const response = await request.post(`${rootUrl}/books`).send(newBook)
    return response.body as Book
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateBook({
  id,
  updatedBook,
}: {
  id: number
  updatedBook: Partial<Book>
}): Promise<Book> {
  try {
    const response = await request
      .put(`${rootUrl}/books/${id}`)
      .send(updatedBook)
    const updatedBookData: Book = response.body
    return updatedBookData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    await request.delete(`${rootUrl}/books/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
