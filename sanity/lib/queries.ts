import { groq } from 'next-sanity'

// Obtener todos los posts publicados por idioma
// También incluye posts sin idioma asignado para compatibilidad
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && (language == $language || !defined(language))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      _id,
      title
    }
  }
`

// Obtener un post por slug con sus traducciones
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    language,
    publishedAt,
    mainImage,
    body,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title
    },
    "translations": *[_type == "translation.metadata" && references(^._id)][0] {
      "translations": translations[].value->{
        _id,
        language,
        "slug": slug.current
      }
    }.translations
  }
`

// Obtener todos los slugs con su idioma (para generateStaticParams)
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    language
  }
`

// Obtener posts por categoría e idioma
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]._ref && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->{
      name,
      image
    }
  }
`