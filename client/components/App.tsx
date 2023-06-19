import { useEffect, useState } from 'react'
import { fetchBooks } from '../apis/bookApi'
import { Book } from '../../models/book'

function App() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks()
        setBooks(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {books.map((book) => (
          <div key={book.id} className="book">
            <h2>Title: {book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        ))}
      </section>
    </>
  )
}

export default App
