export default function(mock) {
  mock.onGet('/users').reply(200, {
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Marry Doe' },
    ]
  })

}