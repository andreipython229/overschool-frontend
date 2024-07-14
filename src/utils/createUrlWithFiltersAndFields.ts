export const createUrlWithFiltersAndFields = (url: string, filters: any, fields?: string[]) => {
    const urlParams = new URLSearchParams();
    
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value: any) => urlParams.append(key, value));
        } else {
          urlParams.append(key, filters[key]);
        }
      });
    }
    
    if (fields && fields.length > 0) {
        // console.log("fields: ", fields);
        
      fields.forEach((field) => urlParams.append('fields', field));
    }
    // console.log("urlParams: ", urlParams);
    
    return `${url}&${urlParams.toString()}`;
  };