use actix_web::{post, web, HttpResponse, Responder};
use crate::models::otp::{OtpRequest, OtpVerify, OtpResend};
use crate::services::otp_service::{request_otp, verify_otp, resend_otp};

#[post("/otp/request")]
async fn request_otp_handler(req: web::Json<OtpRequest>) -> impl Responder {
    let response = request_otp(req.into_inner());
    HttpResponse::Ok().json(response)
}

#[post("/otp/verify")]
async fn verify_otp_handler(req: web::Json<OtpVerify>) -> impl Responder {
    let response = verify_otp(req.into_inner());
    HttpResponse::Ok().json(response)
}

#[post("/otp/resend")]
async fn resend_otp_handler(req: web::Json<OtpResend>) -> impl Responder {
    let response = resend_otp(req.into_inner());
    HttpResponse::Ok().json(response)
}

// For email-based OTP
#[post("/otp/email")]
async fn email_otp_handler(req: web::Json<OtpRequest>) -> impl Responder {
    let response = request_otp(req.into_inner());  // Assuming email OTP uses the same logic
    HttpResponse::Ok().json(response)
}

// For phone-based OTP
#[post("/otp/phone")]
async fn phone_otp_handler(req: web::Json<OtpRequest>) -> impl Responder {
    let response = request_otp(req.into_inner());  // Assuming phone OTP uses the same logic
    HttpResponse::Ok().json(response)
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(request_otp_handler)
        .service(verify_otp_handler)
        .service(resend_otp_handler)
        .service(email_otp_handler)
        .service(phone_otp_handler);
}
