tree = require("less").tree

lessDocMethods = 
  Alpha: () ->
    "#{method('alpha')}#{parens(keyword('opacity') + equals() + this.value.toLessDoc())}"
  Anonymous: () ->
    this.value
  Call: () ->
    args = this.args.map((arg) -> arg.toLessDoc).join(", ")
    "#{method(this.name)}#{parens(args)}"
  Comment: () ->
    this.value
  Import: () ->
    "#{method('@import')} #{linkTo(this.path)}"
  default: () ->
    this.toCSS()

# Mix our html methods into the less node classes
for own name, constructor of tree
  constructor.toLessDoc = lessDocMethods[name] || lessDocMethods.default

# Syntax highlighting helpers
method = (name) ->
  "<span class='lessDoc-method'>#{s}</span>";

parens = (s) ->
  "<span class='lessDoc-paren'>(</span>#{s}<span class='lessDoc-paren'>)</span>";

equals = (string) ->
  " = "
  
number = (n) ->
  "<span class='lessDoc-number'>#{n}</span>"
    
linkTo = (path) ->
  "<a href='#{path}'>#{path}</a>"