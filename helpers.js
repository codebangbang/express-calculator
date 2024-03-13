function createFrequencyCounter(arr) {
    return arr.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {}); 
}


function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNumber = Number(numsAsStrings[i]);
        if (Number.isNaN(valToNumber)) {
            return new ExpressError(`The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`, 400);
        }
        result.push(valToNumber);
    }
    return result;
}


function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce(function(acc, curr) { 
        return acc + curr;
    }) / nums.length;
}


function findMedian(arr) {
    let median;
    let mid = Math.floor(arr.length / 2);
    let nums = arr.sort((a, b) => a - b);
    if (arr.length % 2 !== 0) {
        median = nums[mid];
    } else {
        median = (nums[mid - 1] + nums[mid]) / 2;
    }
    return median;
}


function findMode(arr) {
    let freqCounter = createFrequencyCounter(arr);
    let count = 0;
    let mostFrequent;
    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
            mostFrequent = key;
            count = freqCounter[key];
        }
    }
    return +mostFrequent;
}



module.exports = {
    createFrequencyCounter,
    convertAndValidateNumsArray,
    findMean,
    findMedian,
    findMode
};