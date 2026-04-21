<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Productos Listados - Electro Uruguay</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .products-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
        }

        .product-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: transform 0.3s ease;
        }

        .product-card:hover {
            transform: translateY(-5px);
        }

        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .product-info {
            padding: 15px;
            text-align: left;
        }

        .product-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #003262;
            text-align: left;
        }

        .product-ref {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-align: left;
        }

        .product-details {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
        }

        .product-stock {
            font-size: 14px;
            color: #444;
            text-align: left;
        }

        .product-price {
            font-size: 16px;
            font-weight: bold;
            color: #13315c;
            text-align: left;
            margin-top: 10px;
        }

        .no-products {
            text-align: center;
            padding: 50px;
            color: #666;
            font-size: 18px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }

        .modal-content {
            background-color: white;
            margin: 10% auto;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .modal-content h2 {
            margin-bottom: 20px;
            color: #003262;
        }

        .modal-content label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .modal-content input, .modal-content select {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .modal-buttons {
            display: flex;
            justify-content: space-between;
        }

        .modal-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .save-btn {
            background: #13315c;
            color: white;
        }

        .cancel-btn {
            background: #ccc;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Productos Listados</h1>
    <div style="text-align: center; margin-bottom: 20px;">
        <a href="index.php" style="color: #13315c; text-decoration: none; font-weight: bold;">← Volver al formulario de productos</a>
    </div>

    <div id="productsContainer" class="products-container">
        <!-- Las tarjetas de productos se cargarán aquí -->
    </div>
</div>

<script src="productos_listados.js"></script>

</body>
</html>
