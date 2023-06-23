// import { describe, it, expect, beforeEach } from 'vitest'
// import {
//   screen,
//   fireEvent,
//   waitForElementToBeRemoved,
// } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import nock from 'nock'
// import { renderRoute } from '../Test/utils'

// // @vitest-environment jsdom

// describe('Add a book', () => {
//   beforeEach(() => {
//     nock.cleanAll()
//   })

//   it('should successfully add a book', async () => {
//     const createBookScope = nock('http://localhost')
//       .post('/api/v1/books', {
//         title: 'Book Title',
//         author: 'Book Author',
//       })
//       .reply(200, {
//         id: 1,
//         title: 'Book Title',
//         author: 'Book Author',
//       })

//     renderRoute('/')

//     const titleInput = screen.getByLabelText('Title')
//     const authorInput = screen.getByLabelText('Author')
//     const submitButton = screen.getByRole('button', { name: 'Create Book' })

//     await userEvent.type(titleInput, 'Book Title')
//     await userEvent.type(authorInput, 'Book Author')
//     fireEvent.click(submitButton)

//     await waitForElementToBeRemoved(() => screen.getByLabelText(/Title/))

//     expect(createBookScope.isDone()).toBeTruthy()
//   })
// })
