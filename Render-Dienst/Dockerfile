# Render-Dienst: Node 22, FFmpeg, Chrome-Bibliotheken für HyperFrames, faster-whisper für Wortzeiten.
# NICHT in dieser Entwicklungsumgebung getestet (hier ist kein Docker). Beim ersten Bauen bitte Fehler melden.
FROM node:22-bookworm-slim

ARG WHISPER_MODEL=small
ENV DEBIAN_FRONTEND=noninteractive \
    PIP_BREAK_SYSTEM_PACKAGES=1 \
    PORT=8787 \
    JOBS_DIR=/daten/jobs

RUN apt-get update && apt-get install -y --no-install-recommends \
      ffmpeg python3 python3-pip ca-certificates curl unzip \
      libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
      libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2 fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Spracherkennung mit Wortzeiten; das Modell wird beim Bauen geladen, damit der erste Auftrag nicht wartet
RUN pip3 install --no-cache-dir faster-whisper \
 && python3 -c "from faster_whisper import WhisperModel; WhisperModel('${WHISPER_MODEL}', device='cpu', compute_type='int8')"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
# Chrome für HyperFrames laden und Telemetrie ausschalten
RUN node node_modules/hyperframes/bin/hyperframes.mjs browser ensure || true \
 && node node_modules/hyperframes/bin/hyperframes.mjs telemetry disable || true

COPY src ./src
COPY agents ./agents
COPY scripts ./scripts

VOLUME /daten
EXPOSE 8787
# RENDER_API_KEY muss gesetzt werden (docker run -e RENDER_API_KEY=...), sonst startet der Server nicht.
# Optional: ANTHROPIC_API_KEY (Agents für Hook/Titel/Captions/Kommentar und Sichtprüfung), CLAUDE_MODEL.
CMD ["node", "src/server.mjs"]
