/* jshint ignore:start */
(function() {
    var webSocketUrl = location.origin.replace(/http/, 'ws') + '/info',
        ws = new WebSocket(webSocketUrl),
        $resultList = $('#resultList');

    ws.onmessage = function (event) {
        $resultList.append('<li>'+ event.data +'</li>');
    };
})();
/* jshint ignore:end */
