import { useState, ChangeEvent, FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewBook } from '../../models/book'
import { createBook } from '../apis/bookApi'

const initialFormData: NewBook = {
  title: '',
  author: '',
}

export default function NewBookForm() {
  const [form, setForm] = useState(initialFormData)
  const queryClient = useQueryClient()

  const mutation = useMutation(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['books'])
    },
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(form)
    setForm(initialFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        name="title"
        required
        aria-label="Title"
        className="form-input"
      />
      <input
        type="text"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        name="author"
        required
        aria-label="Author"
        className="form-input"
      />
      <button
        type="submit"
        className="form-button"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Creating...' : 'Create Book'}
      </button>
    </form>
  )
}
