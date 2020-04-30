
////////////////////////////////////////
function isGetter (obj, prop) {
  return !!obj.__lookupGetter__(prop)
}
////////////////////////////////////////

const getInstanceMethods = (obj) => {
  let keys = []
  let topObject = obj

  const onlyOriginalMethods = (p, i, arr) => {
    return !isGetter(topObject, p) &&
    typeof topObject[p] === 'function' &&
    p !== 'constructor' &&
    (i === 0 || p !== arr[i - 1]) &&
    keys.indexOf(p) === -1
  }

  do {
    const l = Object.getOwnPropertyNames(obj)
      .sort()
      .filter(onlyOriginalMethods)
    keys = keys.concat(l)

    // walk-up the prototype chain
    obj = Object.getPrototypeOf(obj)
  } while (
    // not the the Object prototype methods (hasOwnProperty, etc...)
    obj && Object.getPrototypeOf(obj)
  )

  return keys
}
////////////////////////////////////////
var CC = ProcessInstance.fromIcon( 'HistTrans' );

if ( CC == null )

throw new Error( "No such process icon: ");

if ( !(CC instanceof HistogramTransformation) )
    throw new Error( "The specified icon is not an instance of HistogramTransformation: ");
let methods = getInstanceMethods(CC);
console.writeln("CC METHODS:" + methods);


