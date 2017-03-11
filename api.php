<?php

$mapFilePrefix = "./Maps/map";

$inputMethod = $_GET['Method'];


///Will specify The method to perform
/// Remember to parse input and don't give 2 much controll
switch($inputMethod){
    case('getMap'):
	getMap();
	break;
}


/// Returns a json of map, so software can get it from server
function getMap(){
    $numMap = intval($_GET['MapNo']);
    $file  = $GLOBALS['mapFilePrefix'] . $numMap . '.json';
    $myFile = fopen($file, 'r') or die('{"error":"Unable to open"}');
    echo fread($myFile, filesize($file));
    }

?>
