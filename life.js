var can;
var mouseIsDown = 0;
    	
var totalLiving = 0;
       
var running = false;       
       
var cellWidth = 3;
var cellHeight = 3;

var stageWidth = 256;
var stageHeight = 128;

var selectedX = 1;
var selectedY = 1;    

var numTypes = 2;

var colours = new Array('#FFFFFF','#FF0000','0000FF');

var stage = new Array();
var food = new Array();
var newStage = new Array();
var prevStage = new Array();
    
for(var i=0;i<stageWidth;i++){
        
    stage[i] = new Array();
    newStage[i] = new Array();
    prevStage[i] = new Array();
    food[i] = new Array();

}
            
        
can = document.getElementById("canvas");
var ctx = can.getContext("2d");

can.addEventListener("mousedown", mouseDown, false);

randomiseStage();
drawStage();

function mouseDown(){
    
    mouseXY();
    //gimmeAGlider();
    //showArea();
    
    //drawStage();
    
    if (running){
        //running = false;   
    }else{
        running = true;  
        if(totalLiving === 0){
            randomiseStage();
        }

        run();
        
    }
    
    //showNeighbours(selectedX,selectedY);
    splatter(selectedX,selectedY,1,50);

}

function mouseXY(e) {
	if (!e) var e = event;
	var canX = e.pageX - can.offsetLeft;
	var canY = e.pageY - can.offsetTop;
    selectedX = Math.floor(canX / cellWidth);
    selectedY = Math.floor(canY / cellHeight);
    console.log(selectedX + " " + selectedY);
    
	//showPos();
}

function randomiseStage(){

    totalLiving = 0;
    for(var i=0;i<stageWidth;i++){
    
        for(var j=0;j<stageHeight;j++){
    
            food[i][j] = 500;
    
            var prob = Math.random();
            
            
            
            if(prob > 0.85){
                stage[i][j] = 1; 
                totalLiving ++;
            }
            else if(prob > 0.7){
                stage[i][j] = 2; 
                totalLiving ++;
            }
            else{
                stage[i][j] = 0; 
            }
            
    
        }
    
    }
}
function clearStage(){

    totalLiving = 0;
    for(var i=0;i<stageWidth;i++){
        for(var j=0;j<stageHeight;j++){
    
            
            
            stage[i][j] = 0; 
            
            
    
        }
    
    }
}

function splatter(x,y,type,amount){
 
    for(var i=0;i<amount;i++){
     
        var xPos = x + ((Math.floor(Math.random() * 30)) - 15);
        var yPos = y + ((Math.floor(Math.random() * 30)) - 15);
        
        gimmeAGlider(xPos,yPos,type);
        
     
    }
    
    drawStage();
 
}

function gimmeAGlider(x,y,type){
 
    stage[x][y] = 1;
    stage[x][y+1] = 1;
    stage[x][y+2] = 1;
    stage[x+1][y+2] = 1;
    stage[x+2][y+1] = 1;
    
    drawStage();
    
 
}

function showArea(){

    var x = selectedX;
    var y = selectedY;
    

    for(var i = -1; i < 2; i++){
    
        for(var j = -1; j < 2; j++){
    
            if (!(i===0 && j===0)){
                var _x = x+i;
                var _y = y+j;
            
                if ((_x > -1 && _x < stageWidth) && (_y > -1 && _y < stageHeight)){
                    stage[_x][_y] = 1;
                }
            
            }
    
        }
    
    }




}

function drawStage(){
    for(var i=0;i<stageWidth;i++){
        for(var j=0;j<stageHeight;j++){
            
            if(food[i][j] < 1){
                drawCell(i,j,"#000000");
            }
            
            if (stage[i][j] != prevStage[i][j]){
                
                drawCell(i,j,colours[stage[i][j]]);
                /*if (stage[i][j]){
                    drawCell(i,j,colours[stage[i][j]]);
                    //ctx.fillRect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
                }else{
                    drawCell(i,j,colours[stage[i][j]]);
                    ctx.fillRect(i*cellWidth,j*cellHeight,cellWidth,cellHeight);
                
                }*/
            }
        }
    }
}

function drawCell(x,y,colour){
   ctx.fillStyle = colour;
   ctx.fillRect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);  
}

function nextIteration(){
    totalLiving = 0;
    for(var i=0;i<stageWidth;i++){
        for(var j=0;j<stageHeight;j++){
            
            if(stage[i][j] && food[i][j]){
                food[i][j]-=1;   
            }
            
            newStage[i][j] = nextState(i,j);
            //totalLiving += newStage[i][j];
        }
    }
    for(i=0;i<stageWidth;i++){
        for(var j=0;j<stageHeight;j++){
            prevStage[i][j] = stage[i][j];
            stage[i][j] = newStage[i][j];
        }
    }
    
    
}

function nextState(x, y){
    
    if (!food[x][y]){
        return 0;   
    }
    
    var current = stage[x][y]
    var total = new Array(0,0,0);
    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            var _x = x+i;
            var _y = y+j;
            if (!(x===_x && y===_y) && (_x > -1 && _x < stageWidth) && (_y > -1 && _y < stageHeight)){
                //if (stage[_x][_y] == 1){
                    total[stage[_x][_y]] ++;
                //}
            }
        }
    }
    
    //console.log(total);
    

    if(current){
        
        if (current == 1 && total[2] > total[1]){
            return 2;   
        }
        
        if (current == 2 && total[1] > total[2]){
            return 1;   
        }
        
        if (total[current] === 2 || total[current]  === 3){
            return current;
        }
    }else{
        
        if (total[1] === 3 && total[2] !== 3){
            return 1;
        }else if(total[2] === 3 && total[1] !== 3){
            return 2;   
        }
        
    }
    
    return 0;
    
}
function showNeighbours(x, y){
    var total = 0;
    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            var _x = x+i;
            var _y = y+j;
            if (!(x===_x && y===_y) && (_x > -1 && _x < stageWidth) && (_y > -1 && _y < stageHeight)){
                if (stage[_x][_y] == 1){
                    drawCell(_x,_y,'#00FF00');
                    total++;
                }else{
                    drawCell(_x,_y,'#FF0000');
                    
                }
            }
        }
    }
    
    console.log(total);
    
}

function run(){
	if (running){
		nextIteration();
        drawStage();
		setTimeout(run, 30);
	}
}
