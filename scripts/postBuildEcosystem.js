import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ECOSYSTEM_PATH = join(__dirname, "../ecosystem.config.js");

function processEcosystemFile() {
    try {
        const content = readFileSync(ECOSYSTEM_PATH, "utf8");
        const lines = content.split("\n");
        const lastTextLineIndex = -2;
        
        const filteredLines = lines.slice(2, lastTextLineIndex);
        filteredLines[0] = "module.exports = {";
        
        writeFileSync(ECOSYSTEM_PATH, filteredLines.join("\n"));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
        process.exit(1);
    }
}

processEcosystemFile();