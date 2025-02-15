import InterestPage from './interest/InterestPage'
import Layout from '../components/Layout'

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Layout.Header>
          <h1 className="text-4xl text-neutral-200">Dashboard</h1>
        </Layout.Header>
        <Layout.Main>
          <InterestPage />
          <div className="p-4">main</div>
        </Layout.Main>
      </Layout>
    </>
  )
}

export default Dashboard
