import Follow from "../models/Follow";

export default interface IFollowDao {
    follow(followerid: string, followingid: string): Promise<Follow>;

    unfollow(followerid: string, followingid: string): Promise<any>;

    viewFollowers(uid: string): Promise<Follow[]>;

    userFollowing(uid: string): Promise<Follow[]>;
};