use crate::{config::db_mongo::MongoConfig, models::auth::{User, UserResponse}};
use actix_web::{
    web::{Data, Json, Path},
    HttpResponse,
};
use mongodb::error::Error;

pub async fn create_user(db: Data<MongoConfig>, new_user: User) -> Result<User, Error> {
    let data = User {
        id: None,
        username: new_user.username,
        email: new_user.email,
        address: new_user.address,
        phone: new_user.phone,
    };
    db.create_user(data).await
}

pub async fn fetch_user_service(db: Data<MongoConfig>, id: &str) -> Result<User, Error> {
    if id.is_empty() {
        return Err(Error::from("Invalid id."));
    }
    db.fetch_user(id).await
}