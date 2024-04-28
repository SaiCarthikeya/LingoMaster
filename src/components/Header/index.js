import Logo from '../../res/Logo.png'
import './index.css'


const Header = () => (
    <div className='header-container'>
        <img src={Logo} className='logo' alt="logo"/>
    </div>
)

export default Header