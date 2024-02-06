
function Pagination({ currentPage, totalPages, totalOrders, handlePageChange }) {
    console.log(totalOrders)
    if (totalOrders === 0) return <></>

    return <div className='flex flex-row justify-end'>
        {totalPages && <>
            <button
                className=' underline underline-offset-4 hover:text-blue-600'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className='px-4'>Page {currentPage} of {totalPages}</span>
            <button
                className=' underline underline-offset-4 hover:text-blue-600'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </>}
    </div>
}

export default Pagination;