import TelegramLoginButton from "react-telegram-login";
import css from "./auth.module.css";
// AuthTH
const BOT_USERNAME = "jtefx_bot"; // place username of your bot here

const Auth = () => {
  const handleTelegramResponse = (response) => {
    console.log(response);
  };
  const buttonStyle = {
    // Додайте стилі тут, наприклад:
    width: "200px",
    height: "40px",
    backgroundColor: "#0088cc",
    color: "#ffffff",
    // і так далі
  };
  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="jtefx_bot"
      className={css.telegram}
    />
  );
};

export default Auth;
