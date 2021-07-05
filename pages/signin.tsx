import { getProviders, signIn } from 'next-auth/client'

export default function SignIn({ providers }: any) {
  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any){
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/