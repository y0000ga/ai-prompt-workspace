// scripts/test-debug-port.ts

import fetch from "node-fetch";

async function checkChromeDebugPort() {
  try {
    const res = await fetch("http://localhost:9222/json");
    const data = (await res.json()) as { title: string }[];
    console.log("✅ Chrome debug port is active.");
    console.log(
      "Found pages:",
      data.map((d: any) => d.title)
    );
  } catch (error) {
    console.error("❌ Failed to connect to Chrome remote debugging port.");
    console.error("  ➤ Make sure Chrome is started with --remote-debugging-port=9222");
    console.error("  ➤ Run this command in terminal:");
    console.error(
      "\n  /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222\n"
    );
  }
}

checkChromeDebugPort();
