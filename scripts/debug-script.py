from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(5000)

    # Did main.tsx get fetched? Check performance entries.
    entries = page.evaluate("""() => performance.getEntriesByType('resource').map(e => e.name).filter(n => n.includes('main') || n.includes('.tsx') || n.includes('globals'))""")
    print("=== Resource entries (tsx/main/css) ===")
    for e in entries:
        print(f"   {e}")

    # Try to execute main.tsx manually to see the error
    print("\n=== Attempting to import /src/main.tsx directly ===")
    try:
        result = page.evaluate("""async () => {
            try {
                await import('/src/main.tsx');
                return 'import succeeded';
            } catch (e) {
                return 'IMPORT ERROR: ' + e.message + ' ||| ' + e.stack;
            }
        }""")
        print(f"   {result}")
    except Exception as ex:
        print(f"   evaluate error: {ex}")

    root_len = page.evaluate("document.getElementById('root')?.innerHTML?.length || 0")
    print(f"\n#root length after manual import: {root_len}")

    print("\n=== LOGS ===")
    for log in all_logs:
        print(f"   {log}")

    browser.close()
