// app/page.js
'use client';

import Messenger from "../../../components/ChatsMessenger";
import Layout from "../../Layout";

export default function Home() {
    return (
        <Layout>
            <Messenger />
        </Layout>

    );
}
