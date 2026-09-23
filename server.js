const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Mock User Data Strategy
let user = {
    username: "Selina",
    balance: 0.00,
    completedTasks: 0,
    todayEarnings: 0.00
};

// API: User Profile Details
app.get('/api/user', (req, res) => {
    res.json(user);
});

// API: Deposit Money
app.post('/api/deposit', (req, res) => {
    const { amount } = req.body;
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
        user.balance += numAmount;
        res.json({ success: true, newBalance: user.balance });
    } else {
        res.json({ success: false, message: "Invalid amount" });
    }
});

// API: Grab Task / Order
app.post('/api/grab', (req, res) => {
    const commission = parseFloat((Math.random() * 5 + 1).toFixed(2));
    user.balance += commission;
    user.todayEarnings += commission;
    user.completedTasks += 1;
    
    res.json({
        success: true,
        commission: commission,
        newBalance: user.balance
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});