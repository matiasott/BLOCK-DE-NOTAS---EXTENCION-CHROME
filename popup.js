document.addEventListener('DOMContentLoaded', function() {
    var noteTextArea = document.getElementById('noteTextArea');
    var saveButton = document.getElementById('saveButton');
    var clearButton = document.getElementById('clearButton');
  
    // Cargar nota guardada previamente, si existe
    chrome.storage.local.get('note', function(result) {
        if (result.note) {
            noteTextArea.value = result.note;
        }
    });
  
    // Manejar evento de cambio en el textarea
    noteTextArea.addEventListener('input', function() {
        // Guardar la nota en el local storage
        var note = noteTextArea.value;
        chrome.storage.local.set({'note': note}, function() {
            console.log('Nota actualizada en el local storage');
        });
    });

    // Manejar evento de clic en el botón de guardar
    saveButton.addEventListener('click', function() {
        var note = noteTextArea.value;
        // Descargar la nota como un archivo de texto
        var blob = new Blob([note], {type: 'text/plain'});
        var url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'nota.txt',
            saveAs: true
        }, function(downloadId) {
            // Mostrar mensaje de éxito
            // if (downloadId) {
            //     alert('Nota guardada correctamente');
            // } else {
            //     alert('Error al guardar la nota');
            // }
        });
    });

    // Manejar evento de clic en el botón de limpiar
    clearButton.addEventListener('click', function() {
        noteTextArea.value = ''; // Limpiar el área de texto

        // Eliminar la nota del local storage
        chrome.storage.local.remove('note', function() {
            console.log('Nota eliminada del local storage');
        });
    });
});

