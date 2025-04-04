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

// Extract all CSS styles from WordPress content - COMPREHENSIVE VERSION
const extractStyles = (content: string) => {
  let allStyles = '';

  // 1. Extract ALL <style> tags from content without any filtering
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let styleMatch;
  while ((styleMatch = styleTagRegex.exec(content)) !== null) {
    allStyles += styleMatch[1] + '\n';
  }

  // 2. Add support for ALL WordPress typography and formatting classes
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

  return allStyles;
};

// Preprocess WordPress content to preserve all styling exactly as in WordPress
const preprocessContent = (content: string): string => {
  console.log('Starting content preprocessing...');
  // Extract and process inline styles to use CSS variables
  let processedContent = content;

  // Convert inline font-family styles to CSS variables
  // This better regex handles quotes and complex font stacks
  const fontFamilyRegex =
    /style=["']([^"']*)font-family:\s*(['"]?)([^"';]+(?:\s*,\s*[^"';]+)*)(['"]?)([^"']*)["']/g;

  processedContent = processedContent.replace(
    fontFamilyRegex,
    (match, before, openQuote, fontFamily, closeQuote, after) => {
      console.log(`Found font-family: "${fontFamily}"`);
      // Preserve quotes in the CSS variable if they exist
      const variableValue =
        openQuote && closeQuote ? `${openQuote}${fontFamily}${closeQuote}` : fontFamily;

      return `style="${before}--wp-custom-font-family: ${variableValue}; font-family: var(--wp-custom-font-family);${after}"`;
    }
  );

  // Convert inline font-size styles to CSS variables
  const fontSizeRegex = /style=["']([^"']*)font-size:\s*([^";]+)([^"']*)["']/g;
  processedContent = processedContent.replace(fontSizeRegex, (match, before, fontSize, after) => {
    console.log(`Found font-size: "${fontSize}"`);
    return `style="${before}--wp-custom-font-size: ${fontSize}; font-size: var(--wp-custom-font-size);${after}"`;
  });

  // Similarly process other style attributes like color, line-height, etc.
  processedContent = processedContent.replace(
    /style=["']([^"']*)color:\s*([^";]+)([^"']*)["']/g,
    (match, before, color, after) => {
      return `style="${before}--wp-custom-color: ${color}; color: var(--wp-custom-color);${after}"`;
    }
  );

  processedContent = processedContent.replace(
    /style=["']([^"']*)line-height:\s*([^";]+)([^"']*)["']/g,
    (match, before, lineHeight, after) => {
      return `style="${before}--wp-custom-line-height: ${lineHeight}; line-height: var(--wp-custom-line-height);${after}"`;
    }
  );

  // Process table-specific styles for better WordPress table compatibility
  processedContent = processedContent.replace(
    /style=["']([^"']*)border(?:-[^:]+)?:\s*([^";]+)([^"']*)["']/g,
    (match, before, borderValue, after) => {
      return `style="${before}--wp-custom-border: ${borderValue}; border: var(--wp-custom-border);${after}"`;
    }
  );

  processedContent = processedContent.replace(
    /style=["']([^"']*)width:\s*([^";]+)([^"']*)["']/g,
    (match, before, widthValue, after) => {
      return `style="${before}--wp-custom-width: ${widthValue}; width: var(--wp-custom-width);${after}"`;
    }
  );

  processedContent = processedContent.replace(
    /style=["']([^"']*)background(?:-color)?:\s*([^";]+)([^"']*)["']/g,
    (match, before, bgValue, after) => {
      return `style="${before}--wp-custom-background: ${bgValue}; background: var(--wp-custom-background);${after}"`;
    }
  );

  // Process vertical-align styles
  processedContent = processedContent.replace(
    /style=["']([^"']*)vertical-align:\s*([^";]+)([^"']*)["']/g,
    (match, before, valign, after) => {
      return `style="${before}--wp-custom-vertical-align: ${valign}; vertical-align: var(--wp-custom-vertical-align);${after}"`;
    }
  );

  // Process text-align styles
  processedContent = processedContent.replace(
    /style=["']([^"']*)text-align:\s*([^";]+)([^"']*)["']/g,
    (match, before, align, after) => {
      return `style="${before}--wp-custom-text-align: ${align}; text-align: var(--wp-custom-text-align);${after}"`;
    }
  );

  // Process all tables to ensure they match the example
  processedContent = processedContent.replace(/<table([^>]*)>/g, (match, attrs) => {
    // Add our custom black background with white border style
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; background-color: #000; color: white; border: 1px solid white;"`;
      });
    } else {
      return `<table${attrs} style="background-color: #000; color: white; border: 1px solid white;">`;
    }
  });

  // Process table cells (th and td) to ensure white borders and proper padding
  processedContent = processedContent.replace(/<(th|td)([^>]*)>/g, (match, tag, attrs) => {
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;"`;
      });
    } else {
      return `<${tag}${attrs} style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;">`;
    }
  });

  // Handle table alignment classes
  processedContent = processedContent.replace(
    /<table([^>]*)class=["']([^"']*)["']/g,
    (match, beforeAttrs, classNames) => {
      // Preserve all table classes and add a helper class for responsive tables
      return `<table${beforeAttrs}class="${classNames} wp-table-responsive"`;
    }
  );

  // Handle tables without class attributes - add a responsive class
  processedContent = processedContent.replace(/<table(?![^>]*class=)([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('style=')) {
      return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
        return `style="${styleContent}; background-color: #000; color: white; border: 1px solid white;" class="wp-table-responsive"`;
      });
    } else {
      return `<table${attrs} style="background-color: #000; color: white; border: 1px solid white;" class="wp-table-responsive">`;
    }
  });

  // Make sure WordPress Gutenberg table blocks are properly handled
  processedContent = processedContent.replace(
    /<figure([^>]*)class=["']([^"']*)(wp-block-table)([^"']*)["']/g,
    (match, beforeAttrs, beforeClass, tableClass, afterClass) => {
      // Add our responsive class to WordPress table blocks
      return `<figure${beforeAttrs}class="${beforeClass}${tableClass} wp-table-block-responsive${afterClass}"`;
    }
  );

  // Process table cells for better styling
  processedContent = processedContent.replace(/<(td|th)([^>]*)>/g, (match, tag, attrs) => {
    // If no class attribute, add one
    if (!attrs.includes('class=')) {
      if (attrs.includes('style=')) {
        return match.replace(/style=["']([^"']*)["']/, (styleMatch, styleContent) => {
          return `style="${styleContent}; border: 1px solid white; padding: 1rem; background-color: #000; color: white;" class="wp-table-cell"`;
        });
      } else {
        return `<${tag}${attrs} class="wp-table-cell" style="border: 1px solid white; padding: 1rem; background-color: #000; color: white;">`;
      }
    }
    // If already has a class, add our cell class and style
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

  // Process special table attributes - colspan, rowspan, etc.
  processedContent = processedContent.replace(
    /<(td|th)([^>]*)(colspan|rowspan)=["'](\d+)["']([^>]*)>/gi,
    (match, tag, before, attr, value, after) => {
      const dataAttr = `data-${attr.toLowerCase()}`;
      // Add a visual class to make it more distinguishable
      let classAddition = '';
      if (attr.toLowerCase() === 'colspan') {
        classAddition = ` wp-cell-colspan-${value}`;
      } else if (attr.toLowerCase() === 'rowspan') {
        classAddition = ` wp-cell-rowspan-${value}`;
      }

      // Keep the original attribute but add our data attribute and class
      if (before.includes('class=') || after.includes('class=')) {
        match = match.replace(/class=["']([^"']*)["']/, (m, classes) => {
          return `class="${classes}${classAddition}"`;
        });
      } else {
        match = `<${tag}${before}${attr}="${value}"${after} class="wp-table-cell${classAddition}" ${dataAttr}="${value}">`;
      }

      // Also ensure it has the black background and white border style
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

  // Look for WordPress font family classes and enhance them with inline styles
  processedContent = processedContent.replace(
    /class=["']([^"']*has-([a-z0-9-]+)-font-family[^"']*)["']/gi,
    (match, classes, fontName) => {
      // Convert kebab-case to title case for display
      const formattedFont = fontName
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      console.log(`Enhanced font class: ${fontName} to ${formattedFont}`);

      // Add the CSS variable while keeping the class
      return `class="${classes}" style="--wp-custom-font-family: '${formattedFont}'; font-family: var(--wp-custom-font-family);"`;
    }
  );

  console.log('Completed content preprocessing');
  return processedContent;
};

// Extract ALL external resources from WordPress content (Google Fonts, etc.)
const extractExternalResources = (content: string) => {
  const resources = {
    fontLinks: [] as string[],
    scripts: [] as string[],
    styles: [] as string[]
  };

  // Extract Google Fonts links
  const fontLinkRegex = /<link[^>]*href=["']([^"']*fonts\.googleapis\.com[^"']*)["'][^>]*>/g;
  let match;
  while ((match = fontLinkRegex.exec(content)) !== null) {
    resources.fontLinks.push(match[1]);
  }

  // Extract font-family from style tags for Google Fonts
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  const fontFamilyRegex = /font-family:\s*(['"])?(.*?)(?:\1|;|\s*})/g;

  let styleMatch;
  while ((styleMatch = styleRegex.exec(content)) !== null) {
    const styleContent = styleMatch[1];
    let fontMatch;

    while ((fontMatch = fontFamilyRegex.exec(styleContent)) !== null) {
      // Get the complete font family stack
      const fontStack = fontMatch[2].trim();

      // Split font stack and get primary font
      const fontParts = fontStack.split(',');
      const primaryFont = fontParts[0].trim().replace(/["']/g, '');

      // Skip standard web fonts
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

      if (!isWebSafeFont) {
        // Format for Google Fonts URL
        const formattedName = primaryFont.replace(/\s+/g, '+');
        resources.fontLinks.push(
          `https://fonts.googleapis.com/css?family=${formattedName}:400,700&display=swap`
        );

        console.log(`Extracted font family: ${primaryFont} (${formattedName})`);
      }
    }
  }

  // Also look for font-family in the HTML content (for inline styles)
  const inlineFontRegex = /style=["'][^"']*font-family:\s*(['"]?)([^;'"]*)\1/gi;
  let inlineMatch;
  while ((inlineMatch = inlineFontRegex.exec(content)) !== null) {
    const fontValue = inlineMatch[2].trim();
    const fontParts = fontValue.split(',');
    const primaryFont = fontParts[0].trim().replace(/["']/g, '');

    // Skip web safe fonts
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

    if (!isWebSafeFont) {
      const formattedName = primaryFont.replace(/\s+/g, '+');
      resources.fontLinks.push(
        `https://fonts.googleapis.com/css?family=${formattedName}:400,700&display=swap`
      );
      console.log(`Extracted inline font family: ${primaryFont} (${formattedName})`);
    }
  }

  // Look for classes that might indicate font usage
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

  // Remove duplicates
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

// Function to create WordPress-specific styles
const createWPStyles = (post: WPPost) => {
  const postId = post.id;

  // Extract styles from WordPress content
  const wpStyles = extractStyles(post.content.rendered);

  return `
    /* WordPress Extracted Styles */
    ${wpStyles}
    
    /* WordPress Core Styles - To ensure EXACT match with WordPress.com */
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
};

export default function PostPage() {
  const { slug } = useParams();
  const [wpStyles, setWpStyles] = useState<string>('');
  const [fontLinks, setFontLinks] = useState<string[]>([]);
  const [processedContent, setProcessedContent] = useState<string>('');

  // Ensure the slug is properly decoded and escaped for the API call
  const encodedSlug = slug ? encodeURIComponent(String(slug)) : '';
  const { data, error, isLoading } = useSWR<WPPost[]>(
    encodedSlug
      ? `https://public-api.wordpress.com/wp/v2/sites/prometheusblog2.wordpress.com/posts?slug=${encodedSlug}`
      : null,
    fetcher
  );

  // Process WordPress content to extract and apply styles when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      const post = data[0];

      // Process WordPress content to preserve exact styling
      const processed = preprocessContent(post.content.rendered);
      setProcessedContent(processed);

      // Extract all external resources
      const resources = extractExternalResources(post.content.rendered);
      setFontLinks(resources.fontLinks);

      // Create WordPress-specific styles
      const styles = createWPStyles(post);
      setWpStyles(styles);
    }
  }, [data]);

  if (error) {
    return <ErrorState title='Failed to load post' errorDetails={error.message} />;
  }

  if (isLoading || !data || data.length === 0) {
    return <LoadingState />;
  }

  const post = data[0];
  const blogTitle = post.title.rendered || 'Blog Post';
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '');
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '') || 'No description available';
  const author = post.author?.name || 'Prometheus';
  const imageUrl = post.jetpack_featured_media_url;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <>
      <Head>
        <title>{blogTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={blogTitle} />
        <meta property='og:description' content={description} />
        {imageUrl && <meta property='og:image' content={imageUrl} />}
        <meta name='author' content='[ Prometheus ]' />

        {/* Load Google Fonts from WordPress */}
        {fontLinks.map((link, index) => (
          <link key={`font-${index}`} rel='stylesheet' href={link} />
        ))}
      </Head>

      {/* Add WordPress styles extracted from content */}
      <style dangerouslySetInnerHTML={{ __html: wpStyles }} />

      {/* Add global styles for the blog post page */}
      <style>{`
        /* Remove underlines from all links in the blog post page */
        article a {
          text-decoration: none !important;
        }
      `}</style>

      <div className='bg-black w-full flex flex-col relative h-full min-h-screen'>
        <NavbarGroup />
        <article className='flex flex-col lg:flex-row pt-[10%] pb-10'>
          {/*Left Side*/}
          <BlogSidebar
            blogTitle={blogTitle}
            excerpt={excerpt}
            formattedDate={formattedDate}
            author={author}
            imageUrl={imageUrl}
          />
          {/*Right Side */}
          <div className={`w-full px-10 lg:w-[55%] h-full text-white`}>
            {imageUrl && (
              <div className='hidden lg:block mb-8'>
                <img
                  src={imageUrl}
                  alt={blogTitle}
                  className='w-full h-auto object-cover rounded-lg'
                />
              </div>
            )}
            <div className='wp-content' dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        </article>

        <ResponsiveFooter />
      </div>
    </>
  );
}
