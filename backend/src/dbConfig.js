import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json())

// mongoDB connection
export const db = mongoose.connect(uri).then(() => {
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


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})