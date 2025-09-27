# Typography Documentation

> Simple guide to using typography utilities in Beathers CSS framework

## Table of Contents

- [Font Sizes](#font-sizes)
- [Text Transformations](#text-transformations)
- [Text Decorations](#text-decorations)
- [Text Alignment](#text-alignment)
- [Text Truncation](#text-truncation)

---

## Font Sizes

### Normal State

```html
<h1 class="h1">Heading 1 (96px)</h1>
<h2 class="h2">Heading 2 (60px)</h2>
<h3 class="h3">Heading 3 (40px)</h3>
<h4 class="h4">Heading 4 (34px)</h4>
<h5 class="h5">Heading 5 (24px)</h5>
<h6 class="h6">Heading 6 (20px)</h6>

<p class="subtitle1">Subtitle 1 (16px)</p>
<p class="subtitle2">Subtitle 2 (14px)</p>
<p class="body1">Body 1 (16px)</p>
<p class="body2">Body 2 (14px)</p>
<p class="button">Button (14px)</p>
<p class="caption">Caption (12px)</p>
<p class="overline">Overline (10px)</p>
```

### Responsive Sizes

```html
<h1 class="h1 md:h2 lg:h3">Responsive heading</h1>
<p class="body1 sm:subtitle1 md:h6">Responsive text</p>
<span class="caption lg:body2">Responsive small text</span>
```

---

## Text Transformations

### Normal State

```html
<p class="uppercase">UPPERCASE TEXT</p>
<p class="lowercase">lowercase text</p>
<p class="capitalize">Capitalize Text</p>
```

### Responsive Transformations

```html
<p class="capitalize md:uppercase">Responsive transform</p>
<p class="lowercase lg:capitalize">Mobile lowercase, desktop capitalize</p>
```

---

## Text Decorations

### Normal State

```html
<p class="underline">Underlined text</p>
<p class="line-through">Strikethrough text</p>
<p class="wavy">Wavy decoration</p>
<p class="double">Double decoration</p>
<p class="dotted">Dotted decoration</p>
<p class="dashed">Dashed decoration</p>
```

### Combined Decorations

```html
<p class="underline capitalize">Underlined and capitalized</p>
<p class="line-through uppercase">Strikethrough and uppercase</p>
```

---

## Text Alignment

### Normal State

```html
<p class="text-left">Left aligned text</p>
<p class="text-start">Start aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>
<p class="text-end">End aligned text</p>
<p class="text-justify">Justified text</p>
```

### Responsive Alignment

```html
<p class="text-left md:text-center lg:text-right">Responsive alignment</p>
<p class="text-center sm:text-left">Mobile center, desktop left</p>
```

---

## Text Truncation

### Normal State

```html
<p class="text-lines:1">Single line truncation with ellipsis...</p>
<p class="text-lines:2">Two line truncation with ellipsis after second line...</p>
<p class="text-lines:3">Three line truncation with ellipsis after third line...</p>
```

### Responsive Truncation

```html
<p class="text-lines:2 md:text-lines:3 lg:text-lines:1">Responsive truncation</p>
<p class="text-lines:1 sm:text-lines:2">Mobile 1 line, desktop 2 lines</p>
```
