
let canvas = document.querySelector( "#canvas" );
let ctx = canvas.getContext( "2d" );

let food_x;
let food_y;
let dx = 10;
let dy = 0;
let score = 0;

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
    ctx.fillRect( 0, 0, 600, 500 );
    ctx.strokeRect( 0, 0, 600, 500 );
}

function drawSnake(){
    snake.forEach( drawSnakePart );
}

function drawSnakePart ( coord )
{
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "red";
    ctx.fillRect( coord.x, coord.y, 10, 10 );
    ctx.strokeRect( coord.x, coord.y, 10, 10 );
}

function moveSnake ()
{
    let head = { x: snake[ 0 ].x + dx, y:snake[0].y + dy }
    snake.unshift( head );
    const has_eaten = snake[0].x == food_x && snake[0].y == food_y;
    if ( has_eaten )
    {
        score += 10;
        document.getElementById( "score" ).innerHTML = "score: " + score;
        generate_food();
    }else
        snake.pop();
}

//controls_key
function change_direction ( event )
{
    //console.log( event.keyCode );
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingLeft = dx === -10;
    const goingUP = dy === -10;
    const goingRight = dx === 10;
    const goingDown = dy === 10;

    if ( keyPressed == LEFT_KEY && !goingRight ) //
    {
        dx = -10;
        dy = 0;
    }

    if ( keyPressed == UP_KEY && !goingDown ) //
    {
        dx = 0;
        dy = -10;
    }

    if ( keyPressed == RIGHT_KEY && !goingLeft) //
    {
        dx = 10;
        dy = 0;
    }
    
    if ( keyPressed == DOWN_KEY && !goingUP) //
    {
        dx = 0;
        dy = 10;
    }
}

function random_range (min, max)
{
    return Math.round((Math.random()*(max-min) + min)/10)*10;  
}

function generate_food ()
{
    food_x = random_range( 0, 600 - 10 );
    food_y = random_range( 0, 500 - 10 );
    check_eaten();
}

function check_eaten ()
{
    snake.forEach( function food_eaten ( coord )
    {
        const has_eaten = coord.x == food_x && coord.y == food_y;

        if ( has_eaten ) generate_food();
    } );
}

function putFood ()
{
    ctx.fillStyle = "green";
    ctx.strokeStyle = "blue";
    ctx.fillRect( food_x, food_y, 10, 10 );
    ctx.strokeRect( food_x, food_y, 10, 10 );
}

//damage hit wall or itself

function damageWallOrItself ()
{
    // damage itself
    for ( let i = 4; i < snake.length; i++)
    {
        const damageItself = snake[ i ].x == snake[ 0 ].x && snake[ i ].y == snake[ 0 ].y;
        if ( damageItself ) return true;
    }

    //damage wall
    const hitLeftWall = snake[ 0 ].x < 0;
    const hitTopWall = snake[ 0 ].y < 0;
    const hitRightWall = snake[ 0 ].x > 600-10;
    const hitBottomWall = snake[ 0 ].y > 500-10;

    return hitLeftWall || hitTopWall || hitRightWall || hitBottomWall;
}


document.addEventListener("keydown",change_direction)

let gameIsRunning = false;
function runGame ()
{
    if (gameIsRunning){
        setTimeout( function onTick ()
        {
            if ( damageWallOrItself())
            {
               // alert("Game Over Try Again")
               document.getElementById( "score" ).innerHTML = "Score :"+ score+"<br/>Game Over Try Again";
                gameIsRunning = false;
                return;
            }
            resetGame();
            putFood();
            drawSnake();
            moveSnake();
            runGame();
        },120);
    }
   
}

function start ()
{
    if (gameIsRunning){
        return;
    }else{
        gameIsRunning = true;
        dx = 10;
        dy = 0;
        snake = [
            { x: 100, y: 20 },
            { x: 90, y: 20 },
            { x: 80, y: 20 },
            { x: 70, y: 20 }
        ]
        document.getElementById("score").innerHTML = "Score : 0";
        generate_food();
        runGame();
    }
   
}
