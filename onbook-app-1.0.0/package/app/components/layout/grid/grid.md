# Open Source Component Library

## Grid Component

The `Grid` component is a flexible layout system built on CSS Grid. It leverages Vanilla Extract for performant styling and provides intuitive props for handling gaps and alignment.

## Props

### Base Props

| Prop      | Type                | Description                                         |
|-----------|---------------------|-----------------------------------------------------|
| as        | ElementType         | Allows setting the HTML element (defaults to `div`) |
| className | string              | Additional CSS classes                              |
| style     | React.CSSProperties | Additional inline styles                            |

### Grid Variants (`grid` recipe)

| Variant      | Possible Values                                      | Description                                  |
|--------------|------------------------------------------------------|----------------------------------------------|
| columns      | 1, 2, 3, 4, 5, 6, 12                                 | Number of grid columns.                      |
| rows         | 1, 2, 3, 4, 6                                        | Number of grid rows.                         |
| autoFlow     | row, column, row dense, column dense                 | Direction of the auto-placement algorithm.   |
| autoColumns  | auto, min, max, fr                                   | Size of implicitly-created grid columns.     |
| autoRows     | auto, min, max, fr                                   | Size of implicitly-created grid rows.        |
| align        | start, center, end, stretch                          | Vertical alignment of items (align-items).   |
| justify      | start, center, end, stretch, between, around, evenly | Horizontal alignment of items (justify-items).|
| alignContent | start, center, end, stretch, between, around         | Vertical content alignment (align-content).  |

### Gap Props

| Prop      | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| gap       | number | Sets both column and row gap (spacing tokens) |
| columnGap | number | Sets gap between columns (spacing tokens)     |
| rowGap    | number | Sets gap between rows (spacing tokens)        |

---

## Usage Examples

### 1. Simple 3-Column Grid
A basic layout with 3 columns and a spacing of 4.

```tsx
<Grid columns={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>