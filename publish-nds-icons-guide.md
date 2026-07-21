# How to Fix and Publish `@aboalrejal/nds-icons`

This guide explains how to structurally fix the `ES Modules` (ESM) resolution issue in the icon library and publish the patched version to NPM.

## 1. The Core Issue

By default, the TypeScript compiler (`tsc`) does not append `.js` extensions to ES Module imports, nor does it automatically flag the package as a native ES Module. Modern SSR frameworks (like Vite/Tanstack Start) require strictly fully-specified paths (e.g., `./Icon.js`) and a module type declaration.

## 2. The Magic Solution (Using `tsup`)

The most robust way to solve this permanently is to replace `tsc` with `tsup`. `tsup` is a modern bundler built on top of `esbuild` that automatically generates both CommonJS and ESM outputs with the correct extensions.

### Step-by-Step Fix (In your library's source project)

1. **Install tsup:**
   Open the terminal in your library's source directory and run:

   ```bash
   npm install tsup -D
   ```

2. **Update `package.json` build scripts:**
   Change your `build` command in `package.json` to the following:

   ```json
   "scripts": {
     "build": "tsup src/index.ts --format esm,cjs --dts --clean"
   }
   ```

   _(Adjust `src/index.ts` if your entry point is named differently)._

3. **Declare Module Type (Crucial):**
   In the same `package.json`, ensure you have the `type` field set:

   ```json
   "type": "module"
   ```

4. **Build the Library:**
   Run the build command:
   ```bash
   npm run build
   ```
   This will create a `dist` folder that is fully compatible with Vite, Next.js, and Tanstack Start.

## 3. Publishing to NPM

Once you have verified the `dist` folder is built correctly, you can publish the update.

1. **Bump the Version:**
   In your `package.json`, increment the version number. For example, if it was `1.0.0`, change it to `1.0.1`:

   ```json
   "version": "1.0.1"
   ```

2. **Login to NPM (If not already logged in):**

   ```bash
   npm login
   ```

3. **Publish the Package:**
   ```bash
   npm publish --access public
   ```

## 4. Using the New Version

In your web projects (like `ubp`), simply update the package to get the fixes:

```bash
npm install @aboalrejal/nds-icons@latest
```
