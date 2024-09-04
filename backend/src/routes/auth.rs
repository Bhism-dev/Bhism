use crate::{config::db_mongo::MongoConfig, models::auth::User};
use actix_web::{post, get, web, HttpResponse, Responder};
// use crate::models::auth::User;
use crate::services::auth_service::{create_user, fetch_user};

#[post("/user")]
async fn create_user_handler(db: web::Data<MongoConfig>, req: web::Json<User>) -> impl Responder {
    let response = create_user(db, req);
    HttpResponse::Ok().json(response)
}

// async fn create_user_handler(req: web::Json<User>) -> impl Responder {
//     let response = create_user(req.into_inner());
//     HttpResponse::Ok().json(response)
// }

#[get("/user/{id}")]
async fn fetch_user_handler(req: web::Json<User>) -> impl Responder {
    let response = fetch_user(req.into_inner());
    HttpResponse::Ok().json(response)
}

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(create_user_handler)
        .service(fetch_user_handler);
}
