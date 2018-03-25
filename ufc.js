
$(document).ready(function(){
  // change backgorund image
  //search result fighter stats
  // Get the modal
  var modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  //youtube link
  // Get the modal
  var modal1 = document.getElementById('myModal1');
  // Get the button that opens the modal
  var btns = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
  var span1 = document.getElementsByClassName("close1")[0];
  // hiding error until iniated
  document.getElementById("error").style.visibility = "hidden";
//Hide ufc world champions until clicked on on the nav
  $("#completeufc").hide();
  $("#ufc").click(function(){
    $("#completeufc").show();
  });
  //Change BackgroundImg function
var change = function () {

    function changeImage() {
        var BackgroundImg = ["UFC1.jpg",
            "UFC2.jpg",
            "UFC3.jpg",
            "UFC4.jpg",
            "UFC5.jpg",
            "UFC6.jpg",
            "UFC7.jpg",
            "UFC8.jpg",
            "UFC9.jpg",
            "UFC10.jpg"
        ];
        var i = Math.floor((Math.random() * 10));
        document.getElementById("myImage").src = BackgroundImg[i];

    }
    //set interval to change every 3 seconds
    window.setInterval(changeImage, 3000);
}
//iniating background change function
change();
// actual url api. Problems with CORs. Access-Control-Allow-Origin....Look into when finsihed
// var url = "http://ufc-data-api.ufc.com/api/v1/us/fighters";
var url = "ufcapi.txt";
//AJAX call once page is loaded to get ufc world champions
$.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function(data){
        var j=0;
      for(var i=0; i < data.length; i++){
      if(data[i].title_holder === true){
        //prepending data on tite holders to seperate divs
        $("#top"+j).prepend("Weight Class: " + weight(data[i].weight_class) + "<br/>");
        $("#top"+j).prepend("Draws: " + data[i].draws + "<br/>");
        $("#top"+j).prepend("Losses: " + data[i].losses + "<br/>");
        $("#top"+j).prepend("Wins: " + data[i].wins + "<br/>");
        $("#top"+j).prepend("Name: " + data[i].first_name + " " + data[i].last_name + "<br/>");
        $("#top"+j).prepend("<img src=" + data[i].belt_thumbnail +"/><br/>")
        j++;
      }
      }
    }
  });
//load fighter highlight videos to modal1
$('#vid0').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('bx5bN0U2MP4')
})
$('#vid1').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('m9MyAXQJpDc')
})
$('#vid2').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('MpM9gOnCZKk')
})
$('#vid3').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('Q7G8qR8lQWs')
})
$('#vid4').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('3hh6Nc9bEfE')
})
$('#vid5').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('beg6-Ul6y4E')
})
$('#vid6').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('UPts_Qf5HYw')
})
$('#vid7').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('M0MnVUHsrVg')
})
$('#vid8').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('Bukv6v5LJpo')
})
$('#vid9').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('tTpVWh3sL6Y')
})
$('#vid10').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('C2arXMHfV6E')
})
$('#vid11').click(function(){
  modal1.style.display = 'block';
  player.loadVideoById('oo43aQobGZg')
})

span1.onclick = function() {
  player.stopVideo();
    modal1.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal1) {
      player.stopVideo();
        modal1.style.display = "none";
    }
}
// code for search result
$("#submit").click(function(){
  //getting search value
        var name = $("#iname").val()
        // actual url api. Problems with CORs. Access-Control-Allow-Origin....Look into when finsihed
        // var url = "http://ufc-data-api.ufc.com/api/v1/us/fighters";
        var url = "ufcapi.txt";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data){
                //compare search value with data
                for(var i=0; i<data.length; i++) {
                  if(name == (data[i].first_name + " " + data[i].last_name)){
                    //insert data to table
                      document.getElementById('losses').innerHTML = data[i].losses;
                      document.getElementById('wins').innerHTML = data[i].wins;
                      // weight function replaces _ with space
                      document.getElementById('weight').innerHTML = weight(data[i].weight_class);
                      document.getElementById('status').innerHTML = data[i].fighter_status;
                      document.getElementById('draw').innerHTML = data[i].draws;
                   //check to see if fighter is a title_holder and returns picture with the belt
                      if(data[i].title_holder == true){
                          document.getElementById('image').src = data[i].belt_thumbnail;
                          document.getElementById('full').innerHTML = (data[i].first_name + " " + data[i].last_name + " UFC " + weight(data[i].weight_class) +  " Champion");
                      }
                      else {
                          document.getElementById('image').src = data[i].thumbnail;
                         document.getElementById('full').innerHTML = (data[i].first_name + " " + data[i].last_name);
                      }

                      // When the user clicks the button, open the modal
                      modal.style.display = "block";
                      // When the user clicks on <span> (x), close the modal
                      span.onclick = function() {
                          modal.style.display = "none";
                      }
                      // When the user clicks the button, close fighter stat modal and open the youtubelink modal
                      btns.onclick = function() {
                        //calling youtube api to load videoId in correspondance to search input
                        onClientLoad();
                        modal.style.display = "none";
                        modal1.style.display = "block";
                      }
                      // When the user clicks on <span> (x), close the modal and stop the video
                      span1.onclick = function() {
                        player.stopVideo()
                          modal1.style.display = "none";
                      }
                      // When the user clicks anywhere outside of the modal, close it
                      window.onclick = function(event) {
                          if (event.target == modal1) {
                            player.stopVideo()
                              modal1.style.display = "none";
                          }
                      }
                  }
                }
            },
            error: function(error){
              document.getElementById("error").style.visibility = "visible";
            }
        });

    })

});
//function that replaces _ with a space (eg Light_heavyweight to Light heavyweight)
var weight = function(x){
    var x = x;
    for(var j=0; j < x.length; j++) {
        if(x.charAt(j) == '_'){
            x = x.slice(0, j) + " " + x.slice(j+1);
        }
    }
  return x;
}
