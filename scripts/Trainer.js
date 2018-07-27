/**
 *
 */
class Trainer {
  
  /**
   *
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
   *
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