function addTable() {
  let table = document.getElementById("drawTable");

  for (let i = 0; i < 28; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 28; j++) {
      let cell = document.createElement("td");
      cell.innerHTML = "&nbsp";
      row.appendChild(cell);

      let oThis = this;
      cell.addEventListener("mouseenter", function() {
        if (!oThis.mouseDown) {
          return;
        }

        oThis.picture[i][j] = oThis.mouseColor;

        cell.style.backgroundColor = (oThis.picture[i][j]) ? "black" : "white";
      });
      cell.addEventListener("mousedown", function() {
        oThis.mouseColor = !(oThis.picture[i][j]);
      });
    }

    table.appendChild(row);
  }
}

function getCenteredPicture() {
  let topOffset = 0;

  for (let row = 0; row < this.picture.length; row++) {
    if (hasTrueCell(this.picture[row])) {
      break;
    }

    topOffset++;
  }

  let bottomOffset = 0;

  for (let row = this.picture.length - 1; row >= 0; row--) {
    if (hasTrueCell(this.picture[row])) {
      break;
    }

    bottomOffset++;
  }

  let leftOffset = 0;

  for (let col = 0; col < this.picture[0].length; col++) {
    var found = false;
    for (let i = 0; i < this.picture.length; i++) {
      if (this.picture[i][col]) {
        found = true;
      }
    }

    if (found) break;

    leftOffset++;
  }

  let rightOffset = 0;

  for (let col = this.picture[0].length - 1; col >= 0; col--) {
    var found = false;
    for (let i = 0; i < this.picture.length; i++) {
      if (this.picture[i][col]) {
        found = true;
      }
    }

    if (found) break;

    rightOffset++;
  }

  var newPicture = [];

  for (let i = topOffset; i < this.picture.length - bottomOffset; i++) {
    newPicture.push(this.picture[i]);
  }

  var emptyLine = makeBlankArray(28, 1)[0];
  console.log("Empty line", emptyLine);

  var missingLines = bottomOffset + topOffset;
  var addedTop = true;

  for (var i = 0; i < missingLines; i++) {
    if (addedTop) {
      newPicture.push(emptyLine);
    } else {
      newPicture.unshift(emptyLine);
    }

    addedTop = !addedTop;
  }

  return newPicture;
}

function convertPicture(picture) {
  var newPicture = [];

  for (var i = 0; i < picture.length; i++) {
    var row = "";

    for (var j = 0; j < picture[i].length; j++) {
      row += (picture[i][j] ? "#" : " ");
    }

    newPicture.push(row);
  }

  return newPicture;
}

function onclickClassify() {
  var image = convertPicture(getCenteredPicture());
  var labels = [""];

  let classifyTrainer = new Trainer(image, labels);

  console.log(classifyTrainer.getImages()[0].print());
  let label = this.model.classifyImage(classifyTrainer.getImages()[0]);

  console.log(label);
  document.getElementById("recognized").innerHTML = label;
}

function hasTrueCell(row) {
  for (let i = 0; i < row.length; i++) {
    if (row[i]) {
      return true;
    }
  }

  return false;
}

function onclickClear() {
  this.picture = makeBlankArray(28, 28);
  
  var elements = document.getElementsByTagName("td");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "white";
  }
}

function makeBlankArray(width, height) {
  var array = [];

  for (let i = 0; i < height; i++) {
    var row = [];

    for (let j = 0; j < width; j++) {
      row.push(false);
    }

    array.push(row);
  }

  return array;
}