/*jshint node:true */
'use strict';
var _ = require('lodash'),
    environmentQuestion = {
        config : 'environment',
        type : 'list', // list, checkbox, confirm, input, password
        message : 'Which environment would you like to use?',
        default : 'staging', // default value if nothing is entered
        choices : ['local']
    };

module.exports = function(grunt) {

    grunt.config.set('prompt', {
        deploy : {
            options : {
                questions : [
                    getEnvironmentQuestion(['staging', 'production'], 'staging')
                ]
            }
        },
        build : {
            options : {
                questions : [
                    getEnvironmentQuestion(['staging', 'production'], 'staging')
                ]
            }
        },
        dataLoad : {
            options : {
                questions : [
                    getEnvironmentQuestion(['local', 'staging'], 'local')
                ]
            }
        },
        dataSave : {
            options : {
                questions : [
                    getEnvironmentQuestion(['local', 'staging', 'production'], 'local')
                ]
            }
        },
        mongoUsername : {
            options : {
                questions : [
                    {
                        config: 'mongo.username',
                        type: 'input',
                        message: function() {
                            return 'Please enter your '+ grunt.config.get('environment') +' mongo username.';
                        },
                        validate: function(value) {
                            return !!value;
                        }
                    }
                ]
            }
        },
        mongoPassword : {
            options : {
                questions : [
                    {
                        config: 'mongo.password',
                        type: 'input',
                        message: function() {
                            return 'Please enter your '+ grunt.config.get('environment') +' mongo password.';
                        },
                        validate: function(value) {
                            return !!value;
                        }
                    }
                ]
            }
        }
    });
};

function getEnvironmentQuestion(envs, defaultIs) {
    var question = _.clone(environmentQuestion);
    question.choices = envs || question.choices;
    question.default = defaultIs || question.default;
    return question;
}
