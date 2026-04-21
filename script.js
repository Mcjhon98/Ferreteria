// script.js - Lógica para la aplicación SPA tipo Odoo

// Estado de la aplicación
let appState = {
    productName: '',
    tipoProducto: 'Bienes',
    referenciaProducto: '',
    precioVenta: '1.00',
    impuestoVentas: '22%',
    costo: '0.00',
    impuestoCompra: '22%',
    tieneDescuento: 'no',
    porcentajeDescuento: '',
    proveedores: [],
    codigoBarras: '',
    productImage: 'https://via.placeholder.com/150',
    stockDisponible: '0'
};

// Lista de proveedores registrados
let proveedoresRegistrados = [];

// Elementos DOM
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const saveBtn = document.getElementById('saveBtn');
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');

// Cargar estado desde localStorage al iniciar
function loadState() {
    const savedState = localStorage.getItem('productState');
    if (savedState) {
        appState = JSON.parse(savedState);
        updateUI();
    }
}

// Actualizar la UI con el estado
function updateUI() {
    productNameInput.value = appState.productName;
    // Actualizar radio buttons de tipoProducto
    const radios = document.querySelectorAll('input[name="tipoProducto"]');
    radios.forEach(rb => rb.checked = rb.value === appState.tipoProducto);
    document.querySelector('[name="referenciaProducto"]').value = appState.referenciaProducto;
    document.querySelector('[name="precioVenta"]').value = appState.precioVenta;
    document.querySelector('[name="impuestoVentas"]').value = appState.impuestoVentas;
    document.querySelector('[name="costo"]').value = appState.costo;
    document.querySelector('[name="impuestoCompra"]').value = appState.impuestoCompra;
    document.querySelector('[name="codigoBarras"]').value = appState.codigoBarras;
    document.querySelector('[name="tieneDescuento"]').value = appState.tieneDescuento;
    document.querySelector('[name="porcentajeDescuento"]').value = appState.porcentajeDescuento;
    
    // Restaurar proveedores dinámicos
    if (appState.proveedores && appState.proveedores.length > 0) {
        const table = document.getElementById('proveedoresTable');
        const tbody = table.querySelector('tbody') || table;
        // Limpiar filas existentes excepto la primera
        const rows = tbody.querySelectorAll('tr');
        for (let i = 1; i < rows.length; i++) {
            rows[i].remove();
        }
        // Restaurar la primera fila
        if (appState.proveedores[0]) {
            document.querySelector('[name="proveedor[]"]').value = appState.proveedores[0].proveedor;
            document.querySelector('[name="proveedorOtro[]"]').value = appState.proveedores[0].proveedorOtro;
            document.querySelector('[name="cantidad[]"]').value = appState.proveedores[0].cantidad;
            document.querySelector('[name="precio[]"]').value = appState.proveedores[0].precio;
            document.querySelector('[name="moneda[]"]').value = appState.proveedores[0].moneda;
        }
        // Agregar filas adicionales
        for (let i = 1; i < appState.proveedores.length; i++) {
            addProveedorRow();
            const newRow = tbody.lastElementChild;
            newRow.querySelector('[name="proveedor[]"]').value = appState.proveedores[i].proveedor;
            newRow.querySelector('[name="proveedorOtro[]"]').value = appState.proveedores[i].proveedorOtro;
            newRow.querySelector('[name="cantidad[]"]').value = appState.proveedores[i].cantidad;
            newRow.querySelector('[name="precio[]"]').value = appState.proveedores[i].precio;
            newRow.querySelector('[name="moneda[]"]').value = appState.proveedores[i].moneda;
        }
    }
    
    productImage.src = appState.productImage;
    
    // Mostrar/ocultar campo de descuento
    toggleDiscountField();
    // Mostrar/ocultar campo de proveedor personalizado
    toggleProviderField();
}

// Guardar estado en localStorage
function saveState() {
    localStorage.setItem('productState', JSON.stringify(appState));
}

// Actualizar estado desde inputs
function updateState() {
    appState.productName = productNameInput.value;
    appState.tipoProducto = document.querySelector('input[name="tipoProducto"]:checked')?.value || 'Bienes';
    appState.referenciaProducto = document.querySelector('[name="referenciaProducto"]').value;
    appState.precioVenta = document.querySelector('[name="precioVenta"]').value;
    appState.impuestoVentas = document.querySelector('[name="impuestoVentas"]').value;
    appState.costo = document.querySelector('[name="costo"]').value;
    appState.impuestoCompra = document.querySelector('[name="impuestoCompra"]').value;
    appState.codigoBarras = document.querySelector('[name="codigoBarras"]').value;
    appState.tieneDescuento = document.querySelector('[name="tieneDescuento"]').value;
    appState.porcentajeDescuento = document.querySelector('[name="porcentajeDescuento"]').value;
    
    // Proveedores dinámicos
    appState.proveedores = Array.from(document.querySelectorAll('select[name="proveedor[]"]')).map((sel, index) => ({
        proveedor: sel.value,
        proveedorOtro: document.querySelectorAll('input[name="proveedorOtro[]"]')[index]?.value || '',
        cantidad: document.querySelectorAll('input[name="cantidad[]"]')[index]?.value || '',
        precio: document.querySelectorAll('input[name="precio[]"]')[index]?.value || '',
        moneda: document.querySelectorAll('select[name="moneda[]"]')[index]?.value || ''
    }));
}

// Manejar cambio de pestañas
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Actualizar estado antes de cambiar
        updateState();

        // Remover activo de todas las tabs
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Agregar activo a la tab seleccionada
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Manejar cambios en inputs para actualizar estado
productForm.addEventListener('input', updateState);

// Event listeners para radio buttons de tipoProducto
document.querySelectorAll('input[name="tipoProducto"]').forEach(rb => {
    rb.addEventListener('change', updateState);
});

// Botón guardar
saveBtn.addEventListener('click', () => {
    updateState();

    // Validación básica
    if (!appState.productName.trim()) {
        alert('El nombre del producto es obligatorio.');
        return;
    }

    // Obtener productos existentes
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Agregar el nuevo producto
    products.push({ ...appState });

    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Mostrar mensaje de éxito
    alert('Producto guardado exitosamente.');

    // Limpiar el formulario
    appState = {
        productName: '',
        tipoProducto: 'Bienes',
        referenciaProducto: '',
        precioVenta: '1.00',
        impuestoVentas: '22%',
        costo: '0.00',
        impuestoCompra: '22%',
        tieneDescuento: 'no',
        porcentajeDescuento: '',
        proveedores: [],
        codigoBarras: '',
        productImage: 'https://via.placeholder.com/150',
        stockDisponible: '0'
    };
    updateUI();

    // Aquí se podría enviar al backend con fetch o similar
    // fetch('guardar.php', {
    //     method: 'POST',
    //     body: new FormData(productForm)
    // });
});

// Función para mostrar/ocultar el campo de descuento
function toggleDiscountField() {
    const tieneDescuentoSelect = document.getElementById('tieneDescuento');
    const descuentoLabel = document.getElementById('descuentoLabel');
    const porcentajeDescuentoInput = document.getElementById('porcentajeDescuento');
    
    if (tieneDescuentoSelect.value === 'si') {
        descuentoLabel.style.display = 'block';
        porcentajeDescuentoInput.style.display = 'block';
    } else {
        descuentoLabel.style.display = 'none';
        porcentajeDescuentoInput.style.display = 'none';
        porcentajeDescuentoInput.value = '';
    }
}

// Event listener para el select de descuento
const tieneDescuentoSelect = document.getElementById('tieneDescuento');
tieneDescuentoSelect.addEventListener('change', (e) => {
    appState.tieneDescuento = e.target.value;
    toggleDiscountField();
});

// Event listener para el input de porcentaje de descuento
const porcentajeDescuentoInput = document.getElementById('porcentajeDescuento');
porcentajeDescuentoInput.addEventListener('input', (e) => {
    let valor = e.target.value;
    if (valor) {
        e.target.placeholder = valor + '%';
    }
});

// Función para mostrar/ocultar el campo de proveedor personalizado
function toggleProviderField() {
    const proveedorSelect = document.getElementById('proveedor');
    const proveedorOtroInput = document.getElementById('proveedorOtro');
    
    if (proveedorSelect.value === 'otro') {
        proveedorOtroInput.style.display = 'block';
    } else {
        proveedorOtroInput.style.display = 'none';
        proveedorOtroInput.value = '';
    }
}

// Event listener para el select de proveedor
const proveedorSelect = document.getElementById('proveedor');
proveedorSelect.addEventListener('change', (e) => {
    appState.proveedor = e.target.value;
    toggleProviderField();
});

// Función para cargar proveedores desde localStorage
function loadProveedores() {
    const saved = localStorage.getItem('proveedoresRegistrados');
    if (saved) {
        proveedoresRegistrados = JSON.parse(saved);
    } else {
        // Proveedores por defecto
        proveedoresRegistrados = [
            { nombre: 'UruImporta', telefono: '', celular: '', correo: '', calle: '', calle2: '', ciudad: '', pais: '', identificacion: '', empresa: '' },
            { nombre: 'Sudel', telefono: '', celular: '', correo: '', calle: '', calle2: '', ciudad: '', pais: '', identificacion: '', empresa: '' },
            { nombre: 'Galaxia', telefono: '', celular: '', correo: '', calle: '', calle2: '', ciudad: '', pais: '', identificacion: '', empresa: '' }
        ];
        saveProveedores();
    }
}

// Función para guardar proveedores en localStorage
function saveProveedores() {
    localStorage.setItem('proveedoresRegistrados', JSON.stringify(proveedoresRegistrados));
}

// Función para mostrar la tabla de proveedores
function showProveedoresTable() {
    const modalContent = document.querySelector('#proveedorModal .modal-content');
    modalContent.innerHTML = `
        <h2>Proveedores Registrados</h2>
        <table class="proveedores-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Rut / Ruc</th>
                    <th>Teléfono</th>
                    <th>Celular</th>
                    <th>Correo electrónico</th>
                    <th>Calle</th>
                    <th>Calle 2</th>
                    <th>Ciudad</th>
                    <th>País</th>
                    <th>Empresa</th>
                </tr>
            </thead>
            <tbody>
                ${proveedoresRegistrados.map(prov => `
                    <tr>
                        <td>${prov.nombre}</td>
                        <td>${prov.identificacion || '-'}</td>
                        <td>${prov.telefono || '-'}</td>
                        <td>${prov.celular || '-'}</td>
                        <td>${prov.correo || '-'}</td>
                        <td>${prov.calle || '-'}</td>
                        <td>${prov.calle2 || '-'}</td>
                        <td>${prov.ciudad || '-'}</td>
                        <td>${prov.pais || '-'}</td>
                        <td>${prov.empresa || '-'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="modal-buttons">
            <button type="button" class="cancel-btn" onclick="closeProveedorModal()">Retroceder</button>
            <button type="button" class="save-btn" onclick="showNuevoProveedorForm()">Nuevo</button>
        </div>
    `;
}

// Función para mostrar el formulario de nuevo proveedor
function showNuevoProveedorForm() {
    const modalContent = document.querySelector('#proveedorModal .modal-content');
    modalContent.innerHTML = `
        <h2>Agregar Nuevo Proveedor</h2>
        <form id="proveedorForm">
            <table class="proveedor-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rut / Ruc</th>
                        <th>Teléfono</th>
                        <th>Celular</th>
                        <th>Correo electrónico</th>
                        <th>Calle</th>
                        <th>Calle 2</th>
                        <th>Ciudad</th>
                        <th>País</th>
                        <th>Empresa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="provNombre" name="provNombre" required></td>
                        <td><input type="text" id="provIdentificacion" name="provIdentificacion"></td>
                        <td><input type="tel" id="provTelefono" name="provTelefono"></td>
                        <td><input type="tel" id="provCelular" name="provCelular"></td>
                        <td><input type="email" id="provCorreo" name="provCorreo"></td>
                        <td><input type="text" id="provCalle" name="provCalle"></td>
                        <td><input type="text" id="provCalle2" name="provCalle2"></td>
                        <td><input type="text" id="provCiudad" name="provCiudad"></td>
                        <td><input type="text" id="provPais" name="provPais"></td>
                        <td><input type="text" id="provEmpresa" name="provEmpresa"></td>
                    </tr>
                </tbody>
            </table>
            <div class="modal-buttons">
                <button type="button" class="cancel-btn" onclick="showProveedoresTable()">Retroceder</button>
                <button type="submit" class="save-btn">Agregar Proveedor</button>
            </div>
        </form>
    `;

    // Re-agregar el event listener para el formulario
    document.getElementById('proveedorForm').addEventListener('submit', handleNuevoProveedor);
}

// Función para manejar el envío del formulario de nuevo proveedor
function handleNuevoProveedor(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('provNombre').value;
    if (!nombre.trim()) {
        alert('El nombre del proveedor es obligatorio.');
        return;
    }

    // Verificar si el proveedor ya existe
    const existe = proveedoresRegistrados.some(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        alert('Este proveedor ya está registrado.');
        return;
    }
    
    // Crear nuevo proveedor
    const nuevoProveedor = {
        nombre: nombre,
        identificacion: document.getElementById('provIdentificacion').value,
        telefono: document.getElementById('provTelefono').value,
        celular: document.getElementById('provCelular').value,
        correo: document.getElementById('provCorreo').value,
        calle: document.getElementById('provCalle').value,
        calle2: document.getElementById('provCalle2').value,
        ciudad: document.getElementById('provCiudad').value,
        pais: document.getElementById('provPais').value,
        empresa: document.getElementById('provEmpresa').value
    };

    // Agregar a la lista
    proveedoresRegistrados.push(nuevoProveedor);
    saveProveedores();

    // Actualizar el select de proveedores
    updateProveedorSelect();

    // Volver a la tabla
    showProveedoresTable();
}

// Función para actualizar el select de proveedores
function updateProveedorSelect() {
    const select = document.getElementById('proveedor');
    // Limpiar opciones existentes excepto "Otro"
    select.innerHTML = '<option value="uruimporta">UruImporta</option><option value="sudel">Sudel</option><option value="galaxia">Galaxia</option><option value="otro">Otro</option>';
    
    // Agregar proveedores registrados
    proveedoresRegistrados.forEach(prov => {
        if (!['UruImporta', 'Sudel', 'Galaxia'].includes(prov.nombre)) {
            const option = document.createElement('option');
            option.value = prov.nombre.toLowerCase().replace(/\s+/g, '_');
            option.textContent = prov.nombre;
            select.appendChild(option);
        }
    });
}

// Event listener para el input de proveedor personalizado
const proveedorOtroInput = document.getElementById('proveedorOtro');
proveedorOtroInput.addEventListener('click', () => {
    loadProveedores();
    openProveedorModal();
    showProveedoresTable();
});

// Función para abrir el modal de proveedor
function openProveedorModal() {
    document.getElementById('proveedorModal').style.display = 'block';
}

// Función para cerrar el modal de proveedor
function closeProveedorModal() {
    document.getElementById('proveedorModal').style.display = 'none';
}

// Imagen
const editBtn = document.querySelector('.edit-btn');
const fileInput = document.querySelector('.file-input');
const productImage = document.querySelector('.o_field_image img');

editBtn.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            productImage.src = e.target.result;
            appState.productImage = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        productImage.src = 'https://via.placeholder.com/150';
        appState.productImage = 'https://via.placeholder.com/150';
    }
});

// Inicializar
loadState();
loadProveedores();
updateProveedorSelect();

// Funciones para proveedores dinámicos
let rowCounter = 1; // Para ids únicos

function addProveedorRow() {
    const table = document.getElementById('proveedoresTable');
    const tbody = table.querySelector('tbody') || table; // Si no hay tbody, usar table
    const newRow = document.createElement('tr');
    
    const uniqueId = 'prov' + rowCounter++;
    
    newRow.innerHTML = `
        <td>
            <select name="proveedor[]" class="proveedor-select" style="width: 120px;">
                <option value="uruimporta">UruImporta</option>
                <option value="sudel">Sudel</option>
                <option value="galaxia">Galaxia</option>
                <option value="otro">Otro</option>
            </select>
            <input type="text" name="proveedorOtro[]" class="proveedor-otro" placeholder="Buscar o Agregar otro" style="display: none; width: 150px; margin-top: 5px;" readonly>
        </td>
        <td><input type="number" name="cantidad[]" placeholder="0.00" style="width: 80px;"></td>
        <td><input type="number" name="precio[]" placeholder="0.00" style="width: 80px;"></td>
        <td>
            <select name="moneda[]" style="width: 75px;">
                <option value="UYU">UYU</option>
                <option value="USD">USD</option>
            </select>
        </td>
        <td><button type="button" class="remove-btn">Eliminar</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Agregar event listeners
    const select = newRow.querySelector('.proveedor-select');
    const inputOtro = newRow.querySelector('.proveedor-otro');
    const removeBtn = newRow.querySelector('.remove-btn');
    
    select.addEventListener('change', function() {
        if (this.value === 'otro') {
            inputOtro.style.display = 'block';
            inputOtro.readOnly = false;
        } else {
            inputOtro.style.display = 'none';
            inputOtro.value = '';
            inputOtro.readOnly = true;
        }
    });
    
    removeBtn.addEventListener('click', function() {
        newRow.remove();
    });
}

function removeProveedorRow(button) {
    button.closest('tr').remove();
}

// Event listener para el botón agregar
document.getElementById('addProveedorBtn').addEventListener('click', addProveedorRow);

// Event listener para el select inicial
document.getElementById('proveedor').addEventListener('change', function() {
    const inputOtro = document.getElementById('proveedorOtro');
    if (this.value === 'otro') {
        inputOtro.style.display = 'block';
        inputOtro.readOnly = false;
    } else {
        inputOtro.style.display = 'none';
        inputOtro.value = '';
        inputOtro.readOnly = true;
    }
});