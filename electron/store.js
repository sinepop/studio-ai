const { app } = require('electron')
const fs = require('fs')
const path = require('path')

const CONFIG_DIR = path.join(app.getPath('userData'), 'StudioAI')
const HISTORY_FILE = path.join(CONFIG_DIR, 'history.json')

function ensureDir() {
  if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true })
}

function load() {
  ensureDir()
  try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8')) }
  catch { return [] }
}

function save(records) {
  ensureDir()
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(records, null, 2), 'utf-8')
}

module.exports = { load, save }
