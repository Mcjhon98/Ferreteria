<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Producto - Odoo Mock</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <form id="productForm" method="POST" action="guardar.php">
        <h1>Productos - Electro Uruguay</h1>
        <div style="text-align: center; margin-bottom: 20px;">
            <a href="Productos_Listados.php" style="color: #6c63ff; text-decoration: none; font-weight: bold;">Ver Productos Listados</a>
        </div>

        <div class="product-header">
            <input type="text" id="productName" name="productName" placeholder="Nombre del producto">
            <div class="o_field_image_container">
                <div class="o_field_image">
                    <div class="image-overlay">
                        <button type="button" class="edit-btn" title="Editar">➕</button>
                        <input type="file" class="file-input" accept="image/*" name="productImage">
                    </div>
                    <img src="dibujo-de-icono-caricatura-caja-concepto-producto-o-maquinaria-listo-para-ser-entregado-al-cliente-simple-157425701.webp" alt="Imagen producto">
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <div class="tab active" data-tab="general">Información general</div>
            <div class="tab" data-tab="compra">Compra</div>
        </div>

        <!-- Información general -->
        <div id="general" class="tab-content active">
            <div class="form-grid">
                <div>
                    <label>Tipo de producto</label>
                    <div class="checkbox-group">
                        <label><input type="radio" name="tipoProducto" value="Bienes"> Bienes</label>
                        <label><input type="radio" name="tipoProducto" value="Servicio"> Servicio</label>
                        <label><input type="radio" name="tipoProducto" value="Combo"> Combo</label>
                    </div>

                    <label>Referencia</label>
                    <input type="text" name="referenciaProducto" placeholder="Introduce el código del producto">

                    <label>Código de barras</label>
                    <input type="text" name="codigoBarras" placeholder="Ej. 123456789">

                    <label>¿Tiene descuento?</label>
                    <select name="tieneDescuento" id="tieneDescuento">
                        <option value="no">No</option>
                        <option value="si">Sí</option>
                    </select>

                    <label id="descuentoLabel" style="display: none;">Porcentaje de descuento</label>
                    <input type="number" name="porcentajeDescuento" id="porcentajeDescuento" placeholder="Ej. 10" style="display: none;" min="0" max="100">
                </div>

                <div style="margin-top: 23px;">
                    <label>Precio de venta</label>
                    <input type="number" name="precioVenta" value="1.00">

                    <label>Impuesto de ventas</label>
                    <select name="impuestoVentas">
                        <option value="22%">22%</option>
                        <option value="0%">0%</option>
                    </select>

                    <label>Costo</label>
                    <input type="number" name="costo" value="0.00">

                    <label>Impuestos de compra</label>
                    <select name="impuestoCompra">
                        <option value="22%">22%</option>
                        <option value="0%">0%</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Compra -->
        <div id="compra" class="tab-content">
            <div class="section">
                <h3>Proveedor</h3>
                <table class="table" id="proveedoresTable">
                    <tr>
                        <th>Proveedor</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Moneda</th>
                        <th>Acción</th>
                    </tr>
                    <tr>
                        <td>
                            <select name="proveedor[]" id="proveedor" style="width: 120px;">
                                <option value="uruimporta">UruImporta</option>
                                <option value="sudel">Sudel</option>
                                <option value="galaxia">Galaxia</option>
                                <option value="otro"></option>
                            </select>
                            <input type="text" name="proveedorOtro[]" id="proveedorOtro" placeholder="Buscar o Agregar otro" style="display: none; width: 150px; margin-top: 5px;" readonly>
                        </td>
                        <td><input type="number" name="cantidad[]" placeholder="0.00" style="width: 80px;"></td>
                        <td><input type="number" name="precio[]" placeholder="0.00" style="width: 80px;"></td>
                        <td>
                            <select name="moneda[]" style="width: 75px;">
                                <option value="UYU">UYU</option>
                                <option value="USD">USD</option>
                            </select>
                        </td>
                        <td><button type="button" class="remove-btn" style="display: none;">Eliminar</button></td>
                    </tr>
                </table>
                <button type="button" id="addProveedorBtn" class="add-btn">Agregar importe</button>
            </div>
        </div>

        <div class="form-actions">
            <button type="button" id="saveBtn">Guardar producto</button>
        </div>
    </form>
</div>

<!-- Modal para agregar proveedor -->
<div id="proveedorModal" class="modal">
    <div class="modal-content">
        <!-- El contenido se generará dinámicamente con JavaScript -->
    </div>
</div>

<script src="script.js"></script>

</body>
</html>
