const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));


// Connect to MongoDB
mongoose.set('strictQuery', false)
const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MONGO is connected')
    } catch(err){
        console.log("failed to connect with MONGO DB")
    }
}

// Routes
app.use('/api', vehicleRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Vehicles fetched successfully!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
    
});
