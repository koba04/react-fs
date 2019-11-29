declare namespace JSX {
  interface IntrinsicElements {
    file: {
      name: string;
      children: React.ReactNode;
      ref?: import("react").MutableRefObject<any>;
    };
    directory: {
      name: string;
      children?: React.ReactNode;
    };
  }
}
