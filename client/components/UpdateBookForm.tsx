import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBook } from '../apis/bookApi'
import { Book } from '../../models/book'

export default function UpdateBookForm({ book }: { book: Book }) {
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const queryClient = useQueryClient()

  const updateMutation = useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books'])
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const updatedBook = {
      id: book.id,
      updatedBook: {
        title,
        author,
      },
    }

    updateMutation.mutate(updatedBook)

    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        aria-label="Title"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
        aria-label="Author"
      />
      <button type="submit" disabled={updateMutation.isLoading}>
        {updateMutation.isLoading ? 'Updating...' : 'Update Book'}
      </button>
    </form>
  )
}
