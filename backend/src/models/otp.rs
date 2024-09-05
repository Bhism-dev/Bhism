use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpRequestEmail {
    pub email: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpRequestPhone {
    pub phone: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpVerify {
    pub otp: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpResend {
    pub phone: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpResponse {
    pub success: bool,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct StoreOTP {
    pub otp: String,
}
