mod models;
mod routes;
mod services;

use actix_web::{web, App, HttpServer};
use routes::otp::init_routes;


async fn index() -> &'static str {
    "Bhism Backend Server 💻"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let server_address = ("localhost", 8080);

    println!("Server running at http://{}:{}", server_address.0, server_address.1);

    HttpServer::new(move || {
        App::new()
            .route("/", web::get().to(index))
            .configure(init_routes)
    })
    .bind(server_address)?
    .run()
    .await
}