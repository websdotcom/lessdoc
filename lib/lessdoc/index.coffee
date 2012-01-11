tree = require("less").tree

lessdocMethods = 
  Alpha: () ->
    "#{method('alpha')}#{parens(keyword('opacity') + equals() + this.value.toLessdoc())}"
  Anonymous: () ->
    this.value
  Call: () ->
    args = this.args.map((arg) -> arg.toLessdoc).join(", ")
    "#{method(this.name)}#{parens(args)}"
  Comment: () ->
    this.value
  Import: () ->
    "#{method('@import')} #{linkTo(this.path)}"
  default: () ->
    this.toCSS()

# Mix our html methods into the less node classes
for own name, constructor of tree
  constructor.toLessdoc = lessdocMethods[name] || lessdocMethods.default

# Syntax highlighting helpers
method = (name) ->
  "<span class='lessdoc-method'>#{s}</span>";

parens = (s) ->
  "<span class='lessdoc-paren'>(</span>#{s}<span class='lessdoc-paren'>)</span>";

equals = (string) ->
  " = "
  
number = (n) ->
  "<span class='lessdoc-number'>#{n}</span>"
    
linkTo = (path) ->
  "<a href='#{path}'>#{path}</a>"