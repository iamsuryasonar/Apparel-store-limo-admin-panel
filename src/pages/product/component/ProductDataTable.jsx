import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Product',
        selector: row => row.product,
        sortable: true,
    },
    {
        name: 'Update',
        selector: row => row.update,
        sortable: true,
    },
    {
        name: 'price',
        selector: row => row.price,
        sortable: true,
    },
    {
        name: 'Quantity',
        selector: row => row.quantity,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => row.action,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        product: 'Beetlejuice',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 2,
        product: 'Ghostbusters',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 3,
        product: 'Beetlejuice',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 4,
        product: 'Ghostbusters',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 5,
        product: 'Beetlejuice',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 6,
        product: 'Ghostbusters',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 7,
        product: 'Beetlejuice',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 8,
        product: 'Ghostbusters',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 9,
        product: 'Beetlejuice',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 10,
        product: 'Ghostbusters10',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 11,
        product: 'Beetlejuice11',
        update: '11/11/2017',
        price: '999',
        quantity: '99',
        status: 'in stock',
        action: '1988',
    },
    {
        id: 12,
        product: 'Ghostbusters12',
        update: '11/11/2017',
        price: '1988',
        quantity: '90',
        status: 'in stock',
        action: '1988',
    },
]



function ProductDataTable() {
    const [value, setValue] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = data.filter(
        item => item.product && item.product.toLowerCase().includes(value.toLowerCase()),
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
            <div className='flex justify-between items-center'>
                <button className='px-2 py-1 bg-green-400 rounded-md ' onClick={addProduct}>Add product</button>
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
            <DataTable
                title="Products"
                columns={columns}
                data={filteredItems.map((item) => {
                    return {
                        id: item.id,
                        product: item.product,
                        update: item.update,
                        price: item.price,
                        quantity: item.quantity,
                        status: (<div className='p-2 rounded-2xl bg-green-400'>
                            {item.status}
                        </div>
                        ),
                        action: (
                            <>
                                <FontAwesomeIcon icon={faTrash} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} />
                                <FontAwesomeIcon icon={faPenToSquare} className="p-1 text-green-500 hover:text-red-500" onClick={(e) => { }} />
                            </>
                        ),
                    }
                })}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
            />
        </>
    );
};

export default ProductDataTable;