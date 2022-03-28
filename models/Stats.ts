/**
 * @file This is the stats of a tuit
 */

/**
 * @typedef This interface represents howmany replies, retuits and likes a tuit received.
 * @property {number} replies replies a tuit received
 * @property {number} retuits retuits a tuit received
 * @property {number} likes likes a tuit received
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number
}