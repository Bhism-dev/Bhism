use crate::{config::db_mongo::MongoConfig, models::auth::{User, UserResponse}};
use actix_web::{
    get, post,
    web::{Data, Json, Path},
    HttpResponse,
};

pub async fn create_user(db: Data<MongoConfig>, new_user: Json<User>) -> UserResponse {
    let data = User {
        id: None, 
        username: new_user.username.to_owned(),
        email: new_user.email.to_owned(),
        address: new_user.address.to_owned(),
        phone: new_user.phone.to_owned(),
    };
    let user_detail = db.create_user(data).await;
    match user_detail {
        Ok(_) => UserResponse {
            success: true,
            message: "User stored successfully.".into(),
        },
        Err(e) => UserResponse {
            success: false,
            message: format!("Failed to store User: {}", e),
        },
        // Ok(insert_result) => UserResponse::Ok().json(insert_result),
        // Err(err) => UserResponse::InternalServerError().body(err.to_string()),
    }
}

pub async fn fetch_user(db: Data<MongoConfig>, path: Path<String>) -> HttpResponse {
    let id = path.into_inner();
    if id.is_empty() {
        return HttpResponse::BadRequest().body("Invalid id.");
    }
    let user_detail = db.fetch_user(&id).await;
    match user_detail {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}