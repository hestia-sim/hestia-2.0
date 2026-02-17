FROM node:18-bookworm-slim

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY hestia-sim ./hestia-sim
RUN cd hestia-sim && pip3 install . --break-system-packages

COPY . .

EXPOSE 3000

CMD ["nodemon", "index.js"]