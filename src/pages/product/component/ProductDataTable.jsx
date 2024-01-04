import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../../store/slices/messageSlice';
import { get_all_products } from '../../../store/slices/productSlice';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,
    },
    {
        name: 'Keyword',
        selector: row => row.keyword,
        sortable: true,
    },
    {
        name: 'Tag',
        selector: row => row.tag,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => row.action,
        sortable: true,
    },
];

function ProductDataTable() {
    const [value, setValue] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const data = useSelector((state) => state.products);
    const loading = useSelector((state) => state.loading.value);
    const totalRows = data?.products?.pagination?.total_products;

    const fetchProducts = (page, limit) => {
        dispatch(get_all_products({ page: page, limit: limit }));
    }

    useEffect(() => {
        dispatch(clearMessage());
        fetchProducts(0, 10);
    }, []);


    const handlePageChange = (page) => {
        fetchProducts(page, perPage);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchProducts(page, newPerPage)
        setPerPage(newPerPage);
    };

    const filteredItems = data?.products?.products?.filter(
        item => item.name && item.name.toLowerCase().includes(value.toLowerCase()),
    );

    function addProduct() {
        //add product to db and update this component
    }




    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (value) {
                setResetPaginationToggle(!resetPaginationToggle);
                setValue('');
            }
        };

        return (
            <div className='w-full flex justify-between items-center'>
                <Link to='/add-product' className='px-2 py-1 bg-green-400 rounded-md' onClick={addProduct}>Add product</Link>
                <div>
                    <input
                        id="search"
                        className='border-2 px-2 m-2'
                        type="text"
                        placeholder="Filter by product name"
                        value={value}
                        onChange={e => setValue(e.target.value)}>

                    </input>
                    <button className='px-2 py-1 bg-green-400 rounded-md' onClick={handleClear} > Clear</button >
                </div>
            </div>
        );
    }, [value, resetPaginationToggle]);

    return (
        <>
            <div className=' w-full flex flex-col'>
                {loading ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-90 z-50">
                        <div className="animate-spin border-t-8 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                    </div>
                ) :
                    filteredItems && <DataTable
                        title="Products"
                        columns={columns}
                        data={
                            filteredItems.map((item) => {
                                return {
                                    name: item.name,
                                    description: item.description,
                                    keyword: item.keyword,
                                    tag: item.tag,
                                    action: (
                                        <>
                                            <FontAwesomeIcon icon={faTrash} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} />
                                            <FontAwesomeIcon icon={faPenToSquare} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} />
                                        </>
                                    ),
                                }
                            })
                        }
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationResetDefaultPage={resetPaginationToggle}
                        responsive
                        pointerOnHover
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        progressPending={loading}
                    />
                }
            </div>
        </>
    );
};

export default ProductDataTable;

