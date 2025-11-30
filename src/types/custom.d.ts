/// <reference types="react" />
/// <reference types="vite/client" />

// Declare CSS module imports so TypeScript understands `import styles from './*.module.css'`.
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Generic CSS import (non-module)
declare module '*.css' {
  const content: { [key: string]: string } | string;
  export default content;
}

// Image/static asset fallbacks commonly used in React apps
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}

// Minimal fallbacks when full type packages are not available (helps static checks).
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
}

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_BASE?: string;
    [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Keep this file minimal: only declare static asset / CSS module types and Vite import-meta types.
// Avoid declaring or patching React/Node globals here — rely on installed @types/* packages.
