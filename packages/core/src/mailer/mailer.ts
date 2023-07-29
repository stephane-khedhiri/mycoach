import SMTPTransport from "nodemailer/lib/smtp-transport";
import SESTransport from "nodemailer/lib/ses-transport";
import {Options as Email} from "nodemailer/lib/mailer";
import {createTransport} from "nodemailer";
import type {Transporter} from "nodemailer"
import mjml2html from "mjml"
import * as handlebars from "handlebars";
import * as aws from "@aws-sdk/client-ses";
import * as fs from "fs";

export class Mailer {
    private transport: Transporter<SMTPTransport.SentMessageInfo | SESTransport.SentMessageInfo>;

    constructor() {
        if (process.env.APP_MODE !== 'dev') {
            this.transport = createTransport({
                SES: {
                    ses: new aws.SESClient({}),
                }
            })
        } else {
            this.transport = createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ramon.fritsch@ethereal.email',
                    pass: 'd7rqF674cYvxUJy2wr'
                }
            })
        }
    }

    public async send(email: Omit<Email, 'html'> & { template: { content: string, data: any } }) {
        return this.transport.sendMail({
            ...email,
            html: email.template.content
        })
    }
}