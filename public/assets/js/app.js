import { Db } from "../../classes/db.js";
import { View } from "../../classes/view.js";
import { Storage } from "../../classes/storage.js";

let db = new Db();
let view = new View();
let storage = new Storage();

let trending_products = db.table("products").get("tag", "trending");
let best_seller_products = db.table("products").get("tag", "best_seller");

// Append trending products
trending_products.forEach((trending_product) => {
  $(".trending .trending-row").append(
    "<div class='col-md-6 col-lg-4 col-xl-3'>" +
      view.render("product", { product: trending_product }) +
      "</div>"
  );
});

// Append best seller
best_seller_products.forEach((best_seller_product) => {
  $(".best-selling .best-selling-row").append(
    view.render("product", { product: best_seller_product })
  );
});

// Add to cart
$("body").on("click", ".add_to_cart", function () {
  let id = this.getAttribute("data-id");

  storage.push("items", id);

  append_cart();
});

// Clear cart
$("body").on("click", ".clear-cart", function () {
  storage.remove("items");

  append_cart();
});

// Append cart to body
function append_cart() {
  let products = db.table("products").getIn("id", storage.get("items")),
    products_count = Object.keys(products).length;

  $(".cart-menu").empty();

  $(".cart-items-count").html(products_count);

  products.forEach((product) => {
    $(".cart-menu").append(view.render("cart", { product: product }));
  });
}

append_cart();
