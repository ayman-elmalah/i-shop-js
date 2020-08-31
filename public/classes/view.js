class View {
  file = "";
  view = "";

  require = function () {
    var view = "public/views/" + this.file + ".html";
    var self = this;

    $.ajax({
      url: view,
      async: false,
    }).done(function (result) {
      self.view = result;
    });

    return this;
  };

  render = function (file, data) {
    this.file = file;

    this.require();

    return this.view
      .split("{{")
      .map(function (i) {
        var symbol = i.substring(0, i.indexOf("}}")).trim();

        var value = symbol.split(".").reduce(function (a, b) {
          return data[a][b];
        });

        return i.replace(symbol + "}}", value);
      })
      .join("");
  };
}

export { View };
