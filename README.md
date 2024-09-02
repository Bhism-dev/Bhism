# Frontend

To work with the frontend, follow these commands:

0. Install the necessary dependencies:
    ```
    npm install -g @ionic/cli
    ```

1. Change directory to the frontend folder:
    ```
    cd frontend
    ```

2. Install the necessary dependencies:
    ```
    npm i
    ```

3. Start the development server:
    ```
    ionic serve
    ```

That's it! You are now ready to work on the frontend of your project.

```
NOTE: Step 0 and 2 is only required for the first time you set up the project. You can skip it for subsequent runs.
```

# Backend

To work with the backend, follow these commands:

0. Install the necessary dependencies:
    ```
    Download MSYS Tools:
    - https://www.msys2.org/
    - Execute the Windows Installer

    Commands from MSYS2 MSYS:
    - pacman -Syu
    (Answer Y to everything)
    - pacman -Syu
    (Answer Y to everything)
    - pacman -S --needed base-devel mingw-w64-x86_64-toolchain
    (Answer Y to everything)
    - pacman -S development
    (Answer Y to everything)
    - pacman -S vim
    (Answer Y to everything)
    - pacman -S nano
    (Answer Y to everything)
    - pacman -S mingw-w64-x86_64-rust
    (Answer Y to everything)
    ```

1. Change directory to the backend folder:
    ```
    cd backend
    ```

2. Install the necessary dependencies:
    ```
    cargo build
    ```

3. Start the development server:
    ```
    cargo run
    ```
