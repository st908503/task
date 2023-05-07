import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
const port = 8000;
const uri = 'mongodb+srv://onitotask:onito123@cluster0.64f30ri.mongodb.net/?retryWrites=true&w=majority'


// mongoDB connection
mongoose.connect(uri).then((res, err) => {
    console.log('connection successful')
}).catch((e) => {
    console.log('connection not successful')
})




// schema
const userSchema = mongoose.Schema({
    name: String,
    date_of_birth_and_age: String,
    gender: String,
    mobile: Number,
    government_id: String,
    guardian_details: String,
    email: String,
    emergency_contact_number: Number,
    address: String,
    state: String,
    city: String,
    country: String,
    pincode: Number,
    occupation: String,
    religion: String,
    marital_status: String,
    blood_group: String,
    nationality: String,
})

// // model for the data
const UserData = mongoose.model('UserData', userSchema)

app.get('/results', (req, res, next) => {
    UserData.find().then(result => {
        res.status(200).json({
            userDetails: result
        });
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


// // handling form submissions
app.post('/formdetails', async (req, res) => {

    // creating a new document using form data
    const userData = new UserData(req.body)
    console.log('random satring')
    console.log(req.body)

    try {
        //saving data to databse
        await userData.save();
        res.status(200).send('Form data saved successfully')
    } catch (err) {
        console.error(err)
        res.status(500).send('Error saving form data to database')
    }

})




app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})



// app.use(express.static('public'));

// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port

//    console.log("Example app listening at http://%s:%s", host, port)
// })