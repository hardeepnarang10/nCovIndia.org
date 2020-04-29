
function resizeMap(cSize) {

    var width = window.innerWidth;
    if (width < 768) {
        $('#mapCard').height('500px');
        $('#mapCardBody').height('100%');
        $('#map').height('100%');

        map.setView([23.4763,81.9395], 4);

        map.flyTo([9.4763,81.9395], 4);

        map.setView([23.4763,81.9395], 4);



        $('.info').css({'font-size':'8px', 'width':'100px'});
        $('.legend').css({'line-height':'20px'});
        $('.legend i').css({'height':'10px'});

        $('.card-deck-container').css({'display':'none'});


    }  else {
        map.setZoom(5);
        $('#mapCard').height('860px');
        $('#mapCardBody').height('100%');
        $('#map').height('100%');

        map.flyTo([9.4763,81.9395], 5);
        map.setView([23.4763,81.9395], 5);

        $('.info').css({'font-size':'14px', 'width':'130px'});
        $('.legend').css({'line-height':'30px'});
        $('.legend i').css({'height':'16px'});

        $('.card-deck-container').css({'display':'block'});

    }

}


window.addEventListener('resize', function(event){

    resizeMap();

});


resizeMap();

if(window.innerWidth < 768) {
    
    map.setView([23.4763,81.9395], 4);

    map.flyTo([9.4763,81.9395], 4);
}
