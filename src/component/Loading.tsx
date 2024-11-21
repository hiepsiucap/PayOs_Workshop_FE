/** @format */

import { Circles } from "react-loader-spinner";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "0",
    padding: "0",
    zIndex: "50",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity here
  },
};
Modal.setAppElement("#root");
export default function Loading({ modalIsOpen }: { modalIsOpen: boolean }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={
        modalIsOpen
          ? {
              ...customStyles,
              content: {
                ...customStyles.content,
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
              },
            }
          : customStyles
      }
      contentLabel="Example Modal"
    >
      <div className=" w-full h-full flex flex-col justify-center items-center">
        <Circles
          height="100"
          width="100"
          color="#04ABFF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </Modal>
  );
}
