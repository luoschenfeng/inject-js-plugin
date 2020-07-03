# inject-js-plugin

when you use the html-webpack-plugin and html-loader to handle the html, tolerantly, only the html-loader can handel the html,but you want to set inject property to false of html-webpack-plugin to custom and dynamic inject js link use <%= htmlWebpackPlugin.tags.bodyTags %>,want we can ,is the module can.

## Installtion

```
npm install --save-dev inject-js-plugin
```

## Basic Usage

```
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackExcludeAssetsPlugin()
]
```

RegExp is `${leftSign}(${scopeText ? scopeText : '\\\s*'})${rightSign}`, match leftSign and rightSign,to inject the chunks to the middle of leftSign and rightSign,default it use the like Jinja2 template Syntax,leftSign is { boock selfJs} rightSign is { endblock },you can custom leftSign and rightSign,to inject chunks at Between the two.like

```
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackExcludeAssetsPlugin({
      leftSign: '{ boock selfJs }',
      rightSign: '{ /endblock }'
  })
]
```

## Keywords

webpackplugin html-webpack-plugin inject
