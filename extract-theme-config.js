// extract-theme-config.js
const fs = require('fs');
const path = require('path');

const THEME_DIR = path.resolve(__dirname, './src/app');
const OUTPUT_PATH = path.resolve(__dirname, './exported-theme/theme-schemas.json');
const TYPES_OUTPUT_PATH = path.resolve(__dirname, './exported-theme/component-schemas.ts');

function findCustomizationConfigs(dir, result = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findCustomizationConfigs(fullPath, result);
    } else if (file === 'customization.config.ts') {
      result.push(fullPath);
    }
  }
  return result;
}

function extractInterface(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all exported interfaces
  const interfaceMatches = content.match(/export\s+interface\s+([A-Za-z_][A-Za-z0-9_]*)\s*{[\s\S]*?}/g);
  if (!interfaceMatches) {
    console.warn(`⚠️ Could not find interfaces in: ${filePath}`);
    return null;
  }
  
  // For each interface, extract name and content
  const interfaces = interfaceMatches.map(match => {
    const nameMatch = match.match(/export\s+interface\s+([A-Za-z_][A-Za-z0-9_]*)/);
    const name = nameMatch ? nameMatch[1] : null;
    return {
      name,
      content: match.trim()
    };
  }).filter(i => i.name !== null);

  // Get component name from directory path
  const componentName = path.basename(path.dirname(filePath));
  
  return {
    componentName,
    interfaces
  };
}

function main() {
  const files = findCustomizationConfigs(THEME_DIR);
  
  // For JSON schema output
  const theme = {
    primary: '#007bff',
    secondary: '#6c757d',
    'primary-background': '#f8f9fa',
    'primary-text': '#212529',
    'secondary-background': '#343a40',
    'secondary-text': '#ffffff',
  };
  
  const components = {};
  const interfaces = [];
  const componentSchemaMap = [];
  
  for (const file of files) {
    const data = extractInterface(file);
    
    if (data && data.interfaces.length > 0) {
      const componentName = data.componentName;
      components[componentName] = {};
      
      // Add all interfaces for this component
      data.interfaces.forEach(iface => {
        interfaces.push(iface.content);
        
        // Add to component schema map if it looks like a schema interface
        if (iface.name.includes('SCHEMA')) {
          componentSchemaMap.push(`  '${componentName}': ${iface.name};`);
        }
      });
    }
  }
  
  theme['components-schemas'] = components;
  
  // Write JSON schema
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(theme, null, 2));
  console.log(`✅ Generated theme configuration to ${OUTPUT_PATH}`);
  
  // Now create the global TypeScript interface file
  const typesContent = `// Auto-generated component schemas
// Generated on ${new Date().toISOString()}
// DO NOT EDIT MANUALLY

${interfaces.join('\n\n')}

/**
 * Global interface mapping component names to their schema types
 * Use this for type-safe component configuration
 */
export interface ComponentSchemas {
${componentSchemaMap.join('\n')}
}

/**
 * Component configuration with typed data property
 */
export interface TypedComponentConfig<T extends keyof ComponentSchemas> {
  selector: T;
  data: ComponentSchemas[T];
}
`;

  // Create directory if it doesn't exist
  const typesDir = path.dirname(TYPES_OUTPUT_PATH);
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  fs.writeFileSync(TYPES_OUTPUT_PATH, typesContent);
  console.log(`✅ Generated global interface file to ${TYPES_OUTPUT_PATH}`);
}

main();