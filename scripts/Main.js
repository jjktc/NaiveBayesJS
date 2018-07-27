var autoClassify = true;
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
      callback(xobj.responseText);
    }
  };

  xobj.send(null);
}

/**
 * Train the model with the given image data and label data
 *
 * @param {string} imageData the data from the training images file
 * @param {string} labelData the data from the training labels file
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

  if (!autoClassify) {
    return;
  }

  loadFile("../training/testimages", function(classifyImageData) {
    loadFile("../training/testlabels", function(classifyLabelData) {
      let classifyTrainer = new Trainer(classifyImageData.split("\n"), classifyLabelData.split("\n"));

      this.classifyImages = classifyTrainer.getImages();
      this.classifyLabels = classifyTrainer.getLabels();

      this.correctTotal = 0;
      this.analyzedTotal = 0;
      this.preanalyzedTotal = Math.min(classifyImages.length, classifyLabels.length);

      if (this.autoClassify)
        classify(0);
    });
  });
}

/**
 * Use the generated model to classify the test set
 *
 * @param {number} index the image index to classify
 */
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
  document.getElementById("accuracy").innerHTML = String((100 * (correctTotal / analyzedTotal))).substr(0, 2) + "%";

  let imagePrint = this.classifyImages[index].print();
  let specimen = document.getElementById("specimen");
  specimen.innerHTML = "";

  let regexLight = new RegExp(" ", 'g');
  let regexDark = new RegExp("\\#", 'g');

  for (let i = 0; i < imagePrint.length; i++) {
    let line = imagePrint[i].replace(regexLight, "&nbsp;&nbsp;&nbsp;").replace(regexDark, "&lhblk;");

    let lineObj = document.createElement("p");
    lineObj.innerHTML = line;

    specimen.appendChild(lineObj);
  }

  setTimeout(function() {
    classify(index + 1);
  }, 50);
}

/**
 * Run the Naive Bayes classifier
 *
 * @param {boolean} autoClassify if the classifier should auto run on a test set
 */
function run(autoClassify) {
  this.autoClassify = (autoClassify == undefined || autoClassify);

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