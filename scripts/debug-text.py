from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(5000)
    print("=== root innerHTML (first 800 chars) ===")
    print(page.evaluate("document.getElementById('root')?.innerHTML?.slice(0,800) || 'EMPTY'"))
    browser.close()
