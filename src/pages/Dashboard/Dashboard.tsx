import { MainLayout } from "../../components/MainLayout/MainLayout"
import { WithAuth } from "../../components/WithAuth/WithAuth"

const Dashboard: React.FC = () => {
    return (
        <WithAuth>
            <MainLayout>
                <h1>Dashboard</h1>
            </MainLayout>
        </WithAuth>
    )
}

export default Dashboard