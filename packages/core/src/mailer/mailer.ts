import SMTPTransport from "nodemailer/lib/smtp-transport";
import SESTransport from "nodemailer/lib/ses-transport";
import {Options as Email} from "nodemailer/lib/mailer";
import {createTransport} from "nodemailer";
import type {Transporter} from "nodemailer"
import {mailerConf} from './../config/mailer.conf'



export class Mailer {
    private transport: Transporter<SMTPTransport.SentMessageInfo | SESTransport.SentMessageInfo>;

    constructor() {
        this.transport = createTransport(mailerConf[process.env.IS_LOCAL? 'dev' : 'prod'])
    }

    public async send(email: Omit<Email, 'html'> & { template: { content: string, data: any } }) {
        return this.transport.sendMail({
            ...email,
            html: email.template.content
        })
    }
}