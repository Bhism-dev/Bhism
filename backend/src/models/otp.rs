use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpRequest {
    pub phone: String,
    pub email: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OtpVerify {
    pub phone: String,
    pub code: String,
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
