# 🐳 Guide Docker - Qwizzy Frontend

## Commandes en solo (sans compose)

### 🔧 Mode développement

```bash
# Build l'image
docker build -t qwizzy-front:dev --target development .

# Run le container
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.nuxt \
  qwizzy-front:dev
```

### 🚀 Mode pre-production

```bash
# Build l'image
docker build -t qwizzy-front:preprod --target preprod .

# Run le container
docker run -p 3000:3000 qwizzy-front:preprod
```
