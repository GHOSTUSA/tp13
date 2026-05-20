const express = require("express");
const client = require("prom-client");
const os = require("os");
const app = express();

const pet = process.env.PET;

let counter = 0;

// Registre Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const errorCounter = new client.Counter({
  name: "http_errors_total",
  help: "Total number of HTTP errors",
});

register.registerMetric(requestCounter);
register.registerMetric(errorCounter);

// Middleware de logging simple
app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.path !== "/metrics") {
      requestCounter.inc({
        method: req.method,
        route: req.path,
        status_code: String(res.statusCode),
      });
    }
  });

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - Pet: ${pet}`,
  );
  next();
});

app.get("/", (req, res) => {
  counter++;
  res.json({
    hostname: os.hostname(),
    pet: pet,
    counter: counter,
  });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Endpoint Prometheus
app.get("/metrics", (req, res) => {
  res.set("Content-Type", register.contentType);
  register.metrics().then((metrics) => res.end(metrics));
});

module.exports = app;
