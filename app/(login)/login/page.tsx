import { LoginForm } from "@/components/Forms/Login";

const Login = (): JSX.Element => {
    return (
        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20 align-items-lg-center align-items-start">
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-500px p-9">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
