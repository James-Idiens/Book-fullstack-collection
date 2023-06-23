import request from 'superagent'
import { Book, NewBook } from '../../models/book'

const rootUrl = '/api/v1'

export async function fetchBooks() {
  const response = await request.get(`${rootUrl}/books`)
  return response.body
}

export async function createBook(newBook: NewBook): Promise<Book> {
  const response = await request.post(`${rootUrl}/books`).send(newBook)
  return response.body as Book
}

export async function updateBook({
  id,
  updatedBook,
}: {
  id: number
  updatedBook: Partial<Book>
}): Promise<Book> {
  const response = await request.put(`${rootUrl}/books/${id}`).send(updatedBook)
  const updatedBookData: Book = response.body
  return updatedBookData
}

export async function deleteBook(id: number): Promise<void> {
  await request.delete(`${rootUrl}/books/${id}`)
}
