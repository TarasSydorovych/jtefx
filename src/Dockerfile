# Використовуйте офіційний образ Node.js з підтримкою разработки
FROM node:14

# Встановіть робочу директорію в контейнері
WORKDIR /app

# Скопіюйте package.json та package-lock.json у робочу директорію
COPY package*.json ./

# Встановіть залежності
RUN npm install

# Скопіюйте всі файли фронтенду у робочу директорію
COPY . .

# Запустіть додаток React
CMD ["npm", "start"]