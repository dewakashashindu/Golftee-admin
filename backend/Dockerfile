FROM node:20-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production --silent

# Copy source
COPY . .

# Generate Prisma client if present
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

EXPOSE 4000
ENV PORT=4000
CMD ["npm", "start"]
