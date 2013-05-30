<?php

// idea: food in each cell. cell can only support life if food. food depletes each occupied turn. 
// : can only click to deploy on own occupied cells?
// : energy bar filled by eating, allows click after full
// : build walls - static, impenetrable (except by some other thing?)
// : scrolling world

$cellWidth = 3;
$cellHeight = 3;
$stageWidth = 256;
$stageHeight = 128;

$canvasWidth = $stageWidth * $cellWidth;
$canvasHeight = $stageHeight * $cellHeight;

//echo "hi";



?>

<html>
    <head>
		<title>test</title>
		
		<meta name="apple-mobile-web-app-capable" content="yes">


	    <meta name="viewport" content="width=660" />
	</head>
	
	<body>
		
		<div style='width: <?php echo $canvasWidth;?>px; height: <?php echo $canvasHeight;?>px; border: 1px solid #000; margin : 0px auto; padding : 0px;'>
			<canvas id='canvas' width='<?php echo $canvasWidth;?>px' height='<?php echo $canvasHeight;?>px' style='width : 100%; height : 100%'></canvas>
		</div>
		

		<script src="life.js">
			
			
            
        </script>
    </body>
</html>