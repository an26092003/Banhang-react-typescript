import nodemailer from "nodemailer"



// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to, OTP) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hozyu3cy6r5yw5s2@ethereal.email', // generated ethereal user
            pass: '9sYta4K7SA7NESk8yj', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false, // avoid nodejs self signed certificate error
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" foo@example.com', // sender address
        to, // list of receivers
        subject: 'Change password', // Subject line
        text: 'Hello world?', // plain text body
        html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>CodePen - OTP Email Template</title>
          
        
        </head>
        <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Koding 101 Inc</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
        <!-- partial -->
          
        </body>
        </html>`
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};