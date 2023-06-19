import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../apis/bookApi'
import { Book } from '../../models/book'

export default function BookCollection() {
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[]>(['books'], fetchBooks)

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
          <h2>Title: {book.title}</h2>
          <p>Author: {book.author}</p>
        </div>
      ))}
    </div>
  )
}
