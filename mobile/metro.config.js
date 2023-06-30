/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

let path = require("path")
let fs = require("fs")
let process = require("process")

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      // console.log(`config: ${moduleName}`);
      // if (process.env.NODE_ENV === 'development' && moduleName.startsWith('config:')) {
      if (moduleName.startsWith('config:')) {
        if (process.env.NODE_ENV !== 'production') {
          // Logic to resolve the module name to a file path...
          // NOTE: Throw an error if there is no resolution.
          let filePath = path.resolve(__dirname, moduleName.substring(7))
          console.log(`config: ${filePath}`)
          if (fs.existsSync(filePath)) {
            console.log(`using config: ${filePath}`)
            return {
              filePath,
              type: 'sourceFile',
            };
          }
        }

        return {
          type: 'empty'
        }
      }
      // Optionally, chain to the standard Metro resolver.
      return context.resolveRequest(context, moduleName, platform);
    }
  },
};
