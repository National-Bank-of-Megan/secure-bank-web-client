import React from "react";
import {UseStateType} from "../../models/custom-types/UseStateType";
import {Pagination, Stack} from "@mui/material";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";

const PaginationController: React.FC<{ page: UseStateType<PaginationDataType>, numberOfPages: number, numberPerPage: number, dataLength: number }> = (props) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.page.setState({
            ...props.page,
            page: value,
            startIndex: ((value - 1) * props.numberPerPage),
            endIndex: props.dataLength >= props.numberPerPage * value ? props.numberPerPage * value : props.dataLength
        })
    };

    return (
        <Stack>
            <Pagination
                sx={{alignSelf: "center", marginTop: "15px", marginBottom: "20px"}}
                count={props.numberOfPages}
                page={props.page.state.page}
                onChange={handleChange}
                color="primary"
                size="large"
            />
        </Stack>
    );
}

export default PaginationController;