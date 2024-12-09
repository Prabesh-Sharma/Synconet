import Layout from '../components/Layout'
import Recommendation from './recommendation/Recommendation'

const Network = () => {
  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Network</h1>
      </Layout.Header>
      <Layout.Main>
        <Recommendation />
      </Layout.Main>
    </Layout>
  )
}

export default Network
