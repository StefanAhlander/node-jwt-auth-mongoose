require('dotenv').config();
const express = require('express');
const cors = require('cors');

const initiateRoles = require('./models/initiateRoles');

const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.mongoose
  .connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
    initiateRoles();
  })
  .catch(err => {
    console.error('Connection error: ' + err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.json({message: 'Welcome!'});
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});