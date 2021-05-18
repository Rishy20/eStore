import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import {
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, TableSortLabel, Typography
} from "@material-ui/core";
import Button from "../Button";
import {Delete, Edit} from "@material-ui/icons";

const url = "http://localhost:8280/estore/seller?service=products";

//Display All Products
const AllProducts = props => {
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
        //This method fetches all products from the db
        fetch(url,{
            headers: {
                "x-access-token":localStorage.getItem("token")
            },
            method:"GET"
        })
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
            {...item, price: "Rs. " + item.price}
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

        return (a, b) => {
            let result = (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
            return result * order;
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

    // Delete product
    const deleteProduct = delItem => {
        let newData = data.filter(item => (item._id !== delItem._id));


        fetch(`http://localhost:8280/estore/${delItem._id}?service=products`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem("token")
            },
            method: "DELETE"

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(newData);
            })
            .catch(err => console.log(err));
    }

    // Set product for editing
    const setEditProductHandler = tableItem => {
        for (let item of data) {
            if (item._id === tableItem._id) {
                props.setEditProduct(item);
                console.log(item)
            }
        }
    }

    return (
        <Card variant="outlined" className={props.styles.cardContainer}>
            <CardHeader
                title="All Products"
                action={
                    <Link to="/products/add">
                        <Button
                            name="Add Products"
                            btnStyle="btn-login"
                        />
                    </Link>
                }
                classes={{action: props.styles.action}}
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
                                >
                                    Image
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("name")}
                                >
                                    Name
                                    <TableSortLabel
                                        active={sortBy === "name"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("price")}
                                >
                                    Price
                                    <TableSortLabel
                                        active={sortBy === "price"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                    onClick={() => sortItems("qty")}
                                >
                                    Qty
                                    <TableSortLabel
                                        active={sortBy === "qty"}
                                        direction={sortOrder}
                                        classes={{icon: props.styles.sortIcon}}
                                    />
                                </TableCell>
                                <TableCell
                                    classes={{head: props.styles.darkCell}}
                                    align="center"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Table Data */}
                        <TableBody>
                                {tableData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell align="center">
                                            <img
                                                src={`http://localhost:8280/estore/image/${item.img}?service=products`}
                                                alt={item.name}
                                                style={{
                                                    minHeight: "160px",
                                                    maxHeight: "160px"
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                variant="body1"
                                                classes={{body1: props.styles.tableData}}
                                            >
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                variant="body1"
                                                classes={{body1: props.styles.tableData}}
                                                style={{color: "red"}}
                                            >
                                                {item.price}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                variant="body1"
                                                classes={{body1: props.styles.tableData}}
                                            >
                                                {item.qty}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup color="primary">
                                                <IconButton
                                                    component={Link}
                                                    to="/products/edit"
                                                    onClick={() => {setEditProductHandler(item);}}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => deleteProduct(item)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </ButtonGroup>
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

export default AllProducts;