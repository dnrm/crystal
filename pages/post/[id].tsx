import React from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'

interface Props {
    slug: string
}

const Post = ({ slug }: Props) => {

    const router = useRouter();

    const { id } = router.query

    console.log(router.query)

    console.log(id)

    return (
        <div>
            {/* <Head>
                <title>{ slug.split('-') }</title>
            </Head>
            <h1>{ slug.split('-') }</h1> */}
        </div>
    )
}

export default Post