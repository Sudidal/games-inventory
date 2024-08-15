class Validators {
  constructor() {}
  isNumberBetween(value) {
    const valueNum = parseFloat(value);
    if (valueNum < 0) return false;
    else if (valueNum > 5) return false;
    else return true;
  }
  async isLinkToImage(value) {
    const supportedFormats = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
    ];
    try {
      let good = false;
      const res = await fetch(value);
      for (let i = 0; i < supportedFormats.length; i++) {
        console.log(
          supportedFormats[i] + "||" + res.headers.get("content-type")
        );
        if (res.headers.get("content-type") === supportedFormats[i]) {
          good = true;
          break;
        }
      }
      if (good) return true;
      else throw "";
    } catch (err) {
      console.log(err);
      throw "";
    }
  }
}

const validators = new Validators();
export default validators;
