// Funciton merges two strings together
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

// Function returns a world result
// c = correct; p = almost correct; a = not correct;
function checkWord(guess: string, answer: string): string {
  let result: string = '';
  for (let i = 0; i < guess.length; i += 1) {
    if (guess[i] === answer[i]) {
      result += 'c';
    } else if (answer.includes(guess[i])) {
      result += 'p';
    } else {
      result += 'a';
    }
  }
  return result;
}

// Candidate Struc
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

// Displays votes and some vote percentages. Also calls electionWinner function
function displayElectionStats(candidateList: Array<Candidate>): void {
  // Count up votes
  const totalVotesPerCand: Array<number> = [];
  let totalVotes: number = 0;
  for (let i = 0; i < candidateList.length; i += 1) {
    let runningTotal: number = 0;
    for (let j = 0; j < candidateList[i].votes.length; j += 1) {
      runningTotal += candidateList[i].votes[j];
    }
    totalVotes += runningTotal;
    totalVotesPerCand.push(runningTotal);
  }

  // Precent vote
  const percentVote: Array<number> = [];
  for (let i = 0; i < candidateList.length; i += 1) {
    percentVote.push(totalVotesPerCand[i] / totalVotes);
  }

  // Display name and total vote
  // Looked up on video for 2 decimal floating point numbers and found toFixed function
  // https://www.youtube.com/watch?v=4ykEphpAG58
  for (let i = 0; i < candidateList.length; i += 1) {
    console.log(
      // I don't like this formatting but the mods keep forcing it this way. Is there a way to turn it off?
      `${candidateList[i].name} --- ${totalVotesPerCand[i]} --- ${(percentVote[i] * 100).toFixed(
        2
      )} %`
    );
  }

  // Display Precincts
  for (let i = 0; i < candidateList.length; i += 1) {
    console.log(`${candidateList[i].name}:`);
    for (let j = 0; j < candidateList[i].votes.length; j += 1) {
      let precinctTotal: number = 0;
      for (let k = 0; k < candidateList.length; k += 1) {
        precinctTotal += candidateList[k].votes[j];
      }
      console.log(
        `    Precinct ${j + 1} -- ${((candidateList[i].votes[j] / precinctTotal) * 100).toFixed(
          2
        )}%`
      );
    }
  }

  // Display Cost
  for (let i = 0; i < candidateList.length; i += 1) {
    console.log(
      `${candidateList[i].name} spent  $${(candidateList[i].funding / totalVotesPerCand[i]).toFixed(
        2
      )} per vote`
    );
  }

  // Finding 50% winner
  let fiftyPercentWin: boolean = false; // false = no 50 percent win
  let winnerFirst: number = 1;
  for (let i = 0; i < candidateList.length; i += 1) {
    if (percentVote[i] > 0.5) {
      winnerFirst = i;
      fiftyPercentWin = true;
      i = candidateList.length;
    }
  }
  console.log();
  if (fiftyPercentWin) {
    console.log(`${candidateList[winnerFirst].name} wins with vote percent above 50%!`);
  } else {
    // running off situation
    let winnerSecond: number = 1; // Simular to winnerFirst
    for (let i = 0; i < candidateList.length; i += 1) {
      if (percentVote[winnerFirst] < percentVote[i]) {
        winnerSecond = winnerFirst;
        winnerFirst = i;
      }
    }
    console.log(
      `No 50% win. We are now off to the run-off between ${candidateList[winnerFirst].name} and ${candidateList[winnerSecond].name}`
    );
  }
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

const attempts = ['rains', 'shout', 'scope', 'spoke'];

console.log('Wordle Test');

for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}

/// ////////////////////////////////////////////////////////////
/// / - Election - /////////////////////////////////////////////

const candidate1: Candidate = {
  name: 'Edward Underwood',
  votes: [192, 147, 186, 114, 267],
  funding: 58182890,
};

const candidate2: Candidate = {
  name: 'Rose Olson',
  votes: [48, 90, 12, 21, 13],
  funding: 78889263,
};

const candidate3: Candidate = {
  name: 'Leonard Willis',
  votes: [206, 312, 121, 408, 382],
  funding: 36070689,
};

const candidate4: Candidate = {
  name: 'Nathaniel Taylor',
  votes: [37, 21, 38, 39, 29],
  funding: 6317921937,
};

const myCandidates: Array<Candidate> = [candidate1, candidate2, candidate3, candidate4];

console.log('Vote Tests');
displayElectionStats(myCandidates);
