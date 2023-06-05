const extractDefaults = (schema: any): any => {
  if (typeof schema !== 'object' || schema === null) {
    return undefined;
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => extractDefaults(item));
  }

  if ('default' in schema) {
    return schema.default;
  }

  const defaults: any = {};

  for (const key in schema) {
    const value = extractDefaults(schema[key]);
    if (value !== undefined) {
      defaults[key] = value;
    }
  }

  return Object.keys(defaults).length > 0 ? defaults : undefined;
};

export const convertToModelKeys = (data: any, defaultModel: any, raw_data: any, raw: boolean) => {
  const defaults = extractDefaults(defaultModel).properties;

  const finalData: any = {};
  Object.keys(defaults).forEach((key) => {
    finalData[key] = data[key] ?? defaults[key];
  });

  if (raw) {
    finalData['raw'] = raw_data;
  }

  return finalData;
};
