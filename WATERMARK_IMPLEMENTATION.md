# Duplicate Copy Watermark Implementation

## Overview
This document explains the changes made to add a "DUPLICATE COPY" watermark to the Transit Form PDF generator.

## Changes Made

### 1. Modified `backgroundFn` Function
The background function was refactored to support multiple elements and conditionally add the watermark:

```typescript
const backgroundFn = (currentPage: number) => {
  const elements: any[] = [];
  
  // Add template background if available
  if (this.templateBackground) {
    elements.push({
      image: this.templateBackground,
      width: 360,
      absolutePosition: { x: 24, y: 40 },
      opacity: 0.06,
    });
  }
  
  // Add timestamp
  elements.push({
    text: `10/9/25, 8:37 PM`,
    fontSize: 10,
    bold: true,
    absolutePosition: { x: 35, y: 55 },
  });
  
  // Add "DUPLICATE COPY" watermark on page 2 (duplicate section)
  if (currentPage === 2) {
    elements.push({
      text: 'DUPLICATE COPY',
      fontSize: 60,
      bold: true,
      color: '#CCCCCC',
      opacity: 0.3,
      absolutePosition: { x: 150, y: 400 },
      angle: -45,
    });
  }
  
  return elements.length > 0 ? { stack: elements } : null;
};
```

### 2. Added Page Break
Added explicit page break after the original section to ensure the duplicate section starts on page 2:

```typescript
{ text: '', margin: [0, 8], pageBreak: 'after' },
```

## Watermark Specifications

- **Text**: "DUPLICATE COPY"
- **Font Size**: 60
- **Font Weight**: Bold
- **Color**: #CCCCCC (Light Gray)
- **Opacity**: 0.3 (30% transparent)
- **Position**: Centered diagonally across the page (x: 150, y: 400)
- **Angle**: -45 degrees (diagonal)
- **Page**: Only appears on page 2 (the duplicate section)

## Benefits

1. **Clear Identification**: The duplicate copy is clearly marked, preventing confusion
2. **Professional Appearance**: The watermark is styled to be visible but not intrusive
3. **Conditional Display**: Only appears on the duplicate section, keeping the original clean
4. **Customizable**: All watermark properties (text, size, color, opacity, position, angle) can be easily adjusted

## Testing Recommendations

1. Generate a PDF and verify the watermark appears on page 2
2. Check that the watermark doesn't obscure important information
3. Verify the watermark is visible when printed
4. Ensure the original (page 1) remains unwatermarked
5. Test with different page sizes if needed

## Future Enhancements

If needed, you can:
- Adjust the position by modifying the `absolutePosition` values
- Change the angle by modifying the `angle` property
- Modify the opacity for more or less visibility
- Change the color to match branding requirements
- Add watermarks to both pages if desired (remove the `if (currentPage === 2)` condition)
