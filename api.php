<?php

$mapFilePrefix = "./Maps/map";

$inputMethod = $_GET['Method'];


///Will specify The method to perform
/// Remember to parse input and don't give 2 much controll
switch($inputMethod){
case('getMap'):
    getMap();
    break;
case('list'):
    listMaps();
    break;
}

function listMaps(){
    $files = scandir('Maps');
    //    print_r($files);
    echo '{ "Maps":[';
    for($i = 2; $i < count($files); $i++){
        //        echo '<br/>'. preg_match('/^[a-zA-z0-9]{1,100}.json$/', trim($files[$i]));
        //        echo '<br/>'. trim($files[$i]);

        if(preg_match('/^[a-zA-z0-9]{1,100}.json$/', trim($files[$i]))){

            echo '{"MapName":"' . trim($files[$i]) . '","MapNo":"' . substr(trim($files[$i]), -6, -5) . '"}';
            if($i != count($files) - 2){
                    echo',';
            }
        }
    }
    echo ']}';
}

/// Returns a json of map, so software can get it from server
function getMap(){
    $numMap = intval($_GET['MapNo']);
    $file  = $GLOBALS['mapFilePrefix'] . $numMap . '.json';
    $myFile = fopen($file, 'r') or die('{"error":"Unable to open"}');
    echo fread($myFile, filesize($file));
    }

?>
