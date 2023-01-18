import { MainLayout } from "../../components/MainLayout/MainLayout"
import { WithAuth } from "../../components/WithAuth/WithAuth"

const CollectedDocuments: React.FC = () => {
    return (
        <WithAuth>
            <MainLayout>
                <h1>Collected documents</h1>
            </MainLayout>
        </WithAuth>
    )
}

export default CollectedDocuments