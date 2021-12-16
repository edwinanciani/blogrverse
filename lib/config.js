const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

export const getUsername = (req) => {
  const { headers: {host} } = req
  const paths = host.split('.')
  if(paths[0] === 'www') {
    return 'redirectHome'
  }
  if(paths.length === 2 && paths.includes('com')) {
    return 'redirectHome'
  }
  if(paths.length === 1 && paths[0].includes('localhost')) {
    return 'redirectHome'
  }
  return paths[0]
}