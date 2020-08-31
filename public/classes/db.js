class Db {
  table_name = "";
  data = "";

  require = function () {
    var url = "public/database/" + this.table_name + ".json";
    var self = this;

    $.ajax({
      url: url,
      dataType: "json",
      async: false,
    }).done(function (result) {
      self.data = result;
    });

    return this;
  };

  table = function (table_name) {
    this.table_name = table_name;

    return this.require();
  };

  get = function (key, value) {
    return this.data.filter((data) => {
      return data[key] == value;
    });
  };

  getIn = function (key, array) {
    return this.data.filter((data) => {
      return array.includes(data[key]);
    });
  };

  first = function (key, value) {
    return this.data.find((data) => {
      return data[key] == value;
    });
  };
}

export { Db };
