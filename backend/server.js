const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors({
  origin: 'http://localhost:5173', // Match your Vite frontend port
  credentials: true
}));
app.use(express.json());

// Mock database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    referralCode: "john2025",
    donationsRaised: 1250,
    rewards: ["Bronze Badge", "Early Access"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    referralCode: "jane2025",
    donationsRaised: 2500,
    rewards: ["Silver Badge", "Exclusive Content"],
  }
];

const leaderboard = [
  { name: "Alex Johnson", referrals: 15, donations: 3500 },
  { name: "John Doe", referrals: 10, donations: 1250 },
  { name: "Jane Smith", referrals: 8, donations: 2500 },
  { name: "Sam Wilson", referrals: 5, donations: 1800 },
  { name: "Taylor Brown", referrals: 3, donations: 900 },
];

// Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        referralCode: user.referralCode,
        donationsRaised: user.donationsRaised,
        rewards: user.rewards
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post('/api/signup', (req, res) => {
  console.log("req is in backend");
  console.log(req.body);
    const { name, email, password } = req.body;
  const userExists = users.some(u => u.email === email);
  
  if (userExists) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    referralCode: `${name.toLowerCase().split(' ')[0]}2025`,
    donationsRaised: 0,
    rewards: ["Welcome Badge"]
  };
  
  users.push(newUser);
  leaderboard.push({ name, referrals: 0, donations: 0 });
  
  res.json({ 
    success: true, 
    user: {
      id: newUser.id,
      name: newUser.name,
      referralCode: newUser.referralCode,
      donationsRaised: newUser.donationsRaised,
      rewards: newUser.rewards
    }
  });
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.sort((a, b) => b.donations - a.donations));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});