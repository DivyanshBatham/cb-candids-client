class RandomColor {
  constructor() {
    this.colors = ['#FFB301', '#F57C00', '#E91E63', '#8BC34A', '#00B8D9'];
    this.lightColors = ['#fbf3e1', '#faeee1', '#fde8ef', '#f3f9ec'];

    this.lastColor = '#FFB301'; // For getColorGauranteed()
    this.lastLightColor = '#fbf3e1'; // For getColorGauranteed()
  }

    getColorGuaranteed = () => {
      const newColorsPool = this.colors.filter(color => color !== this.lastColor);
      this.lastColor = newColorsPool[Math.floor(Math.random() * newColorsPool.length)];
      return this.lastColor;
    }

    getLightColorGuaranteed = () => {
      const newColorsPool = this.lightColors.filter(color => color !== this.lastLightColor);
      this.lastLightColor = newColorsPool[Math.floor(Math.random() * newColorsPool.length)];
      return this.lastLightColor;
    }
}

export default new RandomColor();
