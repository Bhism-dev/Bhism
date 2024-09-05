use crate::{config::db_mongo::MongoConfig, models::auth::User};
use actix_web::{get, post, web::{self, Data, Json, Path}, HttpResponse};
use crate::services::auth_service::{create_user, fetch_user};


#[post("/user")]
pub async fn create_user_handler(db: Data<MongoConfig>, new_user: Json<User>) -> HttpResponse {
    match create_user(db, new_user.into_inner()).await {
        Ok(insert_result) => HttpResponse::Ok().json(insert_result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/user/{id}")]
pub async fn fetch_user_handler(db: Data<MongoConfig>, path: Path<String>) -> HttpResponse {
    let id = path.into_inner();
    match fetch_user(db, &id).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(create_user_handler)
        .service(fetch_user_handler);
}
