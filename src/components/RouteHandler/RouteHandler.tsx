import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";


const RouteHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Восстановление сохраненного пути при загрузке страницы
        const savedPath = localStorage.getItem('savedPath');
        if (savedPath) {
            navigate(savedPath, {replace: true});
        }
    }, [navigate]);

    useEffect(() => {
        // Сохранение текущего пути перед закрытием окна
        const handleBeforeUnload = () => {
            localStorage.setItem('savedPath', location.pathname);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);

        };
    }, [location.pathname]);

    return null;
};

export default RouteHandler;