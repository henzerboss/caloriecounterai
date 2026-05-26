# Install on Windows with Git Bash

Important: unzip this project into a fresh folder. Do not extract it over an old folder that already contains node_modules or package-lock.json.

Run these commands inside the project folder:

```bash
pwd
rm -rf node_modules package-lock.json npm-shrinkwrap.json
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install --registry=https://registry.npmjs.org/ --prefer-online
npm run dev
```

If npm still tries to download from `packages.applied-caas-gateway1.internal.api.openai.org`, then an old lockfile or global npm config is still being used. Check it with:

```bash
npm config get registry
find .. -name package-lock.json -print
```

The registry should be `https://registry.npmjs.org/`.
