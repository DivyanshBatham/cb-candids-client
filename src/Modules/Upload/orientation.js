// Exif orientation value to css transform mapping
// Does not include flipped orientations
export const rotation = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)',
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export const orientation = (file, callback) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const base64img = `data:${file.type};base64,${arrayBufferToBase64(fileReader.result)}`;
    const scanner = new DataView(fileReader.result);
    let idx = 0;
    let value = 1; // Non-rotated is the default
    if (fileReader.result.length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
      // Not a JPEG
      if (callback) {
        callback(base64img, value);
      }
      return;
    }
    idx += 2;
    let maxBytes = scanner.byteLength;
    while (idx < maxBytes - 2) {
      const uint16 = scanner.getUint16(idx);
      idx += 2;
      switch (uint16) {
        case 0xFFE1: // Start of EXIF
          //   const exifLength = scanner.getUint16(idx);
          maxBytes = scanner.getUint16(idx) - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          // Read the value, its 6 bytes further out
          // See page 102 at the following URL
          // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
          value = scanner.getUint16(idx + 6, false);
          maxBytes = 0; // Stop scanning
          break;
        default:
          break;
      }
    }
    if (callback) {
      callback(base64img, value);
    }
  };
  fileReader.readAsArrayBuffer(file);
};
