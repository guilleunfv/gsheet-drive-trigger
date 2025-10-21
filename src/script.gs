function onEditInstallable(e) {
  console.log('===== INICIO DE EJECUCIÓN =====');
  
  try {
    // Obtener información del evento
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    var column = range.getColumn();
    var row = range.getRow();
    var value = range.getValue();
    
    console.log('Columna editada: ' + column);
    console.log('Fila editada: ' + row);
    console.log('Valor: ' + value);
    
    // Verificar si la edición fue en la columna C (columna 3)
    if (column === 3) {
      console.log('Es columna C, continuando...');
      
      var url = value;
      
      // Verificar si el valor es un enlace de Google (Drive, Docs, Sheets, etc.)
      if (url && typeof url === 'string' && (url.includes('drive.google.com') || url.includes('docs.google.com'))) {
        console.log('Es un enlace de Google válido');
        
        // Extraer el ID del archivo del enlace
        var fileId = extractFileId(url);
        console.log('ID extraído: ' + fileId);
        
        if (fileId) {
          // Obtener el archivo original
          var file = DriveApp.getFileById(fileId);
          console.log('Archivo encontrado: ' + file.getName());
          
          // Buscar o crear la carpeta "analisis"
          var folder = getOrCreateFolder('analisis');
          console.log('Carpeta obtenida/creada: ' + folder.getName());
          console.log('ID de carpeta: ' + folder.getId());
          console.log('URL de carpeta: ' + folder.getUrl());
          
          // Crear copia del archivo en la carpeta
          var copiedFile = file.makeCopy(file.getName() + ' - Copia', folder);
          console.log('Copia creada: ' + copiedFile.getName());
          console.log('URL del archivo copiado: ' + copiedFile.getUrl());
          
          // Mensaje de éxito
          SpreadsheetApp.getActiveSpreadsheet().toast(
            'Archivo copiado exitosamente: ' + copiedFile.getName(),
            'Éxito',
            5
          );
        } else {
          console.log('No se pudo extraer el ID del enlace');
        }
      } else {
        console.log('No es un enlace válido de Google');
      }
    } else {
      console.log('No es la columna C, no se hace nada');
    }
  } catch (error) {
    console.error('ERROR: ' + error.message);
    console.error('Stack: ' + error.stack);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Error: ' + error.message,
      'Error',
      5
    );
  }
  
  console.log('===== FIN DE EJECUCIÓN =====');
}

/**
 * Extrae el ID del archivo de una URL de Google (Drive, Docs, Sheets, etc.)
 */
function extractFileId(url) {
  // Patrón para extraer ID de URLs de Google
  // Funciona con drive.google.com y docs.google.com
  var match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

/**
 * Busca una carpeta por nombre o la crea si no existe
 */
function getOrCreateFolder(folderName) {
  console.log('Buscando carpeta: ' + folderName);
  var folders = DriveApp.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    console.log('Carpeta encontrada');
    return folders.next();
  } else {
    console.log('Carpeta no existe, creando nueva...');
    var newFolder = DriveApp.createFolder(folderName);
    console.log('Carpeta creada con ID: ' + newFolder.getId());
    return newFolder;
  }
}
