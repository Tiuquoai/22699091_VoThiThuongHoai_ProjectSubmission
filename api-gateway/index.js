const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();

// Route requests to the auth service
app.use("/auth", (req, res) => {
  console.log('tôi đã vào đây')
  req.url = "/auth" + req.url;
  proxy.web(req, res, { target: "http://tiuquoai_auth_service:3000" });
});

// Route requests to the product service
app.use("/products", (req, res) => {
  req.url = "/products" + req.url;
  proxy.web(req, res, { target: "http://tiuquoai_product_service:3001" });
});

// Route requests to the order service
app.use("/orders", (req, res) => {
  req.url = "/orders" + req.url;
  proxy.web(req, res, { target: "http://tiuquoai_order_service:3002" });
});

// app.use()

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
