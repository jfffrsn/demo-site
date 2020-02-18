$(function() {

    var searchUrl = "http://64.94.28.153:9200/ccast/presentations/_search";
    //var searchUrl = "http://localhost:9200/ccast/presentations/_search";
    var aggregations = '';
    var refreshAggs = true;

    $('#search-button').click(function(e) {
        e.preventDefault();
        search();
    });

    function search() {

        var req = {};
        
        if ($('#search-query').val().length > 0) {
            req.query = {
                    bool: {
                        must: [
                            { match: { title: $('#search-query').val() } }
                        ]
                    }
                };

            req.query.bool.filter = {};
            req.query.bool.filter.bool = {};
            req.query.bool.filter.bool.should = [];
            $(".aggregation").each(function() {
                if ($(this).is(':checked')) {
                    var term = {};
                    switch ($(this).data('name')) {
                        case 'meeting.id':
                            term = { term: { 'meeting.id': $(this).data('value') } };
                            req.query.bool.filter.bool.should.push(term);
                            break;
                        case 'sessions.id':
                            term = { term: { 'sessions.id': $(this).data('value') } };
                            req.query.bool.filter.bool.should.push(term);
                            break;
                        case 'tracks.id':
                            term = { term: { 'tracks.id': $(this).data('value') } };
                            req.query.bool.filter.bool.should.push(term);
                            break;
                        case 'speakers.id':
                            term = { term: { 'speakers.id': $(this).data('value') } };
                            req.query.bool.filter.bool.should.push(term);
                            break;
                        case 'topics.id':
                            term = { term: { 'topics.id': $(this).data('value') } };
                            req.query.bool.filter.bool.should.push(term);
                            break;
                    }
                }  
            });
        }

        switch ($('#search-sort-by').val()) {
            case 'rating':
                req.sort = { rating: { order: "desc" }};
                break;
            case 'date': // not required, but to make it clear
            default:
                req.sort = { date: { order: "desc" }};
        }

        req.aggs = {
                //AICP-CM: { terms: { field: "AICP-CM" } },
                meeting: { nested: { path: "meeting" }, aggs: { name: { terms: { field: "meeting.id" }, aggs: { name: { terms: { field: "meeting.name.keyword" } } } } } },
                tracks: { nested: { path: "tracks" }, aggs: { name: { terms: { field: "tracks.id" }, aggs: { name: { terms: { field: "tracks.name.keyword" } } } } } },
                sessions: { nested: { path: "sessions" }, aggs: { name: { terms: { field: "sessions.id" }, aggs: { name: { terms: { field: "sessions.name.keyword" } } } } } },
                speakers: { nested: { path: "speakers" }, aggs: { name: { terms: { field: "speakers.id" }, aggs: { name: { terms: { field: "speakers.name.keyword" } } } } } },
                topics: { nested: { path: "topics" }, aggs: { name: { terms: { field: "topics.id" }, aggs: { name: { terms: { field: "topics.name.keyword" } } } } } }
            };

        var jqxhr = $.ajax({
            url: searchUrl, 
            data: JSON.stringify(req),
            type: 'POST',
            username: "elastic",
            password: "changeme"
        })
        .done(function(data) {
            printResults(data);
        })
        .fail(function() {
            //alert( "error" );
        })
        .always(function() {
            //alert( "finished" );
        });
    }


    function printResults(data) {
        var result = '';
        var hits = data.hits.hits;
        if (refreshAggs) {
            printAggregations(data);     
            refreshAggs = false;
        }
        result += '<div class="col-md-9" id="results-list-section">'
            + '<h3>' + data.hits.total + ' presentations</h3>'
            + 'Sort by <select id="search-sort-by" class="form-control">'
                + '<option value="date"' + ($('#search-sort-by').val() == "date" ? ' selected': '') + '>date added</option>'
                + '<option value="rating"' + ($('#search-sort-by').val() == "rating" ? ' selected': '') + '>rating</option>'
            + '</select>';
        for (var hit in hits) {
            result += '<div class="media">'
                + '<div class="media-left">' 
                + '<img src="img/placeholders/placeholder.png" alt="" class="media-object" style="width:160px">'
                + '</div>'
                + '<div class="media-body">'
                + '<h4 class="media-heading">'
                + '<a href="' + hits[hit]._source.url + '">'
                + hits[hit]._source.title + '</a></h4>'
                + '<p>Duration: ' + hits[hit]._source.duration + '<br>'
                + 'Stars: ' + hits[hit]._source.rating + '<br>'
                + 'Speakers: ' + printArray(hits[hit]._source.speakers) + '</p>'
                + '</div>'
                + '</div>';
        }
        result += '</div>';

        $('#search-results-list').html(result);
    }

    // ----------------------------------------------------
    // Converts an array into a comma separated list.
    // ----------------------------------------------------
    function printArray(arr) {
        var result = '';
        var sep = '';
        for (var item in arr) {
            result += sep + arr[item].name;
            sep = ', ';
        }
        return result;
    }

    function printAggregations(data) {
        var result = '';

        result += '<h3>Refine results</h3>';
        result += '<button class="btn btn-default">Reset</button>';
        result += printAggregationContent('meeting', data.aggregations['meeting']);
        result += printAggregationContent('tracks', data.aggregations['tracks']);
        result += printAggregationContent('sessions', data.aggregations['sessions']);
        result += printAggregationContent('speakers', data.aggregations['speakers']);
        result += printAggregationContent('topics', data.aggregations['topics']);

        $('#search-results-filter').html(result);
    }

    function printAggregationContent(key, aggregation) {
        var result = '';

        result += '<h4>' + key + '</h4>';
        result += '<div>'
        result += '<input type="text" class="form-control filter" placeholder="Search ' + key + '">';
        result += '<div class="filter-list">'
        for (var bucket in aggregation.name.buckets) {
            var b = aggregation.name.buckets[bucket];
            result += '<div class="checkbox"><label><input type="checkbox" class="aggregation" data-name="' + key + '.id" data-value="' + b.key + '"> ' + b.name.buckets[0].key + ' (' + b.doc_count + ')</label></div>';
        }
        result += '</div>'
        result += '</div>'

        return result;
    }

    function filter(element, what) {
        var value = $(element).val();
        value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toLowerCase();
        });

        if (value == '') {
            $(what).children().each(function() {
                $(this).show();
            }); 
        }
        else if (value.length > 2) {
            $(what).children().each(function() {
                console.log('item: ' + $(this).children().first().text());
                if ($(this).text().toLowerCase().indexOf(value) >= 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    };


    $('#search-results').on('click', '.aggregation', function(e) {
        refreshAggs = false;
        search();
    });

    $('#search-results').on('input', '.filter', function(e) {
        filter($(this), $(this).siblings('.filter-list'));
    });

    $('#search-results').on('change', '#search-sort-by', function(e) {
        search();
    });

    function init() {
        $('#search-results').html(
            '<div class="row">'
            + '<div id="search-results-filter" class="col-md-3"></div>'
            + '<div id="search-results-list" class="col-md-9"></div>'
            + '</div>');
    }

    init();

});