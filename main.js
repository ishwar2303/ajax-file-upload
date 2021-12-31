// FRONT-END Interaction
var fileFilter = /jpg|jpeg|png/g;
var file = document.getElementById('file');
var selectedFile = document.getElementById('selected-file');
var removeSelectedFile = document.getElementById('remove-selected-file');
var uploadError = document.getElementById('upload-error');
file.addEventListener('change', (e) => {
    let f = e.target;
    let fileName = f.files[0].name;
    let arr = fileName.split('.');
    let p1 = arr[0].length > 20 ? arr[0].substr(0, 20) : arr[0];
    let p2 = arr[1];
    if(!p2.match(fileFilter)) {
        uploadError.innerText = 'Please upload jpg, png, jpeg files only';
        selectedFile.innerText = '';
        return;
    }
    if(fileName.length > 20) {
        let x = arr[0].length > 20 ? arr[0].length : 0;
        x = arr[0].length > 30 ? 10 : arr[0].length - 20;
        for(let i=0; i<x; i++) 
            p1 += 'x';
        fileName = p1 + '.' + p2;
    }
    selectedFile.innerHTML = 'File Selected <br/>' + fileName;
    uploadError.innerText = '';
})

var fileUploadBox = document.getElementById('file-upload-box'); 

fileUploadBox.addEventListener('click', () => {
    file.click();
})

removeSelectedFile.addEventListener('click', () => {
    file.value = null;
    selectedFile.innerText = '';
    uploadError.innerText = 'File not selected';
})


// AJAX Call to send file and data on form submit event
var form = document.getElementById('form');
form.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = document.getElementById('response');
    var formData = new FormData(e.target);
    let fileName = document.getElementById('file-name').value;
    let file = document.getElementById('file').files[0];
    if(file == null || fileName == '') {
        response.innerText = 'Please name your file and select a file to upload.';
        return;
    }
    $.ajax({
        url: 'upload-file.php',
        type: 'POST',
        data: formData,
        success: (msg) => {

        },
        complete: (res) => {
            response.innerText = res.responseText;
        },
        cache: false,
        contentType: false,
        processData: false
    });
}
