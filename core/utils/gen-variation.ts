const genVariations = (input: any[][]) => {
  let output: any[][] = [];

  const gen = (mtx: any[][], curr: any[], dep: number) => {
    if (dep === mtx.length) {
      output.push(Array.from(curr));
      return;
    }

    for (let i = 0; i < mtx[dep].length; i++) {
      curr[dep] = mtx[dep][i];
      gen(mtx, curr, dep + 1);
    }
  };
  gen(input, [], 0);

  return output;
};

export { genVariations };
