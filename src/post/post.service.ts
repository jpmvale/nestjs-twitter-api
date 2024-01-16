import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async listPosts() {
    return await this.postRepository.listPosts();
  }

  async getPostById({ id }: { id: number }): Promise<Post> {
    return await this.postRepository.getPostById({ id });
  }

  async createPost({ post }: { post: CreatePostDto }): Promise<Post> {
    return await this.postRepository.createPost({ post });
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
