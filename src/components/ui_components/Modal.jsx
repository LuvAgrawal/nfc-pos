import { IoClose } from "react-icons/io5";

const Modal = ({ children, closeModal }) => {
    return (<>
        <div className="shadow-lg z-60 fixed h-fit w-fit m-auto inset-0">
            <div className="bg-white p-2 rounded-lg shadow-xl flex flex-col">
                <span className="absolute top-0 right-0 p-2">
                    <IoClose
                        className="text-3xl hover:rotate-180 hover:text-gray-600 duration-300 cursor-pointer"
                        onClick={closeModal}
                    />
                </span>

                {/* Prop will open here */}
                <div className="md:max-w-[80dvw] lg:max-w-[60dvw] max-h-[70dvh] overflow-auto"> {children} </div>
            </div>
        </div>
        <div
            className="h-dvh w-dvw backdrop-blur-sm fixed top-0 left-0 z-50 shadow-lg bg-[#000000b3]"
            onClick={closeModal}>
        </div>
    </>);
};

export default Modal;
