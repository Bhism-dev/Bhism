mod config;
mod models;
mod routes;
mod services;

use actix_web::{web, web::Data, App, HttpServer};
use config::db_mongo::MongoConfig;
use routes::{auth::auth_routes, otp::otp_routes};


async fn index() -> &'static str {
    "Bhism Backend Server 💻"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = MongoConfig::init().await;
    let db_data = Data::new(db);
    let server_address = ("localhost", 8080);

    println!("Server running at http://{}:{}", server_address.0, server_address.1);

    HttpServer::new(move || {
        App::new()
            .route("/", web::get().to(index))
            .configure(otp_routes)
            .app_data(db_data.clone())
            .configure(auth_routes)
            // .service(create_user)
            // .service(fetch_user)
    })
    .bind(server_address)?
    .run()
    .await
}