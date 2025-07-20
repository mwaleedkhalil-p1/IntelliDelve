import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the image mapping
const mappingPath = path.join(__dirname, 'image-mapping.json');
const imageMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

console.log(`🔄 Loaded ${Object.keys(imageMapping).length} image mappings`);

// Files to update
const filesToUpdate = [
  // Components
  'client/components/Hero.tsx',
  'client/components/HeroCarousel.tsx',
  'client/components/IndustryPage.tsx',
  'client/components/SolutionPage.tsx',
  
  // Services
  'client/services/imagePreloader.ts',
  
  // Hooks
  'client/hooks/useImagePreloader.ts',
  
  // Pages
  'client/pages/BackgroundScreening.tsx',
  'client/pages/Careers.tsx',
  'client/pages/Clients.tsx',
  'client/pages/Index.tsx',
  'client/pages/About.tsx',
  'client/pages/WhatWeOffer.tsx',
  'client/pages/Industries.tsx',
  'client/pages/CaseStudies.tsx',
  'client/pages/Contact.tsx',
  
  // Solution pages
  'client/pages/solutions/AIDataScience.tsx',
  'client/pages/solutions/BackgroundScreening.tsx',
  'client/pages/solutions/CorporateDueDiligence.tsx',
  'client/pages/solutions/TechInnovation.tsx',
];

// Function to update a single file
function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return { updated: false, reason: 'File not found' };
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let updatedCount = 0;
  
  // Replace each external URL with local path
  for (const [externalUrl, localPath] of Object.entries(imageMapping)) {
    const regex = new RegExp(externalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    
    if (matches) {
      content = content.replace(regex, localPath);
      updatedCount += matches.length;
    }
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated ${filePath}: ${updatedCount} URLs replaced`);
    return { updated: true, count: updatedCount };
  } else {
    console.log(`ℹ️  No updates needed: ${filePath}`);
    return { updated: false, reason: 'No URLs found' };
  }
}

// Function to update all files
async function updateAllFiles() {
  console.log('🚀 Starting image URL replacement...\n');
  
  const results = {
    updated: 0,
    skipped: 0,
    notFound: 0,
    totalReplacements: 0
  };
  
  for (const filePath of filesToUpdate) {
    const result = updateFile(filePath);
    
    if (result.updated) {
      results.updated++;
      results.totalReplacements += result.count;
    } else if (result.reason === 'File not found') {
      results.notFound++;
    } else {
      results.skipped++;
    }
  }
  
  console.log('\n📊 Update Summary:');
  console.log(`✅ Files updated: ${results.updated}`);
  console.log(`⏭️  Files skipped (no URLs): ${results.skipped}`);
  console.log(`❌ Files not found: ${results.notFound}`);
  console.log(`🔄 Total URL replacements: ${results.totalReplacements}`);
  
  // Update the image preloader service with local URLs
  updateImagePreloaderService();
  
  console.log('\n🎉 Image URL replacement complete!');
  console.log('📝 All external images are now served locally for faster loading.');
}

// Function to update the image preloader service
function updateImagePreloaderService() {
  const preloaderPath = path.join(__dirname, '..', 'client/services/imagePreloader.ts');
  
  if (!fs.existsSync(preloaderPath)) {
    console.log('⚠️  Image preloader service not found');
    return;
  }
  
  let content = fs.readFileSync(preloaderPath, 'utf8');
  
  // Generate new local image array
  const localImages = Object.values(imageMapping);
  const localImagesArray = localImages.map(img => `      '${img}',`).join('\n');
  
  // Replace the getAllHeroImages method
  const getAllHeroImagesRegex = /private getAllHeroImages\(\): string\[\] \{[\s\S]*?return \[[\s\S]*?\];[\s\S]*?\}/;
  
  const newGetAllHeroImages = `private getAllHeroImages(): string[] {
    return [
      // Local images (downloaded from external sources)
${localImagesArray}
    ];
  }`;
  
  if (getAllHeroImagesRegex.test(content)) {
    content = content.replace(getAllHeroImagesRegex, newGetAllHeroImages);
    
    // Also update critical images to use local paths
    const criticalImagesRegex = /private getCriticalImages\(\): string\[\] \{[\s\S]*?return \[[\s\S]*?\];[\s\S]*?\}/;
    
    const criticalLocalImages = localImages.slice(0, 4); // First 4 images as critical
    const criticalImagesArray = criticalLocalImages.map(img => `      '${img}',`).join('\n');
    
    const newGetCriticalImages = `private getCriticalImages(): string[] {
    return [
      // Critical local images for immediate loading
${criticalImagesArray}
    ];
  }`;
    
    if (criticalImagesRegex.test(content)) {
      content = content.replace(criticalImagesRegex, newGetCriticalImages);
    }
    
    fs.writeFileSync(preloaderPath, content, 'utf8');
    console.log('✅ Updated image preloader service with local URLs');
  } else {
    console.log('⚠️  Could not update image preloader service');
  }
}

// Run the update
console.log('🖼️  Image URL Replacement Tool');
console.log('================================\n');

updateAllFiles().catch(console.error);
