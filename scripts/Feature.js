/**
 * A Feature is the fundamental base unit for classification
 */
class Feature {

  /**
   * Create a Feature from a given symbol
   *
   * @param {string} symbol the symbol the Feature is based on
   */
  constructor(symbol) {
    switch (symbol) {
      case "+":
      case "#":
        // Found an ON pixel
        this.state = true;
        break;
      default:
        // Found an OFF pixel
        this.state = false;
        break;
    }
  }

  /* GETTERS */

  getState() {
    return this.state;
  }

}