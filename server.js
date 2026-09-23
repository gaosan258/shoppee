const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Mock Database
let userData = {
    balance: 100.00,
    todayEarnings: 0.00
};

// User Data API
app.get('/api/user', (req, res) => {
    res.json(userData);
});

// Order Grab API
app.post('/api/grab', (req, res) => {
    if (userData.balance < 10) {
        return res.json({ success: false, message: "လက်ကျန်ငွေ မလုံလောက်ပါ။ Recharge လုပ်ပါ။" });
    }

    let randomCommission = parseFloat((Math.random() * 4.5 + 0.5).toFixed(2));
    userData.balance += randomCommission;
    userData.todayEarnings += randomCommission;

    res.json({
        success: true,
        commission: randomCommission,
        newBalance: userData.balance
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000`);
});