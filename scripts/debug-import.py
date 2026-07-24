from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(2000)

    # Directly import the homepage MDX module to see the real error
    result = page.evaluate("""async () => {
        const out = {};
        try {
            const mod = await import('/src/pages/page.mdx');
            out.ok = true;
            out.hasDefault = !!mod.default;
        } catch (e) {
            out.err = e.message + '\\n|||STACK|||\\n' + (e.stack || '');
        }
        return out;
    }""")
    print("=== homepage MDX import result ===")
    print(result)

    # Also try docs-layout directly
    result2 = page.evaluate("""async () => {
        const out = {};
        try {
            const mod = await import('/src/components/docs/docs-layout.tsx');
            out.ok = true;
        } catch (e) {
            out.err = e.message;
        }
        return out;
    }""")
    print("=== docs-layout import result ===")
    print(result2)

    print("\n=== LOGS ===")
    for log in all_logs:
        print(f"   {log}")

    browser.close()
