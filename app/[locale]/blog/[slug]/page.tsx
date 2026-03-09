import { notFound } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPost from "@/components/blog/BlogPost";
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries';

interface PostSlug {
    slug: string;
    language: string;
}

export async function generateStaticParams() {
    const posts: PostSlug[] = await client.fetch(postSlugsQuery);
    // Retornamos solo el slug, el locale viene del segmento padre
    return posts.map((post) => ({ 
        slug: post.slug
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        return {
            title: 'Post not found',
        };
    }

    return {
        title: `${post.title} | ABC Kids Blog`,
        description: post.excerpt || `Read ${post.title} on ABC Kids Blog`,
    };
}

async function getPost(slug: string) {
    return await client.fetch(postBySlugQuery, { slug });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }
    const allTranslations = [
        {
            language: post.language || locale,
            slug: post.slug.current
        },
        ...(post.translations || [])
    ];

    return (
        <main className="min-h-screen">
            <Navbar translations={allTranslations} />
            <BlogPost post={post} />
            <Footer />
        </main>
    );
}
