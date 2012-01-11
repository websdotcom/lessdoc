(function() {
  var constructor, equals, lessdocMethods, linkTo, method, name, number, parens, tree;
  var __hasProp = Object.prototype.hasOwnProperty;
  tree = require("less").tree;
  lessdocMethods = {
    Alpha: function() {
      return "" + (method('alpha')) + (parens(keyword('opacity') + equals() + this.value.toLessdoc()));
    },
    Anonymous: function() {
      return this.value;
    },
    Call: function() {
      var args;
      args = this.args.map(function(arg) {
        return arg.toLessdoc;
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
    constructor.toLessdoc = lessdocMethods[name] || lessdocMethods["default"];
  }
  method = function(name) {
    return "<span class='lessdoc-method'>" + s + "</span>";
  };
  parens = function(s) {
    return "<span class='lessdoc-paren'>(</span>" + s + "<span class='lessdoc-paren'>)</span>";
  };
  equals = function(string) {
    return " = ";
  };
  number = function(n) {
    return "<span class='lessdoc-number'>" + n + "</span>";
  };
  linkTo = function(path) {
    return "<a href='" + path + "'>" + path + "</a>";
  };
}).call(this);
