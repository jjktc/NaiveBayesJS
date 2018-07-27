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

function train(imageData, labelData) {
  let images = imageData.split("\n");
  let labels = labelData.split("\n");
  
  console.log("Training using loaded data", {
    images: images,
    labels: labels
  });
  
  let trainer = new Trainer(images, labels);
  console.log(trainer.getImages()[0].print());
}

function run() {
  loadFile("../training/smallimages", function(images) {
    console.log("Loaded image data", {
      success: (images && images != "")
    });

    loadFile("../training/smalllabels", function(labels) {
      console.log("Loaded label data", {
        success: (labels && labels != "")
      });

      train(images, labels);
    });
  });
}