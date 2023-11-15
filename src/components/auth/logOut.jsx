import React from "react";
import PropTypes from "prop-types";

class TelegramLogoutButton extends React.Component {
  handleLogout = async () => {
    try {
      const botToken = "6697557531:AAEjv_ViJLWtMKrqmpeEpu6e1q6mJSNNGPg"; // Замініть на свій токен бота

      // Викликаємо метод для вилогінування через Telegram Bot API
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/logOut`,
        {
          method: "POST",
        }
      );

      const result = await response.json();
      console.log("User logged out:", result);

      // Додаткова логіка після вилогінування, якщо потрібно
    } catch (error) {
      console.error("Error during logout:", error);
      // Обробка помилок вилогінування
    }
  };

  render() {
    return (
      <button onClick={this.handleLogout} className={this.props.className}>
        {this.props.children}
      </button>
    );
  }
}

TelegramLogoutButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TelegramLogoutButton;
