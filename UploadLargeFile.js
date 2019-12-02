/* Author : Suvabrata Roy
   Email  : suvabrataroy@gmail.com */

function UploadLargeFile(file, callback, PostURL) {
    var fileSize = file.size;
    var chunkSize = 1 * 1024 * 1024; // bytes
    var offset = 0;
    var BOF = 0;
    var self = this; // reference purpose
    var FileReadInBlocks = null;

    var readEventHandler = function(evt) {
        if (evt.target.error == null) {
            offset += evt.target.result.length;
            callback(evt.target.result, BOF, function() {
                if (offset >= fileSize) {
                    console.log("Done reading file");
                    //console.log(new Date());
                    return;
                }
                FileReadInBlocks(offset, chunkSize, file)
            }, PostURL);

            BOF = offset;
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }

        if (offset >= fileSize) {
            console.log("Done reading file");
            //console.log(new Date());
            return;
        }
    }

    FileReadInBlocks = function(_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        console.log(_offset);
        r.onload = readEventHandler;
        r.readAsDataURL(blob);
    }
    // now let's start the read with the first block
    FileReadInBlocks(offset, chunkSize, file);
}


function AsyncUpload(data, fileposition, seekNext, PostURL) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            seekNext();
        }
    };

    xhttp.open("POST", PostURL, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({
        Data: data,
        OffSet: fileposition
    }));

}


//Usage 
/*
function UploadFileOnSubmit() {
    var file = document.getElementById("FileInput").files[0]
    UploadLargeFile(file, AsyncUpload, "URL To Post The data");
} */
