# Sanity Content Management Guide

## Free Audit Page Management

Your `/free-audit` page now pulls content from Sanity CMS for easy editing without touching code.

### How to Edit the Free Audit Page

1. **Go to Sanity Studio:** `http://localhost:3333`
2. **Create a new Page** with these settings:
   - **Title:** "Free Audit" (or your preferred title)
   - **Slug:** `free-audit` (MUST be exactly "free-audit")
   - **SEO Settings:**
     - Meta Title: "Free Epoxy Lead Audit | Floorplay Agency - Find Your Lost Leads"
     - Meta Description: Your description
     - Keywords: Add relevant keywords

3. **Hero Section:**
   - **Headline:** "Get Your Free Epoxy Lead Audit" 
   - **Subheadline:** Your value proposition text
   - **CTA Text:** Button text (optional)
   - **CTA Link:** Button link (optional)
   - **Benefits List:** Array of benefits to show with checkmarks

4. **Page Content:** Add any additional content you want below the form

### What You Can Edit:

✅ **Page headline and subheadline**  
✅ **Benefits list with checkmarks**  
✅ **SEO meta title and description**  
✅ **Keywords for SEO**  
✅ **Additional content sections below the form**  
❌ **Form fields** (these stay in the code for functionality)

### Benefits Section

The benefits list is now fully editable in Sanity! Add them in the Hero Section → Benefits List field.

**Default benefits (if none in Sanity):**
- "Competitor analysis for your local market"
- "Search ranking gaps costing you leads" 
- "Custom strategy to dominate local searches"

**To edit:** Go to your free-audit page in Sanity and add/edit items in the Benefits List array.

### Content Structure

The page expects this structure in Sanity:

```
Page (Document Type: page)
├── Title: "Free Audit"
├── Slug: "free-audit"
├── SEO Settings
│   ├── Meta Title
│   ├── Meta Description
│   └── Keywords
├── Hero Section
│   ├── Headline
│   ├── Subheadline
│   ├── CTA Text (optional)
│   ├── CTA Link (optional)
│   └── Benefits List (array of strings)
└── Page Content (Rich Text)
    ├── Text blocks
    ├── Images
    ├── Headings
    └── Lists
```

### Fallback Content

If no Sanity content is found, the page will use fallback content so it never breaks. This ensures your form always works even if Sanity is down.

### Next Steps

1. **Create the page in Sanity Studio** with slug "free-audit"
2. **Test the page** to see your content changes
3. **Optionally:** Add a benefits field to make the checkmark list editable