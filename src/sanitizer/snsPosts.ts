import { SnsPostForSearching } from 'components/search/snsPostSearchResult'
import { SnsPostForSnsPosts as SnsPostForShowingAllSnsPosts } from 'components/sns/post/snsPosts'
import { SnsPostForHomePage } from 'pages/api/filtered-sns-posts'
import { SnsPostForEditing } from 'pages/sns/post/edit/[snsPostId]'
import {
  SnsPostForPostDetail,
  SnsPostResponseAboutDefaultQuery,
  SnsPostResponseAboutFiltering,
  SnsPostResponseAboutPostDetail,
  SnsPostResponseAboutSearchResult,
  SnsPostResponseAboutShowingAll,
} from 'types/snsPost'
import getFormattedDate from 'utils/getFormattedDate'

export const sanitizeSnsPostsForSearching = (
  posts: SnsPostResponseAboutSearchResult[]
): SnsPostForSearching[] =>
  posts.map(post => {
    const author = post.attributes.author.data.attributes
    const createdDate = new Date(post.attributes.createdAt)
    return {
      id: post.id,
      createdAt: getFormattedDate(createdDate),
      firstImage: {
        url: post.attributes.postImages.data[0].attributes.url,
        altText: post.attributes.postImages.data[0].attributes.alternativeText,
      },
      content: post.attributes.content,
      likeNumbers: post.attributes.likeUsers.data.length,
      author: {
        username: author.username,
        avatarUrl: author.profileImage.data?.attributes.url ?? null,
      },
      commentCount: post.attributes.comments.data.length,
    }
  })

export const sanitizeSnsPostsForHomePage = (
  posts: SnsPostResponseAboutFiltering[]
): SnsPostForHomePage[] => {
  return posts.map(post => ({
    id: post.id,
    createdAt: post.attributes.createdAt,
    author: {
      username: post.attributes.author.data.attributes.username,
      gender: post.attributes.author.data.attributes.gender,
      bodyShape: post.attributes.author.data.attributes.bodyShape,
      fashionStyles: post.attributes.author.data.attributes.fashionStyles,
    },
    postImage: {
      url: post.attributes.postImages.data[0].attributes.url,
      altText: post.attributes.postImages.data[0].attributes.alternativeText,
    },
    likeUsers: post.attributes.likeUsers.data,
  }))
}

export const sanitizeSnsPostForEditing = (
  post: SnsPostResponseAboutDefaultQuery
): SnsPostForEditing => ({
  id: post.id,
  postImages: post.attributes.postImages.data.map(image => ({
    url: image.attributes.url,
    altText: image.attributes.alternativeText,
  })),
  fashionItemInfos: post.attributes.fashionItemInfos,
  postText: post.attributes.content || '',
})

export const sanitizeSnsPostForPostDetail = (
  post: SnsPostResponseAboutPostDetail
): SnsPostForPostDetail => ({
  id: post.id,
  createdAt: post.attributes.createdAt,
  images: post.attributes.postImages.data.map(image => ({
    url: image.attributes.url,
    altText: image.attributes.alternativeText,
  })),
  author: {
    id: post.attributes.author.data.id,
    username: post.attributes.author.data.attributes.username,
    height: post.attributes.author.data.attributes.height,
    weight: post.attributes.author.data.attributes.weight,
    avatarUrl:
      post.attributes.author.data.attributes.profileImage.data?.attributes.url,
  },
  likeUsers: post.attributes.likeUsers.data,
  bookmarkUsers: post.attributes.bookmarkUsers.data,
  content: post.attributes.content ?? '',
  fashionItemInfos: post.attributes.fashionItemInfos ?? [],
})

export const sanitizeSnsPostsForShowingAllSnsPosts = (
  posts: SnsPostResponseAboutShowingAll[]
): SnsPostForShowingAllSnsPosts[] =>
  posts.map(post => ({
    id: post.id,
    firstImage: {
      url: post.attributes.postImages.data[0].attributes.url,
      altText: post.attributes.postImages.data[0].attributes.alternativeText,
    },
  }))
