from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))
    page.on("requestfailed", lambda req: all_logs.append(f"[REQFAIL] {req.url} - {req.failure}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(4000)

    # Check if main.tsx / the entry actually executed
    root_len = page.evaluate("document.getElementById('root')?.innerHTML?.length || 0")
    has_react = page.evaluate("typeof window.__vite_plugin_react_preamble_installed__ !== 'undefined'")
    print(f"#root innerHTML length: {root_len}")
    print(f"react preamble installed: {has_react}")

    # Check which scripts actually ran
    print("\n=== ALL CONSOLE + ERRORS ===")
    for log in all_logs:
        print(f"   {log}")

    browser.close()
