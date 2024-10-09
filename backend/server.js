const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoutes');
const path = require('path')
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Example route to serve a specific PDF
app.get('/files/sample.pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/sample.pdf'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname,'../frontend/build')))

// Use routes
app.use('/api', pdfRoutes);

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

app.use((err,req,res,next)=>{
  res.send({message:"error",payload:err.message});
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
