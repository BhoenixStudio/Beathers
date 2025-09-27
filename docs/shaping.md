# Shaping Documentation

> Simple guide to visual styling utilities in Beathers CSS framework

## Table of Contents

- [Shadows](#shadows)
- [Glass Effects](#glass-effects)
- [Display & Visibility](#display--visibility)
- [Overflow](#overflow)
- [Object Fit](#object-fit)
- [Positioning](#positioning)
- [Sizing](#sizing)
- [Border Radius](#border-radius)

---

## Shadows

### Normal State

```html
<div class="shadow:light">Light shadow</div>
<div class="shadow:soft">Soft shadow</div>
<div class="shadow:medium">Medium shadow</div>
<div class="shadow:solid">Solid shadow</div>
<div class="shadow:floating">Floating shadow</div>
<div class="shadow:flat">Flat shadow</div>
```

### Responsive Shadows

```html
<div class="shadow:soft md:shadow:medium lg:shadow:floating">Responsive shadow</div>
<div class="shadow:light lg:shadow:solid">Mobile light, desktop solid</div>
```

---

## Glass Effects

### Normal State

```html
<div class="bg:glass">Glass effect element</div>
<div class="bg:glass radius:full">Rounded glass effect</div>
<div class="bg:glass shadow:soft">Glass with soft shadow</div>
```

### Theme Support

```html
<!-- Context method -->
<div class="light">
  <div class="bg:glass">Light theme glass</div>
</div>
<div class="dark">
  <div class="bg:glass">Dark theme glass</div>
</div>

<!-- Direct method -->
<div class="bg:glass light">Light glass</div>
<div class="bg:glass dark">Dark glass</div>

<!-- Utility-first -->
<div class="light:bg:glass">Light only glass</div>
<div class="dark:bg:glass">Dark only glass</div>
```

### Combined with Other Utilities

```html
<div class="bg:glass shadow:floating radius:full p-relative">Complete glass card</div>
<div class="bg:glass color-main border:color-main">Glass with borders</div>
<div class="bg:glass d-flex justify-center items-center">Glass container</div>
```

### Custom Settings

Customize glass effects using CSS custom properties:

```css
.custom-glass {
  --glass-blur: 12px;
  --glass-border-thickness: 2px;
  --glass-light-angle: 135deg;

  /* Light theme colors */
  --glass-color-light: rgba(255, 255, 255, 0.2);
  --glass-border-1-color-light: rgba(255, 255, 255, 0.3);
  --glass-border-2-color-light: rgba(255, 255, 255, 0.1);

  /* Dark theme colors */
  --glass-color-dark: rgba(0, 0, 0, 0.2);
  --glass-border-1-color-dark: rgba(255, 255, 255, 0.1);
  --glass-border-2-color-dark: rgba(255, 255, 255, 0.05);
}
```

**Usage:**

```html
<div class="bg:glass custom-glass">Custom glass effect</div>
```

**Available Settings:**

- `--glass-blur` - Backdrop blur amount (default: 8px)
- `--glass-border-thickness` - Border thickness (default: 1px)
- `--glass-light-angle` - Gradient angle (default: 45deg)
- `--glass-color-light/dark` - Background colors for themes
- `--glass-border-1/2-color-light/dark` - Border gradient colors

---

## Display & Visibility

### Normal State

```html
<div class="d-inline">Inline display</div>
<div class="d-block">Block display</div>
<div class="d-inline-block">Inline-block display</div>
<div class="d-flex">Flex display</div>
<div class="d-inline-flex">Inline-flex display</div>
<div class="d-inline-grid">Inline-grid display</div>
<div class="d-table">Table display</div>
<div class="d-table-cell">Table-cell display</div>
<div class="d-none">Hidden element</div>
```

### Responsive Display

```html
<div class="d-none md:d-block">Hidden on mobile, visible on desktop</div>
<div class="d-block lg:d-flex">Block on mobile, flex on desktop</div>
```

---

## Overflow

### Normal State

```html
<div class="overflow-visible">Visible overflow</div>
<div class="overflow-hidden">Hidden overflow</div>
<div class="overflow-auto">Auto overflow</div>
<div class="overflow-scroll">Scroll overflow</div>
```

### Directional Overflow

```html
<div class="x:overflow-hidden">Hide horizontal overflow</div>
<div class="y:overflow-auto">Auto vertical overflow</div>
<div class="x:overflow-scroll y:overflow-hidden">Mixed overflow control</div>
```

### Responsive Overflow

```html
<div class="overflow-hidden md:overflow-auto">Responsive overflow</div>
<div class="x:overflow-auto lg:x:overflow-hidden">Responsive horizontal</div>
```

---

## Object Fit

### Normal State

```html
<img class="object-fit:cover" src="image.jpg" />
<img class="object-fit:fill" src="image.jpg" />
<img class="object-fit:contain" src="image.jpg" />
<img class="object-fit:none" src="image.jpg" />
```

### Responsive Object Fit

```html
<img class="object-fit:cover md:object-fit:contain" src="image.jpg" />
<img class="object-fit:fill lg:object-fit:cover" src="image.jpg" />
```

---

## Positioning

### Normal State

```html
<div class="p-static">Static position</div>
<div class="p-relative">Relative position</div>
<div class="p-fixed">Fixed position</div>
<div class="p-absolute">Absolute position</div>
<div class="p-sticky">Sticky position</div>
```

### Responsive Positioning

```html
<div class="p-relative md:p-absolute">Responsive positioning</div>
<div class="p-static lg:p-sticky">Mobile static, desktop sticky</div>
```

---

## Sizing

### Width

```html
<div class="w:25">25% width</div>
<div class="w:50">50% width</div>
<div class="w:75">75% width</div>
<div class="w:100">100% width</div>

<div class="min:w:25">Min 25% width</div>
<div class="max:w:75">Max 75% width</div>
```

### Height

```html
<div class="h:25">25% height</div>
<div class="h:50">50% height</div>
<div class="h:75">75% height</div>
<div class="h:100">100% height</div>

<div class="min:h:50">Min 50% height</div>
<div class="max:h:90">Max 90% height</div>
```

### Responsive Sizing

```html
<div class="w:100 md:w:50 lg:w:25">Responsive width</div>
<div class="h:50 md:h:75 lg:h:100">Responsive height</div>
<div class="min:w:25 lg:min:w:50">Responsive min-width</div>
```

---

## Border Radius

### Normal State

```html
<div class="radius:full">Full rounded</div>
<div class="radius:top:full">Top rounded</div>
<div class="radius:bottom:full">Bottom rounded</div>
<div class="radius:start:full">Start rounded</div>
<div class="radius:end:full">End rounded</div>
```

### Corner-Specific Radius

```html
<div class="radius:top-start:full">Top-start corner</div>
<div class="radius:top-end:full">Top-end corner</div>
<div class="radius:bottom-start:full">Bottom-start corner</div>
<div class="radius:bottom-end:full">Bottom-end corner</div>
```

### Responsive Radius

```html
<div class="radius:full md:radius:top:full">Responsive border radius</div>
<div class="radius:start:full lg:radius:full">Start on mobile, full on desktop</div>
```
