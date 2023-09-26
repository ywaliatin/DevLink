const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());


app.use(express.json()); // for parsing application/json

app.post('/api/subscribe', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Handle the email, e.g., save to a database or a mailing list...

    return res.json({ message: 'Subscription successful!' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
