# Helm

Another self-hosted dashboard.


## Getting Started

### Run Locally

```bash
# clone repo
git clone https://github.com/isaacvarg/helm.git

# navigate to project
cd helm

# copy .env.example
cp .env.example .env

# initialize database
pnpm prisma migrate deploy
pnpm run db:seed
pnpm prisma generate
```

## Thanks

The default wallpaper comes from:
- [Catpuccin Wallpapers](https://github.com/zhichaoh/catppuccin-wallpapers)
