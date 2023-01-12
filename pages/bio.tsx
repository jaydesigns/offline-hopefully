import Link from "next/link";
import Layout from '../components/layout'

const Bio = () => {
    return(
        <Layout>
            <main>
                <h1>Yellow!</h1>
                <Link href={"/"}>Home</Link>
            </main>
        </Layout>
    )
}

export default Bio;