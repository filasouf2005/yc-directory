import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createsAt desc){
  _id,
    title,
    slug,
    _createdAt,
    views,
    author -> {
      _id, name , bio,image
    },
    description,
    image,
    category,
    
}`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == 'startup' && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    views,
    author -> {
      _id, name , bio,image
    },
    description,
    image,
    category,
    pitch,  
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == 'startup' && _id == $id][0]{
    views}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == 'author' && id == $id ][0]{
    id,
    _id,
    username,
    email,
    name,
    bio,
    image
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == 'author' && _id == $id ][0]{
    id,
    _id,
    username,
    email,
    name,
    bio,
    image
}`);


export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == 'startup' && author._ref == $id ] | order(_createsAt desc){
  _id,
    title,
    slug,
    _createdAt,
    views,
    author -> {
      _id, name , bio,image
    },
    description,
    image,
    category,
    
}`);




