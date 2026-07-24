from playwright.sync_api import sync_playwright

errors = []
warnings_kept = []  # we only care about real errors

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console errors and page errors
    page.on("console", lambda msg: errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)
    page.on("pageerror", lambda exc: errors.append(f"[pageerror] {exc}"))

    print("=== 1. Load homepage ===")
    page.goto("http://localhost:5174/", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2000)
    title = page.title()
    print(f"   title: {title!r}")
    body_text = page.inner_text("body")[:200].replace("\n", " ")
    print(f"   body[:200]: {body_text!r}")

    # Check the root has rendered content (not empty)
    root_html = page.inner_html("#root")
    print(f"   #root length: {len(root_html)} chars")

    print("\n=== 2. Navigate to /button ===")
    page.goto("http://localhost:5174/button", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2000)
    btn_title = page.title()
    print(f"   title: {btn_title!r}")
    body2 = page.inner_text("body")[:150].replace("\n", " ")
    print(f"   body[:150]: {body2!r}")
    # Count buttons rendered (demos should render real <button> elements)
    button_count = page.locator("button").count()
    print(f"   <button> count on page: {button_count}")

    print("\n=== 3. Navigate to /chart/area ===")
    page.goto("http://localhost:5174/chart/area", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(3000)
    chart_title = page.title()
    print(f"   title: {chart_title!r}")
    # recharts renders <svg> elements
    svg_count = page.locator("svg.recharts-surface, svg").count()
    print(f"   <svg> count: {svg_count}")
    body3 = page.inner_text("body")[:150].replace("\n", " ")
    print(f"   body[:150]: {body3!r}")

    print("\n=== 4. RTL toggle (language) ===")
    page.goto("http://localhost:5174/button", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(1500)
    dir_before = page.get_attribute("html", "dir")
    lang_before = page.get_attribute("html", "lang")
    print(f"   before: dir={dir_before!r} lang={lang_before!r}")
    # click the language toggle button (contains globe icon + text)
    lang_btn = page.locator("button[aria-label='Toggle language']").first
    if lang_btn.count() > 0:
        lang_btn.click()
        page.wait_for_timeout(1000)
        dir_after = page.get_attribute("html", "dir")
        lang_after = page.get_attribute("html", "lang")
        print(f"   after:  dir={dir_after!r} lang={lang_after!r}")
    else:
        print("   (language toggle button not found)")

    print(f"\n=== 5. Command menu (Cmd+K) ===")
    page.keyboard.press("Control+k")
    page.wait_for_timeout(800)
    # CommandDialog renders a role=dialog
    dialog = page.locator("[role='dialog']").first
    print(f"   dialog visible after Ctrl+K: {dialog.count() > 0}")

    browser.close()

print(f"\n=== TOTAL ERRORS CAPTURED: {len(errors)} ===")
for e in errors[:30]:
    print(f"   {e}")
