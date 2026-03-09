'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { urlFor } from '@/sanity/lib/image';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt?: string;
    mainImage?: {
        asset: { _ref: string };
        alt?: string;
    };
    author?: {
        name: string;
        image?: { asset: { _ref: string } };
    };
    categories?: Array<{ _id: string; title: string }>;
}

interface BlogGridProps {
    posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    const t = useTranslations('blogPage');
    const locale = useLocale();

    // Ordenar posts por fecha de publicación (más reciente primero)
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!posts || posts.length === 0) {
        return (
            <section className="py-16 md:py-24 bg-bg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <p className="text-navy-900/60 text-lg">{t('noPosts')}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPosts.map((post) => (
                        <article
                            key={post._id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-navy-900/5 hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Image */}
                            <Link href={`/${locale}/blog/${post.slug.current}`} className="block relative h-48 overflow-hidden">
                                {post.mainImage ? (
                                    <Image
                                        src={urlFor(post.mainImage).width(600).height(400).url()}
                                        alt={post.mainImage.alt || post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-navy-900 to-blue-800 flex items-center justify-center">
                                        <span className="text-white/50 text-4xl font-bold">ABC</span>
                                    </div>
                                )}
                                {/* Categories */}
                                {post.categories && post.categories.length > 0 && (
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.categories.slice(0, 2).map((category) => (
                                            <span
                                                key={category._id}
                                                className="bg-accent text-navy-900 text-xs font-semibold px-3 py-1 rounded-full"
                                            >
                                                {category.title}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-4 text-sm text-navy-900/50 mb-3">
                                    {post.author && (
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="w-4 h-4" />
                                            <span>{post.author.name}</span>
                                        </div>
                                    )}
                                    {post.publishedAt && (
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>{formatDate(post.publishedAt)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <Link href={`/${locale}/blog/${post.slug.current}`}>
                                    <h2 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <p className="text-navy-900/70 text-sm leading-relaxed line-clamp-3 mb-4">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Read more */}
                                <Link
                                    href={`/${locale}/blog/${post.slug.current}`}
                                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                                >
                                    {t('readMore')}
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
