import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import styles from './Profile.module.css'
const { active, containerSpan, tab, homeLink } = styles;
enum tabs {
    myInfo = 'my-info',
    likedEvents = 'liked-events'

}
export const Profile = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab: tabs) => {
        navigate(`/profile/${tab}`)
    };
    return (
        <div>
            <Link to='/' className={homeLink}> Inicio</Link>
            <div className={containerSpan}>
                <span
                    onClick={() => { handleTabClick(tabs.myInfo) }}
                    className={`${pathname.includes(tabs.myInfo) ? active : ''} ${tab}`}
                    style={{ marginRight: 8, }}>
                    My Info
                </span>
                <span
                    onClick={() => { handleTabClick(tabs.likedEvents) }}
                    className={`${pathname.includes(tabs.likedEvents) ? active : ''} ${tab}`}>
                    Eventos Favoritos
                </span>
            </div>
            <Outlet />
        </div>
    )
}

// Outet ayuda para ingresar a las rutas anidades y solo se declara dentro de el componente padre