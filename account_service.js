// accountService.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bankingApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Account schema
const accountSchema = new mongoose.Schema({
    userId: String,
    balance: Number,
});
const Account = mongoose.model('Account', accountSchema);

// Endpoint to get account balance
app.get('/balance', async (req, res) => {
    const account = await Account.findOne({ userId: req.query.userId });
    if (account) {
        res.json({ balance: account.balance });
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
});

// Endpoint to create an account
app.post('/create-account', async (req, res) => {
    const newAccount = new Account(req.body);
    await newAccount.save();
    res.json({ message: 'Account created successfully' });
});

app.listen(3002, () => console.log('Account Service running on port 3002'));
