var model;
var classifyImages;
var classifyLabels;
var preanalyzedTotal = 0;
var analyzedTotal = 0;
var correctTotal = 0;
var accuracy = 0.0;

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

/**
 *
 */
function train(imageData, labelData) {
  let images = imageData.split("\n");
  let labels = labelData.split("\n");
  
  console.log("Training using loaded data", {
    images: images,
    labels: labels
  });
  
  let trainer = new Trainer(images, labels);
  this.model = new Model(trainer);
  
  loadFile("../training/testimages", function(classifyImageData) {
    loadFile("../training/testlabels", function(classifyLabelData) {
      let classifyTrainer = new Trainer(classifyImageData.split("\n"), classifyLabelData.split("\n"));
      
      this.classifyImages = classifyTrainer.getImages();
      this.classifyLabels = classifyTrainer.getLabels();
      
      this.correctTotal = 0;
      this.analyzedTotal = 0;
      this.preanalyzedTotal = Math.min(classifyImages.length, classifyLabels.length);
      
      classify(0);
    });
  });
}

function classify(index) {
  if (index >= this.preanalyzedTotal) {
    return;
  }
  
  this.analyzedTotal++;
  let predictedLabel = this.model.classifyImage(this.classifyImages[index]);
  let actualLabel = this.classifyLabels[index];
  
  this.correctTotal += (predictedLabel == actualLabel) ? 1 : 0;
  
  document.getElementById("analyzedTotal").innerHTML = analyzedTotal;
  document.getElementById("correctTotal").innerHTML = correctTotal;
  document.getElementById("accuracy").innerHTML = String((100 * (correctTotal / analyzedTotal))).substr(0, 4) + "%";
  
  setTimeout(function() {
    classify(index + 1);
  }, 20);
}

/**
 *
 */
function run() {
  loadFile("../training/trainingimages", function(images) {
    console.log("Loaded image data", {
      success: (images && images != "")
    });

    loadFile("../training/traininglabels", function(labels) {
      console.log("Loaded label data", {
        success: (labels && labels != "")
      });

      train(images, labels);
    });
  });
}