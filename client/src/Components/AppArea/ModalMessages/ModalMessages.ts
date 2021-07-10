
const ModalMessages = (message?:any, other?:string, func?:()=>void, code?:number) => {
    if (message === "DELETE") {
        const deleteMessage = {
            title: "DELETE",
            message: `Are You Sure You Want To Delete ${other}`,
            buttonRightText: "Yes",
            buttonLeftText: "No",
            buttonRightFunc: func
        }
        return deleteMessage
    }
    if (message === "Success") {
        const deleteMessage = {
            title: "Success",
            message: `Your Action: ${other}`,
            buttonRightText: "Ok",
            buttonLeftText: "",
            buttonRightFunc: func
        }
        return deleteMessage
    }
    if (message === "Unregistered-User") {
        const errorMessage = {
            title: "Unregistered-User",
            message: `Sorry, you need to be login to receive this information, would you like to login?`,
            buttonRightText: "Yes",
            buttonLeftText: "No",
            buttonRightFunc: func
        }
        return errorMessage
    }
    if (message.response === undefined || message.response.status === 700) {
        const errorMessage = {
            title: "Error-Message",
            message: `Some Error occurred, would you like to refresh?`,
            buttonRightText: "Yes",
            buttonLeftText: "No",
            buttonRightFunc: func
        }
        return errorMessage
    }
    if (message.response.status === 600) {
        const errorMessage = {
            title: "Error-Message",
            message: `${message.response.data.error}, would you like to refresh?`,
            buttonRightText: "Yes",
            buttonLeftText: "No",
            buttonRightFunc: func
        }
        return errorMessage
    }
    if (message.response.status === 601) {
        const errorMessage = {
            title: "Error-Message",
            message: `${message.response.data.error}`,
            buttonRightText: "Ok",
            buttonLeftText: "Close",
            buttonRightFunc: func
        }
        return errorMessage
    }
    if (message.response.status === 619) {
        const errorMessage = {
            title: "Error-Message",
            message: `${message.response.data.error}, sorry but we need to refresh the page`,
            buttonRightText: "Ok",
            buttonLeftText: "Close",
            buttonRightFunc: func,
            httpCode: code
        }
        return errorMessage
    }
    if (message.response.status === 605) {
        const errorMessage = {
            title: "Error-Message",
            message: `${message.response.data.error}`,
            buttonRightText: "Ok",
            buttonLeftText: "Close",
            buttonRightFunc: func,
            httpCode: code
        }
        return errorMessage
    }
    const errorMessage = {
        title: "Error-Message",
        message: `${message.response.data.error}`,
        buttonRightText: "Ok",
        buttonLeftText: "Close"
    }
    return errorMessage
}

export default ModalMessages
