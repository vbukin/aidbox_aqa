import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 180_000,
  expect: {
    timeout: 30_000,
  },
  reporter: [["list"], ["allure-playwright"]],
  use: {
    viewport: { width: 1920, height: 1080 },
     launchOptions: {
       args: ["--window-size=1920,1080"],
     },
     video: "on"
  },

});
