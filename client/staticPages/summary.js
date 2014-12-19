/* jshint ignore:start */
(function() {
    var webSocketUrl = location.origin.replace(/http/, 'ws') + '/info',
        ws = new WebSocket(webSocketUrl),
        $yesVotes = $('#yesVotes'),
        $noVotes = $('#noVotes');

    ws.onmessage = function (event) {
        $yesVotes.text(event.yesVotes);
        $noVotes.text(event.noVotes);
    };
})();
/* jshint ignore:end */
