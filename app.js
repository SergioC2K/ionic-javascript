document.addEventListener("DOMContentLoaded", () => {
  console.log("is alright");
});

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.ProductArray = [];
    this.Products = window.localStorage.getItem("Products");
    this.list = document.querySelector("#list");
  }

  RenderList(content) {
    const ion_item = document.createElement("ion-item");
    const ion_label = document.createElement("ion-label");

    ion_label.innerHTML = `${content}`;
    ion_item.appendChild(ion_label);
    return this.list.appendChild(ion_item);
  }

  listProduct() {
    const Products = this.Products;
    const Json_Data = JSON.parse(Products);

    if (Json_Data <= 0 || Json_Data === null) {
      this.RenderList(
        `<strong><ion-icon name="alert-circle" slot="start"></ion-icon> Not Products</strong>`
      );
    } else {
      Json_Data.map((item) => {
        this.RenderList(`Name: ${item.product_name} 💲Price: ${item.price}`);
      });
    }
  }

  SaveProduct(product) {
    let Product_array = this.ProductArray;
    Product_array.push(product);
    window.localStorage.setItem("Products", JSON.stringify(Product_array));
  }

  newProduct(product) {
    const { product_name, price } = product;
    this.SaveProduct(product);

    let ion_item = document.createElement("ion-item");
    let ion_label = document.createElement("ion-label");

    function removeButton(id) {
      return `<ion-button color="primary" class="justify content center" id="btnSave">
        <ion-icon name="trash-outline"></ion-icon>
      </ion-button>
      `;
    }

    this.RenderList(`Name: ${product_name} 💲Price: ${price}`);
  }
  deleteProduct(productId) {}
}

const product_name = document.querySelector("#name");
const price = document.querySelector("#price");
const buttonSave = document.querySelector("#btnSave");

const ui = new Product();

async function ShowAlert(title, message) {
  const alert = document.createElement("ion-alert");
  alert.cssClass = "my-custom-class";
  alert.header = `${title}`;
  alert.message = `${message}`;
  alert.buttons = ["OK"];

  document.body.appendChild(alert);
  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log("onDidDismiss resolved with role", role);
}

const ResetInputs = () => {
  product_name.value = "";
  price.value = "";
};

const IsEmpty = (str) => !str.trim().length;

buttonSave.addEventListener("click", () => {
  let newProduct = {
    product_name: product_name.value,
    price: price.value,
  };
  if (IsEmpty(product_name.value) || IsEmpty(price.value) || price <= 0) {
    return ShowAlert("Error", "All inputs are required!");
  }
  ui.newProduct(newProduct);
  ResetInputs();
});

ui.listProduct();
