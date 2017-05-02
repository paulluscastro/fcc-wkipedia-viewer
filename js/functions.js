var searchAddress = 'http://pt.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=25&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=';

var genericLink = 'http://pt.wikipedia.org/?curid=';

$(document).ready(function(){
  $('#search-form').on('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#search').click();
  });

  $('#search').on('click', function(){
    var x = 0;
    $('#search-results div').each(function(index, item){
        debugger;
        var effect = x % 2 == 0 ? 'fadeOutLeft' : 'fadeOutRight';
        x += index % 2 == 0 ? 1 : 0;

        $(item).removeClass('animated');
        $(item).removeClass('fadeInLeft');
        $(item).removeClass('fadeInRight');

        $(item).addClass(effect + ' animated');
    });

    var address = searchAddress + $('#search-term').val() + '&callback=?';
    $.getJSON(address, function(data){
      x = 0;
      $('#search-results').html('');
      for(var page in data.query.pages) {
        var item = data.query.pages[page];
        var effect = x % 2 == 0 ? 'fadeInLeft' : 'fadeInRight';
        x++;

        var content = '<div class="row animated ' + effect + '">' +
            '  <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 destaque">' +
            '    <a href="' + genericLink + item.pageid + '" target="_blank"><h3>' + item.title + '</h3></a>' +
            (item.hasOwnProperty('extract') ? '<p>' + item.extract + '</p>' : '<p><em>Nenhuma descrição disponível.</em></p>')
            '  </div>' +
            '</div>'
        $('#search-results').append(content);
      }
    });
  });
});
