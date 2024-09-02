import Modal from "../../../utils/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = ({ modal, setModal, setCreateUser, createUser }) => {
  const hidden = modal ? "visible opacity-100" : "invisible opacity-0";

  return (
    <Modal modal={modal} setModal={setModal} hidden={hidden}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadow ${hidden} transition-all duration-200`}
      >
        <button
          onClick={() => setModal(false)}
          className="absolute top-8 right-8 text-4xl hover:opacity-50 duration-200 "
          aria-label="close modal"
        >
          <IoCloseCircleOutline />
        </button>
        {createUser === "" ? (
          <SignIn setModal={setModal} setCreateUser={setCreateUser} />
        ) : (
          <SignUp setModal={setModal} setCreateUser={setCreateUser} />
        )}
      </section>
    </Modal>
  );
};

export default Auth;
