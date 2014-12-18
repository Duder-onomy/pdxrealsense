## pdxrealsense

### Dev workflow

```shell
gulp
```

The above will server the app, jshint, reload on server file changes, run sass, etc.
The below will simple run the app. Since html and scss files have to be there, `gulp` has to be run at least once previously.

```shell
node app
```

To rebuild admin :
```shell
grunt admin:build
```

To deploy :
ensure you have all of the necessary configs in app/configs for the environment you want to deploy to.
then run:

```shell
grunt deploy
```

### TODOS:

* add styling to prefix to have right border on small bucket
* create demo content types in gh and have home page show gh content
* make this a template with a customizeable project / db name
* have grunt data:load run after the template runs
* deploy to heroku, super easy.
* built in analytics (google, chartbeat, new relic, mixpanel)
* ensure, jshint, csshint, jadelint, htmllint
* cache busting brah.
