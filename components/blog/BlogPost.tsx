'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import { CalendarIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { urlFor } from '@/sanity/lib/image';

interface Translation {
    _id: string;
    language: string;
    slug: string;
}

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    language?: string;
    publishedAt: string;
    mainImage?: {
        asset: { _ref: string };
        alt?: string;
    };
    body?: PortableTextBlock[];
    author?: {
        name: string;
        image?: { asset: { _ref: string } };
        bio?: PortableTextBlock[];
    };
    categories?: Array<{ _id: string; title: string }>;
    translations?: Translation[];
}

interface BlogPostProps {
    post: Post;
}

const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold text-navy-900 mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold text-navy-900 mt-6 mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-bold text-navy-900 mt-4 mb-2">{children}</h4>,
        normal: ({ children }) => <p className="text-navy-900/80 leading-relaxed mb-4">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-navy-900/70">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-navy-900/80">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-navy-900/80">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 underline"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="my-8">
                    <Image
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || 'Blog image'}
                        width={800}
                        height={450}
                        className="rounded-xl w-full"
                    />
                    {value.caption && (
                        <figcaption className="text-center text-sm text-navy-900/50 mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

export default function BlogPost({ post }: BlogPostProps) {
    const t = useTranslations('blogPage');
    const locale = useLocale();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="py-16 md:py-24 bg-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back link */}
                    <Link
                        href={`/${locale}/blog`}
                        className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-900 transition-colors mb-8"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        {t('backToBlog')}
                    </Link>

                    {/* Header */}
                    <header className="mb-8">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {post.categories.map((category) => (
                                    <span
                                        key={category._id}
                                        className="bg-accent text-navy-900 text-sm font-semibold px-4 py-1 rounded-full"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-navy-900/60">
                            {post.author && (
                                <div className="flex items-center gap-3">
                                    {post.author.image && (
                                        <Image
                                            src={urlFor(post.author.image).width(48).height(48).url()}
                                            alt={post.author.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div className="flex items-center gap-1">
                                        <UserIcon className="w-4 h-4" />
                                        <span className="font-medium">{post.author.name}</span>
                                    </div>
                                </div>
                            )}
                            {post.publishedAt && (
                                <div className="flex items-center gap-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.mainImage && (
                        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                            <Image
                                src={urlFor(post.mainImage).width(1200).height(600).url()}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {post.body && (
                            <PortableText value={post.body} components={portableTextComponents} />
                        )}
                    </div>

                    {/* Author Bio */}
                    {post.author && post.author.bio && (
                        <div className="mt-12 p-8 bg-white rounded-2xl border border-navy-900/10">
                            <div className="flex items-start gap-4">
                                {post.author.image && (
                                    <Image
                                        src={urlFor(post.author.image).width(80).height(80).url()}
                                        alt={post.author.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                )}
                                <div>
                                    <p className="text-sm text-navy-900/50 mb-1">{t('writtenBy')}</p>
                                    <h3 className="font-bold text-navy-900 text-lg mb-2">{post.author.name}</h3>
                                    <div className="text-navy-900/70 text-sm">
                                        <PortableText value={post.author.bio} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Back to blog */}
                    <div className="mt-12 text-center">
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-navy-800 transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            {t('backToBlog')}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
