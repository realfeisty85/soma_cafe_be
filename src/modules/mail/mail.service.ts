import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import handlebars from 'handlebars';

@Injectable()
export class MailService {
  async sendMail(
    mailTo: string,
    subject: string,
    mailText: string,
    mailHtml: string,
  ) {
    const transporter = nodemailer.createTransport({
      host: '135.181.204.195',
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'somamailer',
        pass: 'FXBOnoA$kz&9JGkEzyQdAf*YLMKqJD#3',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    //send mail with defined transport object

    const res = await transporter.sendMail({
      from: '"no-reply" <no-reply@soma.cafe>', // sender address
      to: mailTo, // list of receivers
      subject: subject, // Subject line
      text: mailText, // plain text body
      html: mailHtml, // html body
    });

    console.log('Mail Sent');
    console.log(res);
  }

  async renderTemplate(
    templatePath: string,
    tempalteVars: any,
  ): Promise<string> {
    try {
      const template = await fs.readFileSync(
        `views/${templatePath}.hbs`,
        'utf-8',
      );
      const compiledTemplate = handlebars.compile(template);
      const resCompiled = compiledTemplate(tempalteVars);
      return Promise.resolve(resCompiled);
    } catch (e) {
      console.log('Error while compiling a template for email');
      console.log(e);
    }
  }
}
