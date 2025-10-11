#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");

console.log("\x1b[36m[FRONTEND STARTER]\x1b[0m Checking project...");

// 1️⃣ Check for package.json
if (!fs.existsSync("package.json")) {
  console.error("❌ package.json not found! Make sure you run this inside your frontend project folder.");
  process.exit(1);
}

// 2️⃣ Install dependencies if node_modules folder does not exist
if (!fs.existsSync("node_modules")) {
  console.log("📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });
} else {
  console.log("✅ Dependencies already installed.");
}

// 3️⃣ Start Vite dev server with debug
console.log("🚀 Starting frontend...");
execSync("npx vite --debug", { stdio: "inherit" });
