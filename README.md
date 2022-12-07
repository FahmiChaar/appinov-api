# Appinov Test API

- You can find here the code for the API
- Note: This is my first nestjs app so i try my best to follow the best practices

## App functionalities
- Registring new users
- Login with email and password
- Return List of created Books
- Create new Book
- Update book
- Delete book
- All routes are protected from the front and the API

### Pre-request
- I use Mysql
- You need to create a database named "appinov_test"
- Changing the database password located in app.module.ts if needed

- Note: I have hardcoded the database data and the JWT secret key just for demonstration purposes and of course we need to move it to an .env file for example.

### Installing dependencies
```bash
$ npm install
```

### Run the application
```bash
$ nest start
```