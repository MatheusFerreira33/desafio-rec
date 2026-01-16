import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql', // Usar schema local
  documents: ['app/**/*.tsx', 'app/**/*.ts'],
  generates: {
    './app/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config