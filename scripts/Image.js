/**
 * The basic item to categorize
 */
class Image {
  
  /**
   * Create an Image from a given array of string lines
   *
   * @param {array} contents the string contents of the Image
   */
  constructor(contents) {
    this.features = [];
    
    for (let line of contents) {
      let featureLine = this.processLine(line);
      this.features.push(featureLine);
    }
  }
  
  /**
   * Process a string line into an array of Feature objects
   *
   * @param {string} line the string line
   * @return {array} the array of Feature objects
   */
  processLine(line) {
    var features = [];
    
    for (let character of line) {
      features.push(new Feature(character));
    }
    
    return features;
  }
  
  /**
   * Get a string representation of the Image
   *
   * @return {array} an array of rows of the Image
   */
  print() {
    var contents = [];
    for (let row of this.features) {
      var rowContents = "";
      
      for (let feature of row) {
        if (feature.getState()) {
          rowContents += "#";
        } else {
          rowContents += " ";
        }
      }
      
      contents.push(rowContents);
    }
    
    return contents;
  }
  
  /* GETTERS */
  
  getFeatures() {
    return this.features;
  }
  
}