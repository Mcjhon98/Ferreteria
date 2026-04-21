<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Producto - Electro Uruguay</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .edit-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .back-link {
            color: #6c63ff;
            text-decoration: none;
            font-weight: bold;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .status-message {
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 15px;
            display: none;
        }

        .status-message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }

        .status-message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }

        .delete-btn {
            background-color: #dc3545;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }

        .delete-btn:hover {
            background-color: #c82333;
        }

        .form-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="edit-header">
        <h1 style="flex: 1; margin-bottom: 0;">Editar Producto</h1>
        <a href="Productos_Listados.php" class="back-link">← Volver a productos</a>
    </div>

    <div id="statusMessage" class="status-message"></div>

    <form id="editProductForm">
        <div class="product-header">
            <input type="text" id="productName" name="productName" placeholder="Nombre del producto" required>
            <div class="o_field_image_container">
                <div class="o_field_image">
                    <div class="image-overlay">
                        <button type="button" class="edit-btn" title="Editar">➕</button>
                        <input type="file" class="file-input" accept="image/*" id="productImageInput">
                    </div>
                    <img id="productImagePreview" src="dibujo-de-icono-caricatura-caja-concepto-producto-o-maquinaria-listo-para-ser-entregado-al-cliente-simple-157425701.webp" alt="Imagen producto">
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <div class="tab active" data-tab="general">Información general</div>
            <div class="tab" data-tab="inventario">Inventario</div>
        </div>

        <!-- Información general -->
        <div id="general" class="tab-content active">
            <div class="form-grid">
                <div>
                    <label>Código de barras</label>
                    <input type="text" id="codigoBarras" name="codigoBarras" placeholder="Ej. 123456789">

                    <label>Moneda</label>
                    <select id="moneda" name="moneda">
                        <option value="UYU">UYU</option>
                        <option value="USD">USD</option>
                    </select>
                </div>

                <div style="margin-top: 23px;">
                    <label>Precio de venta</label>
                    <input type="number" id="precioVenta" name="precioVenta" placeholder="0.00" step="0.01" required>

                    <label>Costo</label>
                    <input type="number" id="costo" name="costo" placeholder="0.00" step="0.01">
                </div>
            </div>
        </div>

        <!-- Inventario -->
        <div id="inventario" class="tab-content">
            <div class="form-grid">
                <div>
                    <label>Stock disponible</label>
                    <input type="number" id="stockDisponible" name="stockDisponible" placeholder="0.00" step="0.01" required>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="submit" id="saveBtn">Guardar cambios</button>
            <button type="button" id="deleteBtn" class="delete-btn">Eliminar producto</button>
            <button type="button" id="cancelBtn">Cancelar</button>
        </div>
    </form>
</div>

<script>
    let productIndex = -1;
    let originalImageUrl = '';

    // Obtener el índice del producto desde la URL
    function getProductIndexFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const indexParam = urlParams.get('index');

        if (indexParam === null || indexParam === undefined || indexParam === '') {
            return -1;
        }

        const index = parseInt(indexParam, 10);
        return isNaN(index) ? -1 : index

        if (indexParam === null || indexParam === undefined || indexParam === '') {
            return -1;
        }

        const index = parseInt(indexParam, 10);
        return isNaN(index) ? -1 : index;
    }

    // Cargar datos del producto
    function loadProduct() {
        productIndex = getProductIndexFromURL();

        if (productIndex === -1) {
            showMessage('No se especificó un producto para editar', 'error');
            document.getElementById('editProductForm').style.display = 'none';
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (productIndex < 0 || productIndex >= products.length) {
            showMessage('El producto no existe', 'error');
            document.getElementById('editProductForm').style.display = 'none';
            return;
        }

        const product = products[productIndex];

        // Llenar formulario con datos del producto
        document.getElementById('productName').value = product.productName || '';
        document.getElementById('codigoBarras').value = product.codigoBarras || '';
        document.getElementById('precioVenta').value = product.precioVenta || '0.00';
        document.getElementById('costo').value = product.costo || '0.00';
        document.getElementById('stockDisponible').value = product.stockDisponible || '0.00';
        document.getElementById('moneda').value = product.moneda || 'UYU';

        // Cargar imagen
        if (product.productImage) {
            document.getElementById('productImagePreview').src = product.productImage;
            originalImageUrl = product.productImage;
        }
    }

    // Mostrar mensaje de estado
    function showMessage(message, type) {
        const messageDiv = document.getElementById('statusMessage');
        messageDiv.textContent = message;
        messageDiv.className = `status-message ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }
    }

    // Manejar cambio de imagen
    document.getElementById('productImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('productImagePreview').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Botón de editar imagen
    document.querySelector('.edit-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('productImageInput').click();
    });

    // Manejar tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Guardar cambios
    document.getElementById('editProductForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (productIndex < 0 || productIndex >= products.length) {
            showMessage('El producto no existe', 'error');
            return;
        }

        const imagePreview = document.getElementById('productImagePreview').src;

        products[productIndex] = {
            productName: document.getElementById('productName').value,
            codigoBarras: document.getElementById('codigoBarras').value,
            precioVenta: document.getElementById('precioVenta').value,
            costo: document.getElementById('costo').value,
            stockDisponible: document.getElementById('stockDisponible').value,
            moneda: document.getElementById('moneda').value,
            productImage: imagePreview
        };

        localStorage.setItem('products', JSON.stringify(products));
        showMessage('Producto actualizado correctamente', 'success');

        setTimeout(() => {
            window.location.href = 'Productos_Listados.php';
        }, 2000);
    });

    // Eliminar producto
    document.getElementById('deleteBtn').addEventListener('click', function() {
        if (confirm('¿Está seguro de que desea eliminar este producto?')) {
            const products = JSON.parse(localStorage.getItem('products')) || [];

            if (productIndex >= 0 && productIndex < products.length) {
                products.splice(productIndex, 1);
                localStorage.setItem('products', JSON.stringify(products));
                showMessage('Producto eliminado correctamente', 'success');

                setTimeout(() => {
                    window.location.href = 'Productos_Listados.php';
                }, 2000);
            }
        }
    });

    // Cancelar
    document.getElementById('cancelBtn').addEventListener('click', function() {
        window.location.href = 'Productos_Listados.php';
    });

    // Cargar producto al abrir la página
    loadProduct();
</script>

</body>
</html>
