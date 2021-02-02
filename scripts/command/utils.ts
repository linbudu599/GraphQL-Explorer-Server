export const isValidEntityName = (str: string) =>
  str
    .split("")
    .every(
      (item) =>
        ![
          ",",
          ":",
          "-",
          "_",
          "$",
          "%",
          "@",
          "!",
          "^",
          "&",
          "*",
          "(",
          ")",
          "+",
          "{",
          "}",
          "[",
          "]",
          "<",
          ">",
          "/",
          "\\",
        ].includes(item)
    );

export const pascalize = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
