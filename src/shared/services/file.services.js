const fs = require('fs');
const sharedConstants = require('../constants');

const fileServices = {};


// service-name: fileFormatIdentifier
// service-description: Indentify the format of
//        file based on base64 data
fileServices.fileFormatIdentifier = async (base64Data) => {
  const decodedData = Buffer.from(base64Data, 'base64');

  if (
    decodedData[0] === 0x89 &&
    decodedData[1] === 0x50 &&
    decodedData[2] === 0x4E &&
    decodedData[3] === 0x47
  ) {
    return 'png';
  } else if (decodedData[0] === 0xFF && decodedData[1] === 0xD8) {
    return 'jpeg';
  } else if (decodedData.toString('utf-8', 0, 5) === '%PDF-') {
    return 'pdf';
  } else {
    return 'Unknown';
  }
};

// service-name: saveBase64toFile
// service-description: save the base64 format data to a file
fileServices.saveBase64toFile = async ({
  fileName,
  base64Data
}) => {
  const format = await fileServices.fileFormatIdentifier(base64Data);

  // Convert Base64 to binary data
  const binaryData = Buffer.from(base64Data, 'base64');

  const filePath = `${sharedConstants.masterConstants.TMP_FOLDER_PATH}${fileName}.${format}`;

  // Write the binary data to a file
  const writeFile = await fileServices.writeFile(filePath, binaryData);

  if (writeFile) {
    return filePath;
  }

  return false;
}

// @service-name: writeFile
// @service-desc: file service used to write a file on a given path
fileServices.writeFile = async (filePath, binaryData) => {
  console.log(`Write file ${filePath}`);

  fs.writeFileSync(filePath, binaryData, (err) => {
    if (err) {
      return false;
    }
  });
  return true;
};

// @service-name: deleteFile
// @service-desc: file service used to delete a file on a given path
fileServices.deleteFile = async (filePath) => {
  console.log(`delete file ${filePath}`);

  fs.unlink(filePath, (err) => {
    if (err) {
      return false;
    }
  });
  return true;
};

module.exports = fileServices;