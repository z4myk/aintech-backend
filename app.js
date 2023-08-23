const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const sendEmail = require('./controllers/email.controller');


//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send('home page')
})


app.post("/api/sendemail", async (req, res) => {
    const {email, nombre, mensaje} = req.body;
    try{
        const send_to = process.env.EMAIL_USER;
        const sent_from = email;
        const reply_to = email;
        const subject = "AINTECH Website";
        const message = `
        <h3>Hola Aintech!</h3>
        <p>Acaba de llegar un nuevo mensaje.</p>
        <p>De: ${nombre}</p>
        <p>Email: ${email}</p>
        <p>Mensaje: ${mensaje}</p>
        `;

        
        await sendEmail(subject, message, send_to, sent_from, reply_to)
        res.status(200).json({success: true, message: "El email fue enviado"})
    }catch(err){
        res.status(500).json(err.message)
    }

})


app.listen(port, () => {
    console.log(`Server corriendo en puerto ${port}...`);
})