class HLS {
  #hue;
  #lightness;
  #saturation;

  #maxHueValue = 360;
  #minValue = 0;
  #maxLightnessAndSaturationValue = 100;
  #defaultThreshold = 30;

  constructor(hue, lightness, saturation,) {
    this.#validateHLS(hue, lightness, saturation);
    this.#hue = hue;
    this.#lightness = lightness;
    this.#saturation = saturation;
  }

  get hue() {
    return this.#hue;
  }

  set hue(value) {
    this.#validateHue(value);
    this.#hue = value;
  }

  get lightness() {
    return this.#lightness;
  }

  set lightness(value) {
    this.#validateLightness(value);
    this.#lightness = value;
  }

  get saturation() {
    return this.#saturation;
  }

  set saturation(value) {
    this.#validateSaturation(value);
    this.#saturation = value;
  }

  set(hue, lightness, saturation) {
    this.#validateHLS(hue, lightness, saturation);
    this.#hue = hue;
    this.#lightness = lightness;
    this.#saturation = saturation;
  }

  isEqual(other) {
    return (
      this.#hue === other.hue &&
      this.#lightness === other.lightness &&
      this.#saturation === other.saturation
    );
  }
  copy() {
    return new HLS(this.#hue, this.#lightness, this.#saturation);
  }

  add(other) {
    this.#hue += other.hue;
    this.#lightness += other.lightness;
    this.#saturation += other.saturation;

    this.#clampAllValues(this.#hue,this.#lightness,this.#saturation);

  }

  subtract(other) {
    this.#hue -= other.hue;
    this.#lightness -= other.lightness;
    this.#saturation -= other.saturation;

    this.#clampAllValues(this.#hue,this.#lightness,this.#saturation);
  }

  multiply(factor) {
    this.#hue *= factor;
    this.#lightness *= factor;
    this.#saturation *= factor;

    this.#clampAllValues(this.#hue,this.#lightness,this.#saturation);
  }
  // евклидово расстояние между двумя точками в трехмерном пространстве
  // threshold переменная которая определет степень похожести цветов
  isSimilar(other, threshold = this.#defaultThreshold) {

    const distance = Math.sqrt(
      Math.pow(this.#hue - other.hue, 2) +
      Math.pow(this.#lightness - other.lightness, 2) +
      Math.pow(this.#saturation - other.saturation, 2)
    );

    return distance <= threshold;
  }

  toString() {
    return `HLS(${this.#hue}, ${this.#lightness}, ${this.#saturation})`;
  }

  #validateHLS(hue, lightness, saturation) {
    this.#validateHue(hue);
    this.#validateLightness(lightness);
    this.#validateSaturation(saturation);
  }

  #validateHue(value) {
    if (typeof value !== 'number' || isNaN(value) || value < this.#minValue || value > this.#maxHueValue) {
      throw new Error('Hue must be a number between 0 and 360.');
    }
  }

  #validateLightness(value) {
    if (typeof value !== 'number' || isNaN(value) || value < this.#minValue || value > this.#maxLightnessAndSaturationValue) {
      throw new Error('Lightness must be a number between 0 and 100.');
    }
  }

  #validateSaturation(value) {
    if (typeof value !== 'number' || isNaN(value) || value < this.#minValue || value > this.#maxLightnessAndSaturationValue) {
      throw new Error('Saturation must be a number between 0 and 100.');
    }
  }

  #clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  #clampAllValues(hue, lightness, saturation){
    this.#hue = this.#clamp(hue, this.#minValue, this.#maxHueValue);
    this.#lightness = this.#clamp(lightness, this.#minValue, this.#maxLightnessAndSaturationValue);
    this.#saturation = this.#clamp(saturation, this.#minValue, this.#maxLightnessAndSaturationValue);
  }
}


const main = ()=>{
  const color1 = new HLS(120, 50, 75);
  const color2 = new HLS(100, 20, 45);

  let exampleLink = color1;
  console.log(color1 === exampleLink);// true

  let exampleValue = color1.copy()
  console.log(exampleValue === color1);//false

  console.log(exampleValue.isEqual(color1))//true
  console.log(color2.isEqual(color1))//false
  console.log(color1.isEqual(color1));//true

  console.log('===============================');
  color2.multiply(2);
  console.log(color2.toString());// HLS(200, 40, 90)
  color2.multiply(0.5);
  console.log('===============================');
  color1.add(color2);
  console.log(color1.toString()); // HLS(220, 70, 100)
  color1.subtract(color2);
  console.log(color1.toString()); //HLS(120, 50, 55)
  console.log('===============================');
  console.log('Is colors are similar');
  console.log(color1.isSimilar(color2));//false
  console.log(color1.isSimilar(color2, 50));//true

}

const mainValidation = () => {
  try {
    const color1 = new HLS(365, 50, 75);
  } catch (error) {
    console.error(error);
  }

  try {
    const color2 = new HLS(100, 120, 75);
  } catch (error) {
    console.error(error);
  }

  try {
    const color3 = new HLS(100, 80, -5);
  } catch (error) {
    console.error(error);
  }

  try {
    const color4 = new HLS('', {}, null);
  } catch (error) {
    console.error(error);
  }

  try {
    const color5 = new HLS();
  } catch (error) {
    console.error(error);
  }
}

console.log(main());
console.log(mainValidation())
