import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
      email: {label: 'Email', type: 'email', placeholder:'edwin@form.io'},
      password: {label: 'Password', type: 'password', placeholder:'Password'}
      },
      async authorize(credentials, req) {
        const request = {data: {...credentials}}
        console.log(request);
        const res = await fetch('https://github-pnmbstpsfwdvnhy.form.io/portfoliologin/submission', {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {'Content-Type': 'application/json'}
        }).catch((err) => {console.log(err);})
        const headers = res.headers;
        console.log(headers['x-jwt-token']);
        const user = await res.json().catch((err) => {console.log(err);})
        console.log(user);
        if (res.ok && user) {
          return user
        }

        return null
      }
    })
  ]
})
