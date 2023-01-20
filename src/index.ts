function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const newArray: Array<number> = [];
  let smallestNumber: number = 0;
  let largestNumber: number = 0;
  let largestArray: boolean = false; // false = arr1 is biggest; true = arr2 is biggest

  if (arr1.length >= arr2.length) {
    largestNumber = arr1.length;
    smallestNumber = arr2.length;
  } else {
    largestNumber = arr2.length;
    smallestNumber = arr1.length;
    largestArray = true;
  }

  for (let i = 0; i < smallestNumber; i += 1) {
    newArray.push(arr1[i]);
    newArray.push(arr2[i]);
  }

  for (let i = smallestNumber; i < largestNumber; i += 1) {
    if (largestArray) {
      newArray.push(arr2[i]);
    } else {
      newArray.push(arr1[i]);
    }
  }

  return newArray;
}

// - Merge Test - ///////////////////////////////////////

const array1: Array<number> = [4, 5, 23, 18, 9, -5];
const array2: Array<number> = [18, 74, 88, 3, 7, 44];

const mergedArray1: Array<number> = merge(array1, array2);

console.log(); // dlelete
console.log('Merge Test One: Same Length Arrays.');
console.log(mergedArray1);

/// ////////////////////////////////////////////////////////

const array4: Array<number> = [18, 74, 88, 3];
const array3: Array<number> = [4, 5, 23, 18, 9, -5, 31];

const mergedArray2: Array<number> = merge(array3, array4);

console.log('Merge Test Two: Differenft Length Arrays');
console.log(mergedArray2);

/// ///////////////////////////////////////////////////

const array5: Array<number> = [18, 74, 88, 3];
const array6: Array<number> = [4, 5, 23, 18, 9, -5, 31];

const mergedArray3: Array<number> = merge(array5, array6);

console.log();
console.log(mergedArray3);

/// ///////////////////////////////////////////////////////
/// / - Wordle - /////////////////////////////////////////
