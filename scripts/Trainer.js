/**
 * Trainer loads the given image and label content and produces loaded Image objects
 */
class Trainer {
  
  /**
   * Create a Trainer with the given line contents
   *
   * @param {array} imageContents the array of image lines
   * @param {array} labels the array of label lines
   */
  constructor(imageContents, labels) {
    this.labels = labels;
    this.chunks = this.chunkify(imageContents);
    
    this.images = [];
    for (let chunk of this.chunks) {
      this.images.push(new Image(chunk));
    }
  }
  
  /**
   * Splits the array into arrays of the correct image size
   *
   * @param {array} contents the array of lines of images
   * @return {array} the array of chunked image data
   */
  chunkify(contents) {
    let imageSize = this.getImageSize();
    
    let chunks = [];
    let currentChunk = [];
    
    for (let i = 0; i < contents.length; i++) {
      if ((i % imageSize) == 0) {
        if (currentChunk.length > 0) {
          chunks.push(currentChunk);
          currentChunk = [];
        }
      }
      
      currentChunk.push(contents[i]);
    }
    
    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
    }
    
    return chunks;
  }
  
  /* GETTERS */
  
  getImageSize() {
    return 28;
  }
  
  getChunks() {
    return this.chunks;
  }
  
  getImages() {
    return this.images;
  }
  
  getLabels() {
    return this.labels;
  }
  
}