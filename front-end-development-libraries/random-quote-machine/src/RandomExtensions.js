export default function RandInt(lowerBound = 0, upperBound = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
}