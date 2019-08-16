# ---- Base Node ----
FROM node:12-stretch-slim AS base
ENV NODE_ENV=development
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
RUN npm set progress=false && npm config set depth 0

# ---- Audit ----
FROM base AS audit
COPY --chown=node:node package*.json ./
RUN npm audit

# ---- Dependencies ----
FROM base AS dependencies
COPY --chown=node:node package*.json ./
RUN npm install --no-audit
RUN node_modules/npm-check-updates/bin/ncu --error-level 2
COPY --chown=node:node . ./

# ---- Lint ----
FROM dependencies AS lint
RUN node_modules/eslint/bin/eslint.js .

# ---- Test ----

# FROM dependencies AS test
# ARG MONGO_URL
# RUN npm run test

# ---- Coverage ----

# FROM dependencies AS coverage
# ARG MONGO_URL
# RUN npm run test:cover

# ---- Release ----
FROM base AS release
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node /app ./
COPY --chown=node:node /app/server.js ./
CMD [ "node","server.js"]