const express = require('express'); // Import Express framework
const app = express(); // Create an Express application
const db = require('./models'); // Import Sequelize models
const PORT = 3308 // Define the port number

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.urlencoded({ // Middleware to parse URL-encoded request bodies
    extended: true // Allow nested objects
}));

app.listen(PORT, async () => { // Start the server
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});

db.sequelize.sync() // Synchronize Sequelize models with the database
.then((result) => { // On successful synchronization
    app.listen(PORT, () => { // Start the server
        console.log(`Databaseis running on http://localhost:${PORT}`); // Log the server URL
    });
})

.catch((err) => { // On error during synchronization
    console.log(err); // Log the error
});

app.post('/films', async (req, res) => { // Endpoint to create a new film
    const data = req.body; // Get data from request body
    try {
        const film = await db.Film.create(data); // Create a new film record
        res.send(film); // Send the created record as response
    } catch (error) { // Handle errors
        res.send(error); // Send error if creation fails
    }
});

app.get('/films', async (req, res) => { // Endpoint to get all films
    try {
        const film = await db.Film.findAll(); // Retrieve all film records
        res.send(film); // Send the records as response
    } catch (error) { // Handle errors
        res.send(error); // Send error if retrieval fails
    }  
});

app.put('/films/:id', async (req, res) => { // Endpoint to update a film by ID
    const id = req.params.id; // Get ID from request parameters
    const data = req.body; // Get updated data from request body

    try {
        const film = await db.Film.findByPk(id); // Find film by primary key
        if (!film) { // If film not found
            return res.status(404).send({ message: 'Film not found' }); // Send 404 response
        }

        await film.update(data); // Update the film record
        res.send({ message: 'Film updated successfully', film }); // Send success response
    } catch (error) { // Handle errors
        res.status(500).send({ message: 'Error updating Film', error }); // Send error response
    }
});

app.delete('/films/:id', async (req, res) => { // Endpoint to delete a film by ID
    const id = req.params.id; // Get ID from request parameters
    try {
        const film = await db.Film.findByPk(id); // Find film by primary key
        if (!film) { // If film not found
            return res.status(404).send({ message: 'Film not found' }); // Send 404 response
        }

        await film.destroy(); // Delete the film record
        res.send({ message: 'Film deleted successfully' }); // Send success response
    } catch (error) { // Handle errors
        res.status(500).send({ message: 'Error deleting Film', error }); // Send error response
    }
});