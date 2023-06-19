import request from 'superagent'
import { Book, NewBook } from '../../models/book'

const rootUrl = '/api/v1'

export const fetchBooks = async () => {
  try {
    const response = await request.get(`${rootUrl}/books`)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createBook = async (newBook: NewBook): Promise<Book> => {
  try {
    const response = await request.post(`${rootUrl}/books`).send(newBook)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateBook = async (
  id: number,
  updatedBook: Partial<Book>
): Promise<Book> => {
  try {
    const response = await request
      .put(`${rootUrl}/books/${id}`)
      .send(updatedBook)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteBook = async (id: number): Promise<void> => {
  try {
    await request.delete(`${rootUrl}/books/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
