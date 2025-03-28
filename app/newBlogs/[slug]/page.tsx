/*
 * WordPress Blog Post Display Component
 *
 * This file creates a page that displays blog posts imported from WordPress.
 *
 * What this code does:
 * 1. Gets the blog post data from WordPress using the post's slug (URL name)
 * 2. Handles the styling from WordPress so the post looks the same on our site
 * 3. Extracts any custom fonts used in the WordPress post
 * 4. Makes sure tables and other complex elements display correctly
 * 5. Shows a nice layout with the blog content, title, date, and author
 *
 * The page has:
 * - A sidebar with post info (title, date, author)
 * - The main content area showing the post content
 * - Responsive design that works on mobile and desktop
 *
 * Special features:
 * - Preserves all WordPress styling exactly as it appears on WordPress
 * - Loads custom fonts used in the original post
 * - Makes tables look good with proper formatting
 * - Shows proper error and loading states
 */

'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Oxanium } from 'next/font/google';
import NavbarGroup from '@/components/Global/NavbarGroup';
import ResponsiveFooter from '@/components/Global/ResponsiveFooter';
import Head from 'next/head';
import BlogSidebar from '@/components/Blogs/BlogSidebar';
import ErrorState from '@/components/Global/ErrorState';
import LoadingState from '@/components/Global/LoadingState';
import { useEffect, useState } from 'react';

const oxaniumFont = Oxanium({ weight: '500', subsets: ['latin'] });

// Improved fetcher with error handling
const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Define WPPost interface outside the component for wider use
interface WPPost {
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
  // Additional custom fields from WordPress if available
  custom_fields?: {
    custom_font_family?: string[];
    custom_font_size?: string[];
  };
}

// This function finds and extracts any external resources from WordPress content
// Primarily it looks for Google Fonts that need to be loaded
// Returns an object with arrays of font links, scripts, and styles
const extractExternalResources = (content: string) => {
  const resources = {
    fontLinks: [] as string[], // Links to Google Fonts
    scripts: [] as string[], // Any JavaScript files
    styles: [] as string[] // Any external CSS files
  };

  // Method 1: Find Google Font links directly in the HTML
  // This finds <link> tags pointing to Google Fonts
  const fontLinkRegex = /<link[^>]*href=["']([^"']*fonts\.googleapis\.com[^"']*)["'][^>]*>/g;
  let match;
  while ((match = fontLinkRegex.exec(content)) !== null) {
    resources.fontLinks.push(match[1]);
  }

  // Method 2: Find font-family declarations in <style> tags
  // This extracts font names from CSS inside the WordPress content
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  const fontFamilyRegex = /font-family:\s*(['"])?(.*?)(?:\1|;|\s*})/g;

  let styleMatch;
  while ((styleMatch = styleRegex.exec(content)) !== null) {
    const styleContent = styleMatch[1];
    let fontMatch;

    while ((fontMatch = fontFamilyRegex.exec(styleContent)) !== null) {
      // Get the complete font family stack
      const fontStack = fontMatch[2].trim();

      // Split font stack and get primary font (first one)
      const fontParts = fontStack.split(',');
      const primaryFont = fontParts[0].trim().replace(/["']/g, '');

      // Skip standard web fonts - we don't need to load these
      const webSafeFonts = [
        'Arial',
        'Helvetica',
        'Times',
        'Courier',
        'Verdana',
        'Georgia',
        'Tahoma',
        'Trebuchet',
        'Impact',
        'serif',
        'sans-serif',
        'monospace',
        'cursive',
        'fantasy'
      ];

      const isWebSafeFont = webSafeFonts.some((safeFont) =>
        primaryFont.toLowerCase().includes(safeFont.toLowerCase())
      );

      // Only create Google Font links for non-web-safe fonts
      if (!isWebSafeFont) {
        // Format font name for Google Fonts URL (spaces become +)
        const formattedName = primaryFont.replace(/\s+/g, '+');
        resources.fontLinks.push(
          `https://fonts.googleapis.com/css?family=${formattedName}:400,700&display=swap`
        );

        console.log(`Extracted font family: ${primaryFont} (${formattedName})`);
      }
    }
  }

  // Method 3: Find font-family in inline styles directly in HTML
  // This finds font declarations in style attributes on HTML elements
  const inlineFontRegex = /style=["'][^"']*font-family:\s*(['"]?)([^;'"]*)\1/gi;
  let inlineMatch;
  while ((inlineMatch = inlineFontRegex.exec(content)) !== null) {
    const fontValue = inlineMatch[2].trim();
    const fontParts = fontValue.split(',');
    const primaryFont = fontParts[0].trim().replace(/["']/g, '');

    // Skip web safe fonts - same list as above
    const webSafeFonts = [
      'Arial',
      'Helvetica',
      'Times',
      'Courier',
      'Verdana',
      'Georgia',
      'Tahoma',
      'Trebuchet',
      'Impact',
      'serif',
      'sans-serif',
      'monospace',
      'cursive',
      'fantasy'
    ];
    const isWebSafeFont = webSafeFonts.some((safeFont) =>
      primaryFont.toLowerCase().includes(safeFont.toLowerCase())
    );

    // Only create Google Font links for non-web-safe fonts
    if (!isWebSafeFont) {
      const formattedName = primaryFont.replace(/\s+/g, '+');
      resources.fontLinks.push(
        `https://fonts.googleapis.com/css?family=${formattedName}:400,700&display=swap`
      );
      console.log(`Extracted inline font family: ${primaryFont} (${formattedName})`);
    }
  }

  // Method 4: Find WordPress font family class names
  // WordPress adds classes like "has-roboto-font-family" to elements
  const fontClassRegex = /class=["'][^"']*has-([a-z0-9-]+)-font-family/gi;
  let classMatch;
  while ((classMatch = fontClassRegex.exec(content)) !== null) {
    const fontName = classMatch[1].replace(/-/g, ' ');
    // Skip if it's a standard web font
    const webSafeFonts = [
      'arial',
      'helvetica',
      'times',
      'courier',
      'verdana',
      'georgia',
      'tahoma',
      'trebuchet',
      'impact',
      'serif',
      'sans serif',
      'monospace',
      'cursive',
      'fantasy'
    ];
    if (!webSafeFonts.includes(fontName.toLowerCase())) {
      const formattedName = fontName.replace(/\s+/g, '+');
      resources.fontLinks.push(
        `https://fonts.googleapis.com/css?family=${formattedName}:400,700&display=swap`
      );
      console.log(`Extracted font from class: ${fontName} (${formattedName})`);
    }
  }

  // Remove duplicate links to prevent loading the same font multiple times
  const unique = (arr: string[]) => {
    const seen: { [key: string]: boolean } = {};
    return arr.filter((item) => {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  };
  resources.fontLinks = unique(resources.fontLinks);
  resources.scripts = unique(resources.scripts);
  resources.styles = unique(resources.styles);

  return resources;
};

// This function processes the WordPress HTML content to preserve all styling
// It converts inline styles to CSS variables for better control
// Returns the processed HTML content ready for display
const preprocessContent = (content: string): string => {
  console.log('Starting content preprocessing...');
  // Start with the original content and modify it step by step
  let processedContent = content;

  // Find and convert inline font-family styles to CSS variables
  // This regex is complex to handle different quote styles and font stacks
  const fontFamilyRegex =
    /style=["']([^"']*)font-family:\s*(['"]?)([^"';]+(?:\s*,\s*[^"';]+)*)(['"]?)([^"']*)["']/g;

  processedContent = processedContent.replace(
    fontFamilyRegex,
    (match, before, openQuote, fontFamily, closeQuote, after) => {
      console.log(`Found font-family: "${fontFamily}"`);
      // Keep the original quotes (if any) when creating the CSS variable
      const variableValue =
        openQuote && closeQuote ? `${openQuote}${fontFamily}${closeQuote}` : fontFamily;

      // Convert direct font-family to CSS variable + property
      return `style="${before}--wp-custom-font-family: ${variableValue}; font-family: var(--wp-custom-font-family);${after}"`;
    }
  );

  // Convert inline font-size styles to CSS variables
  // This makes it easier to control font sizes consistently
  const fontSizeRegex = /style=["']([^"']*)font-size:\s*([^";]+)([^"']*)["']/g;
  processedContent = processedContent.replace(fontSizeRegex, (match, before, fontSize, after) => {
    console.log(`Found font-size: "${fontSize}"`);
    return `style="${before}--wp-custom-font-size: ${fontSize}; font-size: var(--wp-custom-font-size);${after}"`;
  });

  // Process color styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)color:\s*([^";]+)([^"']*)["']/g,
    (match, before, color, after) => {
      return `style="${before}--wp-custom-color: ${color}; color: var(--wp-custom-color);${after}"`;
    }
  );

  // Process line-height styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)line-height:\s*([^";]+)([^"']*)["']/g,
    (match, before, lineHeight, after) => {
      return `style="${before}--wp-custom-line-height: ${lineHeight}; line-height: var(--wp-custom-line-height);${after}"`;
    }
  );

  // Process border styles for tables - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)border(?:-[^:]+)?:\s*([^";]+)([^"']*)["']/g,
    (match, before, borderValue, after) => {
      return `style="${before}--wp-custom-border: ${borderValue}; border: var(--wp-custom-border);${after}"`;
    }
  );

  // Process width styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)width:\s*([^";]+)([^"']*)["']/g,
    (match, before, widthValue, after) => {
      return `style="${before}--wp-custom-width: ${widthValue}; width: var(--wp-custom-width);${after}"`;
    }
  );

  // Process background styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)background(?:-color)?:\s*([^";]+)([^"']*)["']/g,
    (match, before, bgValue, after) => {
      return `style="${before}--wp-custom-background: ${bgValue}; background: var(--wp-custom-background);${after}"`;
    }
  );

  // Process vertical-align styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)vertical-align:\s*([^";]+)([^"']*)["']/g,
    (match, before, valign, after) => {
      return `style="${before}--wp-custom-vertical-align: ${valign}; vertical-align: var(--wp-custom-vertical-align);${after}"`;
    }
  );

  // Process text-align styles - convert to CSS variables
  processedContent = processedContent.replace(
    /style=["']([^"']*)text-align:\s*([^";]+)([^"']*)["']/g,
    (match, before, align, after) => {
      return `style="${before}--wp-custom-text-align: ${align}; text-align: var(--wp-custom-text-align);${after}"`;
    }
  );

  // Special processing for tables to ensure they have black background and white borders
  // Find all table tags and update their styles
  processedContent = processedContent.replace(/<table([^>]*)>/g, (match, attrs) => {
    // If the table already has a style attribute, add to it
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; background-color: #000; color: white; border: 1px solid white;"`;
      });
    } else {
      // If no style attribute, add one with our default table styles
      return `<table${attrs} style="background-color: #000; color: white; border: 1px solid white;">`;
    }
  });

  // Process table header and data cells (th and td) for consistent styling
  // This ensures all cells have white borders and proper padding
  processedContent = processedContent.replace(/<(th|td)([^>]*)>/g, (match, tag, attrs) => {
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;"`;
      });
    } else {
      return `<${tag}${attrs} style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;">`;
    }
  });

  // Add responsive table class to tables with existing classes
  processedContent = processedContent.replace(
    /<table([^>]*)class=["']([^"']*)["']/g,
    (match, beforeAttrs, classNames) => {
      // Keep existing classes and add our responsive table class
      return `<table${beforeAttrs}class="${classNames} wp-table-responsive"`;
    }
  );

  // Add responsive table class to tables without existing classes
  processedContent = processedContent.replace(/<table(?![^>]*class=)([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; background-color: #000; color: white; border: 1px solid white;" class="wp-table-responsive"`;
      });
    } else {
      return `<table${attrs} style="background-color: #000; color: white; border: 1px solid white;" class="wp-table-responsive">`;
    }
  });

  // Handle WordPress Gutenberg table blocks - these have a special structure
  processedContent = processedContent.replace(
    /<figure([^>]*)class=["']([^"']*)(wp-block-table)([^"']*)["']/g,
    (match, beforeAttrs, beforeClass, tableClass, afterClass) => {
      // Add a responsive class specifically for Gutenberg table blocks
      return `<figure${beforeAttrs}class="${beforeClass}${tableClass} wp-table-block-responsive${afterClass}"`;
    }
  );

  // Add consistent styling to all table cells
  processedContent = processedContent.replace(/<(td|th)([^>]*)>/g, (match, tag, attrs) => {
    // If the cell doesn't have a class attribute, add our table cell class
    if (!attrs.includes('class=')) {
      if (attrs.includes('style=')) {
        return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
          return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;" class="wp-table-cell"`;
        });
      } else {
        return `<${tag}${attrs} class="wp-table-cell" style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;">`;
      }
    }
    // If the cell already has a class, add our cell class to existing classes
    return match.replace(/class=["']([^"']*)["']/, (m, classes) => {
      if (attrs.includes('style=')) {
        return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
          return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;" class="${classes} wp-table-cell"`;
        });
      } else {
        return `class="${classes} wp-table-cell" style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;"`;
      }
    });
  });

  // Special handling for cells with colspan and rowspan attributes
  // These need extra styling to look correct when spanning multiple cells
  processedContent = processedContent.replace(
    /<(td|th)([^>]*)(colspan|rowspan)=["'](\d+)["']([^>]*)>/gi,
    (match, tag, before, attr, value, after) => {
      const dataAttr = `data-${attr.toLowerCase()}`;
      // Add special CSS classes based on the colspan/rowspan value
      let classAddition = '';
      if (attr.toLowerCase() === 'colspan') {
        classAddition = ` wp-cell-colspan-${value}`;
      } else if (attr.toLowerCase() === 'rowspan') {
        classAddition = ` wp-cell-rowspan-${value}`;
      }

      // Add appropriate classes to the cell
      if (before.includes('class=') || after.includes('class=')) {
        match = match.replace(/class=["']([^"']*)["']/, (m, classes) => {
          return `class="${classes}${classAddition}"`;
        });
      } else {
        match = `<${tag}${before}${attr}="${value}"${after} class="wp-table-cell${classAddition}" ${dataAttr}="${value}">`;
      }

      // Add standard cell styling
      if (match.includes('style=')) {
        return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
          return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;"`;
        });
      } else {
        return match.replace(
          '>',
          ' style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;">'
        );
      }
    }
  );

  // Process WordPress font family classes to add inline styles
  // This helps ensure fonts are displayed correctly
  processedContent = processedContent.replace(
    /class=["']([^"']*has-([a-z0-9-]+)-font-family[^"']*)["']/gi,
    (match, classes, fontName) => {
      // Convert kebab-case (like "open-sans") to Title Case ("Open Sans")
      const formattedFont = fontName
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      console.log(`Enhanced font class: ${fontName} to ${formattedFont}`);

      // Add CSS variable for the font family while keeping the original class
      return `class="${classes}" style="--wp-custom-font-family: '${formattedFont}'; font-family: var(--wp-custom-font-family);"`;
    }
  );

  console.log('Completed content preprocessing');
  return processedContent;
};

// This function creates a complete CSS style block for the WordPress content
// It combines extracted styles with additional styles needed for proper display
// Returns a string of CSS styles that can be injected into the page
const createWPStyles = (post: WPPost) => {
  const postId = post.id;

  // Get styles extracted from the WordPress content
  const wpStyles = extractStyles(post.content.rendered);

  // Create a CSS string with all needed styles
  return `
    /* WordPress Extracted Styles - These come directly from the post */
    ${wpStyles}
    
    /* WordPress Core Styles - These ensure content displays correctly */
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
    
    /* CSS variable selectors - These have the highest priority */
    /* They ensure custom fonts and sizes work correctly */
    [style*="--wp-custom-font-family"] {
      font-family: var(--wp-custom-font-family) !important;
    }
    
    [style*="--wp-custom-font-size"] {
      font-size: var(--wp-custom-font-size) !important;
    }
    
    /* Table Styles for WordPress - Makes tables look good */
    .wp-content table {
      width: 100%;
      margin-bottom: 1.5rem;
      border-collapse: collapse;
      border-spacing: 0;
      background-color: #000;
      color: white;
      border: 1px solid white;
    }
    
    /* Table cell styles - Consistent styling for all cells */
    .wp-content table th,
    .wp-content table td {
      padding: 1rem;
      border: 1px solid white;
      text-align: left;
      vertical-align: top;
    }
    
    /* Table header styles - Make headers stand out */
    .wp-content table th {
      font-weight: bold;
      background-color: #000;
      color: white;
      border-bottom: 1px solid white;
    }
    
    /* Table row styles - Consistent background color */
    .wp-content table tr {
      background-color: #000;
    }
    
    /* Even rows - Same color for consistency */
    .wp-content table tr:nth-child(even) {
      background-color: #000;
    }
    
    /* Table captions - Styled for readability */
    .wp-content table caption {
      margin-bottom: 0.5rem;
      font-style: italic;
      text-align: center;
      color: white;
    }
    
    /* WordPress Gutenberg Table Block - Special handling */
    .wp-content .wp-block-table {
      width: 100%;
      margin-bottom: 1.5rem;
      overflow-x: auto;
    }
    
    /* Tables inside Gutenberg blocks */
    .wp-content .wp-block-table table {
      width: 100%;
      border-collapse: collapse;
      background-color: #000;
      border: 1px solid white;
    }
    
    /* Captions for Gutenberg tables */
    .wp-content .wp-block-table figcaption {
      text-align: center;
      margin-top: 0.5rem;
      font-style: italic;
      color: white;
    }
    
    /* Custom Table Styles - Ensures consistent look across all tables */
    /* This applies to all table elements anywhere on the page */
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
    
    /* All table headers get the same styling */
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
    
    /* All table cells get the same styling */
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
    
    /* All table rows get the same styling */
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
    
    /* Table Variations - Handle different WordPress table styles */
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
    
    /* Responsive Tables - Make tables scroll on small screens */
    @media screen and (max-width: 768px) {
      .wp-content table,
      .wp-content .wp-block-table {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    
    /* Table Responsive Helper Classes - Make tables scrollable */
    .wp-table-responsive {
      overflow-x: auto;
      display: block;
      width: 100%;
      margin-bottom: 1.5rem;
    }
    
    /* Table Cell Styles - Default styling for all cells */
    .wp-table-cell {
      padding: 1rem;
      border: 1px solid white;
      text-align: left;
      vertical-align: top;
      background-color: #000;
      color: white;
    }
    
    /* Override for wp-table-cell with inline styles */
    /* This ensures custom styles are respected while maintaining our base styles */
    .wp-table-cell[style] {
      padding: var(--wp-custom-padding, 1rem) !important;
      border: var(--wp-custom-border, 1px solid white) !important;
      text-align: var(--wp-custom-text-align, left) !important;
      vertical-align: var(--wp-custom-vertical-align, top) !important;
      background: var(--wp-custom-background, #000) !important;
      color: var(--wp-custom-color, white) !important;
    }
    
    /* Colspan and Rowspan Classes - Handle cells that span multiple rows/columns */
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
    /* These handle special WordPress table formatting */
    .wp-content table.has-fixed-layout {
      table-layout: fixed;
      width: 100%;
    }

    /* Text alignment in tables */
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

    /* Table CSS Variable Support - For custom table styling */
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
    
    /* Alignment classes for tables */
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
    
    /* Helper for Gutenberg table blocks - Make them responsive */
    .wp-table-block-responsive {
      overflow-x: auto;
      max-width: 100%;
    }
    
    /* Support for direct table attributes like cellpadding */
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
    
    /* Font Families with higher specificity - Ensures font classes work */
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
    
    /* Google Fonts - Common fonts used in WordPress */
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
    
    /* WordPress Font Sizes - Standard WordPress size classes */
    .wp-content .has-small-font-size { font-size: 0.8em !important; }
    .wp-content .has-regular-font-size { font-size: 1em !important; }
    .wp-content .has-medium-font-size { font-size: 1.25em !important; }
    .wp-content .has-large-font-size { font-size: 1.5em !important; }
    .wp-content .has-x-large-font-size { font-size: 2em !important; }
    .wp-content .has-xx-large-font-size { font-size: 3em !important; }
    
    /* Text Alignment - WordPress alignment classes */
    .wp-content .has-text-align-left { text-align: left !important; }
    .wp-content .has-text-align-center { text-align: center !important; }
    .wp-content .has-text-align-right { text-align: right !important; }
    .wp-content .has-text-align-justify { text-align: justify !important; }
    
    /* CSS Variable Support - Ensure all custom styles work */
    .wp-content [style*="--wp-custom-font-size"] { font-size: var(--wp-custom-font-size) !important; }
    .wp-content [style*="--wp-custom-font-family"] { font-family: var(--wp-custom-font-family) !important; }
    .wp-content [style*="--wp-custom-color"] { color: var(--wp-custom-color) !important; }
    .wp-content [style*="--wp-custom-line-height"] { line-height: var(--wp-custom-line-height) !important; }
    .wp-content [style*="--wp-custom-text-align"] { text-align: var(--wp-custom-text-align) !important; }
  `;
};

// The main blog post page component
// This displays a WordPress blog post with all its styling preserved
export default function PostPage() {
  // Get the slug (URL name) of the post from the URL params
  const { slug } = useParams();

  // State variables to store styles and resources
  const [wpStyles, setWpStyles] = useState<string>(''); // CSS styles from WordPress
  const [fontLinks, setFontLinks] = useState<string[]>([]); // Google Font links
  const [processedContent, setProcessedContent] = useState<string>(''); // Processed HTML content

  // Make sure the slug is properly encoded for the API request
  const encodedSlug = slug ? encodeURIComponent(String(slug)) : '';

  // Fetch the blog post data from WordPress
  // useSWR handles loading, caching, and error states
  const { data, error, isLoading } = useSWR<WPPost[]>(
    encodedSlug
      ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}`
      : null,
    fetcher
  );

  // Process the WordPress content when data is loaded
  useEffect(() => {
    if (data && data.length > 0) {
      const post = data[0];

      // Process content to preserve styling
      const processed = preprocessContent(post.content.rendered);
      setProcessedContent(processed);

      // Extract Google Fonts and other resources
      const resources = extractExternalResources(post.content.rendered);
      setFontLinks(resources.fontLinks);

      // Create CSS styles for the WordPress content
      const styles = createWPStyles(post);
      setWpStyles(styles);
    }
  }, [data]); // Only run when data changes

  // Show an error message if the post couldn't be loaded
  if (error) {
    return <ErrorState title='Failed to load post' errorDetails={error.message} />;
  }

  // Show a loading indicator while the post is being fetched
  if (isLoading || !data || data.length === 0) {
    return <LoadingState />;
  }

  // Get the post data and format it for display
  const post = data[0];
  const blogTitle = post.title.rendered || 'Blog Post';
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '') || 'No description available';
  const author = post.author?.name || 'Prometheus';
  const imageUrl = post.jetpack_featured_media_url;

  // Format the date in a nice readable format
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  // Render the blog post page
  return (
    <>
      {/* Add meta tags for SEO and social sharing */}
      <Head>
        <title>{blogTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={blogTitle} />
        <meta property='og:description' content={description} />
        {imageUrl && <meta property='og:image' content={imageUrl} />}
        <meta name='author' content='[ Prometheus ]' />

        {/* Load all Google Fonts found in the WordPress content */}
        {fontLinks.map((link, index) => (
          <link key={`font-${index}`} rel='stylesheet' href={link} />
        ))}
      </Head>

      {/* Add the WordPress styles to the page */}
      <style dangerouslySetInnerHTML={{ __html: wpStyles }} />

      {/* Global styles for the blog post page */}
      <style>{`
        /* Remove underlines from all links in the blog post page */
        article a {
          text-decoration: none !important;
        }
      `}</style>

      {/* The main page layout */}
      <div className='bg-black w-full flex flex-col relative h-full min-h-screen'>
        {/* Top navigation bar */}
        <NavbarGroup />

        {/* Blog post content area */}
        <article className='flex flex-col lg:flex-row pt-[10%] pb-10'>
          {/* Left Side - Sidebar with post info */}
          <BlogSidebar
            blogTitle={blogTitle}
            description={description}
            formattedDate={formattedDate}
            author={author}
            imageUrl={imageUrl}
          />

          {/* Right Side - The actual blog post content */}
          <div className={`w-full px-10 lg:w-[55%] h-full text-white`}>
            {/* Show featured image on desktop only */}
            {imageUrl && (
              <div className='hidden lg:block mb-8'>
                <img
                  src={imageUrl}
                  alt={blogTitle}
                  className='w-full h-auto object-cover rounded-lg'
                />
              </div>
            )}

            {/* The WordPress content with all its styling preserved */}
            <div className='wp-content' dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        </article>

        {/* Page footer */}
        <ResponsiveFooter />
      </div>
    </>
  );
}
