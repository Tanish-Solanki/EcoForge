import fs from 'fs';
import path from 'path';
import * as LucideIcons from 'lucide-react';

function findFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findFiles(filePath, ext));
        } else if (file.endsWith(ext)) {
            results.push(filePath);
        }
    });
    return results;
}

const files = findFiles('c:/Users/Dell/OneDrive/Desktop/Hackout/src', '.jsx');
let missingCount = 0;

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const lucideMatches = content.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g);
    if (lucideMatches) {
        lucideMatches.forEach(m => {
            const rawIcons = m.replace(/import\s+{/, '').replace(/}\s+from.*/, '').replace(/\n/g, ' ');
            const icons = rawIcons.split(',').map(i => i.trim()).filter(Boolean);
            icons.forEach(icon => {
                // handle alias like 'Plus as PlusIcon'
                const iconName = icon.includes(' as ') ? icon.split(' as ')[0].trim() : icon;
                if (!LucideIcons[iconName]) {
                    console.error(`❌ MISSING ICON in ${path.basename(f)}: "${iconName}"`);
                    missingCount++;
                }
            });
        });
    }
});

if (missingCount === 0) {
    console.log("✅ All Lucide icon imports across all JSX files are valid!");
} else {
    console.error(`❌ Total missing icons: ${missingCount}`);
}
