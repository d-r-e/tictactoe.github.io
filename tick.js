//import $ from 'jquery'

class Box {
    constructor(position){
        this.postition = position;
        this.id = "box" + position;
        this.state = 0;
    }
    
    check(turn) {
        if(this.state)
            return;
        if (turn % 2)
        {
            this.state = 1;
        }
        else
        {
            this.state = 2;
        }
    }
}

class Game {
    constructor(ia = false){
        this.ia = ia;
        if (ia)
        {
            this.turnIA = 1
        }
        this.board = [];
        this.turn = 0;
        for(let i = 0; i < 10; i++)
        {
            this.board.push(new Box(i));
        }
    }
    reset()
    {
        for (let box of game.board)
        {
            box.state = 0;
        }
        $('.casilla').text("");
        location.reload();
    }

    winner(player) {
        if (player === 0)
        {
            $('.winner-overlay').text("EMPATE")
           console.log("Empato");
           $('.winner-overlay').show();
           
           this.reset();
        }
        else if (player === 1)
        {
            $('.winner-overlay').text("GANA J1")
            console.log("GANA el 1 (X)");
        }
        else
        {
            $('.winner-overlay').text("GANA J2")
            console.log("GANA EL 2 (O)")
        }
        
        $('.winner-overlay').show();
        /* */
    } 
    checkline(a, b, c)
    {
        let ret = 0;
        if (this.board[a].state === this.board[b].state && this.board[a].state === this.board[c].state && this.board[a].state != 0)
        {
            console.log("LÍNEA");
            let ret = this.board[a].state;
            console.log(ret);
            this.winner(this.board[a].state);
        }
        return (ret);
    }

    checkEnd(){
        console.log(this.turn);
        this.checkline(0, 1, 2)
        this.checkline(3, 4, 5)
        this.checkline(6, 7, 8)
        this.checkline(0, 3, 6)
        this.checkline(1, 4, 7)
        this.checkline(2, 5, 8)
        this.checkline(0, 4, 8)
        this.checkline(2, 4, 6)
        if (this.turn === 9)
         {
             this.winner(0);
         }
    }

    ia_move(){
        console.log("Voy a mover");
        let box =  Math.floor(Math.random() * 9);
        while (this.board[box].state != 0)
        {
            box =  Math.floor(Math.random() * 9);

        }
        this.board[box].check(this.turnIA + 1);
        this.turn++;
        console.log("IA RELLENA" +" "+ box);
        if (this.turn % 2 && $('#box'+box).text() === "")
        {
            $('#box'+box).text('X');
        }
        else if ($('#box'+ box).text() === "")
            $('#box'+box).text('O');
            
        }
}
game = new Game();
$('.winner-overlay').click(function(){
    game.reset();
});
$('.result').click(function(){
    $(this).hide();
    console.log("ejcondio");
});

$('#aistarter').click(function(){
    game.ia = true;
    
})
$('#twopstarter').click(function(){
    game.ia  = false;
})

    
$('.casilla').click(function(){
    game.turn++;
    if (game.turn % 2 && $(this).text() === "")
        $(this).text('X')
    else if ($(this).text() === "")
        $(this).text('O') 
    else
    {
        game.turn--;
        return;
    }
    let n = $(this).attr('id').replace('box','');
    console.log(n);
    game.board[n].check(game.turn);
    console.log(game.board)
    game.checkEnd();
    if (game.ia)
    {
        console.log("Mueve la IA");
        game.ia_move();
        game.checkEnd();
    }
});

