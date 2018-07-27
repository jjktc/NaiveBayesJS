/**
 *
 */
class Model {
  
  /**
   *
   */
  constructor(trainer) {
    this.init();
    this.totalProfileCount = trainer.getImages().length;
    
    this.processData(trainer.getImages(), trainer.getLabels());
  }
  
  init() {
    this.imageSize = this.getImageSize();
    this.profileMap = this.getProfileMap();
    this.profileCount = this.profileMap.size;
    
    this.profileTotals = [];
    this.profiles = [];
    
    for (let i = 0; i < this.profileCount; i++) {
      this.profileTotals.push(0);
      this.profiles.push(new Profile(String(i)));
    }
    
    this.featureProbability = [];
    for (let i = 0; i < this.imageSize; i++) {
      let row = [];
      
      for (let j = 0; j < this.imageSize; j++) {
        row.push(0);
      }
      
      this.featureProbability.push(row);
    }
  }
  
  /**
   *
   */
  processData(images, labels) {
    console.log("Processing images and labels for training");
    
    for (let i = 0; i < images.length && i < labels.length; i++) {
      let index = this.profileMap.get(labels[i]);
      
      this.profileTotals[index]++;
      this.profiles[index].processImage(images[i], this.featureProbability);
    }
    
    for (let i = 0; i < this.profiles.length; i++) {
      this.profiles[i].setProfileTotal(this.profileTotals[i]);
      this.profiles[i].setProfileProbability(this.profileTotals[i] / this.totalProfileCount);
      this.profiles[i].calculateProbabilityTable();
      
      console.log(this.profiles[i].getLabel(), this.profiles[i].getProbabilityTable());
    }
  }
  
  /**
   *
   */
  classifyImage(image) {
    let maxProbability = 0.0;
    let maxLabel = "";
    
    for (let profile of this.profiles) {
      let currentProbability = profile.classifyProbability(image);
      
      if (currentProbability > maxProbability || maxLabel == "") {
        maxProbability = currentProbability;
        maxLabel = profile.getLabel();
      }
    }
    
    return maxLabel;
  }
  
  /* GETTERS */
  
  getProfileMap() {
    var map = new Map();
    
    // Structured to be extendable
    map.set("0", 0);
    map.set("1", 1);
    map.set("2", 2);
    map.set("3", 3);
    map.set("4", 4);
    map.set("5", 5);
    map.set("6", 6);
    map.set("7", 7);
    map.set("8", 8);
    map.set("9", 9);
    
    return map;
  }
  
  getImageSize() {
    return 28;
  }
  
}