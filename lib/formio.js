export const project = process.env.NEXT_FORMIO_PROJECT || 'https://github-pnmbstpsfwdvnhy.form.io'


export const config = {
  posts: {
    form: `${project}/posts`,
    resource: `${project}/posts/submission`
  },
  auth: {
    form: `${project}/auth`,
    resource: `${project}/auth/submission`
  },
  portfolio: {
    form: `${project}/portfolio`,
    resource: `${project}/portfolio/submission`,
  },
  profile: {
    form: `${project}/profiles`,
    resource: `${project}/profiles/submission`,
  },
  category: {
    form: `${project}/category`,
    resource: `${project}/category/submission`
  }
}

export const getPosts = async (params) => {
  return await fetch(`${config.posts.resource}${params.limit ? '?limit=' + params.limit : ''}${params.sort ? '&sort=' + params.sort : ''}`).then((res) => res.json())
}
export const getPostBySlug = async (slug) => {
  const post = await fetch(`${config.posts.resource}?data.slug=${slug}`).then(res => res.json())
  return post.length > 0 ? post[0] : null;
}
export const getPortfolio = async () => {
  const request = await fetch(config.portfolio.resource).then((res) => res.json())
  return request[0]
}
export const getProfile = async () => {
  const request = await fetch(config.profile.resource).then((res) => res.json())
  return request[0]
}
export const getCategories = async (params) => {
  return await fetch(`${config.category.resource}${params.limit ? '?limit=' + params.limit : ''}${params.sort ? '&sort=' + params.sort : ''}`).then((res) => res.json())
}
export const postCategories = async (category) => {
  return await fetch(`${config.category.resource}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category),
  }).then((res) => res.json())
}
export const sendPost = async (post) => {
  return await fetch(`${config.posts.resource}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  }).then((res) => res.json())
}

