# Daily Diet API - Challenge 02

![GitHub language top](https://img.shields.io/github/languages/top/dvargas42/02-challenge-daily-diet-api?color=%23177edf)
<a href="https://www.linkedin.com/in/daniel-santos-040983ab/" target="_blank" rel="noopener noreferrer">
![Made by](https://img.shields.io/badge/made%20by-daniel%20vargas-%23177edf)
</a>
![Repository size](https://img.shields.io/github/repo-size/dvargas42/daily-diet-api?color=%23177edf)
![GitHub last commit](https://img.shields.io/github/last-commit/dvargas42/daily-diet-api?color=%23177edf)
![Repository issues](https://img.shields.io/github/issues/dvargas42/daily-diet-api?color=%23177edf)
![GitHub](https://img.shields.io/github/license/dvargas42/daily-diet-api?color=%23177edf)

# 

A REST API for daily diet control, allowing users to register their meals, track nutritional metrics, and maintain control of their eating habits in a simple and efficient way.

## 🚀 Technologies

Technologies used in this project:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Knex.js](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/) 
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📋 Features

The API offers the following features:

### **User Management**
- User creation
- User identification between requests
- User profile viewing

### **Meal Control**
- Create a meal
- Edit a meal
- Delete a meal
- List all meals for a user
- View a single meal

### **Metrics and Statistics**
- Retrieve user metrics:
  - Total number of registered meals
  - Total number of meals within the diet
  - Total number of meals outside the diet
  - Best sequence of meals within the diet

## 🔧 Business Rules

- ✅ Users can only view, edit and delete meals they created
- ✅ User identification performed between requests
- ✅ Meals must be categorized as "on diet" or "off diet"

## 💻 Getting started

Clone the project:

```bash
git clone https://github.com/dvargas42/daily-diet-api
```

Enter the project directory:

```bash
cd daily-diet-api
```

Install dependencies:

```bash
npm install
```

Run database migrations:

```bash
npm run knex -- migrate:latest
```

Start the development server:

```bash
npm run start:dev
```

## 🧪 Testing

To run unit tests:

```bash
npm test:unit
```

To run unit tests in watch mode:

```bash
npm run test:unit:watch
```

To run e2e tests:

```bash
npm test:e2e
```

To run e2e tests in watch mode:

```bash
npm run test:e2e:watch
```

To run tests coverage

```bash
npm run test:coverage
```


## 🔍 How to use

### 📡 **API Endpoints**

The API will be available at:

```
http://localhost:3333
```

### **Main routes:**

- `POST /users` - Create user
- `POST /meals` - Create meal
- `GET /meals` - List user meals
- `GET /meals/:id` - View specific meal
- `PUT /meals/:id` - Edit meal
- `DELETE /meals/:id` - Delete meal
- `GET /meals/metrics` - Get user metrics

## 🤝 Contributing

**Make a fork of this repository**

```bash
gh repo fork dvargas42/daily-diet-api
```

**Follow the steps below**

```bash
# Clone your fork
git clone your-fork-url && cd daily-diet-api

# Create a branch with your feature
git checkout -b my-feature

# Make the commit with your changes
git commit -m 'feat: My new feature'

# Send the code to your remote branch
git push origin my-feature
```

After your pull request is merged, you can delete your branch.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💇🏼 Author

Made with 💜 &nbsp;by Daniel Vargas 👋 &nbsp;[See my LinkedIn](https://www.linkedin.com/in/daniel-santos-040983ab/)
