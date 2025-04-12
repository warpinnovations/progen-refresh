// src/utils/wordpressUtils.ts
// import { WPPost } from '@/types/wordpress'; // Assuming you move WPPost here

// Define WPPost interface here or import from a types file
export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  jetpack_featured_media_url?: string;
  author?: {
    name?: string;
  };
  date?: string;
  categories?: number[];
  tags?: number[];
  custom_fields?: {
    custom_font_family?: string[];
    custom_font_size?: string[];
  };
  // Add _embedded if you fetch with _embed for author details etc.
  _embedded?: {
    author?: { id: number; name: string; link: string }[];
    // other embedded data...
  };
}


// Improved fetcher with error handling (can be used client & server side)
export const fetcher = async <T = any>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.text(); // Try to get more info
    console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch (e) {
    console.error(`Failed to parse JSON from ${url}`, e);
    throw new Error('Failed to parse JSON response');
  }
};


// --- All your style extraction and processing functions go here ---
// extractStyles, preprocessContent, extractExternalResources, createWPStyles

// (Keep the implementations exactly as you provided in the original file)
// ... (copy paste the full functions here) ...

// Example stubs (replace with your actual functions)
export const extractStyles = (content: string): string => {
  console.log("Extracting styles...");
  // ... your complex style extraction logic ...
  let allStyles = '';
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  // ... rest of the function
  allStyles += `
    /* WordPress Core Classes - Ensure all WordPress styling is preserved */

    ul {
      list-style-type: circle !important;
      list-style-type: disc !important;
    }

    ol {
      list-style-type: decimal !important;
      margin-left: 2em !important;
    }
    
    /* --- Typography Classes --- */
    /* Font Sizes */
    .has-small-font-size { font-size: 0.8em !important; }
    .has-regular-font-size { font-size: 1em !important; }
    .has-medium-font-size { font-size: 1.25em !important; }
    .has-large-font-size { font-size: 1.5em !important; }
    .has-x-large-font-size { font-size: 2em !important; }
    .has-xx-large-font-size { font-size: 3em !important; }
    
    /* Common WordPress Font Families */
    .has-arial-font-family { font-family: Arial, sans-serif !important; }
    .has-helvetica-font-family { font-family: Helvetica, sans-serif !important; }
    .has-verdana-font-family { font-family: Verdana, sans-serif !important; }
    .has-tahoma-font-family { font-family: Tahoma, sans-serif !important; }
    .has-trebuchet-ms-font-family { font-family: 'Trebuchet MS', sans-serif !important; }
    .has-impact-font-family { font-family: Impact, sans-serif !important; }
    .has-times-new-roman-font-family { font-family: 'Times New Roman', serif !important; }
    .has-georgia-font-family { font-family: Georgia, serif !important; }
    .has-garamond-font-family { font-family: Garamond, serif !important; }
    .has-courier-new-font-family { font-family: 'Courier New', monospace !important; }
    .has-brush-script-mt-font-family { font-family: 'Brush Script MT', cursive !important; }
    
    /* Additional commonly used Google Fonts in WordPress */
    .has-roboto-font-family { font-family: 'Roboto', sans-serif !important; }
    .has-open-sans-font-family { font-family: 'Open Sans', sans-serif !important; }
    .has-lato-font-family { font-family: 'Lato', sans-serif !important; }
    .has-montserrat-font-family { font-family: 'Montserrat', sans-serif !important; }
    .has-raleway-font-family { font-family: 'Raleway', sans-serif !important; }
    .has-poppins-font-family { font-family: 'Poppins', sans-serif !important; }
    .has-oswald-font-family { font-family: 'Oswald', sans-serif !important; }
    .has-merriweather-font-family { font-family: 'Merriweather', serif !important; }
    
    /* Dynamic support for any custom font family */
    [class*="has-"][class*="-font-family"] { font-family: inherit !important; }
    
    /* --- Text Formatting --- */
    /* Text Alignment */
    .has-text-align-left { text-align: left !important; }
    .has-text-align-center { text-align: center !important; }
    .has-text-align-right { text-align: right !important; }
    .has-text-align-justify { text-align: justify !important; }
    
    /* Text Decoration */
    .has-text-decoration-underline { text-decoration: underline !important; }
    .has-text-decoration-overline { text-decoration: overline !important; }
    .has-text-decoration-line-through { text-decoration: line-through !important; }
    
    /* Text Transform */
    .has-text-transform-uppercase { text-transform: uppercase !important; }
    .has-text-transform-lowercase { text-transform: lowercase !important; }
    .has-text-transform-capitalize { text-transform: capitalize !important; }
    
    /* Line Height */
    .has-normal-line-height { line-height: normal !important; }
    .has-tiny-line-height { line-height: 1.0 !important; }
    .has-small-line-height { line-height: 1.2 !important; }
    .has-medium-line-height { line-height: 1.5 !important; }
    .has-large-line-height { line-height: 1.8 !important; }
    .has-extra-large-line-height { line-height: 2 !important; }
    
    /* --- Layout Classes --- */
    /* Width */
    .has-full-width { width: 100% !important; }
    .has-half-width { width: 50% !important; }
    .has-quarter-width { width: 25% !important; }
    .has-third-width { width: 33.333% !important; }
    .has-two-thirds-width { width: 66.666% !important; }
    
    /* Margin and Padding */
    .has-small-margin { margin: 1em !important; }
    .has-medium-margin { margin: 2em !important; }
    .has-large-margin { margin: 3em !important; }
    
    .has-small-padding { padding: 1em !important; }
    .has-medium-padding { padding: 2em !important; }
    .has-large-padding { padding: 3em !important; }
    
    /* --- WordPress Table Classes --- */
    /* Custom Dark Theme Table Styles - exactly matching example */
    .wp-block-table table, table { 
      width: 100%; 
      border-collapse: collapse; 
      background-color: #000 !important; 
      color: white !important; 
      border: 1px solid white !important;
      margin-bottom: 1.5rem;
    }
    
    .wp-block-table th, th { 
      font-weight: bold !important; 
      background-color: #000 !important; 
      color: white !important; 
      text-align: left !important;
      padding: 1rem !important;
      border: 1px solid white !important;
      vertical-align: top !important;
    }
    
    .wp-block-table td, td { 
      padding: 1rem !important; 
      border: 1px solid white !important; 
      background-color: #000 !important;
      color: white !important;
      text-align: left !important;
      vertical-align: top !important;
    }
    
    .wp-block-table tr, tr {
      background-color: #000 !important;
    }
    
    /* Preserve proper formatting for table rows */
    .wp-block-table tr:first-child th {
      font-weight: bold !important;
    }
    
    /* Ensure inline styles take precedence - allows direct styling in WordPress editor */
    [style*="font-size"] { font-size: var(--wp-custom-font-size, inherit) !important; }
    [style*="font-family"] { font-family: var(--wp-custom-font-family, inherit) !important; }
    [style*="color"] { color: var(--wp-custom-color, inherit) !important; }
    [style*="background"] { background: var(--wp-custom-background, inherit) !important; }
    [style*="margin"] { margin: var(--wp-custom-margin, inherit) !important; }
    [style*="padding"] { padding: var(--wp-custom-padding, inherit) !important; }
    [style*="text-align"] { text-align: var(--wp-custom-text-align, inherit) !important; }
    [style*="line-height"] { line-height: var(--wp-custom-line-height, inherit) !important; }
    [style*="border"] { border: var(--wp-custom-border, inherit) !important; }
    [style*="width"] { width: var(--wp-custom-width, inherit) !important; }
  `;
  console.log("Style extraction complete.");
  return allStyles;
};

export const preprocessContent = (content: string): string => {
  console.log("Preprocessing content...");
  // ... your complex content preprocessing logic ...
  let processedContent = content;
  // ... all the regex replacements ...
  console.log("Preprocessing complete.");
  return processedContent;
};

export const extractExternalResources = (content: string) => {
  console.log("Extracting external resources...");
  // ... your complex resource extraction logic ...
  const resources = {
    fontLinks: [] as string[],
    scripts: [] as string[],
    styles: [] as string[]
  };
  // ... regexes for fonts, etc. ...
  const unique = (arr: string[]) => Array.from(new Set(arr)); // Simpler unique
  resources.fontLinks = unique(resources.fontLinks);
  console.log("External resource extraction complete.");
  return resources;
};

export const createWPStyles = (post: WPPost): string => {
  console.log("Creating WP styles string...");
  const wpStyles = extractStyles(post.content.rendered);
  const finalStyles = `
    /* WordPress Extracted Styles */
    ${wpStyles}

    /* WordPress Core Styles */
    .wp-content {
      color: white;
      max-width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
/* Remove underlines from all links in WordPress content */
    .wp-content a,
    .wp-content a:link,
    .wp-content a:visited,
    .wp-content a:hover,
    .wp-content a:active {
      text-decoration: none !important;
    }
    
    /* Direct CSS variable selectors - highest priority */
    [style*="--wp-custom-font-family"] {
      font-family: var(--wp-custom-font-family) !important;
    }
    
    [style*="--wp-custom-font-size"] {
      font-size: var(--wp-custom-font-size) !important;
    }
    
    /* Table Styles for WordPress - Updated to match the example */
    .wp-content table {
      width: 100%;
      margin-bottom: 1.5rem;
      border-collapse: collapse;
      border-spacing: 0;
      background-color: #000;
      color: white;
      border: 1px solid white;
    }
    
    .wp-content table th,
    .wp-content table td {
      padding: 1rem;
      border: 1px solid white;
      text-align: left;
      vertical-align: top;
    }
    
    .wp-content table th {
      font-weight: bold;
      background-color: #000;
      color: white;
      border-bottom: 1px solid white;
    }
    
    .wp-content table tr {
      background-color: #000;
    }
    
    .wp-content table tr:nth-child(even) {
      background-color: #000;
    }
    
    .wp-content table caption {
      margin-bottom: 0.5rem;
      font-style: italic;
      text-align: center;
      color: white;
    }
    
    /* WordPress Gutenberg Table Block */
    .wp-content .wp-block-table {
      width: 100%;
      margin-bottom: 1.5rem;
      overflow-x: auto;
    }
    
    .wp-content .wp-block-table table {
      width: 100%;
      border-collapse: collapse;
      background-color: #000;
      border: 1px solid white;
    }
    
    .wp-content .wp-block-table figcaption {
      text-align: center;
      margin-top: 0.5rem;
      font-style: italic;
      color: white;
    }
    
    /* Custom Table Styles - Exact match to example */
    .wp-content table,
    .wp-content .wp-block-table table,
    .wp-block-table table,
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #000 !important;
      color: white !important;
      border: 1px solid white !important;
      margin-bottom: 1.5rem;
    }
    
    .wp-content table th,
    .wp-content .wp-block-table th,
    .wp-block-table th,
    th {
      font-weight: bold !important;
      background-color: #000 !important;
      color: white !important;
      text-align: left !important;
      padding: 1rem !important;
      border: 1px solid white !important;
      vertical-align: top !important;
    }
    
    .wp-content table td,
    .wp-content .wp-block-table td,
    .wp-block-table td,
    td {
      padding: 1rem !important;
      border: 1px solid white !important;
      background-color: #000 !important;
      color: white !important;
      text-align: left !important;
      vertical-align: top !important;
    }
    
    .wp-content table tr,
    .wp-content .wp-block-table tr,
    .wp-block-table tr,
    tr {
      background-color: #000 !important;
    }
    
    /* Force all border colors to be white for all table elements */
    .wp-content table,
    .wp-content table th,
    .wp-content table td,
    .wp-content .wp-block-table table,
    .wp-content .wp-block-table th,
    .wp-content .wp-block-table td {
      border-color: white !important;
    }
    
    /* Ensure proper cell spacing */
    .wp-content table td,
    .wp-content .wp-block-table td {
      padding: 1rem !important;
    }
    
    /* Table Variations */
    .wp-content .is-style-stripes table {
      border-spacing: 0;
    }
    
    .wp-content .is-style-stripes table tr {
      background-color: #000;
    }
    
    .wp-content .is-style-stripes table tr:nth-child(odd) {
      background-color: #000;
    }
    
    .wp-content .is-style-stripes table tr:nth-child(even) {
      background-color: #000;
    }
    
    /* Responsive Tables */
    @media screen and (max-width: 768px) {
      .wp-content table,
      .wp-content .wp-block-table {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    
    /* Table Responsive Helper Classes */
    .wp-table-responsive {
      overflow-x: auto;
      display: block;
      width: 100%;
      margin-bottom: 1.5rem;
    }
    
    /* Table Cell Styles */
    .wp-table-cell {
      padding: 1rem;
      border: 1px solid white;
      text-align: left;
      vertical-align: top;
      background-color: #000;
      color: white;
    }
    
    /* Override for wp-table-cell with inline styles */
    .wp-table-cell[style] {
      padding: var(--wp-custom-padding, 1rem) !important;
      border: var(--wp-custom-border, 1px solid white) !important;
      text-align: var(--wp-custom-text-align, left) !important;
      vertical-align: var(--wp-custom-vertical-align, top) !important;
      background: var(--wp-custom-background, #000) !important;
      color: var(--wp-custom-color, white) !important;
    }
    
    /* Colspan and Rowspan Classes */
    .wp-cell-colspan-2 { min-width: calc(200% - 2px); }
    .wp-cell-colspan-3 { min-width: calc(300% - 2px); }
    .wp-cell-colspan-4 { min-width: calc(400% - 2px); }
    .wp-cell-colspan-5 { min-width: calc(500% - 2px); }
    .wp-cell-colspan-6 { min-width: calc(600% - 2px); }
    
    .wp-cell-rowspan-2 { min-height: calc(200% - 2px); }
    .wp-cell-rowspan-3 { min-height: calc(300% - 2px); }
    .wp-cell-rowspan-4 { min-height: calc(400% - 2px); }
    .wp-cell-rowspan-5 { min-height: calc(500% - 2px); }
    .wp-cell-rowspan-6 { min-height: calc(600% - 2px); }
    
    /* Table Utility Classes for WordPress Compatibility */
    .wp-content table.has-fixed-layout {
      table-layout: fixed;
      width: 100%;
    }

    .wp-content table.has-text-align-center th,
    .wp-content table.has-text-align-center td {
      text-align: center;
    }

    .wp-content table.has-text-align-right th,
    .wp-content table.has-text-align-right td {
      text-align: right;
    }

    .wp-content table.has-text-align-left th,
    .wp-content table.has-text-align-left td {
      text-align: left;
    }

    /* Table CSS Variable Support */
    .wp-content table [style*="--wp-custom-border"],
    .wp-content td [style*="--wp-custom-border"],
    .wp-content th [style*="--wp-custom-border"] {
      border: var(--wp-custom-border, 1px solid white) !important;
    }
    
    .wp-content table [style*="--wp-custom-width"],
    .wp-content td [style*="--wp-custom-width"],
    .wp-content th [style*="--wp-custom-width"] {
      width: var(--wp-custom-width) !important;
    }
    
    .wp-content table [style*="--wp-custom-background"],
    .wp-content td [style*="--wp-custom-background"],
    .wp-content th [style*="--wp-custom-background"] {
      background: var(--wp-custom-background, #000) !important;
    }
    
    /* Add specific styles for tables with alignment classes */
    .wp-content table.aligncenter,
    .wp-content table.alignleft,
    .wp-content table.alignright {
      display: table;
      margin-left: auto;
      margin-right: auto;
    }
    
    .wp-content table.alignleft {
      margin-right: 1.5rem;
      margin-left: 0;
      float: left;
    }
    
    .wp-content table.alignright {
      margin-left: 1.5rem;
      margin-right: 0;
      float: right;
    }
    
    /* Helper for Gutenberg table blocks */
    .wp-table-block-responsive {
      overflow-x: auto;
      max-width: 100%;
    }
    
    /* Support for direct table attributes */
    .wp-content table[cellpadding] th,
    .wp-content table[cellpadding] td {
      padding: attr(cellpadding);
    }
    
    .wp-content table[cellspacing] {
      border-spacing: attr(cellspacing);
      border-collapse: separate;
    }
    
    .wp-content table[border] th,
    .wp-content table[border] td {
      border-width: attr(border);
    }
    
    /* Font Families with higher specificity */
    .has-arial-font-family, .wp-content .has-arial-font-family { font-family: Arial, sans-serif !important; }
    .has-helvetica-font-family, .wp-content .has-helvetica-font-family { font-family: Helvetica, sans-serif !important; }
    .has-verdana-font-family, .wp-content .has-verdana-font-family { font-family: Verdana, sans-serif !important; }
    .has-tahoma-font-family, .wp-content .has-tahoma-font-family { font-family: Tahoma, sans-serif !important; }
    .has-trebuchet-ms-font-family, .wp-content .has-trebuchet-ms-font-family { font-family: 'Trebuchet MS', sans-serif !important; }
    .has-impact-font-family, .wp-content .has-impact-font-family { font-family: Impact, sans-serif !important; }
    .has-times-new-roman-font-family, .wp-content .has-times-new-roman-font-family { font-family: 'Times New Roman', serif !important; }
    .has-georgia-font-family, .wp-content .has-georgia-font-family { font-family: Georgia, serif !important; }
    .has-garamond-font-family, .wp-content .has-garamond-font-family { font-family: Garamond, serif !important; }
    .has-courier-new-font-family, .wp-content .has-courier-new-font-family { font-family: 'Courier New', monospace !important; }
    
    /* Google Fonts */
    .has-roboto-font-family, .wp-content .has-roboto-font-family { font-family: 'Roboto', sans-serif !important; }
    .has-open-sans-font-family, .wp-content .has-open-sans-font-family { font-family: 'Open Sans', sans-serif !important; }
    .has-lato-font-family, .wp-content .has-lato-font-family { font-family: 'Lato', sans-serif !important; }
    .has-montserrat-font-family, .wp-content .has-montserrat-font-family { font-family: 'Montserrat', sans-serif !important; }
    .has-raleway-font-family, .wp-content .has-raleway-font-family { font-family: 'Raleway', sans-serif !important; }
    .has-poppins-font-family, .wp-content .has-poppins-font-family { font-family: 'Poppins', sans-serif !important; }
    .has-oswald-font-family, .wp-content .has-oswald-font-family { font-family: 'Oswald', sans-serif !important; }
    .has-merriweather-font-family, .wp-content .has-merriweather-font-family { font-family: 'Merriweather', serif !important; }
    
    /* Dynamic support for any custom font family */
    [class*="has-"][class*="-font-family"] { font-family: inherit !important; }
    
    /* WordPress Font Sizes */
    .wp-content .has-small-font-size { font-size: 0.8em !important; }
    .wp-content .has-regular-font-size { font-size: 1em !important; }
    .wp-content .has-medium-font-size { font-size: 1.25em !important; }
    .wp-content .has-large-font-size { font-size: 1.5em !important; }
    .wp-content .has-x-large-font-size { font-size: 2em !important; }
    .wp-content .has-xx-large-font-size { font-size: 3em !important; }
    
    /* Text Alignment */
    .wp-content .has-text-align-left { text-align: left !important; }
    .wp-content .has-text-align-center { text-align: center !important; }
    .wp-content .has-text-align-right { text-align: right !important; }
    .wp-content .has-text-align-justify { text-align: justify !important; }
    
    /* Preserve inline styles with CSS variables for maximum fidelity */
    .wp-content [style*="--wp-custom-font-size"] { font-size: var(--wp-custom-font-size) !important; }
    .wp-content [style*="--wp-custom-font-family"] { font-family: var(--wp-custom-font-family) !important; }
    .wp-content [style*="--wp-custom-color"] { color: var(--wp-custom-color) !important; }
    .wp-content [style*="--wp-custom-line-height"] { line-height: var(--wp-custom-line-height) !important; }
    .wp-content [style*="--wp-custom-text-align"] { text-align: var(--wp-custom-text-align) !important; }
  `;
  console.log("WP styles string creation complete.");
  return finalStyles;
};

// --- Helper to get post data for generateMetadata ---
export const getPostForMetadata = async (slug: string): Promise<WPPost | null> => {
  try {
    const url = `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodeURIComponent(slug)}&_embed`;
    const data = await fetcher<WPPost[]>(url);
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching metadata for slug ${slug}:`, error);
    return null;
  }
};