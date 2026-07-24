from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(3000)

    # Import App and check what routes it builds, and what it renders
    result = page.evaluate("""async () => {
        const out = {};
        try {
            const mod = await import('/src/App.tsx');
            out.hasDefault = !!mod.default;
        } catch (e) { out.appErr = e.message; }

        // Inspect the glob output by importing get-components
        try {
            const gc = await import('/src/lib/get-components.ts');
            out.components = gc.getUIComponents().slice(0, 5);
            out.componentCount = gc.getUIComponents().length;
        } catch (e) { out.gcErr = e.message; }
        return out;
    }""")
    print("App module:", result)

    # Now check: does the root element get React attached?
    react_info = page.evaluate("""() => {
        const root = document.getElementById('root');
        return {
            rootExists: !!root,
            rootChildren: root ? root.childNodes.length : -1,
            rootInnerHTML: root ? root.innerHTML.slice(0, 300) : 'no root',
            hasReactKey: root ? Object.keys(root).some(k => k.startsWith('__react')) : false,
        };
    }""")
    print("Root info:", react_info)

    browser.close()
