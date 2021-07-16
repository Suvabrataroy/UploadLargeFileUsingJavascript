# UploadLargeFileUsingJavascript

Uploading large files in chucks without changing any configuration at server.

# Usage :
```
function UploadFileOnSubmit() {
    var file = document.getElementById("FileInput").files[0]
    UploadLargeFile(file, AsyncUpload, "URL To Post The data");
} 
```
