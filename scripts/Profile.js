/**
 *
 */
class Profile {
  
  /**
   *
   */
  constructor(label) {
    this.label = label;
    
    this.imageSize = this.getImageSize();
    this.smoothingFactor = this.getSmoothingFactor();
    
    this.probabilityTable = [];
    for (let i = 0; i < this.imageSize; i++) {
      let row = [];
      
      for (let j = 0; j < this.imageSize; j++) {
        row.push(0.0);
      }
      
      this.probabilityTable.push(row);
    }
  }
  
  /**
   *
   */
  processImage(image, featureProbability) {
    let features = image.getFeatures();
    for (let row = 0; row < features.length; row++) {
      for (let col = 0; col < features[row].length; col++) {
        this.addFeatureProbability(image, row, col, featureProbability);
      }
    }
  }
  
  /**
   *
   */
  addFeatureProbability(image, row, col, featureProbability) {
    if (image.getFeatures()[row][col].getState()) {
      featureProbability[row][col]++;
      this.probabilityTable[row][col]++;
    }
  }
  
  /**
   *
   */
  calculateProbabilityTable() {
    for (let row = 0; row < this.probabilityTable.length; row++) {
      for (let col = 0; col < this.probabilityTable[row].length; col++) {
        this.probabilityTable[row][col] = (this.smoothingFactor + this.probabilityTable[row][col]) / ((2.0 * this.smoothingFactor) + this.profileTotal);
      }
    }
  }
  
  /**
   *
   */
  classifyProbability(image) {
    let features = image.getFeatures();
    
    let probability = Math.log(this.profileProbability);
    
    for (let row = 0; row < this.probabilityTable.length; row++) {
      for (let col = 0; col < this.probabilityTable[row].length; col++) {
        probability += this.classifyFeatureProbability(features[row][col], this.probabilityTable[row][col]);
      }
    }
    
    return probability;
  }
  
  /**
   *
   */
  classifyFeatureProbability(feature, featureProbability) {
    if (feature.getState()) {
      return Math.log(featureProbability);
    }
    
    return Math.log(1.0 - featureProbability);
  }
  
  /* GETTER */
  
  getLabel() {
    return this.label;
  }
  
  getProbabilityTable() {
    return this.probabilityTable;
  }
  
  getProfileProbability() {
    return this.profileProbability;
  }
  
  setProfileProbability(probability) {
    this.profileProbability = probability;
  }
  
  setProfileTotal(total) {
    this.profileTotal = total;
  }
  
  getSmoothingFactor() {
    return 0.001;
  }
  
  getImageSize() {
    return 28;
  }
  
}