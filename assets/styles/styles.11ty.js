const glob = require('glob')
const path = require('path')
const sass = require('sass')

module.exports = class {
  data() {
    const entryFiles = glob.sync(path.join(__dirname, '**/[!_]*.{scss,sass}'))
    return {
      files: entryFiles,
      layout: null,
      eleventyExcludeFromCollections: true,
      pagination: {
        data: 'files',
        size: 1,
        alias: 'file'
      },
      permalink: ({ file }) => {
        const relativePath = path.relative(__dirname, path.dirname(file))
        return path.join(
          'assets/styles',
          relativePath,
          `${path.basename(file, path.extname(file))}.css`
        )
      }
    }
  }

  render({ file }) {
    return sass.renderSync({ file }).css.toString()
  }
}
