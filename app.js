const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const userRoutes = require('./routes/users');
const port = process.env.PORT || 4700;

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(()=>{
    // console.log('mongoDB Conected');
})
.catch(error => console.log(error))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use(require('cors')());

if(process.env.NODE_ENV === 'production') {
    app.use(expres.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}




app.listen(port, () => console.log(`Server has been started on port ${port}`))