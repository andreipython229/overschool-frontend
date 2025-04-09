export const formDataConverter = (data: object) => {
  const formdata = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formdata.append(`${key}[${index}]`, String(item)); 
      });
    } else if (typeof value === 'number') {
      formdata.append(key, String(value)); 
    } else {
      formdata.append(key, value as string); 
    }
  });

  return formdata;
};

