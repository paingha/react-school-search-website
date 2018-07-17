export function Logout(props) {
    delete localStorage.token;
    delete localStorage.isAdmin;
    props.history.push('/login');
    return null;
}