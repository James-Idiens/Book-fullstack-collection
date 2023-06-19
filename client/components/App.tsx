import BookCollection from './BookCollection'
import NewBookForm from './NewBookForm'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        <NewBookForm />
        <BookCollection />
      </section>
    </>
  )
}

export default App
