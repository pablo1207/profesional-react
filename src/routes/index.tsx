import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {
    Home,
    Detail,
    Error404,
    Profile,
    MyInfo,
    LikedEvents
} from '../views'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404 />
    },
    {
        path: '/detail/:eventId',
        element: <Detail />
    },
    {
        path: '/profile',
        element: <Profile />,
        children: [
            {
                path: 'my-info',
                element: <MyInfo />
            },
            {
                path: 'liked-events',
                element: <LikedEvents />
            },
        ]
    },
]);

const MyRoutes = (): JSX.Element => <RouterProvider router={router} />;

export default MyRoutes;