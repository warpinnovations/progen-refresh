# WordPress Blog Post Integration

## What This Code Does

This code takes blog posts from WordPress and displays them on our website. It makes the posts look exactly the same as they do on WordPress by carefully preserving all the styling and formatting.

## The Main Parts

### 1. Getting the Blog Post

The code gets the blog post data from WordPress using the post's URL name (called a "slug"). It uses a function called `useSWR` to fetch the data and handle loading states.

```javascript
const { data, error, isLoading } = useSWR<WPPost[]>(
  encodedSlug
    ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}`
    : null,
  fetcher
);
```

This gives us all the post information like:

- Title
- Content
- Author
- Publication date
- Featured image

### 2. Processing the WordPress Content

The code uses several functions to process the WordPress content:

#### `preprocessContent()` Function

This function takes the raw HTML from WordPress and modifies it to work well on our site:

- It converts inline styles to CSS variables so they're easier to manage
- It adds special styling to tables to make them look good
- It ensures fonts are applied correctly
- It handles special WordPress formatting classes

For example, when it finds a style like:

```html
<p style="font-family: Roboto;">Hello</p>
```

It converts it to:

```html
<p style="--wp-custom-font-family: Roboto; font-family: var(--wp-custom-font-family);">Hello</p>
```

This lets us control all the styling in one place while keeping the original look.

#### `extractExternalResources()` Function

This function finds any external resources like Google Fonts that the WordPress post uses:

- It looks for font links in the HTML
- It searches for font-family declarations in style tags
- It checks inline styles for font information
- It looks for WordPress font classes like "has-roboto-font-family"

When it finds a non-standard font, it creates a Google Fonts link like:

```
https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap
```

#### `extractStyles()` Function

This function pulls out all the CSS styles from the WordPress content and adds standard WordPress styling classes:

- It extracts any `<style>` tags from the content
- It adds CSS for WordPress font sizes, alignments, and other formatting
- It adds special styling for tables to make them match our dark theme

#### `createWPStyles()` Function

This function combines all the WordPress styles with our own custom styles to ensure everything looks perfect:

- It includes all the extracted styles
- It adds core WordPress styling
- It adds specific table styling for our dark theme
- It includes responsive design for mobile devices

### 3. Handling Tables and Complex Elements

WordPress posts can have complex elements like tables. The code makes sure these display correctly with:

- Black backgrounds
- White borders
- Correct padding and spacing
- Support for colspan and rowspan attributes
- Responsive behavior on mobile devices

Here's how it works:

1. The code finds all table elements in the HTML
2. It adds custom styling to each table, header, and cell
3. It adds responsive classes to make tables scrollable on mobile
4. It handles special cases like rowspan and colspan cells

### 4. Font Handling

The code does a great job finding and loading any fonts the WordPress post uses:

1. It extracts font information from the HTML and CSS
2. It creates links to Google Fonts for non-standard fonts
3. It adds these font links to the page head
4. It ensures the fonts are applied correctly to the content

### 5. Page Layout

The post is displayed with:

- A navigation bar at the top
- A sidebar showing the post title, date, author, and thumbnail
- The main content area showing the full post content
- A responsive footer

The layout changes based on screen size:

- On desktop: Side-by-side layout with sidebar on left, content on right
- On mobile: Stacked layout with sidebar above content

### 6. Error and Loading States

The code handles different states:

- Shows a loading indicator while fetching the post
- Displays an error message if something goes wrong
- Shows the post content when everything loads successfully

## How It All Works Together

1. When someone visits a blog post page, the code gets the post slug from the URL
2. It fetches the post data from WordPress using that slug
3. It processes the content to preserve all styling
4. It extracts and loads any custom fonts
5. It applies all the necessary styles to make the post look right
6. It renders the post with proper layout and metadata

The result is a blog post that looks exactly like it does on WordPress, but fits within our website's design and navigation structure.

## Why This Approach Is Good

- **Preserves WordPress styling**: Users get the same visual experience
- **Handles complex elements**: Tables, fonts, and formatting all work correctly
- **Responsive design**: Works on all device sizes
- **Error handling**: Users see helpful messages if something goes wrong
- **Clean integration**: The WordPress content fits seamlessly into our site

This code makes it possible to use WordPress as a content management system while displaying the content on our own website with our own navigation and design.
