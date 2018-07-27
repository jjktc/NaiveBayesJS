/**
 * A calculated Profile of a given image category
 */
class Profile {

  /**
   * Initialize a Profile of the given label
   *
   * @param {string} label the label to use
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
   * Process the given image and affect the feature probability table
   *
   * @param {Image} image the image to process the probability of
   * @param {array} featureProbability the feature probability table
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
   * Increment the given feature probability table cell if applicable
   *
   * @param {Image} image the image to process features from
   * @param {number} row the row of the table
   * @param {number} col the col of the table
   * @param {array} featureProbability the probability table for all features
   */
  addFeatureProbability(image, row, col, featureProbability) {
    if (image.getFeatures()[row][col].getState()) {
      featureProbability[row][col]++;
      this.probabilityTable[row][col]++;
    }
  }

  /**
   * Calculate the balanced probability table based on totals and the smoothing factor to avoid div0
   */
  calculateProbabilityTable() {
    for (let row = 0; row < this.probabilityTable.length; row++) {
      for (let col = 0; col < this.probabilityTable[row].length; col++) {
        this.probabilityTable[row][col] = (this.smoothingFactor + this.probabilityTable[row][col]) / ((2.0 * this.smoothingFactor) + this.profileTotal);
      }
    }
  }

  /**
   * Calculate the probability an image belongs to the current set
   *
   * @param {Image} image the image to classify
   * @return {number} the probability it matches the training data
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
   * Calculate the probability of the feature based on if it matches the given set
   *
   * @param {Feature} feature the feature to classify with
   * @param {array} featureProbability the probability table
   * @return {number} the probability of the singular feature
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