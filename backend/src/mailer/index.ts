import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "7721c5002@smtp-brevo.com",
        pass: "Bk93RagndIfZtH0Q",
    },
});

// async..await is not allowed in global scope, must use a wrapper
export function sendMail(to: string, subject: string, template: string) {
    // send mail with defined transport object
    transporter.sendMail({
        from: 'Priyanshu <prayanshprajapat657@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html: template, // html body
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info);
        transporter.close();
    });
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);