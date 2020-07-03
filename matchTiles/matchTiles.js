Vue.component('custom-image',{
    props:['src', 'className'],
    template:
    `<img
        :class="className"
        :src="src"
    >`
})

var app = new Vue({
    el: '#app',

    data:{
        tiles:50,
        //by default the show property of all images is set false so that when game is loaded no image is show to the player
        images: shuffle([
            {id:1, src:'images/1.png', show:false },
            {id:2,src:'images/2.jpg', show:false },
            {id:3, src:'images/3.jpg', show:false },
            {id:4, src:'images/4.jpg', show:false },
            {id:5, src:'images/5.jpg', show:false },
            {id:6, src:'images/6.jpeg', show:false },
            {id:7, src:'images/7.jpeg', show:false },
            {id:8, src:'images/8.jpeg', show:false },
            {id:9, src:'images/9.png', show:false },
            {id:10, src:'images/10.jpeg', show:false},
            {id:11, src:'images/1.png', show:false },
            {id:12, src:'images/2.jpg', show:false },
            {id:13, src:'images/3.jpg', show:false },
            {id:14, src:'images/4.jpg', show:false },
            {id:15, src:'images/5.jpg', show:false },
            {id:16, src:'images/6.jpeg', show:false },
            {id:17, src:'images/7.jpeg', show:false },
            {id:18, src:'images/8.jpeg', show:false },
            {id:19, src:'images/9.png', show:false },
            {id:20, src:'images/10.jpeg', show:false }
        ]),
        prevImage: undefined,
        player: 1,
        score: {
            1: 0,
            2: 0
        },
        //disable is being assigned false as the image used to stick and had issue
        disable: false
    },
        methods:{
            show: function(image) {
                //if disable is true then only player can take turn
                if(!this.disable) {
                    //when player clicks on tile the show property of that image becomes true and is displayed on the screen
                image.show = true;
                if(this.prevImage) {
                    this.disable = true;
                    //time interval is set so that the image doesn't gets stick and each player gets turn without any errors
                    setTimeout(()=>{
                        //if 1st image clicked is same as 2nd image then the score of that player will be incremented
                        if(this.prevImage.src == image.src) {
                            this.score[this.player]++;
                        } else {
                            //else other player will take turn and the show property of that particular image will become false again
                            this.prevImage.show = false;
                            image.show = false;
                            //if current player's was 1 then it will change to player 2 or else to player 1
                            this.player = this.player == 1 ? 2 : 1;
                        }
                        
                        //again the previous image is set to default as it will be other player's turn
                        this.prevImage = undefined;
                        //calling function to check the winner
                        let winner = this.checkWin()
                        if(winner){
                            //if the score of both the players are same then it will be a tie between them
                            if(winner == 'Tie') {
                                alert("It's a Tie!");
                            } else {
                                // else a winner will be declared
                                alert('Player ' + this.checkWin() + ' Won!');
                            }

                        }
                        this.disable = false;
                    }, 500)
                    
                } else {
                    this.prevImage = image;
                }
                }
            },
            checkWin: function() {
                //this checks whether all images are being clicked before declaring winner
                for(let image of this.images) {
                    if(image.show == false)
                        return false;
                }
                //checks score, if equal then tie or else the player whose score is greater than the other will be the winner
                return this.score[1] == this.score[2] ? 'Tie' : (this.score[1]>this.score[2]) ? 1 : 2;
            }
        }
    });
    //function for shuffeling the images inside the array
    function shuffle(a)  {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    //images from:- http://clipart-library.com/

