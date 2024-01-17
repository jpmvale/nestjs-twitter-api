import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';
import { PostType } from '../types/postType.type';
import { FollowRepository } from '../follow/follow.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private followRepository: FollowRepository,
  ) {}

  async listPosts({
    originalPostId,
    userId,
  }: {
    originalPostId: number;
    userId: number;
  }) {
    let allowedUserIds = [];
    if (userId) {
      const follows = await this.followRepository.getFollowingByUserId({
        userId,
      });
      allowedUserIds = follows.map((follow) => follow.followingId);
    }
    return await this.postRepository.listPosts({
      originalPostId,
      allowedUserIds,
    });
  }

  async getPostById({ id }: { id: number }): Promise<Post> {
    return await this.postRepository.getPostById({ id });
  }

  async createPost({
    post,
    type,
    originalPostId,
  }: {
    post: CreatePostDto;
    type?: PostType;
    originalPostId?: number;
  }): Promise<Post> {
    return await this.postRepository.createPost({ post, type, originalPostId });
  }

  async updatePostById({
    id,
    post,
  }: {
    id: number;
    post: UpdatePostDto;
  }): Promise<Post> {
    return await this.postRepository.updatePostById({ id, post });
  }

  async deletePostById({ id }: { id: number }) {
    return await this.postRepository.deletePosts({ ids: [id] });
  }

  async deletePosts({ ids }: { ids: number[] }) {
    return await this.postRepository.deletePosts({ ids });
  }
}
