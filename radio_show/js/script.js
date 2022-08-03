// calls radio station
function call() {
    $.get("/call", function(responseText){
        console.log("success");
        if (responseText=="yes") {
            console.log("win");
        } else {
            console.log(":(");
        }
    });
}

// has the station reset the count
function reset() {


}