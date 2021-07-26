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
            <Head>
                {/* @ts-ignore */}
                <title>{ id?.split('-') }</title>
            </Head>
            {/* @ts-ignore */}
            <h1>{ id?.split('-') }</h1>
        </div>
    )
}

export default Post
