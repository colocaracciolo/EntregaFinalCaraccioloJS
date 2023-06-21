let carrito = [];
let datosCliente = 
                    {
                    nombre: "",
                    apellido: "",
                    correoElectronico:"",
                    calle:"",
                    numeroCalle: "",
                    provincia:"",
                    ciudad:"",
                    barrio:"",
                    codigoPostal:"",
                    nombreTarjeta:"" ,
                    numeroTarjeta:"",
                    codigoSeguridad:"",
                    fechaVencimiento:""
                    }
const dolarPeso= 428;

// Verificar si el carrit está almacenado en localStorage y cargarlo
if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
}

// Verifico si los datos del client están almacenado en localStorage y cargarlo
if (localStorage.getItem('datosCliente')) {
  datosCliente = JSON.parse(localStorage.getItem('datosCliente'));
}

// Mostrar los productos
const contenedorProductos = document.querySelector(".grid-item1")
const mostrarTarjetas = async () =>
{
    const resp = await fetch("./datos.JSON")
    const data = await resp.json()
    //let baseDeProductos [] = data;
    data.forEach( (prod) => {
        const tarjeta = document.createElement('article')
        tarjeta.classList.add("card", "col-md-12", "col-lg-3")
        tarjeta.innerHTML=`
          <img class="card-img-top" src="${prod.imagen}" alt="img">
          <div class="card-body"> 
            <h4 class="card-title">${prod.nombre}</h4>
            <h5 class="cart-title">Precio USD ${prod.precio} </h5>
            <p class="cart-title">Material: ${prod.material} </p>
            <p class="card-text">Color: ${prod.color}</p>
            <p class="card-text">Peso: ${prod.peso} gramos </p>
            <button id='${prod.id}' class="botonComprar button"> Agregar al carrito </button>
          </div> 
            `
        contenedorProductos.appendChild(tarjeta)
    })
    const btnComprar = document.querySelectorAll(".botonComprar");
    btnComprar.forEach(el => {
        el.addEventListener('click', agregarAlCarrito)
    })
}

mostrarTarjetas()
console.log(carrito)

// Agregar un producto al carrito
function agregarAlCarrito(event) {
  const productos = async () =>
  {
      const resp = await fetch("./datos.JSON")
      const data = await resp.json()
      
  }

  const id = event.target.id;
  const prodBuscado = productos.find(prod => prod.id === id);

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    color: '#023047',
    title: 'Agregado al carrito'
  })

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    prodBuscado.cantidad = 1;
    carrito.push(prodBuscado);
  }

  mostrarCarrito();
  guardarCarritoLocalStorage();
}

// Mostrar el carrito
const contenedorCarrito = document.querySelector(".grid-item2");
const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = '';
  carrito.forEach(productoCarrito => {
    const muestraCarrito = document.createElement('article');
    muestraCarrito.classList.add("card", "col-md-12", "col-lg-11");
    muestraCarrito.innerHTML = `
      <img class="card-img-top" src="${productoCarrito.imagen}" alt="img">
      <div class="card-body"> 
        <h4 class="card-title">${productoCarrito.nombre}</h4>
        <h5 class="cart-title">USD ${productoCarrito.precio}</h5>
        <p>Cantidad: ${productoCarrito.cantidad}</p>
        <button id='${productoCarrito.id}' class="botonQuitar button">Quitar</button>
      
      </div>`;
    contenedorCarrito.appendChild(muestraCarrito);
  });

  const btnQuitar = document.querySelectorAll(".botonQuitar");
  btnQuitar.forEach(el => {
    el.addEventListener('click', quitarProducto);
  });

  // Calcular el total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const totalElement = document.createElement('p');
  totalElement.classList.add("total")
  //botón de compra final
  const btnCompraFinal = document.createElement('button')
  btnCompraFinal.addEventListener('click', (e)=>{
    e.preventDefault();
    funcionDatosCompra(total);
  })
  totalElement.textContent = `Total: $ ${total*dolarPeso}`;
  contenedorCarrito.appendChild(totalElement)
  btnCompraFinal.textContent = `Comprar`;
  btnCompraFinal.classList.add("button")
  contenedorCarrito.appendChild(btnCompraFinal) 
};

const formulario = document.querySelector(".datosCompra")

function funcionDatosCompra (total){

  formulario.innerHTML = '';
  const datosCompraFinal = document.createElement('article');
    datosCompraFinal.classList.add("accordion");
    datosCompraFinal.innerHTML = `
    
                          <div class="accordion acordion">

                            <div class="accordion-item">

                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                DATOS DE CONTACTO
                                </button>
                            </h2>

                            <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div class="accordion-body">

                                    <nav class="navbar bg-body-tertiary">
                                    <div class="container-fluid">
                                        <form class="" role="search">
                                            <h6>Nombre</h6>
                                            <input id="inputNombre" class="form-control me-2" type="text" placeholder="Nombre" aria-label="Search">
                                            <h6>Apellido </h6>
                                            <input id="inputApellido" class="form-control me-2" type="text" placeholder="Apellido" aria-label="Search">
                                            <h6> Correo electrónico </h6>
                                            <input id="inputCorreoElectronico" class="form-control me-2" type="text" placeholder="correo@electronico.com" aria-label="Search">
                                        </form>
                                    </div>
                                    </nav>

                                </div>
                            </div>
                            </div>


                            <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                DATOS DE ENVIO
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                
                                <h6> Provincia </h6>
                                <input id="inputProvincia" class="form-control me-2" type="text" placeholder="Provincia" aria-label="Search">
                                <h6> Ciudad </h6>
                                <input id="inputCiudad" class="form-control me-2" type="text" placeholder="Ciudad" aria-label="Search">
                                <h6> Barrio </h6>
                                <input id="inputBarrio" class="form-control me-2" type="text" placeholder="Barrio" aria-label="Search">
                                <h6> Dirección </h6>
                                <input id="inputCalle" class="form-control me-2" type="text" placeholder="Calle" aria-label="Search">
                                <h6> Número </h6>
                                <input id="inputNumeroDireccion" class="form-control me-2" type="text" placeholder="Número de calle" aria-label="Search">
                                <h6> Código postal </h6>
                                <input id="inputCodigoPostal" class="form-control me-2" type="text" placeholder="Código postal" aria-label="Search">
                                
                                </div>
                            </div>
                            </div>


                            <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                DATOS DE PAGO
                                </button>
                            </h2>

                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                <h6> Nombre y apellido que figura en la tarjeta </h6>
                                <input id="inputNombreTarjeta" class="form-control me-2" type="text" placeholder="Nombre y apellido" aria-label="Search">
                                <h6> Número de la tarjeta </h6>
                                <input id="inputNumeroTarjeta" class="form-control me-2" type="text" placeholder="0000-0000-0000-0000" aria-label="Search">
                                <h6> Código de seguridad que figura en el dorso </h6>
                                <input id="inputCodigoTarjeta" class="form-control me-2" type="text" placeholder="123" aria-label="Search">
                                <h6> Fecha de expiración</h6>
                                <input id="inputFechaTarjeta" class="form-control me-2" type="text" placeholder="00/00" aria-label="Search">
                                
                                </div>
                                <input id="botonEnviar" type="submit" class="finalCompra button"> </input>

                            </div>
                            </div>
                            </div>
                           `
      formulario.appendChild(datosCompraFinal);
      const botonEnviar = document.getElementById('botonEnviar')
      botonEnviar.addEventListener('click', function(e) {
        e.preventDefault();
        datosCliente.nombre = document.getElementById('inputNombre').value
        datosCliente.apellido = document.getElementById('inputApellido').value
        datosCliente.correoElectronico = document.getElementById('inputCorreoElectronico').value
        datosCliente.provincia = document.getElementById('inputProvincia').value
        datosCliente.ciudad = document.getElementById('inputCiudad').value
        datosCliente.barrio = document.getElementById('inputBarrio').value
        datosCliente.calle = document.getElementById('inputCalle').value
        datosCliente.numeroCalle = document.getElementById('inputNumeroDireccion').value
        datosCliente.codigoPostal = document.getElementById('inputCodigoPostal').value
        datosCliente.nombreTarjeta = document.getElementById('inputNombreTarjeta').value
        datosCliente.numeroTarjeta = document.getElementById('inputNumeroTarjeta').value
        datosCliente.codigoSeguridad = document.getElementById('inputCodigoTarjeta').value
        datosCliente.fechaVencimiento = document.getElementById('inputFechaTarjeta').value
        guardarDatosLocalStorage()
      Swal.fire({
    title: '¡Felicitaciones!',
    text: 'Tu pedido está en camino',
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Bicimundo',
})
     
      })
}


const btnComprar = document.querySelectorAll(".botonComprar");
  btnComprar.forEach(el => {
    el.addEventListener('click', agregarAlCarrito);
  });



// Quitar un producto del carrito
function quitarProducto(event) {
  const id = event.target.id;
  const indice = carrito.findIndex(item => item.id === id);
  if (indice !== -1) {
    const producto = carrito[indice];
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      carrito.splice(indice, 1);
    }
  }

  mostrarCarrito();
  guardarCarritoLocalStorage();
}

// Guardar el carrito en localStorage
function guardarCarritoLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Guardar datos del cliente en en localStorage
function guardarDatosLocalStorage() {
  localStorage.setItem('datosCliente', JSON.stringify(datosCliente));
} 