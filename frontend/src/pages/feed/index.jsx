import { useRouter } from 'next/router';

import styles from "./style.module.css";

import UserLayout from '@/layouts/UserLayout';
import FeedLayout from '@/layouts/FeedLayout';

export default function index() {
    const route = useRouter();

    return (
        <UserLayout>

            <FeedLayout>
                <div className={styles.container}>

                    <p>lol posts</p>

                </div>
            </FeedLayout>

        </UserLayout>
    );
}
