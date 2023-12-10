const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware untuk menangani data formulir terenkoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulasi database sederhana
let users = [
  { id: 1, email: 'user1@example.com', password: 'password1' },
  { id: 2, email: 'user2@example.com', password: 'password2' },
];

// Endpoint API untuk operasi CRUD

// 1. Create (POST)
app.post('/users', (req, res) => {
  const { email, password } = req.body;
  // Simulasi operasi pembuatan (create) user
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  res.json({ message: 'User created successfully', user: newUser });
});

// 2. Read (GET)
app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  // Simulasi operasi membaca (read) user berdasarkan ID
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 3. Update (PUT)
app.put('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { email, password } = req.body;
  // Simulasi operasi pembaruan (update) user berdasarkan ID
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], email, password };
    res.json({ message: 'User updated successfully', user: users[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 4. Delete (DELETE)
app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  // Simulasi operasi penghapusan (delete) user berdasarkan ID
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Endpoint untuk melihat semua pengguna (sebagai contoh tambahan)
app.get('/users', (req, res) => {
  res.json(users);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
