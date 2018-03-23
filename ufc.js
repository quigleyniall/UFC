//
$(document).ready(function(){
var change = function () {

    function changeImage() {
        var BackgroundImg = ["UFC1.jpg",
            "UFC2.jpg",
            "UFC3.jpg",
            "UFC4.jpg",
            "UFC5.jpg"
        ];
        var i = Math.floor((Math.random() * 5));
        document.body.style.backgroundImage = 'url("' + BackgroundImg[i] + '")';

    }
    window.setInterval(changeImage, 3000);
}

change();
    $("#submit").click(function(){
        var url = "http://ufc-data-api.ufc.com/api/v1/us/fighters";

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data){
                for(var i=0; i<data.length; i++) {
                    console.log(data[i].first_name + " " + data[i].last_name)
                }
            }
        });

    })

});

