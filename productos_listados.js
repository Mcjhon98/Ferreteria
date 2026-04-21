let currentEditIndex = -1;

    // Función para cargar productos desde localStorage
    function loadProducts() {
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Si no hay productos, agregar ejemplos
        if (products.length === 0) {
            products = [
                {
                    productName: 'Llave termostática LT-001',
                    codigoBarras: 'LT-001',
                    productImage: 'https://serveiestacio.com/blog/wp-content/uploads/2023/03/imatge-4-5-600x400.jpg',
                    stockDisponible: '5.00',
                    precioVenta: '253.00',
                    moneda: 'UYU'
                },
                {
                    productName: 'Tubo PVC Ø25mm - 3 metros',
                    codigoBarras: 'PVC-025-3M',
                    productImage: 'https://via.placeholder.com/300x200?text=Tubo+PVC',
                    stockDisponible: '15.00',
                    precioVenta: '85.50',
                    moneda: 'UYU'
                },
                {
                    productName: 'Martillo Acero SK-500g',
                    codigoBarras: 'MART-500',
                    productImage: 'https://via.placeholder.com/300x200?text=Martillo',
                    stockDisponible: '8.00',
                    precioVenta: '120.00',
                    moneda: 'UYU'
                },
                {
                    productName: 'Destornillador Set 6 piezas',
                    codigoBarras: 'DEST-SET-6',
                    productImage: 'https://via.placeholder.com/300x200?text=Destornillador',
                    stockDisponible: '12.00',
                    precioVenta: '45.75',
                    moneda: 'UYU'
                },
                {
                    productName: 'Cable Eléctrico 100m Negro',
                    codigoBarras: 'CABLE-100-BK',
                    productImage: 'https://via.placeholder.com/300x200?text=Cable',
                    stockDisponible: '20.00',
                    precioVenta: '380.00',
                    moneda: 'UYU'
                }
            ];
        }

        const container = document.getElementById('productsContainer');
        container.innerHTML = '';

        products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.index = index; // Para identificar el producto

            card.innerHTML = `
                <img src="${product.productImage || 'https://via.placeholder.com/300x200'}" alt="${product.productName}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${product.productName}</div>
                    <div class="product-ref">Ref: ${product.codigoBarras || 'N/A'}</div>
                    <div class="product-details">
                        <div class="product-stock">Stock: ${product.stockDisponible || 0} unidades</div>
                        <div class="product-price">$${product.precioVenta || '0.00'} ${product.moneda || 'UYU'}</div>
                    </div>
                </div>
            `;

            // Agregar event listener para clic
            card.addEventListener('click', () => {
                window.location.href = `editar_producto.php?index=${index}`;
            });

            container.appendChild(card);
        });
    }

    // Cargar productos al cargar la página
    loadProducts();