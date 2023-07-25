import { toast } from "react-toastify";

export const showToast = (message) => {
    return (

        toast('message', {
            toastId: 'message',
            type: "success",
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            style: {
                fontFamily: "inherit",
                fontSize: "15px",
                fontWeight: 500,
                marginBottom: "7px",
                display: "inlineBlock",
                color: "#198754",
            },
        })

    );
};

