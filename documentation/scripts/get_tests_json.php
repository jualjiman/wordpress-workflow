<?php
	$path = htmlspecialchars($_GET['path']);

	system('phpcs --standard=WordPress-Core '.
            '--report=json '.
            $path, $retval);
?>