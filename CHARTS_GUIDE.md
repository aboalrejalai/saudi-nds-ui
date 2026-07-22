# دليل بناء ومعرض الشارتات والرسوم البيانية (Saudi NDS UI Charts Guide) 📊

هذا الدليل الفني يوضح الآلية المعتمدة 100% لبناء وتصميم واستعراض كروت وسلاسل الرسوم البيانية (Charts Families) بداخل مشروع **Saudi NDS UI**، بنفس الهوية السعودية الأخضراء، والنظام البصري، ودعم اللغتين، وبدون تشوه بصري.

---

## 🎨 1. قواعد النظام البصري والألوان (Design System & Brand Identity)

### أ. الألوان الرسمية للهوية السعودية
- **اللون الأساسي للأيقونات والعناصر**: `#1b8354` (`text-[#1b8354] dark:text-[#54c08a]`)
- **تأثير إمرار الماوس (Hover Effect)**: `#25935f` (`hover:text-[#25935f]`)
- **متغيرات الشارتات بـ `globals.css`**:
  ```css
  --chart-1: #1b8354; /* الأخضر السعودي الرئيسي */
  --chart-2: #25935f; /* الأخضر السعودي الفاتح */
  --chart-3: #166a45; /* الأخضر السعودي الداكن */
  --chart-4: #54c08a; /* الأخضر الناعم */
  --chart-5: #384250; /* الرمادي الداكن الموازي */
  ```

### ب. بنية الطبقات (Strict 2-Layer System)
- **الطبقة الأولى**: أرضية الصفحة الأساسية للموقع (`bg-background`).
- **الطبقة الثانية**: بطاقة الشارت المباشرة `<Card>` ذات الحدود النظيفة `border bg-card`.
- ⚠️ **يُمنع منعاً باتاً**: إضافة أي غلاف خارجي يحتوي على `border` أو `bg-card` أو `p-1` حول بطاقة الشارت لتفادي البرودر المزدوج والتشوه البصري.

---

## 📐 2. التوزيع والتنسيق الهيكلي (Layout & Grid Architecture)

1. **الشارت المتفاعل الرئيسي (Featured Interactive Chart)**:
   - يوضع بداخل حاوية كاملة العرض في أعلى الفئة (`w-full col-span-full`).
2. **الشبكة الثلاثية لجميع الشارتات (3-Column Grid)**:
   - تُنظم بقية شارتات الفئة في شبكة مكونة من **3 أعمدة متناسقة**:
     ```tsx
     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
       {/* 9 Chart Cards */}
     </div>
     ```

---

## 🛠️ 3. المكون الموحد للعرض `ChartShowcaseCard`

المكون المعتمد لاستعراض أي شارت هو [components/docs/chart-showcase-card.tsx](file:///c:/Users/Abo%20Alrejal/Desktop/saudi-nds-ui/components/docs/chart-showcase-card.tsx).

### الخصائص (Props):
- `name`: اسم الملف البرمجي المسجل في السجل (مثل `chart-bar-default`).
- `category`: اسم الفئة (مثل `Bar Chart` أو `رسم بياني شريطي`).
- `title`: العنوان الوظيفي للشارت.
- `code`: كود المصدر البرمجي الصريح.
- `children`: المكون البرمجي الحي للشارت `<ChartBarDefault />`.
- `fullWidth`: هل يأخذ عرض الشاشة بالكامل (`boolean`).

### العناصر التفاعلية بداخل المكون:
- **أيقونة الفئة**: `Chart01Stroke` بلون الأخضر السعودي `#1b8354` مع تأثير `hover:text-[#25935f]`.
- **زر النسخ المباشر**: ينسخ كود المكون فوراً للحافظة مع مؤشر `CheckmarkBadge01Solid`.
- **زر `View Code`**: يفتح نافذة منزلقة من اليمين (Slide-Over Sheet) تظهر الكود البرمجي بخلفية فاتحة ونقية مع أرقام الأسطر.

---

## 🌐 4. قواعد دعم اللغتين (Strict 100% Locale Separation)

- يتم تحديد اللغة النشطة باستخدام `const locale = useLocale()` و `const isAr = locale === "ar"`.
- **في الواجهة الإنجليزية (`en`)**: نصوص إنجليزية فقط 100% (`Bar Chart`, `View Code`, `Copy code`, `Copied`).
- **في الواجهة العربية (`ar`)**: نصوص عربية فقط 100% (`رسم بياني شريطي`, `عرض الكود`, `نسخ الكود`, `تم النسخ`).
- ⚠️ **يُمنع**: خلط الكلمات العربية والإنجليزية في نفس السطر أو العنوان.

---

## 🚀 5. دليل خطوة-بخطوة لإضافة أي عائلة شارتات جديدة (Agent Execution Steps)

لإضافة عائلة جديدة (مثل **Bar Charts**, **Line Charts**, **Pie Charts**, **Radar Charts**, **Radial Charts**):

1. **الخطوة 1: التأكد من مكونات الشارتات بـ `registry/dga/charts/`**:
   - التأكد من استخدام أيقونات `@aboalrejal/nds-icons` ومتغيرات `--chart-1` إلى `--chart-5`.
   - التأكد من دعم الـ Dynamic Props (`data`, `config`, `title`, `description`).

2. **الخطوة 2: إنشاء مكون الاستعراض الفئوي `app/[locale]/chart/<family>-charts-showcase.tsx`**:
   - وضع الشارت المتفاعل الرئيسي `chart-<family>-interactive` في الأعلى بـ `fullWidth`.
   - وضع باقي شارتات الفئة في `grid grid-cols-1 md:grid-cols-3 gap-6`.
   - استخدام `ChartShowcaseCard` لجميع الشارتات.

3. **الخطوة 3: استدعاء المكون في صفحة الشارتات `app/[locale]/chart/page.mdx`**:
   - استدعاء مكون الفئة وعرضه بوضوح تحت عنوان الفئة النظيف.

4. **الخطوة 4: التحقق والرفع (Build & Auto Git Push)**:
   - تشغيل `npm run build` لتأكيد خلو النظام من أي خطأ بـ TypeScript أو Turbopack.
   - تنفيذ `git add .`, `git commit`, و `git push` تلقائياً.
