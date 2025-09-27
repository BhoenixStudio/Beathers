# Colors Documentation

> Simple guide to using color utilities in Beathers CSS framework

## Table of Contents

- [Text Colors](#text-colors)
- [Background Colors](#background-colors)
- [Border Colors](#border-colors)
- [Color Opacity](#color-opacity)
- [Special Utilities](#special-utilities)

---

## Text Colors

### Normal State

```html
<p class="color-main">Main color text</p>
<p class="color-primary">Primary color text</p>
```

### Pseudo State

```html
<p class="color-main:hover">Hover text color</p>
<p class="color-primary:focus">Focus text color</p>

<input class="color-main:placeholder" placeholder="Placeholder color" />
```

### Current Color

```html
<div class="color-primary">
  <span class="current-color">Inherits parent text color</span>
</div>
```

### Dark/Light Mode

```html
<!-- Context method -->
<div class="light">
  <p class="color-main">Light theme text</p>
</div>

<!-- Direct method -->
<p class="color-main light">Light text</p>
<p class="color-main dark">Dark text</p>

<!-- Utility-first -->
<p class="light:color-main">Light only</p>
<p class="dark:color-main">Dark only</p>
```

### CSS Integration

```css
.custom-text {
  color: var(--color-main-light);
}
.dark .custom-text {
  color: var(--color-main-dark);
}
```

### SCSS Integration

```scss
@use 'beathers/scss/functions/colors' as colors;

.custom-text {
  @include colors.useColor('main', color);
}
```

---

## Background Colors

### Normal State

```html
<div class="bg:color-main">Main background</div>
<div class="bg:color-primary">Primary background</div>
```

### Pseudo State

```html
<button class="bg:color-main:hover">Hover background</button>
<input class="bg:color-primary:focus">Focus background</input>
```

### Current Color

```html
<div class="color-primary">
  <span class="bg:current-color">Background matches text color</span>
</div>
```

### Dark/Light Mode

```html
<div class="bg:color-main light">Light background</div>
<div class="bg:color-main dark">Dark background</div>
<div class="light:bg:color-main">Light only background</div>
```

### CSS Integration

```css
.custom-bg {
  background-color: var(--color-main-light);
}
.dark .custom-bg {
  background-color: var(--color-main-dark);
}
```

### SCSS Integration

```scss
@use 'beathers/scss/functions/colors' as colors;

.custom-bg {
  @include colors.useColor('main', background-color);
}
```

---

## Border Colors

### Normal State

```html
<div class="border:color-main">Main border</div>
<div class="border:color-primary">Primary border</div>
```

### Pseudo State

```html
<input class="border:color-main:hover">Hover border</input>
<input class="border:color-primary:focus">Focus border</input>
```

### Current Color

```html
<div class="color-primary">
  <div class="border:current-color">Border matches text color</div>
</div>
```

### Dark/Light Mode

```html
<div class="border:color-main light">Light border</div>
<div class="border:color-main dark">Dark border</div>
<div class="light:border:color-main">Light only border</div>
```

### CSS Integration

```css
.custom-border {
  border-color: var(--color-main-light);
}
.dark .custom-border {
  border-color: var(--color-main-dark);
}
```

### SCSS Integration

```scss
@use 'beathers/scss/functions/colors' as colors;

.custom-border {
  @include colors.useColor('main', border-color);
}
```

---

## Color Opacity

### Normal State

```html
<p class="color-main:25">25% opacity text</p>
<div class="bg:color-primary:50">50% opacity background</div>
<div class="border:color-main:70">70% opacity border</div>
```

### Pseudo State

```html
<p class="color-main:50:hover">Hover with opacity</p>
<button class="bg:color-primary:25:focus">Focus with opacity</button>
```

### Dark/Light Mode

```html
<p class="color-main:50 light">Light theme with opacity</p>
<p class="dark:color-main:25">Dark theme with opacity</p>
```

### CSS Integration

```css
.custom-opacity {
  color: rgba(var(--color-main-light-rgb), 0.5);
}
```

### SCSS Integration

```scss
@use 'beathers/scss/functions/colors' as colors;

.custom-opacity {
  @include colors.useColor('main', color, 50);
}
```

---

## Special Utilities

### Fill & Stroke (SVG)

```html
<svg class="fill:color-main">SVG with main fill</svg>
<svg class="stroke:color-primary">SVG with primary stroke</svg>
<svg class="fill:color-main:hover">Hover fill color</svg>
```

### Text Stroke

```html
<h1 class="text-stroke:color-main">Text with stroke</h1>
<h2 class="text-stroke:color-primary:50">50% opacity stroke</h2>
```
