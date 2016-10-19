const Crafty = require('craftyjs');
Crafty.audio.add('ptchew', 'sounds/laser.wav');
Crafty.audio.add('bang', 'sounds/bang.wav');
var audio = new Audio('sounds/st.mp3');
var score = 0;

audio.play();
console.log("running");

Crafty.init(1000,700, document.getElementById('game'));

// Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('blue');

Crafty.e('Floor, 2D, Canvas, Color')
.attr({x: 0, y: 250, w: 250, h: 10})
.color('green');

Crafty.e('Floor, 2D, Canvas, Color')
.attr({x: 300, y: 600, w: 250, h: 10})
.color('red');

Crafty.e('Floor, 2D, Canvas, Color')
.attr({x: 450, y: 400, w: 250, h: 10})
.color('blue');

Crafty.e('Wall, 2D, Canvas, Color, Solid, Collision')
.attr({x: 0, y: 0, w: 1000, h: 10})
.color('black');

var square = Crafty.e('2D, Canvas, Color, Text');
square.attr({
    x: 50,
    y: 20,
    w: 100,
    h: 100
}).color("red");


square.origin("center");

square.bind('EnterFrame', function(){
    this.rotation = this.rotation + 1;
    this.text("SCORE: " + score);
});
square.trigger("Blush");

var bullet;

var sam = Crafty.e("2D, Canvas, Image, Twoway, Gravity, Solid").image("images/sam.png")
.attr({x: 0, y: 20, w: 100, h: 139})
.twoway(300)
.gravity('Floor')
.bind("KeyDown", function(e){
    if (e.key == Crafty.keys['F']){
        console.log("fire");
        Crafty.audio.play('ptchew');
        bullet = Crafty.e('2D, Canvas, Image, Solid');
        bullet
        .attr({x: sam.x + 50 , y: sam.y + 60, w: 20, h: 20})
        .bind('EnterFrame', function(){
            this.x = this.x + 10;
        })
        .image("images/polo.png")
        .bind("HitOn", function(hitData) {
            Crafty.log("Collision with Solid entity occurred for the first time.");
            console.log(hitData);
        });
    }
});

function enemyAppear(){
    var enterScreen = Crafty.math.randomInt(125, 600);
    Crafty.e("2D, Canvas, Image, Solid, Collision")
    .attr({x: 1000, y: enterScreen, w: 75, h: 75})
    .bind('EnterFrame', function(){
        this.x = this.x - 5;
    })
    .image("images/asteroid.png")
    .checkHits('Solid')
    .bind("HitOn", function() {
        Crafty.log("Collision with Solid entity occurred for the first time.");
        Crafty.audio.play('bang');
        this.destroy();
        score += 5;
    });
    setTimeout(enemyAppear, 5000);
}

setTimeout(enemyAppear, 5000);
