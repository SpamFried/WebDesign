/*
    For this project, we'll make a "choose your own adventure" game.
    The user will start on the home page, and make decisions to progress the story as they like.
    Whenever they make a decision, we will take them to a different "page"
        - These different pages are actually all the same .hbs file, just filled with different content
    
    We will use a query parameter in our url headers to tell the server where the user is in the story
    Unlike in the books, we don't have to use a number (for example, "go to page 53")!
        - Instead, we can have the paramater be some text that describes the action.
        - Example:
            - "to punch the monster, go to ~~~~?id=punch_monster"
            - "to run away, go to ~~~~?id=run_away"
            
        - This helps you as the writer keep better track of your story...
        - ...and also makes it harder for the user to cheat, since they'd have to guess the param correctly.

    We'll also use hyperlinks so that the user doesn't have to type in the id manually.
*/

var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");

/* swap from rendering html pages to using handlebars pages */
app.set("view engine", "hbs");
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));


/* when the user comes to our home page, send them something */
app.get("/", function(req, res){
    console.log(req.query.decision);  // print out what the user tried to do to the console
    
    /*
        We'll use an object called "data" to store whatever text we'd like to put on screen.
        For now, let's just set some random values, we'll change them below. 
        
                               text_to_show --  this is whatever story related text we want to describe to the user
            option_1_text and option_2_text --  these are the options they're given ("run" or "hide", for example)
        option_1_result and option_2_result --  these are the ids we will send them to when they click an option
    */
    data = {
        text_to_show: "sample sample sample",
        option_1_text: "Option 1",
        option_1_result: "option_1_result",
        option_2_text: "Option 2",
        option_2_result: "option_2_result"
    }
    
    // the id is undefined when they first come to our page. Let's introduce the story to them
    if (req.query.decision == undefined) {
        data.text_to_show = "You, Farmer Jones, wake up in a grimy, dimly lit basement, the door locked. Surrounded by large kegs of your favorite ale, the pig feed, and the farm tools, you begin to worry. You try to move, and as searing pain flashes through your ankle, you become infuriated at the practical jokers, whoever they are. You are too old for this. Struggling to stand up, you find your hands bound. You don't remember anything from the day before, so you examine the room, looking for clues..."
        data.option_1_text = "Look for an escape"
        data.option_2_text = "Study the pig feed"

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=attempted_escape"
        data.option_2_result = "?decision=pig_feed"

        // render the page with this data. Go look at "home.hbs" to see where it all goes!
        res.render("home", data);
    } else if (req.query.decision == "attempted_escape") {
        data.text_to_show = "You ram the door with your shoulder, attempting to dislodge the door from it's hinges. As a sudden pain erupts through your shoulder, you realize you might have alerted whomever--or whatever trapped you here."
        data.option_1_text = "Grab a drink"
        data.option_2_text = "Look for a rock"

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=drink_ale"
        data.option_2_result = "?decision=rock_hunt"
        res.render("home", data);

        // then below this, you'd add more 
    } else if (req.query.decision == "pig_feed") {
        data.text_to_show = "You limp over to the pig feed, frustrated at your circumstances and your lack of physical strength at your age. You make it to the pig feed after much struggle, only to find the bag open and the feed gone. The only thing you can find is some hair-like substance, or perhaps fur, and a singed, ash-colored hole in the burlap."
        data.option_1_text = "Examine the farm tools"
        data.option_2_text = "Try to free your hands"
        data.option_1_result = "?decision=farm_tools"
        data.option_2_result = "?decision=free_hands"
        res.render("home", data);
    
    } else if (req.query.decision == "farm_tools") {
        data.text_to_show = "You walk over to the farm tools, hopeful for a way to realease your hands, but also for more information. Who did it? you won't kow until you restore your memory. You find almost everything to be in order. The tractor fuel, the scythe, the sickles, and the wheelbarrow. You are deeply concerned that the pitchforks are gone, as well as the sheep shears."
        data.option_1_text = "Grab the scythe"
        data.option_2_text = ""
        data.option_1_result = "?decision=take_scythe"
        data.option_2_result = ""
        res.render("home", data);

    } else if (req.query.decision == "free_hands") {
        data.text_to_show = "You strain your arms, trying to break the old rope. You try it a couple more times, until sighing deafeatedly and realizing you will need something to break the rope. You decide in the meantime to look for more clues."
        data.option_1_text = "Examine the kegs"
        data.option_2_text = "Examine the farm tools"
        data.option_1_result = "?decision=beer_kegs"
        data.option_2_result = "?decision=farm_tools"
        res.render("home", data);

    } else if (req.query.decision == "drink_ale") {
        data.text_to_show = "You go over to the beer, but with your hands bound, you can't grab a drink. You sit down in despair, but then you have a spark of insiration! What if you used the alchohol to burn down the door? All you'd need is something to start a fire. You still don't know why you are trapped, but it can't be too hard."
        data.option_1_text = "Look closer"
        data.option_2_text = "Look for flame"
        data.option_1_result = "?decision=inspect_beer"
        data.option_2_result = "?decision=fire_search"
        res.render("home", data);
    } else if (req.query.decision == "rock_search") {
        data.text_to_show = "You crawl on the ground, looking for a rock suitibly sharp to cut rope. You find a match, and decide to pocket it, in case you find a cigar, or perhaps to start a fire. After a couple more minutes of groping around in the near dark, you give up. Perhaps you an find something somewhere else?"
        data.option_1_text = "Search the farm tools"
        data.option_2_text = "Grab a drink"
        data.option_1_result = "?decision=drink_ale"
        data.option_2_result = "?decision=farm_tools2"
        res.render("home", data);
    } else if (req.query.decision == "beer_kegs") {
        data.text_to_show = "You walk over to the beer to find more clues. You find the beer mainly intact, but near it you find animal prints? You consider this for a moment, but then pass it off to be nonsense. That is, until you see more fur.. You deem it inconclusive and continue your search."
        data.option_1_text = "Look closer"
        data.option_2_text = "Study the farm tools"
        data.option_1_result = "?decision=inspect_beer"
        data.option_2_result = "?decision=farm_tools"
        res.render("home", data);
    } else if (req.query.decision == "farm_tools2") {
        data.text_to_show = "You walk over to the farm tools, hopeful for a way to realease your hands, but also for more information. Who did it? you won't kow until you restore your memory. You find almost everything to be in order. The tractor fuel, the scythe, the sickles, and the wheelbarrow. You are deeply concerned that the pitchforks are gone, as well as the sheep shears."
        data.option_1_text = ""
        data.option_2_text = "Take the gasoline"
        data.option_1_result = ""
        data.option_2_result = "?decision=take_gas"
        res.render("home", data);
    } else {


        // the user should never really come here. if they did, you probably typoed one of the decisions
        // let's just send them back to the main page, and log a message for ourselves
        console.log("something broke. the user tried to make decision: " + req.query.decision);

        data.text_to_show = "You broke something"
        data.option_1_text = "Restart"
        data.option_2_text = ""
        data.option_1_result = ""
        data.option_2_result = ""
        res.render("home", data);   // <-------------------
    }
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});