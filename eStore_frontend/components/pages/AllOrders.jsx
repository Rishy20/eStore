import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, TableSortLabel, Typography
} from "@material-ui/core";

const url = "http://localhost:8280/estore?service=orders";

//This component displays all orders
const AllOrders = props => {
    // Data states
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    // Sorting states
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortedCount, setSortedCount] = useState(0);
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {setData(data);})
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        convertToTableData();
    }, [sortedCount, data]);

    // Data functions
    const convertToTableData = () => {
        let newTableData = data.map(item => (
            {...item, total: "Rs. " + item.total}
        ));

        setTableData(newTableData);
    }

    // Sorting functions
    const sortItems = column => {
        let newData = data;

        if (column !== sortBy) {
            setSortOrder("asc");
            newData.sort(dynamicSort(column, false));
        } else {
            const newOrder = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(newOrder);
            newData.sort(dynamicSort(column, newOrder === "desc"));
        }

        setData(newData);
        setSortBy(column);
        setSortedCount(sortedCount + 1);
    }

    const dynamicSort = (column, desc) => {
        let order = desc ? -1 : 1;

        if (column.indexOf(".") !== -1) {
            column = column.split(".");

            return (a, b) => {
                let i = 0;
                
                while (i < column.length) {
                    a = a[column[i]];
                    b = b[column[i]];
                    i++;
                }

                let result = (a < b) ? -1 : (a > b) ? 1: 0;
                return result * order;
            }
        } else {
            return (a, b) => {
                let result = (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
                return result * order;
            }
        }
    }

    // Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    return (
        <Card variant="outlined" className={props.styles.cardContainer}>
            <CardHeader
                title="All Orders"
                style={{marginBlockStart: "10px", marginBlockEnd: "11px"}}
            />
            <hr className={props.styles.hr} />

            <CardContent>
                <TableContainer component={Paper}>
                    <Table size="small">

                        {/* Table Head */}
                        <TableHead className={props.styles.tableHead}>
                            <TableRow>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("customer.fname")}
                                >
                                    Customer Name
                                    <TableSortLabel
                                        active={sortBy === "customer.fname"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                >
                                    Products
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("customer.deliverytype")}
                                >
                                    Delivery Type
                                    <TableSortLabel
                                        active={sortBy === "customer.deliverytype"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("total")}
                                >
                                    Total Amount
                                    <TableSortLabel
                                        active={sortBy === "total"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Table Data */}
                        <TableBody>
                                {tableData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(order => (
                                        <TableRow key={order._id}>
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    classes={{body1: props.styles.tableData}}
                                                >
                                                    {`${order.customer.fname} ${order.customer.lname}`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    classes={{body1: props.styles.tableData}}
                                                >
                                                    {order.products.map(product => (
                                                        <div key={product._id} style={{display: "inline-block"}}>
                                                            {product.name}:&nbsp;
                                                            <span style={{color: "grey"}}>
                                                                {product.qty}
                                                                &nbsp;
                                                                {product.qty > 1 ? "items" : "item"}
                                                            </span>
                                                            &nbsp;&nbsp;&nbsp;
                                                        </div>
                                                    ))}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    classes={{body1: props.styles.tableData}}
                                                >
                                                    {order.customer.deliverytype}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="body1"
                                                    classes={{body1: props.styles.tableData}}
                                                    style={{color: "red"}}
                                                >
                                                    {order.total}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={tableData.length}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default AllOrders;