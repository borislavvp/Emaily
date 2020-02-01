const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const CookieSession = require('cookie-session');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey');
require('./services/passport');

const app = express();

app.use(
    CookieSession({
         maxAge:30 * 24 * 60 * 60 * 1000,
         keys: [keys.cookieKey]
    })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets like main.js or main.css
    app.use(express.static('client/build'));
 
    // Express will serve up the index.html file if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req,res) => {
       res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
 }
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`'DB Connection Error: ${err.message}'`);
    });

app.listen(PORT);