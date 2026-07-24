from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(2000)

    # Mount the REAL app (with all providers from main.tsx) by importing main.tsx
    # but into a fresh root, and capture what happens. Actually, main.tsx already
    # mounts to #root on load. The issue is it's blank. Let's instead check if
    # the providers are present by testing useTranslations directly.
    result = page.evaluate("""async () => {
        // Simulate what main.tsx does, but with an error boundary wrapper
        const React = await import('/src/@react-refresh-empty.js').catch(()=>null) || {};
        // Instead, import the components and build the tree manually
        const ReactDOMClientMod = await import('/node_modules/.vite/deps/react-dom_client.js').catch(e => ({__err: e.message}));
        return { clientMod: Object.keys(ReactDOMClientMod).slice(0,5), err: ReactDOMClientMod.__err };
    }""")
    print("react-dom client check:", result)

    # Simpler: directly check if I18nProvider context is accessible from App
    # by looking at whether main.tsx's tree is built. Check #root for ANY react fiber.
    fiber = page.evaluate("""() => {
        const root = document.getElementById('root');
        const fiberKey = root && Object.keys(root).find(k => k.startsWith('__reactFiber'));
        if (!fiberKey) return 'no fiber';
        let fiber = root[fiberKey];
        // walk up to find provider nodes
        let depth = 0;
        const types = [];
        while (fiber && depth < 20) {
            const t = fiber.type;
            types.push(typeof t === 'function' ? (t.name || t.displayName || 'fn') : (typeof t === 'object' ? (t?.$$typeof ? 'provider/symbol' : 'obj') : String(t)));
            fiber = fiber.return;
            depth++;
        }
        return types;
    }""")
    print("\nfiber chain:", json.dumps(fiber, indent=2)[:1500])

    browser.close()
