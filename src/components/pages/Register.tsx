import ModalRegister from "../ModalRegister"

  export default function Auth() {
    return (
      <div className="auth-page">
        <div className="auth">
          <img className="logo" src="./public/logo.svg" alt="" />
          <ModalRegister></ModalRegister>
        </div>
      </div>
    )
  }
  