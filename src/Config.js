function loadMap(mapNo){
    loadJSON('http://localhost/snek/api.php?Method=getMap&MapNo=' + mapNo, function(data){
            console.log(data);
        CFG = data;
        start();
        });
    };



function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
