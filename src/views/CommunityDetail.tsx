'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { addCommunityReply, getCommunityPost, getCommunityPosts, getDemoProfile, type CommunityPost } from '../lib/demoStore';

export default function CommunityDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [posts, setPosts] = useState(() => getCommunityPosts());
  const [post, setPost] = useState<CommunityPost | undefined>(() => (postId ? getCommunityPost(Number(postId)) : undefined));
  const [reply, setReply] = useState('');

  if (!post) redirect('/community');

  const related = useMemo(
    () => posts.filter((p) => p.id !== post.id && p.subject === post.subject).slice(0, 3),
    [post.id, post.subject, posts],
  );

  const submitReply = () => {
    if (!reply.trim()) return;
    const updated = addCommunityReply(post.id, {
      author: getDemoProfile().name,
      body: reply.trim(),
    });
    if (!updated) return;
    setPost(updated);
    setPosts(getCommunityPosts());
    setReply('');
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-10">
      <Link  href="/community" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft className="h-4 w-4" /> 커뮤니티로 돌아가기
      </Link>

      <article className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="border border-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{post.subject}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              post.type === '질문'
                ? 'bg-blue-50 text-blue-600'
                : post.type === '팁'
                  ? 'bg-orange-50 text-orange-600'
                  : post.type === '멘토링'
                    ? 'bg-purple-50 text-purple-600'
                    : post.type === '추천'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-green-50 text-green-600'
            }`}
          >
            {post.type}
          </span>
          <span className="text-[10px] text-gray-400">· {post.createdAt}</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">{post.title}</h1>
        <div className="text-xs text-gray-400 flex gap-3 mb-6">
          <span>작성자 {post.author}</span>
          <span>조회 {post.views}</span>
          <span>댓글 {post.comments}</span>
        </div>

        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.body}</p>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            <ThumbsUp className="h-4 w-4" /> 도움돼요
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            <Share2 className="h-4 w-4" /> 공유
          </button>
        </div>
      </article>

      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
        <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-600" /> 댓글 {post.replies?.length ?? 0}개
        </h2>

        <div className="space-y-5 mb-6">
          {(post.replies ?? []).map((r, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                {r.author.slice(0, 1)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm">{r.author}</span>
                  <span className="text-[11px] text-gray-400">{r.createdAt}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}
          {(!post.replies || post.replies.length === 0) && (
            <p className="text-sm text-gray-400 text-center py-6">아직 댓글이 없습니다. 첫 댓글을 남겨보세요.</p>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none min-h-[80px]"
          />
          <button
            type="button"
            onClick={submitReply}
            className="bg-blue-600 text-white font-bold px-5 rounded-xl hover:bg-blue-700 self-stretch"
          >
            등록
          </button>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">같은 과목 인기 글</h2>
          <div className="space-y-3">
            {related.map((r) => (
              <Link
                key={r.id}
                 href={`/community/${r.id}`}
                className="block bg-white rounded-2xl border border-gray-200 p-4 hover:border-blue-300"
              >
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{r.title}</h3>
                <p className="text-xs text-gray-500 truncate">{r.body}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
