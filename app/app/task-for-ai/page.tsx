// app/page.js
'use client';

import TasksForAi from "@/app/components/TasksForAi";
import Layout from "../Layout";

export default function Page() {
    return (
        <Layout>
            <TasksForAi />
        </Layout>
    );
}
