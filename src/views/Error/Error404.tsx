import styles from './Error404.module.css';
import { useRouteError } from 'react-router-dom'
const { container, title, description } = styles;

export const Error404 = (): JSX.Element => {
    const error: any = useRouteError();
    const { status, data } = error;

    return (
        <div className={container}>
            <h3 className={title}>{status} Ops!</h3>
            <p className={description}>{data}</p>
        </div>
    )
};