const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/get', (req, res) => {
    const filePath = path.join(__dirname, 'data.json')
    fs.readFile(filePath, 'utf8', (err, data ) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    const newData = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.push(newData);
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                    return res.status(500).send('Internal Server Error');
                }
                res.status(201).send('Data added successfully');
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
        }
    });
})

app.post('/clear', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error clearing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Data cleared successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});