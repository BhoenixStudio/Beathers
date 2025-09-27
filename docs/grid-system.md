# Grid System Documentation

> Simple guide to using grid and flexbox utilities in Beathers CSS framework

## Table of Contents

- [CSS Grid](#css-grid)
- [Flexbox](#flexbox)

---

## CSS Grid

### Normal State

```html
<!-- Grid Container -->
<div class="grid">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<div class="grid cols:12">
  <div class="col:4">1/3 width</div>
  <div class="col:4">1/3 width</div>
  <div class="col:4">1/3 width</div>
</div>

<div class="grid cols:12">
  <div class="col:6">Half width</div>
  <div class="col:6">Half width</div>
</div>

<div class="grid cols:12">
  <div class="col:4">4 columns</div>
  <div class="col:8">8 columns</div>
  <div class="col:3">3 columns</div>
  <div class="col:9">9 columns</div>
  <div class="col:auto">Auto width</div>
</div>
```

### Row System

```html
<div class="grid rows:12">
  <div class="row:4">1/3 width</div>
  <div class="row:4">1/3 width</div>
  <div class="row:auto">Auto height</div>
</div>
```

### Responsive Grid

```html
<div class="grid cols:1 md:cols:2 lg:cols:4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<div class="grid cols:12">
  <div class="col:12 md:col:6 lg:col:4">Responsive column</div>
  <div class="col:12 md:col:6 lg:col:8">Responsive column</div>
</div>
```

---

## Flexbox

### Normal State

```html
<!-- Basic Flex Container -->
<div class="flex">
  <div>Flex item 1</div>
  <div>Flex item 2</div>
  <div>Flex item 3</div>
</div>

<!-- Flex with direction -->
<div class="flex row">Horizontal layout</div>
<div class="flex column">Vertical layout</div>
<div class="flex row-reverse">Reverse horizontal</div>
<div class="flex column-reverse">Reverse vertical</div>
```

### Flex Wrap

```html
<div class="flex wrap">Wrapping flex container</div>
<div class="flex nowrap">Non-wrapping flex container</div>
```

### Flex Wrapper System

```html
<!-- Auto-sized flex children -->
<div class="flex flex-wrapper row cols:auto">
  <div>Auto width item</div>
  <div>Auto width item</div>
  <div>Auto width item</div>
</div>

<!-- Equal columns with flex -->
<div class="flex flex-wrapper row cols:3">
  <div>1/3 width</div>
  <div>1/3 width</div>
  <div>1/3 width</div>
</div>
```

### Responsive Flexbox

```html
<div class="flex column md:row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex flex-wrapper row cols:1 md:cols:2 lg:cols:4">
  <div>Responsive flex item</div>
  <div>Responsive flex item</div>
  <div>Responsive flex item</div>
  <div>Responsive flex item</div>
</div>
```
