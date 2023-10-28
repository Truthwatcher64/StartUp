window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvasDemo');
    const ctx = canvas.getContext('2d');
    canvas.width=900;
    canvas.height=600;

    class InputHandler{
        constructor(){
            this.keys=[];
            window.addEventListener('keydown', e => {
                if((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1){

                    this.keys.push(e.key);
                }
                //console.log(e.key, this.keys);
            });

            window.addEventListener('keyup', e => {
                if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                //console.log(e.key, this.keys);
            });
        }
    }

    let counter=1;
    class Player {
        constructor(gamewidth, gameheight){
            this.gamewidth = gamewidth;
            this.gameheight = gameheight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameheight - this.height;
            this.image= document.getElementById('raptorImage')
            this.speed=0;
            this.gravity=2;
            this.velY=0;
        }
        draw(context){
            //context.fillStyle = 'blue';
            //context.fillRect(this.x, this.y, this.width, this.height,)
            context.drawImage(this.image, this.x-100, this.y, this.width+100, this.height)
        }
        update(input){
            this.x += this.speed;
            // setTimeout(()=>{
            //     this.image=document.getElementById("raptorIamge2");
            // }, 1000);
            

            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed=5;
            }
            else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed=-5;
            }
            else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.velY =-30;
            }
            else{
                this.speed=0;
            }

            //horizontal
            if(this.x <0){
                this.x=0;
            }
            else if(this.x>this.gamewidth - this.width){
                this.x = this.gamewidth-this.width;
            }
            
            //vertical
            this.y+=this.velY;
            if(!this.onGround()){
                this.velY += this.gravity;
            }
            else{
                this.velY=0;
            }
            if(this.y>this.gameheight-this.height){
                this.y = this.gameheight-this.height;
            }

        }
        onGround(){
            return this.y >=this.gameheight - this.height;
        }
    }

    class Background {
        constructor(gamewidth, gameheight){
            this.gamewidth=gamewidth;
            this.gameheight=gameheight;
            this.image=document.getElementById('background');
            this.x=0;
            this.y=0;
            this.width=2000;
            this.height=350;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
        }
    }

    class Obstacle{
        constructor(gamewidth, gameheight){
            this.gamewidth=gamewidth;
            this.gameheight=gameheight;
            this.width = 100;
            this.height = 100;
            this.image =document.getElementById('obstacle');
        }
        draw(context){
            context.drawImage(this.image);
        }

    }

    function handleObstacle(){

    }

    function displayText(){

    }
    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background=new Background(canvas.width, canvas.height);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();




});