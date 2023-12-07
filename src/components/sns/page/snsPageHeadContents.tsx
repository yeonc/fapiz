import Head from 'next/head'
import { ReactNode } from 'react'

const SnsPageHeadContents = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>SNS | Fapiz</title>
        <meta
          name="description"
          content="다양한 사람들의 SNS를 구경하면서 패션에 대한 영감을 받아 보세요"
        />
      </Head>
      {children}
    </>
  )
}

export default SnsPageHeadContents
