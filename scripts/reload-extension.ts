import path from "path";

import chokidar from "chokidar";
import fetch from "node-fetch";

const EXTENSION_NAME = "Yoga Notes Sidebar";

const DIST_DIR = path.resolve(__dirname, "../dist");

const reloadExtension = async () => {
  try {
    const res = await fetch("http://localhost:9222/json");
    const targets = (await res.json()) as { title: string[]; id: string }[];

    const extensionTarget = targets.find((t) => t.title.includes(EXTENSION_NAME));

    if (!extensionTarget) {
      console.warn("⚠️ Extension Not Found");
      return;
    }

    await fetch(`http://localhost:9222/json/reload/${extensionTarget.id}`);
    console.log("🔁 Extension reloaded!");
  } catch (err) {
    console.error("❌Can not connect Chrome Debug API:", err);
  }
};

// 監控 dist 資料夾，一有檔案變更就 reload
chokidar.watch(DIST_DIR, { ignoreInitial: true }).on("all", async () => {
  await reloadExtension();
});
