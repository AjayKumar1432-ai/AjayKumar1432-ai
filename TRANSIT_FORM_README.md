# Transit Form PDF Generator with Duplicate Copy Watermark

## 📋 Overview

This repository contains an implementation of a PDF generator for Transit Forms with a "DUPLICATE COPY" watermark feature. The solution adds a professional watermark to the duplicate section of the PDF while keeping the original section clean.

## 🎯 Problem Statement

The requirement was to add a watermark that says "Duplicate Copy" to a PDF document generated using pdfMake. The PDF contains two sections:
1. **Original** - Transit Form (Original)
2. **Duplicate** - Transit Form (Duplicate)

## ✅ Solution Implemented

The solution adds a diagonal "DUPLICATE COPY" watermark that appears only on the second page (duplicate section) of the PDF.

### Key Features:
- ✨ **Conditional Watermark**: Only appears on page 2 (duplicate section)
- 🎨 **Professional Styling**: Semi-transparent, diagonal watermark that doesn't obscure content
- 🔧 **Highly Customizable**: Easy to adjust text, color, size, position, and angle
- 📄 **Clean Original**: Page 1 remains unwatermarked
- 🏗️ **Minimal Changes**: Surgical modifications to existing code

## 📁 Files in This Repository

### Main Implementation
- **`transit-form-generator.ts`** - Complete TypeScript function with watermark implementation

### Documentation
- **`CODE_CHANGES.md`** - Before/after comparison of code changes
- **`WATERMARK_IMPLEMENTATION.md`** - Detailed technical documentation
- **`SUMMARY.md`** - Quick reference guide
- **`README.md`** - This file

## 🔍 What Changed

### 1. Background Function Refactoring
The `backgroundFn` was refactored from a simple return statement to an array-based approach:

```typescript
// NEW: Flexible array-based approach
const backgroundFn = (currentPage: number) => {
  const elements: any[] = [];
  
  // Add template background if available
  if (this.templateBackground) {
    elements.push({ /* template config */ });
  }
  
  // Always add timestamp
  elements.push({ /* timestamp config */ });
  
  // Add watermark only on page 2
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

### 2. Page Break Addition
Added explicit page break to ensure duplicate section starts on page 2:

```typescript
{ text: '', margin: [0, 8], pageBreak: 'after' },
```

## 🎨 Watermark Specifications

| Property | Value | Description |
|----------|-------|-------------|
| Text | "DUPLICATE COPY" | The watermark text |
| Font Size | 60 | Large enough to be visible |
| Font Weight | Bold | Makes text more prominent |
| Color | #CCCCCC | Light gray color |
| Opacity | 0.3 | 30% transparent |
| Position | x: 150, y: 400 | Centered on page |
| Angle | -45° | Diagonal orientation |
| Page | 2 only | Only on duplicate section |

## 🚀 Usage

```typescript
// Simply call the function as before
await this.generateAndDownloadTransitFormforGranite();

// The PDF will automatically include the watermark on page 2
```

## 🔧 Customization Guide

### Change Watermark Text
```typescript
text: 'YOUR TEXT HERE',
```

### Adjust Size
```typescript
fontSize: 70, // Larger
// or
fontSize: 40, // Smaller
```

### Change Color
```typescript
color: '#FF0000', // Red
// or
color: '#0000FF', // Blue
```

### Modify Opacity
```typescript
opacity: 0.5, // More visible
// or
opacity: 0.1, // More subtle
```

### Reposition
```typescript
absolutePosition: { x: 200, y: 350 }, // Different position
```

### Change Angle
```typescript
angle: -30, // Less steep
// or
angle: -60, // Steeper
```

### Show on All Pages
```typescript
// Remove the condition
// if (currentPage === 2) {
  elements.push({ /* watermark */ });
// }
```

### Show on Original Only
```typescript
if (currentPage === 1) {
  elements.push({ /* watermark */ });
}
```

## 📊 PDF Layout

### Page 1: Original (No Watermark)
- Company logo and QR code header
- HSN Code, Stationary No, Date & Time
- Complete transit form details
- Block dimensions table
- Legal notes

### Page 2: Duplicate (With Watermark)
- Same content as page 1
- **"DUPLICATE COPY" watermark** overlaid diagonally
- Signature lines at bottom

## 🧪 Testing Recommendations

1. ✅ Generate a PDF and verify watermark appears on page 2
2. ✅ Check that watermark doesn't obscure important information
3. ✅ Verify watermark is visible when printed
4. ✅ Ensure original (page 1) remains unwatermarked
5. ✅ Test with different page sizes if needed

## 📝 Technical Details

### Dependencies
- **pdfMake**: PDF generation library (already in use)
- **TypeScript**: For type safety

### Browser Compatibility
Works in all modern browsers that support:
- Blob API
- URL.createObjectURL()

### Performance
- Minimal overhead added
- Watermark is generated on-the-fly
- No additional HTTP requests

## 🔒 Security Considerations

- No external dependencies added
- All processing done client-side
- No data sent to external services
- Uses existing security model

## 🐛 Troubleshooting

### Watermark not appearing
- Check that PDF has 2 pages
- Verify page break is added after first section
- Check currentPage === 2 condition

### Watermark obscuring content
- Adjust `opacity` (lower value = more transparent)
- Modify `absolutePosition` (x, y coordinates)
- Change `color` to lighter shade

### Watermark too small/large
- Adjust `fontSize` value
- Modify position if needed after size change

## 📚 Additional Resources

- [pdfMake Documentation](http://pdfmake.org)
- [pdfMake Playground](http://pdfmake.org/playground.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This implementation is part of the AjayKumar1432-ai repository.

## 👥 Contributors

- Implementation: GitHub Copilot Workspace Agent
- Repository Owner: @AjayKumar1432-ai

## 📞 Support

For questions or issues, please open an issue in the GitHub repository.

---

**Note**: This is a demonstration implementation. Integrate the `transit-form-generator.ts` function into your actual application component or service as needed.
