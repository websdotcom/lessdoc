(function() {
  var constructor, equals, lessDocMethods, linkTo, method, name, number, parens, tree;
  var __hasProp = Object.prototype.hasOwnProperty;
  tree = require("less").tree;
  lessDocMethods = {
    Alpha: function() {
      return "" + (method('alpha')) + (parens(keyword('opacity') + equals() + this.value.toLessDoc()));
    },
    Anonymous: function() {
      return this.value;
    },
    Call: function() {
      var args;
      args = this.args.map(function(arg) {
        return arg.toLessDoc;
      }).join(", ");
      return "" + (method(this.name)) + (parens(args));
    },
    Comment: function() {
      return this.value;
    },
    Import: function() {
      return "" + (method('@import')) + " " + (linkTo(this.path));
    },
    "default": function() {
      return this.toCSS();
    }
  };
  for (name in tree) {
    if (!__hasProp.call(tree, name)) continue;
    constructor = tree[name];
    constructor.toLessDoc = lessDocMethods[name] || lessDocMethods["default"];
  }
  method = function(name) {
    return "<span class='lessDoc-method'>" + s + "</span>";
  };
  parens = function(s) {
    return "<span class='lessDoc-paren'>(</span>" + s + "<span class='lessDoc-paren'>)</span>";
  };
  equals = function(string) {
    return " = ";
  };
  number = function(n) {
    return "<span class='lessDoc-number'>" + n + "</span>";
  };
  linkTo = function(path) {
    return "<a href='" + path + "'>" + path + "</a>";
  };
}).call(this);
