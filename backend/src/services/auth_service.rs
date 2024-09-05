use crate::{config::db_mongo::MongoConfig, models::auth::User};
use actix_web::web::Data;
use mongodb::results::InsertOneResult;
use anyhow::{Result, anyhow};
use mongodb::bson::extjson::de::Error as BsonError;

pub async fn create_user(db: Data<MongoConfig>, new_user: User) -> Result<InsertOneResult, BsonError> {
    let data = User {
        id: None,
        username: new_user.username,
        email: new_user.email,
        address: new_user.address,
        phone: new_user.phone,
    };
    db.create_user(data).await
}

pub async fn fetch_user(db: Data<MongoConfig>, id: &str) -> Result<User> {
    if id.is_empty() {
        return Err(anyhow!("User ID is required"));
    }
    db.fetch_user(&id.to_string()).await.map_err(|e: BsonError| anyhow!(e.to_string()))
}