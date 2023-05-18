declare module "*.module.css" {
  const styles: { readonly [key: string]: string }
  export default styles
}

declare module "*.module.sass" {
  const styles: { readonly [key: string]: string }
  export default styles
}

declare module "*.module.scss" {
  const styles: { readonly [key: string]: string }
  export default styles
}

declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.jpg" {
  const image: any
  export default image
}

declare module "*.jpeg" {
  const imageJpeg: any
  export default imageJpeg
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL_HOST: string;
    }
  }
}


declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";