import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'intellidelve',
  title: 'IntelliDelve CMS',

  projectId: 'k9jiezj8',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      // Custom studio components can be added here
    }
  },

  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:5173',
      'http://localhost:5174',
      'https://intellidelve.netlify.app',
      'https://www.intellidelve.com'
    ]
  }
})