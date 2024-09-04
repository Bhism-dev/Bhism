use dotenv::dotenv;
use rand::Rng;
use crate::models::otp::{OtpRequestEmail, OtpRequestPhone, OtpVerify, OtpResend, OtpResponse};

use std::env;

use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

pub fn generate_otp() -> String {
    let mut rng = rand::thread_rng();
    let first_digit = rng.gen_range(1..=9).to_string();
    let rest_digits: String = (0..5)
        .map(|_| rng.gen_range(0..=9).to_string())
        .collect();
    first_digit + &rest_digits
}

pub fn send_otp_email(request: OtpRequestEmail) -> OtpResponse {
    let otp = generate_otp();

    dotenv().ok();

    let username = env::var("EMAIL_USERNAME").expect("EMAIL_USERNAME must be set");
    let password = env::var("EMAIL_PASSWORD").expect("EMAIL_PASSWORD must be set");
    let email_from = env::var("EMAIL_FROM").expect("EMAIL_FROM must be set");

    let email_body = format!("Your OTP is: {}", otp);
    let email_to = request.email.unwrap();

    let email = Message::builder()
        .from(email_from.parse().unwrap())
        .to(email_to.parse().unwrap())
        .subject("OTP")
        .body(email_body)
        .unwrap();

    let creds = Credentials::new(username, password);

    let mailer = SmtpTransport::relay("smtp.naver.com")
        .unwrap()
        .credentials(creds)
        .build();

    match mailer.send(&email) {
        Ok(_) => OtpResponse {
            success: true,
            message: "OTP sent successfully.".into(),
        },
        Err(e) => OtpResponse {
            success: false,
            message: format!("Failed to send OTP: {}", e),
        },
    }
}

pub fn send_otp_phone(_request: OtpRequestPhone) -> OtpResponse {
    // Logic to generate and send OTP
    OtpResponse {
        success: true,
        message: "OTP sent successfully.".into(),
    }
}

pub fn verify_otp(_verify: OtpVerify) -> OtpResponse {
    // Logic to verify OTP
    OtpResponse {
        success: true,
        message: "OTP verified successfully.".into(),
    }
}

pub fn resend_otp(_resend: OtpResend) -> OtpResponse {
    // Logic to resend OTP
    OtpResponse {
        success: true,
        message: "OTP resent successfully.".into(),
    }
}
