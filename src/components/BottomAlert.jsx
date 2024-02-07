
const BottomAlert = ({ message }) => {

    return (
        <div className="z-10 fixed bottom-0 left-0 right-0 mx-auto w-11/12 bg-green-500 text-white p-4 text-center">
            {message}
        </div>
    )
};

export default BottomAlert;
