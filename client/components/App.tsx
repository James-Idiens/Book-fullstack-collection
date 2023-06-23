import BookCollection from './BookCollection'
import NewBookForm from './NewBookForm'

function App() {
  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Book Collection</h1>
        </header>
        <section className="main">
          <div className="form">
            <h2>Add a New Book</h2>
            <NewBookForm />
          </div>
          <BookCollection />
        </section>
      </div>
    </>
  )
}

export default App
