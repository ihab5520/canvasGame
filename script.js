let canvas = document.querySelector( "#canvas" );
let ctx = canvas.getContext( "2d" );

let snake = [
    { x: 100, y: 20 },
    { x: 90, y: 20 },
    { x: 80, y: 20 },
    { x: 70, y: 20 }
]

function resetGame ()
{
    let ctx = canvas.getContext( "2d" ); 
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect( 0, 0, 500, 330 );
    ctx.strokeRect( 0, 0, 500, 300 );
}

function drawSnake(){
    snake.forEach( drawSnakePart );
}

function drawSnakePart ( coord )
{
    ctx.fillStyle = "red";
    ctx.strokeStyle = "yellow";
    ctx.fillRect( coord.x, coord.y, 10, 10 );
    ctx.strokeRect( coord.x, coord.y, 10, 10 );
}

function moveSnake ()
{
    let head = { x: snake[ 0 ].x + 10, y: 20 }
    snake.unshift( head );
    snake.pop();
}

function runGame ()
{
    setTimeout( function onTick ()
    {
        resetGame();
        drawSnake();
        moveSnake();
        
        runGame();
    }, 100); 
    
}


runGame();