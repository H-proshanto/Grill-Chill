export const getFraction = decimal => {
  if (decimal % 1 === 0) return decimal.toString();
  const gcd = function (a, b) {
    if (!b) return a;

    return gcd(b, a % b);
  };

  decimal = decimal.toFixed(2);
  let denominator = 100;
  let numerator = decimal * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;
  const result = numerator.toString() + '/' + denominator.toString();
  return result;
};
