# Crime Check News Integration Setup Guide

## Overview
This project now uses Crime Check News for content management. Follow these steps to complete the setup.

## Prerequisites
- Prismic account at https://prismic.io
- Repository name: `crimechecknews`

## Setup Steps

### 1. Push Custom Type to Prismic

The `article` custom type has been created locally. You need to push it to your Prismic repository:

```bash
# Start Slice Machine (if not already running)
npm run slicemachine

# Or push types directly
npx @slicemachine/init
```

Then in the Slice Machine UI (http://localhost:9999):
1. Navigate to "Custom Types"
2. You should see the "Article" custom type
3. Click "Push to Prismic" to sync it with your repository

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Prismic Configuration
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=crimechecknews

# Disqus Configuration (for comments)
NEXT_PUBLIC_DISQUS_SHORTNAME=crimechecknews

# Site URL (for social sharing and SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: Replace `crimechecknews` with your actual Disqus shortname if different.

### 3. Generate Prismic Types

After pushing the custom type, regenerate the TypeScript types:

```bash
npm run slicemachine
```

This will update `prismicio-types.d.ts` with the new `article` type.

### 4. Create Test Articles in Prismic

1. Go to your Prismic dashboard: https://crimechecknews.prismic.io
2. Click "Create new" → "Article"
3. Fill in the required fields:
   - **UID**: unique-article-slug (used in URL)
   - **Title**: Your article headline
   - **Excerpt**: Brief summary
   - **Featured Image**: Upload an image
   - **Category**: Select from dropdown
   - **Author**: Author name
   - **Publish Date**: Publication date
   - **Content**: Add rich text content using slices
4. Click "Save" and then "Publish"

Create at least 3-5 test articles to see the full functionality.

### 5. Test the Integration

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000

3. Click on any article card to view the full story page

4. Test features:
   - Article content rendering
   - Share buttons
   - Related articles
   - Comments (Disqus)

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── news/          # News API route (legacy)
│   └── article/
│       └── [uid]/
│           └── page.tsx   # Dynamic article page
├── components/
│   ├── CommentSection.tsx # Comment provider wrapper
│   ├── DisqusComments.tsx # Disqus integration
│   ├── ShareButtons.tsx   # Social sharing
│   ├── RelatedArticles.tsx # Related content
│   └── NewsCard.jsx       # Article card (updated)
├── lib/
│   ├── prismic-helpers.ts # Utility functions
│   └── comment-config.ts  # Comment provider config
└── prismicio.ts           # Prismic client config

customtypes/
└── article/
    ├── index.json         # Article schema
    └── mocks.json         # Mock data
```

## Switching Comment Providers

The comment system is designed to be provider-agnostic. To switch from Disqus to another provider:

1. Open `src/lib/comment-config.ts`
2. Change the `provider` field
3. Add configuration for your new provider
4. Create a new component (e.g., `CommentoComments.tsx`)
5. Import it in `CommentSection.tsx`

Example for Commento:
```typescript
export const commentConfig: CommentConfig = {
  provider: "commento",
  commento: {
    url: "https://cdn.commento.io",
  },
};
```

## Troubleshooting

### TypeScript Errors
If you see TypeScript errors about missing properties:
1. Make sure you've pushed the custom type to Prismic
2. Run `npm run slicemachine` to regenerate types
3. Restart your IDE/editor

### Articles Not Showing
1. Verify articles are published in Prismic (not just saved)
2. Check the browser console for API errors
3. Verify your `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` is correct

### Comments Not Loading
1. Verify your Disqus shortname is correct
2. Check browser console for script loading errors
3. Ensure JavaScript is enabled

## Next Steps

- Migrate existing content from newsdata.io to Prismic
- Create more article slices for rich content layouts
- Set up preview mode for draft articles
- Configure webhooks for automatic rebuilds

## Resources

- [Prismic Documentation](https://prismic.io/docs)
- [Slice Machine Guide](https://prismic.io/docs/slice-machine)
- [Disqus Documentation](https://help.disqus.com/)
