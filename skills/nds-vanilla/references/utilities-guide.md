# NDS Utilities Guide

This guide documents the helper utility classes and JavaScript-wired components in the National Design System (NDS). Use these lightweight utilities for layouts, content truncation, clipboard operations, numeric formatting, and social sharing.

---

## 1. Copy to Clipboard (`copy`)
A clipboard utility that turns any button into a copy control with visual feedback, label swap, and screen reader announcements.

### Literal Value Copy
Copies a static string defined at render time.
```html
<button type="button" class="nds-btn nds-subtle nds-sm nds-icon-only nds-copy" 
        data-copy="value_to_copy" aria-label="Copy code">
    <i class="nds-icon nds-hgi-copy-01" aria-hidden="true"></i>
</button>
```

### Input Field Copy
Copies the value from a target input element.
```html
<input type="text" id="api-token" value="sk-prod-9f3a8c" readonly>
<button type="button" class="nds-btn nds-secondary-outline nds-copy" 
        data-copy-target="#api-token" aria-label="Copy Token">
    <span class="nds-label">Copy</span>
</button>
```

### Attributes
- `data-copy`: The literal string to copy.
- `data-copy-target`: CSS selector of the target `<input>` or `<textarea>` to copy from.
- `data-label`: Swaps the button's visible text label (e.g., `data-label="Copied!"`) for 2 seconds.
- `data-message`: Screen reader announcement on success (defaults to "Copied").

---

## 2. Divider (`divider`)
Separates sections of content with a horizontal or vertical rule that adapts to spacing rules.

### Horizontal Divider
```html
<div class="nds-divider"></div>
<!-- Or thematic break -->
<hr class="nds-divider">
```

### Vertical Divider
Used inside flex layouts to separate inline items.
```html
<div class="nds-flex nds-row">
    <span>Item 1</span>
    <div class="nds-divider nds-vertical"></div>
    <span>Item 2</span>
</div>
```

### Modifiers
- **Spacing:** `.nds-md`, `.nds-lg`, `.nds-xl`, `.nds-2xl`, `.nds-3xl`, `.nds-4xl` (adjusts margin around the divider).
- **Variables:**
  - `--divider-size`: Thickness of the rule (default: `2px`).
  - `--divider-color`: Color of the rule (default: `--alpha-black-10`).

---

## 3. Expandable Content (`expandable-content`)
Hides long text block overflows, fading out the bottom of the container, and reveals it on click.

```html
<div class="nds-expandable" style="--max-height: 200px;">
    <div class="nds-expandable-content">
        <p>Your long body content goes here...</p>
    </div>
</div>
```

### Modifiers
- **CSS Variables:**
  - `--max-height`: Height threshold before clipping (default: `300px`).
  - `--mask-fade-percentage`: Depth of the fade-out gradient (default: `35%`).
- **Synchronized Grouping:** Wrap multiple `.nds-expandable` elements inside a container with `.nds-expand-all` to toggle all blocks together.
- **JS API:** `element.ndsExpandable.expand()`, `element.ndsExpandable.collapse()`, `element.ndsExpandable.recheckHeight()`.

---

## 4. Flex Layout Helper (`flex`)
Utility classes to quickly align elements using Flexbox layout defaults.

```html
<div class="nds-flex nds-row" style="--justify: space-between; --gap: var(--spacing-md);">
    <div>Left Child</div>
    <div>Right Child</div>
</div>
```

### Classes
- `.nds-flex`: Declares element as a flex container (aligns children to center cross-axis, starts on main axis).
- `.nds-row`: Sets `flex-direction: row`.
- `.nds-col`: Sets `flex-direction: column`.
- `.nds-reverse`: Inverts child order (row-reverse / column-reverse).
- `.nds-wrap`: Enables multi-line wrapping (`flex-wrap: wrap`).
- `.nds-nowrap`: Disables wrapping (`flex-wrap: nowrap`).

### CSS Variables
- `--justify`: `justify-content` values (e.g. `center`, `space-between`).
- `--align`: `align-items` values (e.g. `stretch`, `start`).
- `--gap`: Gap between children (defaults to `var(--spacing-xl)`).

---

## 5. Numbers & Formatting (`numbers`)
Dynamic numbers formatting for thousands separators and count-up scroll animations.

### Thousands Formatter
Locale-aware commas formatting.
```html
<span class="nds-number-format">3240000</span>
<!-- Renders: 3,240,000 -->
```

### Scroll Count-up Animation
Animates counting from zero when scrolled into view.
```html
<span class="nds-counter-value nds-number-format" data-target="1850">0</span>
```

---

## 6. Saudi Cities Picker (`saudi-cities`)
A standard configuration pointing to `assets/data/saudi-cities.json` to feed an autocomplete dropdown with English and Arabic city names.

```html
<div class="nds-form-container" 
     data-url="/assets/data/saudi-cities.json" 
     data-name="Name" 
     data-fetch="once" 
     data-min-chars="1">
    <div class="nds-form-header">
        <label for="city-picker"><span class="nds-label">City</span></label>
    </div>
    <div class="nds-form-control">
        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
        <input type="text" id="city-picker" placeholder="Search Saudi cities...">
    </div>
</div>
```

---

## 7. Social Sharing (`share`)
Social media share popup widgets (X, LinkedIn, WhatsApp) and Copy Link helpers.

### Dropmenu Variant
```html
<div class="nds-share nds-dropmenu">
    <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share">
        <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
        <span class="nds-label">Share</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x">X</button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin">LinkedIn</button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp">WhatsApp</button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" 
                    data-label="Link Copied!" data-no-auto-close>Copy Link</button>
        </div>
    </div>
</div>
```

### Inline Row Variant
```html
<div class="nds-share nds-flex nds-row" data-share-url="https://site.gov.sa" data-share-title="Custom Title">
    <button class="nds-btn nds-subtle nds-share-x" aria-label="Share on X">X</button>
    <button class="nds-btn nds-subtle nds-share-linkedin" aria-label="Share on LinkedIn">LinkedIn</button>
    <button class="nds-btn nds-subtle nds-share-whatsapp" aria-label="Share on WhatsApp">WhatsApp</button>
</div>
```

### Attributes
- `data-share-url`: Explicit URL to share (defaults to current page).
- `data-share-title`: Title passed to X/WhatsApp.

---

## 8. Text Truncation (`truncate-text`)
Visual truncation of long strings to a single line or a set block of lines.

### Single-Line Truncation
```html
<span class="nds-truncate" style="max-width: 250px;">
    Very long text that will truncate to one line...
</span>
```

### Multi-Line Truncation
```html
<p class="nds-truncate" style="--truncate: 3;">
    Very long paragraph that will display exactly three lines of text before clipping it with an ellipsis.
</p>
```
