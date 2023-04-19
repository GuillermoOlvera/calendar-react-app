import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onClearErrorMessage, onLogin, onLogout, onchecking } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch(onchecking());

        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            dispatch(onLogout('Incorrect email or password'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)

        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch(onchecking());

        try {
            
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            dispatch(onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10);

        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {

            const { data } = calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }


    return {
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        checkAuthToken,
        startLogin,
        startRegister
    }
}