import * as aws from "@aws-sdk/client-ses";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type SESTransport from "nodemailer/lib/ses-transport";

export type MailerConfigTypes = {
    dev: SMTPTransport.Options
    prod: SESTransport.Options
}

export const mailerConf:MailerConfigTypes = {
    'dev': {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ramon.fritsch@ethereal.email',
            pass: 'd7rqF674cYvxUJy2wr'
        }
    },
    'prod': {
        SES: {
            ses: new aws.SESClient({}),
        }
    }
}
