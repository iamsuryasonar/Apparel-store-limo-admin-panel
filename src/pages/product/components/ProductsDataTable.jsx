import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from '../../../store/slices/messageSlice';
import { get_all_products } from '../../../store/slices/productsSlice';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        maxWidth: '300px',
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,
        maxWidth: '400px',
        hide: 'sm',
    },
    {
        name: 'Keyword',
        selector: row => row.keyword,
        sortable: true,
        maxWidth: '200px',
        hide: 'sm',
    },
    {
        name: 'Tag',
        selector: row => row.tag,
        sortable: true,
        right: true,
        maxWidth: '150px',
        hide: 'sm',
    },
    {
        name: 'Action',
        selector: row => row.action,
        sortable: true,
        right: true,
        maxWidth: '80px',
    },
];

const customStyles = {
    header: {
        style: {
            backgroundColor: 'bg-slate-100',
        },
    },
    subHeader: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            backgroundColor: 'bg-slate-100',
        },
    },
    headRow: {
        style: {
            backgroundColor: 'bg-slate-100',
        },
    },
    table: {
        style: {
            backgroundColor: 'bg-slate-100',
        },
    },
    rows: {
        style: {
            backgroundColor: 'bg-slate-100',
        },
    },
    pagination: {
        style: {
            backgroundColor: 'bg-slate-100',
        },
    }
};

function ProductsDataTable({ onComponentToggle }) {
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
        fetchProducts(1, 10);
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

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (value) {
                setResetPaginationToggle(!resetPaginationToggle);
                setValue('');
            }
        };

        return (
            <div className='w-full flex justify-between items-center gap-2'>
                <Link to='/add-product' className='text-wrap md:text-nowrap px-2 py-1  bg-slate-600 hover:bg-black text-white  active:bg-black '>Add product</Link>
                <div className='w-full flex flex-col md:flex-row gap-2'>
                    <input
                        id="search"
                        className='w-full border-[1px] border-black px-2 bg-slate-50 placeholder:text-slate-400 placeholder:font-light'
                        type="text"
                        placeholder="Filter by product name"
                        value={value}
                        onChange={e => setValue(e.target.value)}>
                    </input>
                    <button className='px-2 py-1  bg-slate-600 hover:bg-black text-white  active:bg-black' onClick={handleClear} > Clear</button >
                </div>
            </div>
        );
    }, [value, resetPaginationToggle]);

    return (
        <>
            <div className=' w-full flex flex-col '>
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
                                    product: item,
                                    name: item.name,
                                    description: item.description,
                                    keyword: item.keyword,
                                    tag: item.tag,
                                    action: (
                                        <div className='flex flex-row gap-2'>
                                            {/* <FontAwesomeIcon icon={faTrash} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} /> */}
                                            <FontAwesomeIcon icon={faPenToSquare} className="p-1 text-green-500 hover:text-red-500" onClick={() => onComponentToggle('EDIT', item, data?.products?.categories)} />
                                        </div>
                                    ),
                                }
                            })
                        }
                        onRowClicked={(row, event) => {
                            onComponentToggle('VIEW', row.product, data?.products?.categories)
                        }}
                        className='w-full'
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
                        customStyles={customStyles}
                    />
                }
            </div>
        </>
    );
};

export default ProductsDataTable;

