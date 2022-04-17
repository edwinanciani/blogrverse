
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
    create: `${project}/createportfolio`,
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
  },
  users: {
    form: `${project}/users`,
    resource: `${project}/users/submission`
  },
  activities: {
    form: `${project}/activities`,
    resource: `${project}/activities/submission`
  }
}

export const LoginAction = async (creds) => {
    const action = await fetch(`${config.auth.resource}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)});
    return action;
}
export const deliveryGuy = async(method, url, data, queryParams, noToken = false) => {
  const settings = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
  if(method === 'POST' || method === 'PUT') {
    settings.body = JSON.stringify(data)
  }
  if(!noToken) {
    settings.headers["x-jwt-token"] = localStorage.getItem('formioToken');
  }
  const request = await fetch(`${url}${queryParams ? queryParams : ''}`, settings)
  return request.json();
  
}
export const getPosts = async (params) => {
  return await fetch(`${config.posts.resource}${params.limit ? '?limit=' + params.limit : ''}${params.sort ? '&sort=' + params.sort : ''}`).then((res) => res.json())
}
export const getPostBySlug = async (slug) => {
  const post = await fetch(`${config.posts.resource}?data.slug=${slug}`).then(res => res.json())
  return post.length > 0 ? post[0] : null;
}
export const getPostsByUsername = async (username) => {
  const posts = await fetch(`${config.posts.resource}?data.username=${username}`).then(res => res.json())
  return posts.length > 0 ? posts : null;
}
export const getPortfolio = async (username) => {
  return await deliveryGuy('GET', config.portfolio.resource, null, `?data.username=${username}`, true)
}
export const savePortfolio = async (submission) => {
  const method = submission._id ? 'PUT' : 'POST'
  return await deliveryGuy(method, `${config.portfolio.resource}/${submission._id}`, submission, null)
}
export const getProfile = async () => {
  return await fetch(config.profile.resource).then((res) => res.json())
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
  const token = localStorage.getItem('formioToken')
  const url = post._id ? `${config.posts.resource}/${post._id}` : config.posts.resource
  const method = post._id ? 'PUT' : 'POST'
  return await fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-jwt-token': token
    },
    body: JSON.stringify(post),
  }).then((res) => res.json())
}

