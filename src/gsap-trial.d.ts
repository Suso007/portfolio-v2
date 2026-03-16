declare module "gsap/SplitText" {
  interface SplitTextVars {
    type?: string;
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
    position?: string;
    specialChars?: string[] | ((char: string) => boolean);
    reduceWhiteSpace?: boolean;
    smartWrap?: boolean;
    tag?: string;
  }

  class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    elements: Element[];

    constructor(
      target: string | string[] | Element | Element[] | NodeList,
      vars?: SplitTextVars
    );

    split(vars?: SplitTextVars): this;
    revert(): void;
  }

  export { SplitText };
}
