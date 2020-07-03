// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
class injectJsPlugin {
  /**
   * 
   * @param {object} [scope]
   * @param {string} scope.leftSign 
   * @param {string} scope.rightSign 
   * @param {string} [scope.scopeText]
   */
  constructor(scope) {
    // this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.scope = scope ? scope: {leftSign: '{% block selfJs %}', rightSign: '{% endblock %}', scopeText: ''};
  }
  scriptTagLine(tag) { 
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return
    }
    return `<${tag.tagName} src="${tag.attributes.src}${tag.attributes.defer ? ' defer' : ''}"></${tag.tagName}>`
  }

  createScriptScope(bodyTagList) {
    let lineText = ''
    
    for (let bodyTag of bodyTagList) {
      lineText += bodyTag
    }
    
    return lineText
  }
  
  apply (compiler) {
    compiler.hooks.compilation.tap('injectJsPlugin', (compilation) => {
 
      // Staic Plugin interface |compilation |H OOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        'injectJsPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          let bodyTagList = data.bodyTags.map(this.scriptTagLine)

          const pattern = new RegExp(`${this.scope.leftSign}(${this.scope.scopeText ? this.scope.scopeText : '\\\s*'})${this.scope.rightSign}`);
          if (pattern.test(data.html)) {
            let matches = pattern.exec(data.html)
            data.html = data.html.replace(matches[0], this.scope.leftSign + this.createScriptScope(bodyTagList) + this.scope.rightSign)
          }

          // Manipulate the content
          // Tell webpack to move on
          cb(null, data)
        }
      )
    })
  }
}
 
module.exports = injectJsPlugin
