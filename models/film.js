module.exports = (sequelize, DataTypes) => { // Define the Film model
    const Film = sequelize.define('Film', { // Model name
        id: { // Define the id field
            type: DataTypes.INTEGER, // Integer type
            autoIncrement: true, // Auto-incrementing
            primaryKey: true // Primary key
        },
        namaFilm: { // Define the film name field
            type: DataTypes.STRING, // String type
        },
        deskripsi: { // Define the description field
            type: DataTypes.STRING, // String type
        },
        sutradara: {  // Define the director field
            type: DataTypes.STRING, // String type
        },
        tahunTerbit: { // Define the release year field
            type: DataTypes.INTEGER, // Integer type
        },
        genre: { // Define the genre field
            type: DataTypes.STRING, // String type
        }
    });
    return Film;  // Return the Film model
};