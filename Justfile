# Justfile — atajos del proyecto (requiere: just + bun)
set shell := ["bash", "-cu"]

# Lista las recetas disponibles
default:
    @just --list

# Instalar dependencias
install:
    bun install

# Servidor de desarrollo
dev:
    bun run dev

# Build de producción (adapter-cloudflare)
build:
    bun run build

# svelte-check + tipos estrictos
check:
    bun run check

# Formatear con prettier
format:
    bun run format

# Tests unitarios (vitest)
test:
    bun run test:unit

# Tests e2e (playwright)
e2e:
    bun run test:e2e

# Deploy a Cloudflare (staging | production)
deploy env="staging":
    wrangler deploy --env {{env}}

# Correr todos los hooks pre-commit a mano
precommit:
    bunx pre-commit run --all-files
