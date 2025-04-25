<?php
header('Content-Type: application/json');
$directory = 'Galerie/';
$files = array_values(array_filter(scandir($directory), function($file) use ($directory) {
    return !is_dir($directory . $file) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
}));
echo json_encode($files);
?>
