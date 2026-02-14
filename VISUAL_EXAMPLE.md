# Visual Example of Watermark Implementation

## How the Watermark Appears

This document provides a visual representation of how the "DUPLICATE COPY" watermark will appear on the PDF.

## Page Layout Comparison

### Page 1 - ORIGINAL (No Watermark)

```
╔════════════════════════════════════════════════════╗
║                                                    ║
║  [LOGO]    TRANSIT FORM (Original)         [QR]   ║
║                                                    ║
║  HSN Code: 123456    Stationary No: ST001         ║
║  Date & Time of Dispatch: 10/9/25, 8:37 PM        ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Lessee Id:  LEE001  │ Permit No:  PRM001    │ ║
║  │ Lessee Name: John   │ Transit No: TRN001    │ ║
║  │ Destination: City   │ Mineral: GRANITE      │ ║
║  │ MDL ID: MDL001      │ MDL Location: Area A  │ ║
║  │ Consignee: ABC Ltd  │ Survey No: 123/A      │ ║
║  │ Village: XYZ        │ Mandal: ABC           │ ║
║  │ District: DEF       │ Vehicle No: AP01AB1234│ ║
║  │ Driver: John Doe    │ License: DL123456     │ ║
║  │ GST No: 29ABCDE1234 │ Distance: 50 KM       │ ║
║  │ Required Time: 2hrs │ Dispatch: 100 Cu.Mts  │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Block No: BLK001                              │ ║
║  │ Length: 200 | Breadth: 150 | Height: 100     │ ║
║  │ Total Volume: 100 Cu.Mts                      │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Note: Valid only on Printed Secured Stationary   ║
║  Note: System generated document                  ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

---

### Page 2 - DUPLICATE (With Watermark)

```
╔════════════════════════════════════════════════════╗
║                 D                                  ║
║  [LOGO]    TRANSUIT FORM (Duplicate)       [QR]   ║
║                  P                                 ║
║  HSN Code: 123456 L  Stationary No: ST001         ║
║  Date & Time of DiIspatch: 10/9/25, 8:37 PM       ║
║                    C                               ║
║  ┌─────────────────A────────────────────────────┐ ║
║  │ Lessee Id:  LEE0T01  │ Permit No:  PRM001    │ ║
║  │ Lessee Name: John E  │ Transit No: TRN001    │ ║
║  │ Destination: City    │ Mineral: GRANITE      │ ║
║  │ MDL ID: MDL001  C    │ MDL Location: Area A  │ ║
║  │ Consignee: ABC LtdO  │ Survey No: 123/A      │ ║
║  │ Village: XYZ      P  │ Mandal: ABC           │ ║
║  │ District: DEF       Y│ Vehicle No: AP01AB1234│ ║
║  │ Driver: John Doe    │ License: DL123456     │ ║
║  │ GST No: 29ABCDE1234 │ Distance: 50 KM       │ ║
║  │ Required Time: 2hrs │ Dispatch: 100 Cu.Mts  │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Block No: BLK001                              │ ║
║  │ Length: 200 | Breadth: 150 | Height: 100     │ ║
║  │ Total Volume: 100 Cu.Mts                      │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Note: Valid only on Printed Secured Stationary   ║
║  Note: System generated document                  ║
║                                                    ║
║  DMGO Officer Name          Signature of Driver   ║
║                                                    ║
╚════════════════════════════════════════════════════╝

Legend: The letters D-U-P-L-I-C-A-T-E-C-O-P-Y 
represent the diagonal watermark text overlaid
```

---

## Watermark Properties Visualization

### Position and Angle

```
Page dimensions: A4 (595 x 842 points)
Watermark position: x=150, y=400
Angle: -45 degrees (diagonal from top-right to bottom-left)

     0,0 ────────────────────────────────── 595,0
      │                                        │
      │                                        │
      │              D                         │
      │               U                        │
      │                P                       │
      │                 L                      │
      │                  I                     │
 400 ─┼───────────150,400 C ◄── Anchor Point  │
      │                    A                   │
      │                     T                  │
      │                      E                 │
      │                                        │
      │                       C                │
      │                        O               │
      │                         P              │
      │                          Y             │
      │                                        │
    0,842 ──────────────────────────────── 595,842
```

---

## Color and Opacity

### Watermark Color: #CCCCCC (Light Gray)

```
Color Breakdown:
- Hex: #CCCCCC
- RGB: rgb(204, 204, 204)
- Appearance: Light gray
- Contrast: Low (won't distract from content)
```

### Opacity: 0.3 (30%)

```
Visibility Scale:
0% ░░░░░░░░░░ (Invisible)
10% ░░░░░░░░░░
20% ▒▒▒▒▒▒▒▒▒▒
30% ▒▒▒▒▒▒▒▒▒▒ ◄── Current Setting
40% ▓▓▓▓▓▓▓▓▓▓
50% ▓▓▓▓▓▓▓▓▓▓
60% ▓▓▓▓▓▓▓▓▓▓
100% ██████████ (Fully opaque)

Result: Visible but subtle, won't obscure content
```

---

## Font Specifications

```
Text: "DUPLICATE COPY"
Font Family: (inherited from defaultStyle - sansSerif)
Font Size: 60 points
Font Weight: Bold
Length: ~14 characters
Approximate Visual Width: 400-500 points (when horizontal)
```

---

## Real-World Appearance

### When Printed:
- ✅ Clearly visible on paper
- ✅ Doesn't interfere with barcode scanning
- ✅ Professional appearance
- ✅ Distinguishable from original

### When Viewed on Screen:
- ✅ Visible at all zoom levels
- ✅ Maintains readability of underlying text
- ✅ Clear distinction from original copy
- ✅ Professional presentation

---

## Comparison Chart

| Aspect | Original (Page 1) | Duplicate (Page 2) |
|--------|-------------------|-------------------|
| Header | "TRANSIT FORM (Original)" | "TRANSIT FORM (Duplicate)" |
| Content | Same as duplicate | Same as original |
| Watermark | ❌ None | ✅ "DUPLICATE COPY" |
| Background | Template + Timestamp | Template + Timestamp |
| Page Number | Page 1 | Page 2 |
| Signatures | ❌ No signature lines | ✅ Has signature lines |

---

## Implementation Result

The watermark is:
- ✅ **Visible** - Clear enough to identify as duplicate
- ✅ **Non-intrusive** - Doesn't block important information
- ✅ **Professional** - Appropriate for official documents
- ✅ **Distinctive** - Makes it easy to distinguish from original
- ✅ **Print-friendly** - Shows well on paper and screen

---

## Testing the Watermark

To verify the watermark works correctly:

1. Generate the PDF using the function
2. Check page 1 - should have NO watermark
3. Check page 2 - should have "DUPLICATE COPY" watermark
4. Verify watermark is diagonal (~45 degrees)
5. Confirm watermark is semi-transparent
6. Ensure all text underneath is still readable
7. Test printing - watermark should be visible but not dominant

---

## Notes

- The watermark is added via the `background` function in pdfMake
- It's rendered behind the content (background layer)
- The text remains selectable/searchable in the PDF
- No external images or fonts required
- Works with existing pdfMake setup
