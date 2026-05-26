# Windows install notes

If `npm install` tries to download from `packages.applied-caas-gateway1.internal.api.openai.org`, delete the old `package-lock.json` and `node_modules`. This fixed archive does not include either of them and includes `.npmrc` with the official npm registry.

PowerShell commands from the project folder:

```powershell
# close VS Code terminals/dev servers first if files are locked
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install --registry=https://registry.npmjs.org/
npm run dev
```

For production build:

```powershell
npm run build
```

The production files will be in `dist/`.
