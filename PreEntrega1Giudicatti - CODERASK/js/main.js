/*                                          VARIABLES Y FUNCIONES NECESARIAS. OBJETOS, CONSTRUCTORES, CLASES, METODOS. ARRAYS DE OBJETOS */
const precioipa = 300;
const precioirishostout = 275;
const preciogolden = 250;
let stockipa = 150;
let stockirish = 150;
let stockstout = 150;
let stockgolden = 150;
let total = 0;
let cantidadtotal = 0;
let cantidad;
let estilo;

class Cerveza {
  constructor(estilo, precio, cantidad, stock) {
    this.estilo = estilo;
    this.precio = parseFloat(precio);
    this.cantidad = parseFloat(cantidad);
    this.subtotal = this.precio * this.cantidad;
    this.stock = stock;
  }
  agregaritem(cantidadaagregar) {
    this.cantidad = this.cantidad + cantidadaagregar;
    this.subtotal = this.precio * this.cantidad;
    this.stock = this.stock - cantidadaagregar;
  }
  eliminaritem(cantidadaeliminar) {
    this.cantidad = this.cantidad - cantidadaeliminar;
    this.subtotal = this.precio * this.cantidad;
    this.stock = this.stock + cantidadaeliminar;
  }
}

const IPACART = new Cerveza("IPA", precioipa, 0, stockipa);
const IRISHCART = new Cerveza("IRISH", precioirishostout, 0, stockirish);
const STOUTCART = new Cerveza("STOUT", precioirishostout, 0, stockstout);
const GOLDENCART = new Cerveza("GOLDEN", preciogolden, 0, stockgolden);

let carrito = [IPACART, IRISHCART, STOUTCART, GOLDENCART];

function calculartotales() {
  total =
    IPACART.subtotal +
    IRISHCART.subtotal +
    GOLDENCART.subtotal +
    STOUTCART.subtotal;
  cantidadtotal =
    IPACART.cantidad +
    IRISHCART.cantidad +
    STOUTCART.cantidad +
    GOLDENCART.cantidad;
}

function agregadora(CARRO) {
  let agregar = document.querySelector("#agregar" + CARRO.estilo);
  agregar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      (parseInt(e.target.children["cantidad"].value) <= CARRO.stock) &
      (parseInt(e.target.children["cantidad"].value) > 0)
    ) {
      CARRO.agregaritem(parseInt(e.target.children["cantidad"].value));
      calculartotales();
      verCarrito(CARRO);
    } else if (e.target.children["cantidad"].value <= 0) {
      alert("Ingrese un número válido mayor a cero.");
    } else {
      alert("No hay stock suficiente. Stock disponible" + " " + CARRO.stock);
    }
    agregar.reset();
  });
}

function eliminadora(CARRO) {
  const eliminar = document.querySelector("#eliminar" + CARRO.estilo);
  eliminar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      (parseInt(e.target.children["cantidad"].value) <= CARRO.cantidad) &
      (parseInt(e.target.children["cantidad"].value) > 0)
    ) {
      CARRO.eliminaritem(parseInt(e.target.children["cantidad"].value));
      carrito.push(CARRO);
    } else if (e.target.children["cantidad"].value <= 0) {
      alert("Ingrese un número válido mayor a cero.");
    } else {
      alert(
        "No hay suficientes latas que eliminar. Disponible" +
          " " +
          CARRO.cantidad
      );
    }
  });
}

const verCarrito = ({ estilo, precio, cantidad }) => {
  let indexorder = document.querySelector("#carritoindex");
  indexorder.innerHTML = `<h2> Tu carrito de compras </h2>`;
  let endorder = document.querySelector("#totalcarrito");
  endorder.innerHTML =
    `<h2> El total de tu compra es ` +
    total +
    ` y te llevas ` +
    cantidadtotal +
    ` latas </h2>
    <button type="submit" class="modify color--state-ok pagar"> Ir a pagar </button> `;
  let container = document.getElementById("carros");
  let carrito = document.getElementById(`carrito${estilo}`);
  carrito.className = "carrito";
  carrito.innerHTML = `
        <img src="../imgs/${estilo}.webp.png" class="carritoimg" />
        <h3>${estilo}</h3>
        <h4>$${precio}/lata</h4>
        <h4>${cantidad} unidades</h4>
        <h4>Subt. $${cantidad * precio} </h4>
        <form class="downform" id="eliminar${estilo}">
        <input
          class="cantidad eliminar${estilo}"
          type="number"
          name= "cantidad"
          placeholder="Ingresa la cantidad a eliminar"
        />
        <button class="color--state-bad eliminar${estilo}"
        type="submit">Eliminar items</button>
        </form>
      </div>`;
};

/*                                           RUNNER                                        */

agregadora(IRISHCART);
agregadora(IPACART);
agregadora(GOLDENCART);
agregadora(STOUTCART);
eliminadora(IPACART);
eliminadora(IRISHCART);
eliminadora(STOUTCART);
eliminadora(GOLDENCART);
