export interface RelatedComments {
  _id: string;
  comment: string;
  post: string;
  previousComment: null;
  relatedCommentsCount: number;
  likesCount: number;
  likedByCreator: Boolean;
  user: string;
}
