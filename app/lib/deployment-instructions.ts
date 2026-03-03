export type Platform = 'wordpress' | 'webflow' | 'squarespace' | 'static' | 'generic'

interface PlatformInstructions {
  name: string
  llmsTxt: string[]
  faqHtml: string[]
  schema: string[]
  pitfalls: string[]
}

export const platformInstructions: Record<Platform, PlatformInstructions> = {
  wordpress: {
    name: 'WordPress',
    llmsTxt: [
      'Connect to your hosting via FTP (FileZilla) or use your host\'s File Manager (cPanel → File Manager)',
      'Navigate to your WordPress root directory (same folder as wp-config.php)',
      'Upload the llms.txt file directly into this folder',
      'Test: visit yoursite.com/llms.txt — you should see the file contents',
    ],
    faqHtml: [
      'Go to Pages → Add New in your WordPress dashboard',
      'Title the page "Frequently Asked Questions"',
      'Switch to the HTML/Code editor (not Visual editor)',
      'Paste the FAQ HTML content',
      'Publish the page',
      'For the schema markup: install the "Insert Headers and Footers" plugin (free)',
      'Go to Settings → Insert Headers and Footers → paste the schema JSON-LD in the "Scripts in Header" box',
    ],
    schema: [
      'Install the "Insert Headers and Footers" plugin (by WPCode) — it\'s free',
      'Go to Settings → Insert Headers and Footers',
      'Paste the entire <script type="application/ld+json">...</script> block into "Scripts in Header"',
      'Click Save — the schema will appear on every page',
      'For page-specific schema, use WPCode → "Add Snippet" with page-level conditions',
    ],
    pitfalls: [
      'Don\'t upload llms.txt via Media Library — it won\'t be accessible at the root URL',
      'Some security plugins block .txt file access — check your security settings if the file returns 403',
      'If using a caching plugin (WP Rocket, W3 Total Cache), clear cache after adding schema',
    ],
  },
  webflow: {
    name: 'Webflow',
    llmsTxt: [
      'Webflow doesn\'t support uploading arbitrary files to the root directory',
      'Option 1: Create a page with URL slug "/llms-txt" and paste the content as plain text',
      'Option 2: Host the file on a CDN or subdomain and redirect /llms.txt to it',
      'Option 3: If you have a custom domain with Cloudflare, use a Worker to serve the file',
      'Note: This is a known limitation of Webflow — AI crawlers may still find your other optimizations',
    ],
    faqHtml: [
      'Open your Webflow project in the Designer',
      'Add a new section or page for FAQs',
      'Use the Rich Text element or build FAQ items with Div blocks',
      'For accordion-style FAQs: use Webflow\'s native Interactions (click to reveal)',
      'Style the questions as H3 tags and answers as paragraphs',
    ],
    schema: [
      'Go to your project\'s Settings → Custom Code tab',
      'Paste the schema JSON-LD block in the "Head Code" section',
      'This adds schema to every page on your site',
      'For page-specific schema: open the page settings and use the "Inside <head> tag" field',
      'Publish to see changes live',
    ],
    pitfalls: [
      'Webflow\'s CMS has limitations with structured data — test with Google\'s Rich Results Tool after publishing',
      'Custom code only works on published sites, not in the Designer preview',
      'The llms.txt limitation is real — consider using Cloudflare Workers if this is important',
    ],
  },
  squarespace: {
    name: 'Squarespace',
    llmsTxt: [
      'Squarespace doesn\'t support uploading files to the root directory',
      'Workaround: Create a new page with the URL slug "/llms-txt"',
      'Use a Code Block to display the llms.txt content as plain text',
      'AI crawlers may find it at /llms-txt even though it\'s not technically at /llms.txt',
      'Note: This is a known limitation — your other AEO optimizations (schema, FAQ) are more impactful',
    ],
    faqHtml: [
      'Go to Pages → click the + button → create a new page',
      'Name it "Frequently Asked Questions" and set the URL slug to "/faq"',
      'Add an Accordion Block (built into Squarespace) for the FAQ items',
      'Alternatively, add a Code Block and paste the raw FAQ HTML',
      'Make sure each question is wrapped in an H3 tag for proper heading structure',
    ],
    schema: [
      'Go to Settings → Advanced → Code Injection',
      'Paste the schema JSON-LD block in the "Header" field',
      'Click Save — schema appears on all pages',
      'For page-specific schema: edit the page → Settings (gear icon) → Advanced → Page Header Code Injection',
    ],
    pitfalls: [
      'Squarespace\'s built-in Accordion Block doesn\'t add FAQPage schema automatically — you still need the JSON-LD',
      'Code Injection is only available on Business plan and above (not Personal)',
      'After adding code, clear browser cache and test with Google Rich Results Tool',
    ],
  },
  static: {
    name: 'Static HTML',
    llmsTxt: [
      'Save the llms.txt file to your website\'s root directory',
      'This is the same folder where your index.html file lives',
      'Upload via FTP, SSH, or your hosting provider\'s file manager',
      'Test: visit yoursite.com/llms.txt — you should see the file contents',
    ],
    faqHtml: [
      'Create a new file called faq.html in your website folder',
      'Paste the FAQ HTML content inside your standard page template (between <body> tags)',
      'Add the schema JSON-LD in the <head> section of the same page',
      'Link to the FAQ page from your navigation menu or homepage',
      'Upload the file to your server',
    ],
    schema: [
      'Open your index.html (or whichever page you want to add schema to)',
      'Find the <head> section',
      'Paste the entire <script type="application/ld+json">...</script> block just before </head>',
      'Save and upload the file',
      'Repeat for any other pages that need specific schema (service pages, about page)',
    ],
    pitfalls: [
      'Make sure your server serves .txt files with the correct MIME type (text/plain)',
      'If using a CDN (Cloudflare, CloudFront), purge cache after uploading new files',
      'Validate your schema with Google Rich Results Test before going live',
    ],
  },
  generic: {
    name: 'Any Platform',
    llmsTxt: [
      'Save the llms.txt file and upload it to your website\'s root folder',
      'It should be accessible at: yourwebsite.com/llms.txt',
      'If you\'re not sure how to do this, send the file to your website person with these instructions',
      'Test by visiting the URL in your browser — you should see the text content',
    ],
    faqHtml: [
      'Create a new FAQ page on your website',
      'Copy the FAQ HTML content and paste it into the page editor',
      'If your editor supports HTML mode, switch to that for best results',
      'Copy the schema JSON-LD code separately and add it to your page\'s header/meta section',
    ],
    schema: [
      'Find where your website allows you to add custom code to the <head> section',
      'Paste the schema JSON-LD block there',
      'This is usually in Settings → SEO → Custom Code, or similar',
      'If you can\'t find it, send the code to your website person and ask them to add it to the HTML head',
    ],
    pitfalls: [
      'Always test with Google Rich Results Test (search.google.com/test/rich-results) after adding schema',
      'Make sure llms.txt is accessible without authentication (no login required to view it)',
      'AI crawlers typically discover new files within 1-4 weeks',
    ],
  },
}

export function getInstructions(platform: Platform): PlatformInstructions {
  return platformInstructions[platform] || platformInstructions.generic
}

export function getAllPlatforms(): Array<{ id: Platform; name: string }> {
  return [
    { id: 'wordpress', name: 'WordPress' },
    { id: 'squarespace', name: 'Squarespace' },
    { id: 'webflow', name: 'Webflow' },
    { id: 'static', name: 'Static HTML' },
    { id: 'generic', name: 'Other / Not Sure' },
  ]
}
