# Startet den Render-Dienst auf einem Windows-PC (PowerShell). NICHT in der Entwicklungsumgebung getestet.
# Aufruf im Ordner Render-Dienst:  powershell -ExecutionPolicy Bypass -File .\start-windows.ps1
$ErrorActionPreference = "Stop"

function Pruefe($name, $befehl, $hinweis) {
  if (-not (Get-Command $befehl -ErrorAction SilentlyContinue)) { Write-Host "FEHLT: $name. $hinweis" -ForegroundColor Red; exit 1 }
  Write-Host "ok: $name"
}
Pruefe "Node.js (22 oder neuer)" "node" "Installieren: https://nodejs.org (LTS 22)"
Pruefe "FFmpeg" "ffmpeg" "Installieren: winget install Gyan.FFmpeg  (danach neues Terminal öffnen)"
Pruefe "Python" "python" "Installieren: winget install Python.Python.3.12"

$v = [int](node -p "process.versions.node.split('.')[0]")
if ($v -lt 22) { Write-Host "Node $v ist zu alt, bitte Version 22 oder neuer." -ForegroundColor Red; exit 1 }

if (-not (Test-Path node_modules)) { Write-Host "npm install ..."; npm install }
$fw = python -c "import faster_whisper" 2>$null; if ($LASTEXITCODE -ne 0) {
  Write-Host "Installiere faster-whisper (Spracherkennung mit Wortzeiten) ..."; python -m pip install faster-whisper
}
node node_modules/hyperframes/bin/hyperframes.mjs browser ensure
node node_modules/hyperframes/bin/hyperframes.mjs telemetry disable

# Zugriffsschlüssel: einmal erzeugen und in .render-key speichern (bitte in Base44 als Geheimnis RENDER_API_KEY eintragen)
if (-not (Test-Path .render-key)) { [guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N") | Set-Content .render-key }
$env:RENDER_API_KEY = (Get-Content .render-key).Trim()
if (-not $env:PORT) { $env:PORT = "8787" }
Write-Host ""
Write-Host "Render-Dienst startet auf Port $($env:PORT)."
Write-Host "Zugriffsschlüssel (für Base44 als RENDER_API_KEY): $($env:RENDER_API_KEY)"
Write-Host "Von Base44 aus ist dein PC nur über eine https-Adresse erreichbar, z. B.: cloudflared tunnel --url http://localhost:$($env:PORT)"
Write-Host "(ANTHROPIC_API_KEY optional setzen für Hook/Titel/Captions/Kommentar:  `$env:ANTHROPIC_API_KEY = '...')"
node src/server.mjs
