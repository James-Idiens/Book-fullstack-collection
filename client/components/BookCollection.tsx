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
    <div>
      {books.map((book) => (
        <div key={book.id} className="book">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          {showUpdateFormId === book.id ? (
            <UpdateBookForm book={book} />
          ) : (
            <button onClick={() => handleShowUpdateForm(book.id)}>
              Update Book
            </button>
          )}
          <button
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
