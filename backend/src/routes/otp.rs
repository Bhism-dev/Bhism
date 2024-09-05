use actix_web::{post, web, HttpResponse, Responder};
use crate::models::otp::{OtpRequestEmail, OtpRequestPhone, OtpResend, OtpVerify};
use crate::services::otp_service::{send_otp_email, send_otp_phone, verify_otp, resend_otp};

#[post("/otp/email")]
async fn email_otp_handler(req: web::Json<OtpRequestEmail>) -> impl Responder {
    let response = send_otp_email(req.into_inner());
    HttpResponse::Ok().json(response)
}

#[post("/otp/phone")]
async fn phone_otp_handler(req: web::Json<OtpRequestPhone>) -> impl Responder {
    let response = send_otp_phone(req.into_inner()).await;
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

pub fn otp_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(verify_otp_handler)
        .service(resend_otp_handler)
        .service(email_otp_handler)
        .service(phone_otp_handler);
}
