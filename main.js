
// creo el html del buscador
const buscador = document.getElementById("buscador")
const inputBuscar = document.createElement("input")
inputBuscar.type = "search"
inputBuscar.placeholder = "Ingresa nombre de producto"
inputBuscar.id = "inputBuscar"
buscador.append(inputBuscar)

let carritoProductos;
let carritoProductosLS = localStorage.getItem("carritoProductos")
    if(carritoProductosLS){
        carritoProductos = JSON.parse(carritoProductosLS)
        console.log(carritoProductos.length)  
    } else {
        carritoProductos = [];
}

let productos = [];
const botonCarrito = document.getElementById("botonCarrito")
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")

async function fetchProducts() {
        try  {
            const response = await fetch("productos.json")
            const data = await response.json()
            productos = data;
            if(productos.length > 0) {   
                    renderProducts(productos)
                    actualizarEstadoCarrito()    
            } else {
                alert("No hay productos que mostrar")
            }
        }catch(error) {
                console.log(error)
        }
    }

// funcion hace que se muestre en 0 en el icono cuando no hay productos seleccionados
function carritoSinProductos() {
    if(carritoProductos.length === 0 ){
        console.log("carrito vacio")
        botonCarrito.innerHTML = "<span class='text-carrito-icon'>" + carritoProductos.length +  "</span>"   
    } else {
        actualizarEstadoCarrito()
    }
}

// funcion actualiza el numero de productos que se muestra en el icono del carrito
function actualizarEstadoCarrito() {
    if(carritoProductos.length > 0) {
        botonCarrito.innerHTML = "<span class='text-carrito-icon'>" + carritoProductos.length + "</span>"; 
    } else {
        botonCarrito.innerHTML = "<span class='text-carrito-icon'>0</span>"
    }
}

// funcion para renderizar cards de productos
function renderProducts(productos) {

        const contenedor = document.getElementById("contenedor")

        contenedor.innerHTML = ""
        productos.forEach( product=> {     
        const card = document.createElement("div")
        card.classList.add("col")
       
        card.innerHTML = 
        `
        <div class="card"> 
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <img class="image-Product" src=${product.imagen} class="card-img-top"/>
                </div>
                <h4 class="text-center">$${product.precio.toLocaleString("es-AR")}</h5>
                <p class="card-title text-center"> ${product.nombre} </p>
                
                <div class="d-flex justify-content-center">
                    <button class="btn-add-product btn-custom" id="${product.id}">Añadir al carrito</button>
                </div>
            </div>
        </div>
        `
        contenedor.appendChild(card)
    });
    addProductCart();
}

/* buscador * */
inputBuscar.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputBuscar.value.trim() !== "") {
        const valorBusqueda = inputBuscar.value.trim().toUpperCase();
        const resultado = productos.filter((producto) => producto.nombre.toUpperCase().includes(valorBusqueda));


        if(resultado.length > 0) {
            renderProducts(resultado)
            console.table(resultado)
           
        } else {
            console.log("no hay coincidencia")
            mostrarModal()
        }

        }
        else {
            renderProducts(productos)
        }
})

// probando 
function mostrarModal() {
    Swal.fire({
        title: 'No hay resultados',
        text: 'No hay coincidencias en tu busqueda',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })
}

// agregar producto al carrito / verifica el id y pushea al carrito y lo manda al localstorage
function addProductCart() {
        const botonComprar = document.querySelectorAll(".btn-add-product")
        botonComprar.forEach(button => {
        button.onclick = (e) => {
            // tengo que guardar el id
            const productId = e.currentTarget.id
            const selectProduct = productos.find(product => product.id == productId )
            carritoProductos.push(selectProduct)
            actualizarEstadoCarrito()
            localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos)) 
            }
        })
    }

// funcion para ir a la pagina de la lista de compras del carrito

function detalleCarrito() {
    botonCarrito.addEventListener("click", ()=> {
        event.preventDefault();
        if(carritoProductos.length > 0){
            location.href="carrito.html"
        } else {
            Swal.fire({
                icon: "error",
                title: "Debes agregar productos al carrito",
                text: "Debes agregar productos al carrito!",
              });
        }
    })
}

detalleCarrito()
fetchProducts()
