import {
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchBooks, deleteBook } from '../apis/bookApi'
import { Book } from '../../models/book'
import UpdateBookForm from './UpdateBookForm'
import { useState } from 'react'

export default function BookCollection() {
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[]>(['books'], fetchBooks)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books'])
    },
  })

  const handleDelete = (bookId: number) => {
    deleteMutation.mutate(bookId)
  }

  const [showUpdateFormId, setShowUpdateFormId] = useState<number | null>(null)

  const handleShowUpdateForm = (bookId: number) => {
    setShowUpdateFormId(bookId)
  }

  if (!books || isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong...</div>
  }

  return (
    <div className="book-collection">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-author">Author: {book.author}</p>
          {showUpdateFormId === book.id ? (
            <UpdateBookForm book={book} />
          ) : (
            <button
              className="update-button"
              onClick={() => handleShowUpdateForm(book.id)}
            >
              Update Book
            </button>
          )}
          <button
            className="delete-button"
            onClick={() => handleDelete(book.id)}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  )
}
