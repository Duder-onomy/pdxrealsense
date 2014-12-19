/* jshint ignore:start */
$(document).ready(function () {
    var sense;
    var imageSize;
    var handModule;
    var handConfiguration;

    // check platform compatibility
    /*RealSenseInfo(['hand'], function (info) {
        if (info.IsReady == true) {
            $('#info').append('<b>Platform supports Intel(R) RealSense(TM) SDK feature</b>');
            status('OK');
            document.getElementById("Start").disabled = false;
        } else {
            status('Platform not supported: ' + info.responseText);
            if (info.IsPlatformSupported != true) {
                $('#info').append('<b>Intel� RealSense� 3D camera not found</b>');
            } else if (info.IsBrowserSupported != true) {
                $('#info').append('<b>Please update your browser to latest version</b>');
            } else {
                $('#info').append('<b>Please download and install the following update(s) before running sample: </b>');
                for (i = 0; i < info.Updates.length; i++) {
                    $('#info').append('<a href="' + info.Updates[i].url + '">' + info.Updates[i].href + '</a><br>');
                }
            }
        }
    })*/

    PXCMSenseManager_CreateInstance().then(function (result) {
        sense = result;
        return sense.EnableHand(onHandData);
    }).then(function (result) {
        handModule = result;
        status('Init started');
        return sense.Init(onConnect, onStatus);
    }).then(function (result) {
        return handModule.CreateActiveConfiguration();
    }).then(function (result) {
        handConfiguration = result;
        return handConfiguration.DisableAllAlerts();
    }).then(function (result) {
        if (document.getElementById("gestures").checked)
            return handConfiguration.EnableAllGestures(false);
        else
            return handConfiguration.DisableAllGestures();
    }).then(function (result) {
        return handConfiguration.ApplyChanges();
    }).then(function (result) {
        return sense.QueryCaptureManager();
    }).then(function (capture) {
        return capture.QueryImageSize(pxcmConst.PXCMCapture.STREAM_TYPE_DEPTH);
    }).then(function (result) {
        imageSize = result.size;
        return sense.StreamFrames();
    }).then(function (result) {
        status('Streaming ' + imageSize.width + 'x' + imageSize.height);
    }).catch(function (error) {
        status('Init failed: ' + JSON.stringify(error));
    });

    function clear() {
        $('#alerts_status').text('');
        $('#gestures_status').text('');
        document.getElementById("Start").disabled = false;
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    $('#Stop').click(function () {
        document.getElementById("Stop").disabled = true;
        sense.Close().then(function (result) {
            status('Stopped');
            clear();
        });
    });

    function onHandData(mid, module, data) {
        /*var canvas = document.getElementById('myCanvas'),*/
            /*context = canvas.getContext('2d'),*/
            /*radius = 5,*/
            /*scale = 1;*/

        /*canvas.width = imageSize.width;*/
        /*canvas.height = imageSize.height;*/

        if(!_.has(data, 'hands')) {
            status('NO HANDS!!');
        } else {
            status('Found ' + _.size(data.hands) + ' hand');
            _.each(data.hands, function(hand) {
                /*drawHandOnCanvas(hand, context);*/
            });
        }

        if(_.has(data, 'gestures')) {
            for (g = 0; g < data.gestures.length; g++) {
                currentGesture(data.gestures[g]);
            }
        }
    }

    /*function drawHandOnCanvas(hand, context) {
        var joints = hand.trackedJoint,
            baseX = joints[0].positionImage.x,
            baseY = joints[0].positionImage.y,
            wristX = joints[0].positionImage.x,
            wristY = joints[0].positionImage.y;

        for (j = 0; j < joints.length; j++) {
            if (joints[j] == null || joints[j].confidence <= 0) continue;

            var x = joints[j].positionImage.x;
            var y = joints[j].positionImage.y;

            context.beginPath();
            context.arc(x * scale, y * scale, radius, 0, 2 * Math.PI);
            context.lineWidth = 2;
            context.strokeStyle = 'green';
            context.stroke();

            if (j == 2 || j == 6 || j == 10 || j == 14 || j == 18) {
                baseX = wristX;
                baseY = wristY;
            }

            context.beginPath();
            context.moveTo(baseX * scale, baseY * scale);
            context.lineTo(x * scale, y * scale);
            context.stroke();

            baseX = x;
            baseY = y;
        }
    }*/

    function onConnect(data) {
        if (data.connected == false) {
            $('#alerts_status').append('Alert: ' + JSON.stringify(data) + '<br>');
        }
    }

    function onStatus(data) {
        if (data.sts < 0) {
            status('Error ' + data.sts);
            clear();
        }
    }

    function currentGesture(gesture) {
        $('#currentGesture').text(gesture.name);

        if(gesture.name === 'thumb_up') {
            status('VOTING YES');
            sense.Close().then(function (result) {
                status('Stopped');
                clear();
                $.post('/vote/yes')
                    .success(_goToNextStep);
            });

        } else if(gesture.name === 'thumb_down') {
            status('VOTING NO');
            sense.Close().then(function (result) {
                status('Stopped');
                clear();
                $.post('/vote/no')
                    .success(_goToNextStep);
            });
        }
    }

    function status(msg) {
        $('#status').text(msg);
    }

    function _goToNextStep() {
        $('#nextStep').click();
    }
});
/* jshint ignore:end */
