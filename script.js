import Carrito from "./carrito.js";
import Producto from "./producto.js";

let productos = [];
let divisa;

const carrito = new Carrito;

document.addEventListener('DOMContentLoaded', function (event) {

    //se obtiene el elemento de la tabla en el DOM 
    const tablaProductos = document.getElementById("tablaProductos");
    
    // a la funcion cargar se le pasa el array de objetos recogido en el fetch
    function cargarTabla(productos) {

        productos.forEach((producto, index) => {


            //TEST: El objeto es recogido correctamente, todos las partes aparecen bien.
            //console.log(producto.title, producto.SKU, producto.price);

            //Primer elemento con contenido del array va en la misma celda de la tabla SKU y Title
            const SKU = producto.SKU;
            const title = producto.title;
            const precio = producto.price;

            let productoColumna = document.createElement('td');
            productoColumna.innerHTML = `<h2 id="title">${title}</h2> <br> <p>Ref: ${SKU} </p> `;

            
            const cantidadColumna = document.createElement('td');
            

            // Se crean los elementos de boton e input
            const miDiv = document.createElement('div');
            const masButton = document.createElement('button');
            const input = document.createElement('input');
            const miButton2 = document.createElement('button');

            masButton.textContent = "+";
            input.type = "number";
            input.textContent = "0";
            input.value = "0";
            input.classList.add("inputCantidad");
            miButton2.textContent = "-";

            miDiv.append(miButton2,input,masButton);
            cantidadColumna.appendChild(miDiv);

            const totalPorUnidad = document.createElement('td');
            totalPorUnidad.textContent = "0.00€"


            const cestaTotal = document.getElementById("cestaTotal");
            const miDiv2 = document.createElement('div');
            const uni = document.createElement('p');
            const nombreItem = document.createElement('h2');
            const referencia = document.createElement('p');

            miDiv2.append(nombreItem,referencia,uni);
            
            


            masButton.addEventListener('click', function (event) {
                sumarEnDom();

                carrito.agregarProducto(SKU,title,precio,1);
                
                carrito.productos.forEach((element, index) =>{
                    cestaTotal.appendChild(miDiv2);

                    referencia.innerHTML = SKU;
                    uni.innerHTML = element.cantidad;
                    nombreItem.innerHTML = title;
                    actualizarTotalCarrito();   

                });

                carrito.obtenerCarrito(carrito.productos);
                
                
            });

            miButton2.addEventListener('click', function(event){
                restarEnDom();
                
                carrito.productos.forEach((element) => {
                    if (parseInt(input.value) <= 0) {
                        carrito.eliminarProducto(SKU);
                        cestaTotal.removeChild(miDiv2);
                        actualizarTotalCarrito();
                    }


                });
                carrito.obtenerCarrito(carrito.productos);
            })


            const price = document.createElement('td');
            price.innerText = producto.price + divisa;


            const tr = document.createElement('tr');
            tr.append(productoColumna, cantidadColumna, price, totalPorUnidad);
            tablaProductos.append(tr);
        
        

        function sumarEnDom(){
            let cantidadTotal;
            input.value = parseInt(input.value) + 1;
            cantidadTotal = parseFloat(input.value * producto.price).toFixed(2);
            totalPorUnidad.textContent = cantidadTotal + divisa;

        }

        function restarEnDom(){
            if(parseInt(input.value) > 0){
                let cantidadTotal;
                input.value = parseInt(input.value) - 1;
                cantidadTotal = parseFloat(input.value * producto.price).toFixed(2);
                totalPorUnidad.textContent = cantidadTotal + divisa;
                }
            
        }

        });


    
       

    } 

    //Problema: la consola en el browser me empezo a dar este error
    // 127.0.0.1/:1 Access to fetch at 'http://jsonblob.com/api/1301456413690552320' from origin 'http://127.0.0.1:5501' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' 
    // header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    // Solucion encontrada en stackoverflow: instalacion de el pluding Moesif Origin/CORS Changer & API Logger

    fetch('http://jsonblob.com/api/1301456413690552320').then(function (response){

        // Response es el objeto de respuesta de la peticion API
        return response.json();
        console.log(response)
    }).then (function(prods){

        // TEST: Prods devuelve un objeto JSON / Otener el array de objetos "products"
       // console.log(prods.currency);
       // console.log(prods.products);

        // A la variable array "productos" se le pasa el contenido JSON products
        productos = prods.products;
        divisa = prods.currency;

        //Se acciona la funcion cargar tabla con la variable de array productos
        cargarTabla(productos);


    }).catch(function(err){
        console.log(err)
    });

    const totalCarritoElement = document.getElementById('totalCarrito');

    
    function actualizarTotalCarrito() {
        const resumen = carrito.obtenerCarrito();
        const totalCarritoElement = document.getElementById('totalCarrito');
        totalCarritoElement.textContent = `${resumen.total} ${resumen.currency}`;
    }
    

    
}); 
