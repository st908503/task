import express from 'express';
import cors from 'cors'
import { UserData } from './db/dbConfig.js';

const app = express();
app.use(express.json())
app.use(cors())
const port = 8000;

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

