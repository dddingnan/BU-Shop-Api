const { XMLBuilder } = require("fast-xml-parser");
const checkIsXml = (contentType) => {
  return contentType === "application/xml";
};

const fortmatXml = (data, arrayNodeName) => {
  const builder = new XMLBuilder({
    arrayNodeName,
  });
  const xmlContent = `<?xml version="1.0"?>${builder.build(data)}`;
  return xmlContent;
};

module.exports = { fortmatXml, checkIsXml };
