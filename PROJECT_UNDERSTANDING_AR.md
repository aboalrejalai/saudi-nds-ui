# فهم مشروع Saudi NDS UI

> ملف مرجعي داخلي: كل ما فُهم من قراءة `CLAUDE.md`، `.agents/`، الخطط، الـ skills، الريجستري، والكود الفعلي.
> الهدف: يكون الأساس جاهزاً قبل أي تطوير لاحق (مثل إضافة مهارة ثانية إلى جانب المهارة الحالية).

---

## 1) وش المشروع باختصار؟

**Saudi NDS UI** مكتبة مكوّنات React لنظام التصميم الوطني السعودي (NDS) التابع لهيئة الحكومة الرقمية (DGA).

المشروع **مو** مجرد موقع توثيق، ولا مجرد NPM package فقط. هو **نظام مزدوج الهدف**:

| الهدف | المعنى |
|:---|:---|
| **1. Component Registry (مصدر الحقيقة)** | كل المكوّنات القابلة للتثبيت تعيش في `registry/dga/`. المستهلك ينسخها لمشروعه عبر shadcn CLI. |
| **2. Docs / Showcase Site** | تطبيق يعرض ديمو حي لكل مكوّن، ويخدم ملفات الريجستري الجاهزة على `/r/<name>.json`. |

**أسلوب التوزيع الأساسي (الحالي والعامل):**
نمط **copy/paste** مثل shadcn/ui — مو مكتبة ثقيلة تُستورد من `node_modules` كحزمة مغلقة. المستخدم يملك الكود في مشروعه.

```bash
npx shadcn@latest add @dga/button
# أو
npx shadcn@latest add "https://nds.aboalrejal.com/r/button.json"
```

**هوية التصميم:**
- RTL-first (عربي أولاً)
- خط **IBM Plex Sans Arabic**
- اللون الأساسي الأخضر السعودي `#1B8354` (hover `#166A45`)
- ستايل فقط بـ Tailwind utilities + توكنات DGA (بدون ملفات CSS خارجية لكل مكوّن)

---

## 2) الحالة التقنية الحالية (مهم جداً)

### التحويل من Next.js → Vite

المشروع **كان** على Next.js 16 (App Router + next-intl).  
الآن الكود الفعلي يعمل على:

- **Vite 8** + React 19
- **React Router DOM** بدل App Router
- **Tailwind CSS v4** عبر `@tailwindcss/vite`
- **MDX** عبر `@mdx-js/rollup`
- i18n خفيف داخل `src/i18n/` بدل `next-intl`

الأدلة في الكود:
- `package.json` → `"dev": "vite"`
- `vite.config.ts` موجود
- الصفحات في `src/pages/**` مو في `app/[locale]/`
- `components.json` يشير لـ `src/styles/globals.css`

### خطط الهجرة

| الملف | الفكرة |
|:---|:---|
| `VITE_MIGRATION_PLAN.md` (V1) | خطة كبيرة: monorepo + باقة NPM + docs app — ثقيلة |
| `VITE_MIGRATION_PLAN_V2.md` | الخطة المعتمدة عملياً: مشروع مسطح، إبقاء `registry/dga/` مكانه، Vite SPA للسرعة، ونشر NPM لاحقاً كمرحلة منفصلة |
| `vite-migration-progress.md` | حالة التنفيذ (~95% وقت كتابته): الريجستري لم يُمس، أغلب النقل تم، كان فيه باقٍ بسيط على راوت الصفحة الرئيسية |

### ملاحظة عن التوثيق القديم

بعض الملفات الإرشادية (مثل أجزاء من `CLAUDE.md` و`COMPONENT_CREATION_GUIDE.md`) ما زالت تذكر مسارات Next.js القديمة (`app/[locale]/...`).  
**الواقع الحالي في الكود = Vite + `src/`.**  
الريجستري نفسه لم يتغير مكانه.

---

## 3) هيكل المشروع (الخريطة الذهنية)

```
saudi-nds-ui/
├── registry/dga/          ★ مصدر الحقيقة للمكوّنات (لا يُنقل)
│   ├── ui/                # ~82 مكوّن UI رئيسي
│   ├── charts/            # 70 preset مخططات
│   ├── hooks/             # hooks قابلة للتثبيت
│   ├── lib/               # utils وما شابه
│   ├── internal/          # عناصر داخلية
│   ├── */_registry.ts     # مجمّع لكل مجلد
│   └── registry.ts        # الجذر: يدمج الكل + يفلتر deprecated
│
├── src/                   ★ تطبيق الـ Showcase (Vite SPA)
│   ├── main.tsx / App.tsx
│   ├── pages/             # صفحات الديمو (MDX/TSX) لكل مكوّن
│   ├── components/        # سايدبار، شِل التوثيق، إلخ
│   ├── i18n/              # سياق لغة خفيف
│   ├── lib/ / hooks/
│   └── styles/            # tokens + globals
│
├── public/r/              # مخرجات البناء (gitignored غالباً) → JSON للتثبيت
├── registry.json          # فهرس committed يتزامن مع _registry.ts
├── components.json        # إعداد shadcn + namespace @dga
├── styles/ أو src/styles/ # توكنات DGA
├── packages/icons/        # أيقونات NDS محلية + تنشر كـ @aboalrejal/nds-icons
├── skills/saudi-nds-ui/   ★ المهارة الموجّهة للمستهلك/الوكيل عند بناء مواقع NDS
├── .agents/               ★ قواعد ومهارة انضباط هندسي للوكلاء داخل الريبو
├── scripts/               # سكربتات صيانة الريجستري والهجرة
└── messages/              # ترجمات ar/en
```

---

## 4) الريجستري (Registry) — قلب المشروع

### الفكرة

نفس فكرة shadcn: تعرّف المكوّن + ملفاته + اعتمادياته → `shadcn build` يولّد JSON → CLI ينسخ الملفات لمشروع المستهلك.

### خط الأنابيب

```
registry/dga/ui/*.tsx
registry/dga/hooks/*
registry/dga/lib/*
registry/dga/internal/*
registry/dga/charts/*
        │
        ▼  كل مجلد له _registry.ts
        │
registry/dga/registry.ts   ← يدمج + يحذف DEPRECATED_ITEMS + يتحقق بـ registryItemSchema
        │
        ▼  npm run registry:build  (= shadcn build)
        │
public/r/<name>.json       ← يُخدم على nds.aboalrejal.com/r/...
```

### عناصر مهمة في تعريف كل item

- `files`: مسارات نسبية تحت جذر الريجستري
- `dependencies`: حزم npm (مثل `recharts`, `cmdk`)
- `registryDependencies`: مكوّنات DGA أخرى يحتاجها (مثل button يعتمد على شيء آخر)

### `components.json`

- namespace: `@dga` → `https://nds.aboalrejal.com/r/{name}.json`
- `style: "dga"`, `rtl: true`, `iconLibrary: "hugeicons"`
- المفتاح لازم يكون **`registries` (جمع)** وليس `registry` المفرد — المفرد يكسر تثبيت `@dga/...`

### سكربت مهم للصيانة

`scripts/update-registry-missing.js`
- يكتشف `.tsx` جديدة في `ui/` مو مسجّلة
- يستنتج `dependencies` / `registryDependencies` من الـ imports
- يحدّث `_registry.ts` و`registry.json`

### Deprecated

في `registry.ts` فيه blocklist لأشياء toast قديمة (`toast`, `toast-demo`, ...).

---

## 5) المكوّنات (Components)

### الأرقام التقريبية (حسب الكود والخطط)

| النوع | العدد تقريباً |
|:---|:---:|
| UI رئيسي في `registry/dga/ui/` | **82** |
| Chart presets في `registry/dga/charts/` | **70** |
| صفحات docs/showcase في `src/pages/` | ~90+ |
| أيقونات `@aboalrejal/nds-icons` | **8753+** |
| ملفات مرجع المكوّنات في الـ skill | عشرات ملفات `.md` تحت `references/components/` |

### أمثلة على فئات المكوّنات

- **Inputs & Forms:** button, input, select, checkbox, form, field, combobox, date-picker, file-dropzone, rich-text-editor, multi-select, tag-input, …
- **Feedback:** alert, progress, spinner, skeleton, sonner, toast/toaster, empty, marker, …
- **Overlays:** dialog, alert-dialog, drawer, sheet, popover, tooltip, command, …
- **Navigation:** breadcrumb, pagination, menubar, navigation-menu, sidebar, steps, tree-view, …
- **Layout:** card, accordion, carousel, resizable, scroll-area, timeline, …
- **Data:** table, data-table, badge, avatar, chart, stat, description-list, saudi-riyal-symbol, …
- **Utility:** direction (تبديل RTL/LTR), cookies

### قواعد إنشاء مكوّن جديد (`COMPONENT_CREATION_GUIDE.md`)

1. نظّف أي CSS خارجي → Tailwind فقط
2. طبّق هوية DGA (أخضر + IBM Plex + توكنات)
3. RTL منطقي: `ms/me/ps/pe/start/end` مو `ml/mr/pl/pr/left/right`
4. الأيقونات الاتجاهية تنعكس بـ `rtl:rotate-180` أو `rtl:-scale-x-100`
5. المسار الإلزامي: `registry/dga/ui/<name>.tsx`
6. سجّل في الريجستري + ابنِ بـ `npm run registry:build`
7. أضف صفحة ديمو (حالياً تحت `src/pages/...` بعد الهجرة)

### عقد الظهور في السايدبار

مكوّن يظهر في قائمة التوثيق فقط إذا وُجد **الملفان معاً**:
- ملف الريجستري: `registry/dga/ui/<name>.tsx`
- صفحة الديمو: (سابقاً `app/[locale]/<name>/page.mdx`، حالياً تحت `src/pages/...`)

استثناءات/استبعادات معروفة في المنطق: `_registry`, `sidebar`, `sheet`, `direction`, `utils` (حسب الوثائق).

---

## 6) التصميم والثيم (Design Tokens)

### مصدر الحقيقة

- توكنات النظام الخام: ملفات tokens (مثل `styles/tokens.css` / `src/styles/tokens.css`)
- الجسر الدلالي لـ shadcn: `globals.css` يربط `--background`, `--primary`, `--border`, … عبر `:root`
- ثم `@theme inline` يعرّضها لـ Tailwind v4

### ما يُفضَّل في الكود

- استخدم كلاسات bridged: `bg-primary`, `text-foreground`, `border-border`
- تجنّب hex خام إلا عند الضرورة أو أثناء التحويل الأولي

### لا يوجد `tailwind.config.ts` تقليدي

التخصيص كله في CSS (Tailwind v4).  
لا تستخدم توجيهات v3 القديمة `@tailwind base/components/utilities`.

### Dark mode

عبر `@custom-variant dark (&:is(.dark *))`.

### قواعد عملة الريال (إلزامية في الـ skill)

- لا تستخدم `ر.س` أو `SAR` كنص
- استخدم مكوّن `<SaudiRiyalSymbol />`

---

## 7) الأيقونات — لا تخلط بينها

| السياق | المكتبة الصحيحة |
|:---|:---|
| داخل مكوّنات الريجستري (`registry/dga/ui`) | `@hugeicons/react` (مضبوط في `iconLibrary`) |
| أيقونات سعودية مخصصة على مستوى التطبيق/المنتجات | `@aboalrejal/nds-icons` (وموجودة محلياً في `packages/icons/`) |

يوجد في `package.json` مكتبات أخرى (phosphor, tabler, remixicon) — غالباً إرث/استخدام محدود. القاعدة: **طابق المحيط، ولا تدخل مكتبة جديدة بدون سبب.**

تسمية nds-icons: `<SemanticName><Stroke|Solid>` مثل `Search01Stroke`, `User02Solid`.  
**ممنوع تخمين الأسماء** — ابحث في `ALL_ICONS.md` أو شغّل `find-icons.cjs`.

---

## 8) المهارة الرئيسية: `skills/saudi-nds-ui/`

هذه هي **المهارة الموجّهة للمستهلك** (AI agent يبني موقع حكومي سعودي / يطبّق NDS في مشروع خارجي).

### الملف الرئيسي

`skills/saudi-nds-ui/SKILL.md`

### متى تُستخدم؟

عندما يبني/يصمّم موقع حكومي سعودي، أو يذكر NDS / DGA / النظام الوطني للتصميم / مكوّنات NDS.

### بوابة التقييم أولاً

قبل أي تعديل على مشروع قائم:

```bash
node skills/saudi-nds-ui/scripts/evaluate-project.js
```

حسب النتيجة يختار أحد الأوضاع:

| الوضع | متى؟ | ماذا يفعل؟ |
|:---|:---|:---|
| **Mode A** | مشروع جديد / بدون Tailwind-shadcn | يهيئ Vite أو Next + Tailwind v4 + shadcn + يسجّل `@dga` + يربط tokens |
| **Mode B** | مشروع متوافق ودرجة عالية | ترحيل آمن: تثبيت مكوّنات NDS واستبدال الواجهة تدريجياً + فحص RTL |
| **Mode C** | مشروع أصلاً متوافق | إضافة مكوّن واحد فقط عبر `npx shadcn add @dga/...` |

تحذير صارم في المهارة: **لا تثبّت** حزمة `platformscode-new-react` لأنها تكسر `globals.css`/Tailwind.

### محتويات مجلد المهارة

```
skills/saudi-nds-ui/
├── SKILL.md                 # التعليمات الرئيسية + Modes A/B/C
├── references/
│   ├── components/*.md      # API/variants لكل مكوّن (المصدر اللي يُقرأ بدل التخمين)
│   ├── components-guide.md  # دليل مولَّد
│   ├── theme-customization.md
│   └── ALL_ICONS.md         # فهرس 8753+ أيقونة
├── scripts/
│   ├── evaluate-project.js  # Gatekeeper / تقييم البيئة
│   ├── lookup.js            # اطبع API لمكوّن
│   ├── audit-page.js        # تدقيق توافق NDS لملف
│   ├── generate-guide.js    # إعادة توليد وثائق المكوّنات
│   ├── find-icons.cjs       # بحث أسماء أيقونات
│   ├── scan-project-icons.cjs
│   └── … سكربتات تحويل/ترقيع أيقونات
├── examples/                # أمثلة تركيب (مثل login form)
└── evals/evals.json         # حالات اختبار للمهارة
```

### خطة تحديث المهارة (`SKILL_UPDATE_PLAN.md`)

خطة منفّذة (checkboxes معلّمة) لتحديث المهارة لتتوافق مع:
- عدد المكوّنات 82
- توثيق 7 فئات charts
- Vite 8 + React 19 + Tailwind v4 كخيار أساسي
- مسارات `src/styles/...`
- تحديث `evaluate-project.js` ليعطي 10/10 لـ Vite
- إنشاء evals

**الخلاصة:** المهارة الحالية ناضجة وممتازة كمسار واحد (تثبيت/ترحيل/إضافة مكوّنات NDS في مشاريع المستهلكين).

---

## 9) طبقة الوكلاء داخل الريبو: `.agents/`

هذه طبقة **منفصلة عن مهارة NDS**. هدفها ضبط سلوك الوكيل أثناء التطوير داخل هذا الريبو نفسه.

### الملفات

| المسار | الدور |
|:---|:---|
| `.agents/AGENTS.md` | قاعدة workspace: بعد أي تعديل → commit + push تلقائي |
| `.agents/rules/agents.md` | قواعد قصيرة تُحقن دائماً: صنّف، لا تكذب، حقّق قبل التعديل، خطّط، تحقق قبل "تم"، تغيير أدنى |
| `.agents/rules/gemini.md` | قواعد خاصة بسياق Gemini إن وُجد |
| `.agents/skills/claude-style/` | مهارة انضباط هندسي (Claude-style) |
| `.agents/workflow/claude-style.md` | workflow تنفيذي Investigate → Plan → Execute → Verify |

### مهارة `claude-style` (ليست مهارة NDS)

الغرض: منع هلوسة الوكلاء السريعة (تخمين ملفات، اختراع signatures، قول "تم" بدون إثبات).

المراحل الأربع:
1. **INVESTIGATE** — راقب فقط، لا تكتب
2. **PLAN** — خطّة للمراجعة قبل التعديل
3. **EXECUTE** — تعديلات أدنى حسب الخطة
4. **VERIFY** — شغّل build/lint/typecheck واقرأ الناتج

قبلها: **Classification Gate** (طلب جديد أم استمرار؟).

مراجعها:
- `four-phases.md`
- `classification-gate.md`
- `anti-hallucination.md`
- `claude-vs-gemini-gap.md`

### تمييز المهارات (منتجان + انضباط)

1. **`skills/saudi-nds-ui`** = مهارة حكومية/رسمية (`@dga` registry + nds-icons/hugeicons)
2. **`skills/saudi-soft`** = مهارة Soft **مستقلة كاملة** (مدموج فيها CLI/MCP/rules الخاصة بـ shadcn + ثيم Soft/lucide/RTL/دارك) — تُنسخ المجلد لأي مشروع وتعمل وحدها، بدون اعتماد على `.agents/skills/shadcn`
3. **`.agents/skills/claude-style`** = انضباط هندسي للوكيل داخل الريبو
4. **`.agents/skills/shadcn`** (+ `migrate-radix-to-base`) = السكيلز الرسمية في هذا الريبو (مرجع/صيانة؛ Soft لم يعد يعتمد عليها وقت التشغيل)

---

## 10) أوامر التشغيل والصيانة

```bash
npm run dev              # Vite dev server (مو Next)
npm run build            # registry:build ثم tsc ثم vite build
npm run registry:build   # shadcn build → public/r/*.json
npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run format           # prettier --write .
npm run format:check
```

**ما فيه إطار اختبارات جاهز** في المشروع — لا تخترع أوامر test غير موجودة.

سكربتات مساعدة إضافية تحت `scripts/` و`skills/.../scripts/` للهجرة، التدقيق، توليد الأدلة، الأيقونات.

---

## 11) أسلوب الكود (Prettier)

- بدون semicolons
- double quotes
- مسافة 2
- trailing comma `es5`
- LF
- ترتيب imports عبر `@ianvs/prettier-plugin-sort-imports`
- دمج الكلاسات بـ `cn()` من `lib/utils` (clsx + tailwind-merge)

---

## 12) RTL واللغة

- سابقاً: locale في مسار URL عبر next-intl (`/ar`, `/en`)
- حالياً: سياق i18n داخل Vite SPA (الرسائل ما زالت في `messages/ar.json` و`messages/en.json`)
- `dir` يجب أن يتبع اللغة (rtl للعربية)
- في صفحات الديمو يوجد آلية تبديل اتجاه للتجربة

---

## 13) ما تم إنجازه / ما يبقى (حسب الخطط)

### منجز تقريباً
- مكتبة UI + charts مكتملة نسبياً (82 + 70)
- ريجستري shadcn يعمل ويُنشر على `nds.aboalrejal.com`
- مهارة `saudi-nds-ui` محدّثة (Modes A/B/C + مراجع + سكربتات + evals)
- هجرة Vite منفّذة في الكود الفعلي إلى حد كبير
- باقة أيقونات ضخمة `@aboalrejal/nds-icons`

### مخطط لاحقاً (حسب V2 ولم يُنفَّذ بالكامل بالضرورة)
- نشر باقة NPM بديلة `@saudi-nds/ui` عبر tsup (مع الإبقاء على مسار shadcn)
- أي تحسينات أداء/توثيق متبقية بعد استقرار Vite

### نقطة تطوير (منفّذة)
- مهارة ثانية **Saudi Soft**: [`skills/saudi-soft`](skills/saudi-soft) — حزمة مستقلة (shadcn vendored + هوية Soft). انسخ المجلد لأي مشروع وابنِ منه مباشرة.

---

## 14) الخلاصة التنفيذية (للوكيل قبل أي تعديل لاحق)

1. **مصدر الحقيقة للمكوّنات = `registry/dga/`** — لا تنقلها إلا بقرار صريح.
2. **التوزيع الأساسي = shadcn registry `@dga`** على `nds.aboalrejal.com`.
3. **الـ Showcase الحالي = Vite SPA تحت `src/`** — مو Next.
4. **المهارة الحكومية = `skills/saudi-nds-ui`** بثلاث أوضاع A/B/C.
5. **المهارة Soft = `skills/saudi-soft`** — حزمة مستقلة كاملة؛ لا تحتاج سكيل shadcn منفصلة.
6. **انضباط الوكيل داخل الريبو = `.agents` + claude-style**.
7. **الهوية الحكومية = أخضر DGA + IBM Plex + RTL منطقي + توكنات CSS + شكل NDS**.
8. **لا تخمّن APIs ولا أسماء أيقونات** — NDS: `lookup.js` / Soft: `shadcn docs` + lucide.
9. مساران منفصلان: حكومي (`@dga`) مقابل Soft (upstream shadcn) — لا تخلطهما بلا قرار صريح.

---

*آخر تحديث لهذا الملخص: اعتماداً على قراءة الريبو الحالية (Vite فعلي + ريجستري + skills + agents + خطط الهجرة/تحديث المهارة).*
