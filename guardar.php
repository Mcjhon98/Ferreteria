<?php
// guardar.php - Procesamiento básico del formulario

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Aquí procesar los datos
    // Por ejemplo, guardar en base de datos

    $productName = $_POST['productName'] ?? '';
    $tipoProducto = $_POST['tipoProducto'] ?? '';
    // ... otros campos

    // Para archivos
    if (isset($_FILES['productImage'])) {
        // Procesar imagen subida
    }

    // Respuesta
    echo json_encode(['success' => true, 'message' => 'Producto guardado']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>