const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000; // Оберіть відповідний порт для вашого сервера
app.use(cors());
app.use(express.json());

app.post("/webhook", (req, res) => {
  try {
    const dataFromMonobank = req.body;
    console.log("Received data from Monobank:", dataFromMonobank);

    // Отримати статус та modifiedDate з отриманих даних
    const { status, modifiedDate } = dataFromMonobank;

    // Логіка обробки різних статусів
    if (status === "success") {
      // Операція успішна, виконайте необхідні дії
      console.log("Payment was successful!");
    } else if (status === "processing") {
      // Операція обробляється, можливо, виконайте додаткову обробку
      console.log("Payment is processing...");
    } else if (status === "failure") {
      // Операція не вдалася, обробте цю ситуацію
      console.log("Payment failed!");
    }

    // Тут ви можете виконати додаткову обробку, враховуючи modifiedDate
    // Наприклад, оновлення статусу платежу в базі даних або відправка повідомлення користувачеві

    res.status(200).send("Callback received successfully");
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/create-payment", async (req, res) => {
  try {
    const url = "https://api.monobank.ua/api/merchant/invoice/payment-direct";
    console.log("res.data", req.body);

    const payload = req.body;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Token": "u1ZlZ8ddzRLOB7H9GL7N7-_nxRPJsQZHcdUi_dP00hEA",
      },
    });

    console.log("Payment created successfully:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating payment:", error.response.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
