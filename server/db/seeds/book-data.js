/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    { id: 1, title: 'Dune', author: 'Frank Herbert' },
    { id: 2, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'Neuromancer', author: 'William Gibson' },
    { id: 5, title: "Ender's Game", author: 'Orson Scott Card' },
    { id: 6, title: 'A Song of Ice and Fire', author: 'George R.R. Martin' },
    { id: 7, title: 'Foundation', author: 'Isaac Asimov' },
    {
      id: 8,
      title: "Harry Potter and the Philosopher's Stone",
      author: 'J.K. Rowling',
    },
    { id: 9, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    {
      id: 10,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
    },
    { id: 11, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 12, title: 'The Martian', author: 'Andy Weir' },
    { id: 13, title: 'A Wrinkle in Time', author: "Madeleine L'Engle" },
    { id: 14, title: 'The Hunger Games', author: 'Suzanne Collins' },
    { id: 15, title: 'The Chronicles of Narnia', author: 'C.S. Lewis' },
  ])
}
