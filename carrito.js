import Producto from './producto.js';

    
export default class Carrito {

    constructor() {
        this.cantidad = 0;
        this.currency = "€"
        this.productos = [];
    }

    agregarProducto(sku, nombre, precio, cantidad = 1) {
        
        const productoExistente = this.productos.find(prod => prod.sku === sku);

        precio = parseFloat(precio);
        cantidad = parseInt(cantidad, 10);

        if (isNaN(precio) || isNaN(cantidad)) {
            console.error("Error: precio o cantidad no es un número", { precio, cantidad });
            return;
        }

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            this.productos.push({
                sku: sku,
                nombre: nombre,
                precio: parseFloat(precio), 
                cantidad: cantidad
            });
        }
    }

    eliminarProducto(sku) {
        const productoExistente = this.productos.find(prod => prod.sku === sku);

        if (productoExistente) {
            this.productos = this.productos.filter(prod => prod.sku !== sku);
            console.log(`Producto con SKU ${sku} eliminado del carrito.`);
        } else {
            console.log(`Producto con SKU ${sku} no encontrado en el carrito.`);
        }
    }

    actualizarUnidades(sku, unidades) {
        const producto = this.productos.find(prod => prod.sku === sku);
        if (producto) {
            producto.quantity = unidades;
        } else {
            console.log(`Producto con SKU ${sku} no encontrado en el carrito.`);
        }
    }

    // Método para obtener la información de un producto específico
   obtenerInformacionProducto(sku) {
        const producto = this.productos.find(prod => prod.sku === sku);
        if (producto) {
            return {
                sku: producto.sku,
                quantity: producto.quantity
            };
        } else {
            return `Producto con SKU ${sku} no encontrado en el carrito.`;
        }
  } 

    // Método para obtener el resumen del carrito
    obtenerCarrito() {
 
        console.log("Productos en el carrito:", this.productos);

        // Calcular el total de todos los productos en el carrito
        const total = this.productos.reduce((acc, producto) => {
            if (isNaN(producto.precio) || isNaN(producto.cantidad)) {
                console.error("Error: precio o cantidad = NaN", producto);
                return acc;
            }
            return acc + (producto.precio * producto.cantidad);
        }, 0);
        return {
            total: total.toFixed(2), // Total redondeado a dos decimales
            currency: this.currency,
            products: this.productos.map(prod => ({
                sku: prod.sku,
                price: prod.price,
                quantity: prod.quantity,
                subtotal: (prod.price * prod.quantity).toFixed(2)
            }))
        };
    }

    
}



