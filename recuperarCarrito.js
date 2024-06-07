// tengo que traer datos de carrito local storage.
    let carritoStorage = localStorage.getItem("carritoProductos")
    // si se vacia el carrito, devuelve un array vacio, para que la funcion sumar no de error.
    carritoStorage = carritoStorage ? JSON.parse(carritoStorage) : [];
   
    const listaProducto = document.getElementById("listaProductos")
    const mensajeAlerta = document.getElementById("mensajeAlerta")
  


    // funcion renderiza la lista de productos del carrito
    function renderizarListaProductos(cardItem){
      console.log(carritoStorage)
      const tablaProductos = document.createElement("table")
      tablaProductos.className = "tabla-productos";
      tablaProductos.innerHTML =
        `
        <thead>
            <tr class="cabezera">
                <th class="first-th">Codigo</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
        <tfoot class="footer-table">
            <tr>
                <td id="cantProductos"></td>
                <td></td>
                <td></td>
                <td id="totalCompra"></td>
            </tr>
        </tfoot>
        `;
      listaProducto.appendChild(tablaProductos)
      const tableBody = document.getElementById("tableBody");
      cardItem.forEach(productoLista => {
        const itemLista = document.createElement("tr")
        itemLista.innerHTML = `
        <td>${productoLista.codigoProd}</td>
        <td>${productoLista.nombre}</td>
        <td>$ ${productoLista.precio.toLocaleString("es-AR")}</td>
        <td><button class="btn-remove" title="eliminar"><i data-feather="trash-2"></i></button></td>
        `
        tableBody.appendChild(itemLista)
    // Agregar evento click al botón de eliminar
    const btnEliminar = itemLista.querySelector(".btn-remove");
    btnEliminar.addEventListener("click", () => eliminar(productoLista.id, itemLista));
  
  });
  feather.replace();
 
}

// Función para eliminar un producto del carrito
    function eliminar(id , itemLista) {
    // Buscar el índice del producto en el carritoStorage
    const index = carritoStorage.findIndex(producto => producto.id === id);
    if (index !== -1) {
    // Eliminar el producto del array
    carritoStorage.splice(index, 1);
    // Actualizar localStorage enviand
    localStorage.setItem("carritoProductos", JSON.stringify(carritoStorage));
    // llama a la funcion para actualizar el total
    actualizarTotal();
}
    itemLista.remove();  
  }

const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  localStorage.clear() 
  MensajeSinProductos()
  totalCompra.innerHTML = "&nbsp;"
}

// funcion para sumar el total de los productos del carrito 
renderizarListaProductos(carritoStorage);

// muestra un mensaje cuando el carrito esta vacio, porque se borraron o se vacio con el boton vaciar.
 function MensajeSinProductos() {
  const mensajeSinProductos = document.createElement("p")
  mensajeSinProductos.innerHTML= `<i data-feather="alert-circle"></i>Carrito vacio, vuelve a la pagina de productos para agregar.`
  mensajeSinProductos.classList.add("mensaje-warning")
  tableBody.appendChild(mensajeSinProductos)
  feather.replace();
 }

// suma el total con la funcion reduce
 function sumarTotal() {
  if (carritoStorage.length > 0) {
      let total = carritoStorage.reduce((acc, producto) => acc + producto.precio, 0);
      return total;
  }
  return 0;
}

// funcion para actualizar el total de la compra 
function actualizarTotal() {
 
  const total = sumarTotal();
  totalCompra.textContent = `Total: $ ${total.toLocaleString("es-AR")}`;
}

actualizarTotal();