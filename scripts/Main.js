/**
 * Load the contents of a given text file
 *
 * @param {function (string)} callback the callback function that receives the response
 */
function loadFile(sourceUrl, callback) {
  console.log("Loading file asynchronous", sourceUrl);

  var xobj = new XMLHttpRequest();

  xobj.overrideMimeType("application/json");
  xobj.open("GET", sourceUrl, true); // currently asynchronous (async|sync)
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      console.log("XMLHttp Response received", xobj);
      callback(xobj.responseText);
    }
  };

  xobj.send(null);
}

function run() {
  loadFile("../training/testimages", function(data) {
    console.log(data);
  });
}