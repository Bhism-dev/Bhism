import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";

import { insertOtpRequest, validateOtpRequest, verifyOtpRequest } from "../../schema/otp_schema";

const router = express.Router();

dotenv.config({path: "../.env"});

function generateOTP(): string {
    let otp = "";
    otp += Math.floor(Math.random() * 9) + 1; // First digit should be between 1 and 9
    for (let i = 0; i < 5; i++) {
        otp += Math.floor(Math.random() * 10); // Remaining digits can be between 0 and 9
    }
    return otp;
}

router.post("/email", async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await insertOtpRequest({ email }, otp, expiresAt);  

    let transporter = nodemailer.createTransport({
        host: "smtp.naver.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "OTP for Email Verification",
        html: `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html dir='ltr' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office' lang='en'>
 <head>
  <meta charset='UTF-8'>
  <meta content='width=device-width, initial-scale=1' name='viewport'>
  <meta name='x-apple-disable-message-reformatting'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta content='telephone=no' name='format-detection'>
  <title>Empty template</title><!--[if (mso 16)]>
    <style type='text/css'>
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]-->
  <style type='text/css'>
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
@media only screen and (max-width:600px) {.es-p-default { } *[class='gmail-fix'] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important; display:block } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; padding:10px 20px 10px 20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .h-auto { height:auto!important } .es-text-8111 .es-text-mobile-size-12, .es-text-8111 .es-text-mobile-size-12 * { font-size:12px!important; line-height:150%!important } .es-text-8111 .es-text-mobile-size-22, .es-text-8111 .es-text-mobile-size-22 * { font-size:22px!important; line-height:150%!important } .es-text-9782 .es-text-mobile-size-11.es-override-size, .es-text-9782 .es-text-mobile-size-11.es-override-size * { font-size:11px!important; line-height:150%!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class='body' style='width:100%;height:100%;padding:0;Margin:0'>
  <div dir='ltr' class='es-wrapper-color' lang='en' style='background-color:#F6F6F6'><!--[if gte mso 9]>
			<v:background xmlns:v='urn:schemas-microsoft-com:vml' fill='t'>
				<v:fill type='tile' color='#f6f6f6'></v:fill>
			</v:background>
		<![endif]-->
   <table width='100%' cellspacing='0' cellpadding='0' class='es-wrapper' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6'>
     <tr>
      <td valign='top' style='padding:0;Margin:0'>
       <table cellspacing='0' cellpadding='0' align='center' class='es-header' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top'>
         <tr>
          <td align='center' style='padding:0;Margin:0'>
           <table cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center' class='es-header-body' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px'>
             <tr>
              <td align='left' bgcolor='#d9ead3' style='padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;background-color:#d9ead3'>
               <table cellspacing='0' cellpadding='0' align='left' class='es-left' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left'>
                 <tr>
                  <td valign='top' align='center' style='padding:0;Margin:0;width:560px'>
                   <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'>
                     <tr>
                      <td align='center' style='padding:0;Margin:0'><h1 class='es-m-txt-c' style='Margin:0;font-family:verdana, geneva, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:36px;color:#333333'><strong>BHISM</strong></h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellspacing='0' cellpadding='0' align='center' class='es-content' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important'>
         <tr>
          <td align='center' style='padding:0;Margin:0'>
           <table cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center' class='es-content-body' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px'>
             <tr>
              <td align='left' bgcolor='#d9ead3' style='padding:20px;Margin:0;background-color:#d9ead3'>
               <table width='100%' cellspacing='0' cellpadding='0' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'>
                 <tr>
                  <td valign='top' align='center' style='padding:0;Margin:0;width:560px'>
                   <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'>
                     <tr>
                      <td align='left' class='es-text-8111' style='padding:0;Margin:0;padding-top:10px;padding-bottom:10px'><h6 class='es-text-mobile-size-12' style='Margin:0;font-family:verdana, geneva, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:12px;font-style:normal;font-weight:normal;line-height:14.4px !important;color:#333333;text-align:center'><strong>Your OTP is</strong></h6><h2 class='es-text-mobile-size-22' style='Margin:0;font-family:verdana, geneva, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:26.4px !important;color:#333333;text-align:center'><strong><u>${otp}</u></strong></h2></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellspacing='0' cellpadding='0' align='center' class='es-footer' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top'>
         <tr>
          <td align='center' style='padding:0;Margin:0'>
           <table cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center' class='es-footer-body' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px'>
             <tr>
              <td align='left' style='Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;padding-bottom:20px'>
               <table cellspacing='0' cellpadding='0' align='left' class='es-left' role='none' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left'>
                 <tr>
                  <td align='left' style='padding:0;Margin:0;width:560px'>
                   <table width='100%' cellspacing='0' cellpadding='0' role='presentation' style='mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px'>
                     <tr>
                      <td align='justify' class='es-text-9782' style='padding:0;Margin:0'><p class='es-m-txt-c es-text-mobile-size-11 es-override-size' style='Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px'>This OTP is valid for the next 10 minutes. Please do not share this code with anyone. If you did not request this OTP, please ignore this email.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>`,
    });

    res.status(200).send("Email sent successfully");
});

router.post("/phone", async (req, res) => {
    const { phone } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await insertOtpRequest({ phone }, otp, expiresAt);

    const headers = {
        "authorization": process.env.SMS_AUTH_KEY?.toString(),
        "Content-Type": "application/json"
    };

    const body = {
        "route": "otp",
        "variables_values": otp,
        "numbers": phone,
        // "route": "q", // this is expensive method. Use "otp" for testing.
        // "message": `BHISM: Your one time password is ${otp}. It will expire in 10 minutes. Please do not share this code with anyone.`,
        // "flash": 0,
    };

    try {
        const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", body, { headers });
        res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send({ error: "Failed to send OTP" });
    }
});

router.post("/verify/email", async (req, res) => {
    const { email, otp } = req.body;

    const otpRequest = await validateOtpRequest({ email }, otp);

    if (!otpRequest) {
        return res.status(400).send({ error: "Invalid OTP" });
    }

    verifyOtpRequest(otpRequest.email);
    res.status(200).send({ message: "OTP verified successfully" });
});

router.post("/verify/phone", async (req, res) => {
    const { phone, otp } = req.body;

    const otpRequest = await validateOtpRequest({ phone }, otp);

    if (!otpRequest) {
        return res.status(400).send({ error: "Invalid OTP" });
    }

    verifyOtpRequest(otpRequest.phone);
    res.status(200).send({ message: "OTP verified successfully" });
});

export default router;