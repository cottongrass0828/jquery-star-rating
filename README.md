jQuery Star Rating Plugin
======================================================================================
Original Plugin: [jQuery Star Rating Plugin](http://irfandurmus.com/projects/jquery-star-rating-plugin/) 

![image](https://github.com/cottongrass0828/jquery-star-rating/assets/72060740/4ffcaadb-0c52-4848-bacf-c143e791c403)

I forked and updated this plugin to support setting some configuration according to needs
 1. set the number of stars by JavaScript
 2. set the data-caseno and you can get it by callback function after clicking the stars
 3. set the number of starts that should light up by value (html attribute reference)
 4. bring callback function to be a configuration key
--------------------------------------
## How to use 
### 1. Include css and js files
    <link rel="stylesheet" type="text/css" src="rating.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="rating.js"></script>

### 2. Prepare HTML part
    <section class="starRate"></section>

### 3. Initialize the plugin
Write just a line code inside the document.ready function.

    $('.starRate').rating();

--------------------------------------
### Example HTML
    <!-- default 5 stars and none of one is light up-->
    <section class="starRate"></section>

    <!-- set the light up number by value / can carry a data that want to get by set data-caseno-->
    <section class="starRate" value="3" data-caseno="A0001"></section>

### Simple usage
    $('.starRate').rating();

### Using with configuration 
    $('.starRate').rating({
            starNum: 8,
            callback: function (caseno, vote, event) {
                console.log('val:' + vote, ' caseno:' + caseno);
            }
        });

## Acknowledgements
This plugin was inspired by [jQuery Star Rating Plugin](http://irfandurmus.com/projects/jquery-star-rating-plugin/) .
