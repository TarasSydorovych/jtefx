# Використовуйте офіційний образ Node.js як базовий образ
FROM node:14

# Встановіть робочу директорію в контейнері
WORKDIR /app

# Скопіюйте package.json та package-lock.json у робочу директорію
COPY package*.json ./

# Встановіть залежності
RUN npm install --only=production

# Скопіюйте всі файли сервера у робочу директорію
COPY . .

# Виконайте команду для запуску сервера
CMD ["npm", "start"]