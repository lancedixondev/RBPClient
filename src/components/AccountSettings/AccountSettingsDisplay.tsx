import DeleteAccount from "./DeleteAccount";
import ResetPassword from "./ResetPassword";
import Navbar from '../Navbar'


const AccountSettingsDisplay = () => {




    return(<div className="account-settings">
        <DeleteAccount />
        <hr/>
        <ResetPassword />
    </div>)
}



export default AccountSettingsDisplay;