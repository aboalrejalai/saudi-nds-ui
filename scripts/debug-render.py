from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(2000)

    # Mount App fresh into a new div, catching errors
    result = page.evaluate("""async () => {
        const React = await import('react');
        const ReactDOM = await import('react-dom/client');
        const App = (await import('/src/App.tsx')).default;

        const div = document.createElement('div');
        document.body.appendChild(div);
        const root = ReactDOM.createRoot(div);
        let renderErr = null;
        try {
            root.render(React.createElement(App));
        } catch (e) {
            renderErr = e.message + ' | ' + e.stack;
        }
        // wait
        await new Promise(r => setTimeout(r, 4000));
        return {
            renderErr,
            divHTML: div.innerHTML.slice(0, 500),
            divChildren: div.childNodes.length,
        };
    }""")
    print("Render result:", result)

    print("\n=== LOGS ===")
    for log in all_logs:
        print(f"   {log}")

    browser.close()
