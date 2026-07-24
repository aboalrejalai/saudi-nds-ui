from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    responses = []
    failed = []
    page.on("response", lambda resp: responses.append((resp.status, resp.url)))
    page.on("requestfailed", lambda req: failed.append(f"{req.url} :: {req.failure}"))

    all_logs = []
    page.on("console", lambda msg: all_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: all_logs.append(f"[PAGEERROR] {exc}"))

    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(5000)

    print("=== FAILED REQUESTS ===")
    for f in failed:
        print(f"   {f}")

    print("\n=== NON-200 / NON-304 RESPONSES ===")
    for status, url in responses:
        if status not in (200, 304, 204) and "favicon" not in url:
            print(f"   {status}  {url}")

    print("\n=== ALL LOGS ===")
    for log in all_logs:
        print(f"   {log}")

    root_len = page.evaluate("document.getElementById('root')?.innerHTML?.length || 0")
    print(f"\n#root length: {root_len}")

    browser.close()
