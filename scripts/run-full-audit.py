from playwright.sync_api import sync_playwright
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

PORT = 5174
BASE_URL = f"http://localhost:{PORT}"

console_logs = []
page_errors = []
failed_requests = []

routes_to_test = [
    "/", "/button", "/card", "/chart/area", "/table", "/input", 
    "/dialog", "/drawer", "/tabs", "/select", "/badge", "/avatar", 
    "/installation/vite", "/changelog", "/stat", "/toast"
]

def run_real_audit():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.on("console", lambda msg: console_logs.append({"type": msg.type, "text": msg.text, "url": page.url}) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: page_errors.append({"error": str(exc), "url": page.url}))
        page.on("requestfailed", lambda req: failed_requests.append({"url": req.url, "failure": str(req.failure), "page": page.url}))

        print(f"=== AUDITING {len(routes_to_test)} ROUTES ON {BASE_URL} (Waiting for lazy components) ===")
        successful = 0
        broken = []

        for route in routes_to_test:
            url = f"{BASE_URL}{route}"
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                page.wait_for_timeout(1500)
                inner = page.inner_html("#root")
                if len(inner) > 500 and "not found" not in inner.lower()[:200]:
                    successful += 1
                    print(f"  ✅ {route} -> Rendered {len(inner)} chars")
                else:
                    broken.append((route, f"Not Found / Small ({len(inner)} chars)"))
                    print(f"  ❌ {route} -> Not Found ({len(inner)} chars)")
            except Exception as e:
                broken.append((route, str(e)))
                print(f"  ❌ {route} -> {e}")

        # Test Interactivity
        print("\n=== TESTING INTERACTIVITY ===")
        page.goto(f"{BASE_URL}/button", wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(1000)
        
        # Test Language Toggle
        lang_btn = page.locator("button[aria-label='Toggle language']").first
        if lang_btn.count() > 0:
            lang_btn.click()
            page.wait_for_timeout(800)
            dir_attr = page.get_attribute("html", "dir")
            print(f"  ✅ [RTL Toggle] HTML dir attribute: {dir_attr}")

        # Test Ctrl+K Dialog
        page.keyboard.press("Control+k")
        page.wait_for_timeout(800)
        dialog_count = page.locator("[role='dialog']").count()
        print(f"  ✅ [Ctrl+K Menu] Command dialog visibility: {dialog_count > 0}")

        browser.close()

        print("\n=== FINAL AUDIT RESULTS ===")
        print(f"Total Routes Tested: {len(routes_to_test)}")
        print(f"Successful: {successful}")
        print(f"Failed/Broken: {len(broken)}")
        print(f"Console Errors: {len(console_logs)}")
        print(f"Page Exceptions: {len(page_errors)}")

        if console_logs:
            print("\nConsole Errors:")
            for err in console_logs[:5]:
                print(f"  - [{err['url']}] {err['text']}")

        if page_errors:
            print("\nPage Exceptions:")
            for pe in page_errors[:5]:
                print(f"  - [{pe['url']}] {pe['error']}")

run_real_audit()
