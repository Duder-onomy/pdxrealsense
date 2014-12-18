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

    $('#Start').click(function () {
        document.getElementById("Start").disabled = true;
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
            if (document.getElementById("alerts").checked)
                return handConfiguration.EnableAllAlerts();
            else
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
            document.getElementById("Stop").disabled = false;
        }).catch(function (error) {
            status('Init failed: ' + JSON.stringify(error));
            document.getElementById("Start").disabled = false;
        });
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
        var canvas = document.getElementById('myCanvas'),
            context = canvas.getContext('2d'),
            radius = 5,
            scale = 1;

        canvas.width = imageSize.width;
        canvas.height = imageSize.height;

        if(!_.has(data, 'hands')) {
            status('NO HANDS!!');
        } else {
            for (h = 0; h < data.hands.length; h++) {
                var joints = data.hands[h].trackedJoint;
                var baseX = joints[0].positionImage.x;
                var baseY = joints[0].positionImage.y;
                var wristX = joints[0].positionImage.x;
                var wristY = joints[0].positionImage.y;

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
            }
        }

        /*for (a = 0; a < data.alerts.length; a++) {
            $('#alerts_status').text('Alert: ' + JSON.stringify(data.alerts[a]));
        }*/
        if(_.has(data, 'gestures')) {
            for (g = 0; g < data.gestures.length; g++) {
                currentGesture(JSON.stringify(data.gestures[g]));
            }
        }
    }

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
        $('#currentGesture').text();
    }

    function status(msg) {
        $('#status').text(msg);
    }
});
/* jshint ignore:end */
