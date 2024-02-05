require("dotenv").config()
const nodemailer = require('nodemailer')
const express = require('express')
const app = express()

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // service: process.env.smtp_service,
            host: process.env.smtp_host,
            port: Number(process.env.smtp_port),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.smtp_user,
                pass: process.env.smtp_pass
            }
        })

        console.log("Satart")
    }

    async sendText(from, to, subject, text) {
        console.log("Send text : ", from, to, subject, text);
        const mailOptions = { from, to, subject, text }
        return await this.transporter.sendMail(mailOptions)
    }

    async sendHTML(from, to, subject, html) {
        console.log("Send html : ", from, to, subject, html);
        const mailOptions = { from, to, subject, html }
        return await this.transporter.sendMail(mailOptions)
    }
}


app.get('/mail', async (req, res) => {

    let status, data;

    try {
        await (new Mail).sendText(process.env.smtp_from, "avaz.aj@erp-intel.com", "Test", "Salam dunya")
        status = 201
        data = 'Success messaje'
    } catch (err) {
        console.error(err)
        status = 409
        data = { message: 'Error messaje', err }
    }

    res.status(status).json(data)
})

app.listen(3000)