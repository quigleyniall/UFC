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
        document.getElementById("myImage").src = BackgroundImg[i];

    }
    window.setInterval(changeImage, 3000);
}

change();
$("#output").hide();
document.getElementById("error").style.visibility = "hidden";
// $("#error").hide();
    $("#submit").click(function(){
        var name = $("#iname").val()
        // actual url api. Problems with CORs. Access-Control-Allow-Origin....Look into when finsihed
        // var url = "http://ufc-data-api.ufc.com/api/v1/us/fighters";

        var url = "ufcapi.txt";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data){
                for(var i=0; i<data.length; i++) {
                    // console.log(name)
                    // console.log(full)
                    if(name == (data[i].first_name + " " + data[i].last_name)){
                        // console.log(data[i].losses);
                        document.getElementById('losses').innerHTML = data[i].losses;
                        document.getElementById('wins').innerHTML = data[i].wins;

                        //function that replaces _ with a space
                        var y = function(x){
                            var x = x;
                            for(var j=0; j < x.length; j++) {
                                if(x.charAt(j) == '_'){
                                    x = x.slice(0, j) + " " + x.slice(j+1);
                                    console.log(x);

                                }
                            }return x;
                        }
                        var weight = y(data[i].weight_class);
                        document.getElementById('weight').innerHTML = weight;
                        document.getElementById('status').innerHTML = data[i].fighter_status;
                        document.getElementById('draw').innerHTML = data[i].draws;
                        $("#output").show();
                        if(data[i].title_holder ==true){
                            document.getElementById('image').src = data[i].belt_thumbnail;
                            document.getElementById('full').innerHTML = (data[i].first_name + " " + data[i].last_name + " UFC " + weight +  " Champion");
                        }
                        else {
                            document.getElementById('image').src = data[i].thumbnail;
                            document.getElementById('full').innerHTML = (data[i].first_name + " " + data[i].last_name);
                        }

                    }
                }
            },
            error: function(error){
                // $("#error").show()
                document.getElementById("error").style.visibility = "visible";
            }
        });

    })

});

